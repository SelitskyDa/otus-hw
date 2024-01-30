import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const cartState = reactive({
        inCart: []
    })

    function clearCart () {
        cartState.inCart.splice(0, cartState.inCart.length)
        saveCartToLocalStorage()
    }

    function addToCart(product, count) {
        const existingProductIndex = cartState.inCart.findIndex(item => item.id === product.id)

        if (existingProductIndex !== -1) {
            cartState.inCart[existingProductIndex].count += count
        } else {
            cartState.inCart.push({
                ...product,
                count
            })
        }
        saveCartToLocalStorage()
    }

    function changeCount(id, action) {
        const index = cartState.inCart.findIndex((item) => item.id === id)

        if (index !== -1) {
            const cartItem = cartState.inCart[index]

            if (action === '+' && cartItem.count >= 0) {
                cartItem.count++
            }
            else if (action === '-' && cartItem.count > 0) {
                cartItem.count--
            }

            if (cartItem.count === 0) {
                cartState.inCart.splice(index, 1)
            }
        }
        saveCartToLocalStorage()
    }

    function removeFromCart(id) {
        const index = cartState.inCart.findIndex((item) => item.id === id)
        if (index > -1) {
            cartState.inCart.splice(index, 1)
        }
        saveCartToLocalStorage()
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartState.inCart))
    }
    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            cartState.inCart = JSON.parse(savedCart)
        }
    }

    const totalSum = computed(() =>
        cartState.inCart.reduce((total, item) => {
            return total + (item.price * item.count)
        }, 0)
    )

    const totalCount = computed(() =>
        cartState.inCart.reduce((total, item) => {
            return total + item.count
        }, 0)
    )

    return {
        cartState,
        addToCart,
        changeCount,
        removeFromCart,
        clearCart,
        loadCartFromLocalStorage,
        totalSum,
        totalCount
    }
})
