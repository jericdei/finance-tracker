import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    const dei = await prisma.user.upsert({
        where: { pin: "062500" },
        update: {},
        create: {
            name: "Dei",
            pin: "062500",
        },
    })

    const wyn = await prisma.user.upsert({
        where: { pin: "053102" },
        update: {},
        create: {
            name: "Wyn",
            pin: "053102",
        },
    })

    const admin = await prisma.user.upsert({
        where: { pin: "050819" },
        update: {},
        create: {
            name: "Admin",
            pin: "050819",
        },
    })

    const income = await prisma.accountCategory.create({
        data: {
            name: "Income",
        },
    })

    const expense = await prisma.accountCategory.create({
        data: {
            name: "Expense",
        },
    })

    const savings = await prisma.accountCategory.create({
        data: {
            name: "Savings",
        },
    })

    const incomeAccounts = ["Salary", "Baon", "Other Income"]
    const savingsAccounts = ["Savings"]
    const expenseAccounts = [
        "Food",
        "Gas",
        "Transportation Fare",
        "Parking Fee",
        "Motorcycle Maintenance",
        "Skincare & Toiletries",
        "Clothes & Shoes",
        "School Expenses",
        "Miscellaneous",
    ]

    await prisma.account.createMany({
        data: [
            ...incomeAccounts.map((name) => {
                return {
                    name,
                    categoryId: income.id,
                }
            }),
            ...savingsAccounts.map((name) => {
                return {
                    name,
                    categoryId: savings.id,
                }
            }),
            ...expenseAccounts.map((name) => {
                return {
                    name,
                    categoryId: expense.id,
                }
            }),
        ],
    })

    console.log("Seeding complete!")
}

try {
    await main()
    await prisma.$disconnect()
} catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
}
