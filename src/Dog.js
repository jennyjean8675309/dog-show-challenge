class Dog {
    constructor({id, name, breed, sex}) {
        this.id = id
        this.name = name
        this.breed = breed
        this.sex = sex
    }

    static fetchDogs() {
        fetch(DOGS_URL)
        .then(response => response.json())
        .then(dogs => dogs.forEach(dog => {
            let newDog = new Dog(dog)
            newDog.renderDog()
        }))
    }

    static updateDog(e) {
        e.preventDefault()
        
        let dogName = e.target.children[0].value
        let dogBreed = e.target.children[1].value
        let dogSex = e.target.children[2].value

        let updatedDog = {
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        }
        
        let dogId = e.target.dataset.currentDogId
        
        fetch(`${DOGS_URL}/${dogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(updatedDog)
        }).then(response => response.json())
        .then(updatedDog => Dog.showUpdatedDog(updatedDog))
    }

    static showUpdatedDog(dog) {
        let dogRow = document.querySelector(`[data-id='${dog.id}']`)
        dogRow.children[0].innerText = dog.name
        dogRow.children[1].innerText = dog.breed
        dogRow.children[2].innerText = dog.sex
    }

    renderDog() {
        let dogRow = document.createElement('tr')
        dogRow.dataset.id = this.id

        let dogName = document.createElement('td')
        dogName.innerText = this.name
        let dogBreed = document.createElement('td')
        dogBreed.innerText = this.breed
        let dogSex = document.createElement('td')
        dogSex.innerText = this.sex
        let dogButtonCell = document.createElement('td')
        let editButton = document.createElement('button')
        editButton.innerText = 'Edit'
        editButton.addEventListener('click', () => this.showDogInForm(this))
        dogButtonCell.appendChild(editButton)

        getTable().append(dogRow)
        dogRow.append(dogName, dogBreed, dogSex, dogButtonCell)
    }

    showDogInForm(dog) {
        console.log('editing this dog...', dog)
        let nameInput = getDogForm().children[0]
        nameInput.value = dog.name
        let breedInput = getDogForm().children[1]
        breedInput.value = dog.breed
        let sexInput = getDogForm().children[2]
        sexInput.value = dog.sex
        getDogForm().dataset.currentDogId = dog.id
    }
}