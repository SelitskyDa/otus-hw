import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
    const isLoading = ref(false)

    const setLoading = value => {
        isLoading.value = value
    }

    return {
        isLoading, setLoading
    }
})
