import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event)

    const entries = await prisma.entry.findMany({
        include: {
            account: {
                include: {
                    category: true,
                },
            },
        },
        where: {
            userId: parseInt(userId as string),
            deletedAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return {
        entries,
    }
})
