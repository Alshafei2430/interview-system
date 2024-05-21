import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../utils/helpers";
import { db } from "../drizzle";
import { user } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "../constants/http.errors";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .then((users) => users[0]);
    if (!findUser) {
      done(USER_NOT_FOUND);
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});
passport.use(
  "local",
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await db
        .select()
        .from(user)
        .where(eq(user.username, username))
        .then((users) => users[0]);
      if (!findUser) {
        done(USER_NOT_FOUND);
      }
      if (!comparePassword(password, findUser.hashedPassword)) {
        done(WRONG_PASSWORD);
      }
      done(null, findUser);
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
