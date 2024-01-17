export function createStorage() {
    localStorage.setItem('roulette', JSON.stringify([]))
}

export function readStorage() {
    return JSON.parse(localStorage.getItem('roulette'))
}

export function editStorage(data) {
    localStorage.setItem('roulette', JSON.stringify(data))
}