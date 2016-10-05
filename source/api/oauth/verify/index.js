import jwt from 'jsonwebtoken';

export async function verify(ctx, next) {
  const { request, headers, query } = ctx;

  const token = request.body.token || query.token || headers['x-access-token'];
  if (token) {
    try {
      ctx.state.user = await new Promise(resolve => {
        jwt.verify(token, 'shhhhh', async (error, data) => {
          if (error) {
            throw error;
          }
          resolve(data._doc);
        });
      });
    } catch (error) {
      ctx.status = 401;
      ctx.body = { error: 'invalid token' };
      return;
    }

    await next();
    return;
  } else {
    ctx.status = 401;
    ctx.body = { error: 'invalid token' };
    return;
  }
}

export default verify;
