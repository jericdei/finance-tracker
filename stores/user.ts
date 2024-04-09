import type { User } from "@prisma/client"

export const useUserStore = defineStore("main", {
    state: () => {
        return {
            user: useState("user", () => null as User | null),
        }
    },
    actions: {
        setUser(user: User) {
            this.user = user
        },
        logout() {
            this.user = null
        },
    },
    persist: true,
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
