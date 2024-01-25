import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/main.vue'
import Product from '@/views/product.vue'
import Cart from '@/views/cart.vue'
import Auth from '@/views/auth.vue'
import Error404 from '@/views/Error404.vue'
import { isAuth } from '@/services/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/product/:id',
            name: 'product',
            component: Product,
            props: true,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error404 },
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/auth', '/:pathMatch(.*)*']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = isAuth()

    if (authRequired && !loggedIn) {
        next('/auth')
    } else {
        next()
    }
})

export default router
