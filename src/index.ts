import { Elysia, t} from 'elysia'
import { bearer } from '@elysiajs/bearer'
import { jwt } from '@elysiajs/jwt'
import { swagger } from '@elysiajs/swagger'
import { db } from './db' 

const app = new Elysia()
    .use(swagger())
    .use(bearer())
    .use(jwt({
        name: 'jwt',
        secret: import.meta.env.JWT_SECRET
    }))
  // Login endpoint to generate a token
  .post(
    '/login',
    async ({ body, jwt }) => {
      const { username, password } = body;
      // Replace this with actual user validation (e.g., check against a database)
      if (username === 'test' && password === 'password') {
        const token = await jwt.sign({ id: username });
        return { success: true, token };
      }
      throw new Error('Invalid credentials');
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
.get('/sign', async ({ bearer, jwt }) => {
        const payload = await jwt.verify(bearer)
        if (!payload) return 'Invalid token'
        return payload
    }, {
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 400
                set.headers['WWW-Authenticate'] = `Bearer realm='sign', error="invalid_request"`
                return 'Unauthorized'
            }
        }
    })
    .listen(8080)

async function getUsers() {
  const users = await db.selectFrom("users").selectAll().execute();
  return users;
}

const users = await getUsers();
console.log(users)

console.log('Server running at http://localhost:8080/swagger');
