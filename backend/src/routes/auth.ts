import passport from "passport";
import { Router } from "express";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { user } from "../drizzle/schema";
import {
  ADMIN_ALREADY_EXISTS,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  LEADER_ALREADY_EXISTS,
  MISSING_REQUIRED_FIELDS,
  SECRETARY_ALREADY_EXISTS,
  UNAUTHORIZED,
} from "../constants/http.errors";
import { ADMIN_ROLE, LEADER_ROLE, SECRETARY_ROLE } from "../constants/roles";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (request, response) => {
    response.send({
      user: {
        username: request?.user?.username,
        role: request?.user?.role,
      },
    });
  }
);

router.get("/status", (request, response) => {
  return request.user
    ? response.send({
        user: {
          username: request?.user.username,
          role: request?.user.role,
        },
      })
    : response.sendStatus(UNAUTHORIZED.statusCode);
});

router.post("/logout", (request, response) => {
  if (!request.user) return response.sendStatus(UNAUTHORIZED.statusCode);
  request.logout((err) => {
    if (err) return response.sendStatus(BAD_REQUEST.statusCode);
    response.send(200);
  });
});

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post("/signup", async function (req, res, next) {
  const { leader, secretary } = req.body;
  if (
    !leader.username ||
    !leader.password ||
    !leader.role ||
    !secretary.username ||
    !secretary.password ||
    !secretary.role
  ) {
    return next(MISSING_REQUIRED_FIELDS);
  }

  // Validate role
  if (
    parseInt(leader.role) !== LEADER_ROLE ||
    parseInt(secretary.role) !== SECRETARY_ROLE
  ) {
    return next(UNAUTHORIZED);
  }
  try {
    const leaderFound = await db
      .select()
      .from(user)
      .where(eq(user.username, leader.username))
      .then((users) => users[0]);
    if (leaderFound) {
      return next(LEADER_ALREADY_EXISTS);
    }
    const secretaryFound = await db
      .select()
      .from(user)
      .where(eq(user.username, secretary.username))
      .then((users) => users[0]);
    if (secretaryFound) {
      return next(SECRETARY_ALREADY_EXISTS);
    }
    const leaderHashedPassword = bcrypt.hashSync(leader.password, 10);
    const secretaryHashedPassword = bcrypt.hashSync(secretary.password, 10);
    const leaderCreated = await db
      .insert(user)
      .values({
        username: leader.username,
        hashedPassword: leaderHashedPassword,
        role: leader.role,
      })
      .returning()
      .then((results) => results[0]);
    const secretaryCreated = await db
      .insert(user)
      .values({
        username: secretary.username,
        hashedPassword: secretaryHashedPassword,
        role: secretary.role,
        leaderId: leaderCreated.id,
      })
      .returning()
      .then((results) => results[0]);

    res.send({
      users: [
        {
          username: leader.username,
          role: leader.role,
        },
        {
          username: secretaryCreated.username,
          role: secretaryCreated.role,
        },
      ],
    });
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

router.post("/admin-signup", async (req, res, next) => {
  const { admin } = req.body;

  // Check for missing fields
  if (!admin || !admin.username || !admin.password || !admin.role) {
    return next(MISSING_REQUIRED_FIELDS);
  }

  // Validate role
  if (parseInt(admin.role) !== ADMIN_ROLE) {
    return next(UNAUTHORIZED);
  }

  try {
    // Check if admin already exists
    const adminFound = await db
      .select()
      .from(user)
      .where(eq(user.username, admin.username))
      .then((users) => users[0]);
    if (adminFound) {
      return next(ADMIN_ALREADY_EXISTS);
    }

    // Hash password asynchronously
    const adminHashedPassword = await bcrypt.hash(admin.password, 10);

    // Insert admin into the database
    const adminCreated = await db
      .insert(user)
      .values({
        username: admin.username,
        hashedPassword: adminHashedPassword,
        role: admin.role,
      })
      .returning()
      .then((result) => result[0]);

    res.send({
      user: {
        username: adminCreated.username,
        role: adminCreated.role,
      },
    });
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

export default router;
