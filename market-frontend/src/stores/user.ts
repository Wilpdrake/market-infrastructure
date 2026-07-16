import {defineStore} from 'pinia'

interface UserState {
    token: string | null
    username: string | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: localStorage.getItem('token') || null, username: null,
    }), getters: {
        isAuth: (state): boolean => !!state.token,
    }, actions: {
        setToken(newToken: string) {
            this.token = newToken
            localStorage.setItem('token', newToken)
        }, logout() {
            this.token = null
            localStorage.removeItem('token')
        }
    }
})
