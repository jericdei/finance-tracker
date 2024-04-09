<script setup lang="ts">
import type { Account, AccountCategory, User } from "@prisma/client"

definePageMeta({
    middleware: ["auth"],
})

useHead({
    title: "New Transaction",
})

const { user } = useUserStore()

const category = ref<AccountCategory | null>(null)

const form = ref<{
    amount: number
    account: Account | null
    user: User
}>({
    amount: 0,
    account: null,
    user: user as User,
})

const categories = ref<AccountCategory[]>([])
const accounts = ref<Account[]>([])

onBeforeMount(async () => {
    const { categories: dbCategories } = await $fetch("/api/account-categories")

    categories.value = dbCategories
})

async function fetchAccounts() {
    const { accounts: dbAccounts } = await $fetch("/api/accounts", {
        params: {
            categoryId: category.value?.id.toString(),
        },
    })

    accounts.value = dbAccounts
}

async function submit() {
    const { entry } = await $fetch("/api/entries/create", {
        method: "POST",
        body: form.value,
    })

    if (!entry) {
        return
    }

    navigateTo("/")
}
</script>

<template>
    <div>
        <h1 class="text-center text-2xl font-bold">New Entry</h1>

        <form @submit.prevent="submit">
            <div class="mt-8 flex flex-col gap-4">
                <Dropdown
                    v-model="category"
                    :options="categories"
                    option-label="name"
                    placeholder="Category"
                    @change="fetchAccounts"
                />

                <Dropdown
                    v-model="form.account"
                    :options="accounts"
                    option-label="name"
                    placeholder="Account"
                />

                <InputNumber
                    v-model="form.amount"
                    placeholder="Amount"
                />

                <Button
                    label="Submit"
                    type="submit"
                />
            </div>
        </form>
    </div>
</template>
