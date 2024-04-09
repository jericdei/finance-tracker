import { Account, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { amount, account, user } = await readBody(event)

    const entry = await prisma.entry.create({
        data: {
            amount,
            accountId: account.id,
            userId: user.id,
        },
    })

    return {
        entry,
    }
})
