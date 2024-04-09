<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
})
</script>

<template>
    <div>
        <h1 class="text-center text-2xl font-bold">New Transaction</h1>

        <form method="POST">
            <div class="mt-8 flex flex-col gap-4">
                <InputText
                    name="test"
                    type="text"
                />

                <Button
                    label="Submit"
                    type="submit"
                />
            </div>
        </form>
    </div>
</template>
