import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    console.log(body)

    const user = await prisma.user.findFirst({
        where: {
            pin: body.pin,
        },
    })

    return {
        user,
    }
})
