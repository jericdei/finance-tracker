import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { userId } = getQuery(event)

    const entries = await prisma.accountCategory.findMany({
        include: {
            accounts: {
                include: {
                    entries: {
                        where: {
                            userId: parseInt(userId as string),
                            deletedAt: null,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            },
        },
    })

    return {
        categories: entries,
    }
})
