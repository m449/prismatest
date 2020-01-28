import { prisma } from './generated/prisma-client'

async function main() {

    const newUser = await prisma.createUser({
        username: 'John',
        points: 5,
        items: {
            create: [
                {
                    name: "Cycling",
                    multiplier: 2,
                },
            ],
        },
    })

    const newUserTwo = await prisma.createUser({
        username: 'Bob',
        points: 0,
        items: {
            create: [
                {
                    name: "Running",
                    multiplier: 3,
                },
            ],
        },
    })

    const newItemUnassigned = await prisma.createItem({
        name: "Climbing",
        multiplier: 5,
    })

    const BOB = await prisma.user({ username: "Bob" });
    const newItemAssigned = await prisma.createItem({
        name: "Climbing",
        multiplier: 5,
        // creator: BOB <-- WHY NOT?
    })

    const newEvent = await prisma.createEvent({
        duration: 30,
        item: { create: { name: "Biking", multiplier: 5 } },
        value: 5 * 30 // Item.Multiplier * this.Duration
    });

    console.log(`Done: ${JSON.stringify(newUser)}`);
    console.log(`Done: ${JSON.stringify(newUserTwo)}`);
    console.log(`Done: ${JSON.stringify(newItemUnassigned)}`);
    console.log(`Done: ${JSON.stringify(newItemAssigned)}`);
    console.log(`Done: ${JSON.stringify(newEvent)}`);
}

main().catch(e => console.error(e))