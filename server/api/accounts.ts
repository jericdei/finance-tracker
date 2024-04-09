import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { categoryId } = getQuery(event)

    const accounts = await prisma.account.findMany({
        where: {
            categoryId: parseInt(categoryId as string),
        },
    })

    return {
        accounts,
        categoryId,
    }
})
