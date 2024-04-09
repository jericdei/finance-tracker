<script setup lang="ts">
useHead({
    title: "Home",
})

definePageMeta({
    middleware: ["auth"],
})

const { user, logout } = useUserStore()

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
                <p>Hi, {{ user?.name }}</p>

                <Button
                    v-tooltip.top="'Logout'"
                    icon="ri-logout-box-line font-bold ri-lg"
                    text
                    @click="handleLogout"
                />
            </div>

            <div class="mt-4">
                <NuxtLink to="/transactions/create">
                    <Button
                        label="Add Transaction"
                        icon="ri-add-line"
                        severity="success"
                    />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
