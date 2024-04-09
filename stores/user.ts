import type { User } from "@prisma/client"

export const useStore = defineStore("main", {
    state: () => {
        return {
            user: null as User | null,
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
    persist: {
        storage: persistedState.localStorage,
    },
})
