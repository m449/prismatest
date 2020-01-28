import { prisma } from './generated/prisma-client'

async function main() {

  const allUsers = await prisma.users();
  console.log(allUsers);

  const allItems = await prisma.items();
  console.log(allItems);

  const allEvents = await prisma.events();
  console.log(allEvents);
  const itemsByUser = await prisma.user({ username: 'Bob' }).items()
  console.log(`All items by that user: ${JSON.stringify(itemsByUser)}`)
}

main().catch(e => console.error(e))