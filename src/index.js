//When <what kind of> event happens, I need to make <what kind of> fetch call to the server, and manipulate the DOM <how>?

const DogsURL = 'http://localhost:3000/dogs'
let currentDog = ''

document.addEventListener('DOMContentLoaded', function(){
    fetchDogs()
    getDogForm().addEventListener('submit', editDog)
})

function editDog(event) {
    event.preventDefault()
    name = getDogForm()[0].value
    breed = getDogForm()[1].value
    sex = getDogForm()[2].value
    
    let updatedDog = {
        name: name,
        breed: breed,
        sex: sex
    }

    fetch(`${DogsURL}/${currentDog}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
    }).then(response => response.json())
    .then(result => {
        console.log(result)
        getTable().innerHTML = ''
        fetchDogs()
    })
  
}

function fetchDogs() {
    fetch(DogsURL)
        .then(response => response.json())
        .then(dogs => dogs.forEach(dog => displayDog(dog)))
}

/* <tr>
    <td>Dog *Name*</td> 
    <td>*Dog Breed*</td> 
    <td>*Dog Sex*</td> 
    <td><button>Edit</button></td>
</tr> */

function getDogForm(){
    let form = document.querySelector("#dog-form")
    return form
}

function displayDog(dog) {
    let dogRowEntry = getRow(dog.id)
    let dogName = dog.name 
    let dogNameEntry = document.createElement("td")
    dogNameEntry.innerText = dogName

    let dogSex = dog.sex 
    let dogSexEntry = document.createElement("td")
    dogSexEntry.innerText = dogSex

    let dogBreed = dog.breed 
    let dogBreedEntry = document.createElement("td")
    dogBreedEntry.innerText = dogBreed

    //edit dog button
    let editDogButtonContainer = document.createElement("td")
    let editDogButton = document.createElement("button")
    editDogButton.id = dog.id 
    editDogButton.addEventListener("click", populateDogForm)
    editDogButton.innerText="Edit Dog"
    editDogButtonContainer.appendChild(editDogButton)
    
    dogRowEntry.append(dogNameEntry,dogBreedEntry,dogSexEntry,editDogButtonContainer)
    getTable().appendChild(dogRowEntry)
}

function populateDogForm(event){
    let dogId = event.target.id 
    let dogRow = document.getElementById(`row-${dogId}`)
    getDogForm().children[0].value = dogRow.children[0].innerText
    getDogForm().children[1].value = dogRow.children[1].innerText
    getDogForm().children[2].value = dogRow.children[2].innerText
    currentDog = dogId
}
////event.target.id 
/// functions that return nodes ////

function getTable() {
    return document.querySelector('#table-body')
}

function getWholeTable() {
    return document.querySelector('table')
}
function getRow(dogId){
    let dogRow = document.createElement("tr")
    dogRow.id = `row-${dogId}` 
    return dogRow
}