import jwt from 'jsonwebtoken';
import { User } from '../../../models';

export async function sign(ctx) {
  const { email, password } = ctx.request.body;

  if (!email || typeof email  !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'invalid email' };
    return;
  }

  if (!password || typeof password !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'invalid password' };
    return;
  }

  try {
    const unauthedUser = await User.findOne({ email }, { password: true });

    if (unauthedUser) {
      const authenticated = unauthedUser.authenticate(password);
      if (authenticated) {
        const expiresIn = 86400;
        const authedUser = await User.findOne({ email });
        const token = jwt.sign(authedUser, 'shhhhh', { expiresIn });
        ctx.status = 200;
        ctx.body = { token, expiresIn };
        return;
      }

      ctx.status = 401;
      ctx.body = { error: 'invalid credentials' };
      return;
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'invalid credentials' };
    return;
  }
}

export default sign;
