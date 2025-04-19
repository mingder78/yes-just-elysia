# yes just elysia

## xata

```
async function getUsers() {
  const users = await db.selectFrom("users").selectAll().execute();
  return users;
}

const users = await getUsers();
console.log(users)
```

## login

```
ming-ders-MacBook.local💩➜  ~ curl http://localhost:8080/login \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "username": "test",
  "password": "password"
}'
{"success":true,"token":"eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3QifQ.a2Oyv6Kgxv_Q9JPr3rn0c7ECnzk5aob9GK3onOZKZuw"}
```

## sign

```
ming-ders-MacBook.local💩➜  ~ curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3QifQ.a2Oyv6Kgxv_Q9JPr3rn0c7ECnzk5aob9GK3onOZKZuw" http://localhost:8080/sign
{"id":"test"}

ming-ders-MacBook.local💩➜  ~ curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6InRlc3QifQ.a2Oyv6Kgxv_Q9JPr3rn0c7ECnzk5aob9GK3onOZKZu" http://localhost:8080/sign
Invalid token
```

# build

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
