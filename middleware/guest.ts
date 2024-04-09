export default defineNuxtRouteMiddleware(() => {
    const { user } = useStore()

    if (user) {
        return navigateTo("/")
    }
})
