import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { readUsers } from './db/';
import { cookie } from '@elysiajs/cookie'
import { auth } from './auth';

const app = new Elysia()
  .use(swagger())
  .use(cookie())
  .model(
    'auth',
    t.Object({
        username: t.String(),
        password: t.String({
            minLength: 8
        })
    })
)
  .get('/', () => {
    return { response: true, users: readUsers() };
  })
  .get('/checkToken', async (context) => {
    const authRequest = await auth.handleRequest(context).validateBearerToken();
    console.log({authRequest})
    return { response: true, users: readUsers() };
  })
  .post('/signup', ({ body }) => {
    return auth.createUser({
      key: {
        providerId: 'username',
        providerUserId: body.username,
        password: body.password
      },
      attributes: {full_name:'serce'}
    });}, {
    body: 'auth'
  }).post('/signin',async ({ setCookie, body: { username, password } }) => {
    const {userId} = await auth.useKey(
      'username',
        username,
        password
    );
    const { sessionId } = await auth.createSession({userId,attributes: {}})
	  setCookie('session', sessionId);
    return `Signed in as ${username}`
  },
  {
      body: 'auth'
  })
  .listen(3000);

if (app.server) {
  console.log(
    `🦊 Elysia is running at ${app.server.hostname}:${app.server.port}`
  );
}