import api from './api.js'

export function fetchProducts() {
    return api.get('https://fakestoreapi.com/products')
        .then((response) => {
        return response
    })
}
export function fetchProduct(id) {
    return api.get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
            return response
        })
}

export function buyProduct(data) {
    return api.post(`https://httpbin.org/post`, data.value)
        .then((response) => {
            return response
        })
}
