const weatherForm = document.querySelector('form')
const placetofind = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const search = placetofind.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '~'

    fetch('http://localhost:3000/weather?address=' + search).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            console.log(data.error)
        } else {
            messageOne.textContent = data.location
            console.log(data.location)
            messageTwo.textContent = data.weather
            console.log(data.weather)
        }
    })
})
})