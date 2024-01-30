import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { fetchProducts, fetchProduct } from '@/services/fetch';
import {useAppStore} from "@/store/app"

export const useProductsStore = defineStore('productsStore', () => {
    const appStore = useAppStore()

    const productsState = reactive({
        products: [],
        currentProduct: {}
    })

    function clearProducts () {
        productsState.products.splice(0, productsState.products.length)
    }
    function clearProduct () {
        for (let key in productsState.currentProduct) {
            delete productsState.currentProduct[key]
        }
    }
    const isNotEmptyProducts = computed(() => productsState.products.length > 0)

    const message = ref('')

    const getProducts = async (id) => {
        appStore.setLoading(true)
        try {
            if (id) {
                const response = await fetchProduct(id)
                clearProduct()
                Object.assign(productsState.currentProduct, response.data)
            } else {
                const response = await fetchProducts()
                clearProducts()
                productsState.products.push(...response.data)
            }
        } catch (error) {
            message.value = 'Что то пошло не так'
        } finally {
            appStore.setLoading(false)
        }
    }

    const addProduct = (data) => {
        productsState.products.unshift(data);
    }

    return {
        productsState,
        message,
        getProducts,
        isNotEmptyProducts,
        clearProducts,
        addProduct
    }
})
