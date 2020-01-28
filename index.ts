import { prisma } from './generated/prisma-client'

// A `main` function so that we can use async/await
async function main() {
  // Create a new user with a new post
  const newUser = await prisma.createUser({
    username: 'Bob',
    items: {
      create: [
        {
          name: "Test",
          multiplier: 2,
        },
      ],
    },
  })
  console.log(`Created new user: ${newUser.username} (ID: ${newUser.id})`)

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)

  const allItems = await prisma.items()
  console.log(allItems)
}

main().catch(e => console.error(e))