export function isAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    return Object.keys(user).length > 1
}

export function logout() {
    localStorage.setItem('user', JSON.stringify([]))
    return
}
