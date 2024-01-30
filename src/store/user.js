import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user = reactive({})

    const setUser = value => {
        Object.assign(user, value)
    }

    function loadUserFromLocalStorage() {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            Object.assign(user, JSON.parse(savedUser))
        }
    }

    return {
        user,
        setUser,
        loadUserFromLocalStorage
    }
})
