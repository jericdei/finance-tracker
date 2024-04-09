<script setup lang="ts">
definePageMeta({
    middleware: ["guest"],
})

useHead({
    title: "Login",
})

const { setUser } = useStore()

const pin = ref("")
const error = ref(false)

async function submit(pinValue: string) {
    const { user: dbUser } = await $fetch("/api/auth", {
        method: "POST",
        body: {
            pin: pinValue,
        },
    })

    if (!dbUser) {
        error.value = true
        pin.value = ""

        return
    }

    setUser(dbUser)

    navigateTo("/")
}

watch(pin, async (newVal, oldVal) => {
    if (newVal.length === 6 && newVal !== oldVal) {
        error.value = false
        await submit(newVal)
    }
})
</script>

<template>
    <main>
        <h1 class="text-center text-2xl font-bold">Enter your PIN</h1>

        <div class="mt-8">
            <InputOtp
                v-model="pin"
                :length="6"
            />

            <div class="mt-4 text-center">
                <small
                    v-if="error"
                    class="text-red-500"
                    >Incorrect PIN</small
                >
            </div>
        </div>
    </main>
</template>
