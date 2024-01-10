import api from './api.js'

export function fetchProducts() {
    return api.get('https://fakestoreapi.com/products')
        .then((response) => {
        return response
    })
}
