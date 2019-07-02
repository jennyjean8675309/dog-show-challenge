const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
    Dog.fetchDogs()
    getDogForm().addEventListener('submit', Dog.updateDog)
})

function getTable() {
    return document.querySelector('#table-body')
}

function getDogForm() {
    return document.querySelector('#dog-form')
}