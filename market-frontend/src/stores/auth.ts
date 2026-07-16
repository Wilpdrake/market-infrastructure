import type {RouteLocationNormalized} from 'vue-router';
import {defineStore} from 'pinia'
import {ref} from 'vue'


class Auth {
    public verifyUserLogin(to: RouteLocationNormalized) {

        const isAuthenticated = !!localStorage.getItem('token');

        return to.meta.guestOnly && isAuthenticated ? {name: 'home'} : true;

    }
}

export const authRouter = new Auth();


export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('auth_token'))

    const isLoggedIn = () => !!token.value

    function logout() {
        token.value = null
        localStorage.removeItem('auth_token')
    }

    return {token, isLoggedIn, logout}
})