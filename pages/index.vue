<script setup lang="ts">
import type { Entry } from "@prisma/client"
import moment from "moment"

useHead({
    title: "Home",
})

definePageMeta({
    middleware: ["auth"],
})

const { user, logout } = useUserStore()

const entries = ref<Entry[] | null>(null)

onBeforeMount(async () => {
    const { entries: dbEntries } = await $fetch("/api/entries", {
        params: {
            userId: user?.id,
        },
    })

    entries.value = JSON.parse(JSON.stringify(dbEntries))
})

async function handleLogout() {
    logout()

    navigateTo("/login")
}
</script>

<template>
    <div>
        <h1 class="text-center text-2xl font-bold">Finance Tracker</h1>

        <div class="mt-8">
            <div class="flex items-center justify-between">
                <p>
                    You are logged in as: <strong>{{ user?.name }}</strong>
                </p>

                <Button
                    v-tooltip.top="'Logout'"
                    icon="ri-logout-box-line font-bold ri-lg"
                    text
                    @click="handleLogout"
                />
            </div>

            <div class="mt-4 flex justify-end">
                <NuxtLink to="/entries/create">
                    <Button
                        label="Add Transaction"
                        icon="ri-add-line"
                        severity="success"
                    />
                </NuxtLink>
            </div>

            <div class="mt-8">
                <div
                    v-if="!entries"
                    class="grid place-items-center"
                >
                    <ProgressSpinner />
                </div>

                <div v-else-if="entries.length === 0">
                    <p class="text-center">No entries found.</p>
                </div>

                <DataTable
                    v-else
                    :value="entries"
                >
                    <Column
                        field="id"
                        header="ID"
                    />

                    <Column
                        field="account.category.name"
                        header="Type"
                    />

                    <Column
                        field="account.name"
                        header="Account"
                    />

                    <Column
                        field="amount"
                        header="Amount"
                    >
                        <template #body="{ data }">
                            {{ data.amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" }) }}
                        </template>
                    </Column>

                    <Column
                        field="createdAt"
                        header="Date Created"
                    >
                        <template #body="{ data }">
                            {{ moment(data.createdAt).format("MM/DD/YYYY hh:mm a") }}
                        </template>
                    </Column>

                    <Column
                        field="updatedAt"
                        header="Last Updated"
                    >
                        <template #body="{ data }">
                            {{ moment(data.updatedAt).fromNow() }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
