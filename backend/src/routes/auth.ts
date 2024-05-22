import passport from "passport";
import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../drizzle";
import { user } from "../drizzle/schema";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  MISSING_REQUIRED_FIELDS,
  UNAUTHORIZED,
  USER_ALREADY_EXISTS,
} from "../constants/http.errors";
import { eq } from "drizzle-orm";
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
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return next(MISSING_REQUIRED_FIELDS);
  }
  try {
    const userFound = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .then((users) => users[0]);
    if (userFound) {
      return next(USER_ALREADY_EXISTS);
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userCreated = await db
      .insert(user)
      .values({
        username: req.body.username,
        hashedPassword,
        role: req.body.role,
      })
      .returning()
      .then((result) => result[0]);
    res.send({
      user: {
        username: userCreated.username,
        role: userCreated.role,
      },
    });
  } catch (err) {
    next(INTERNAL_SERVER_ERROR);
  }
});

export default router;
