console.log('Client side javascript file is loaded!');

// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/chicago.json?access_token=pk.eyJ1IjoidmVudHVyaWEiLCJhIjoiY2t5aXRnYXJvMjF3NzJudXIzcDlodXZ6ZSJ9.9reMi6NCNltziA96iycByQ&limit=1')
// .then(response => {
//     response.json().then(data => {
//         const latitude = data['features'][0]['center'][1]
//         const longitude = data['features'][0]['center'][0]
//         fetch(`http://api.weatherstack.com/current?access_key=816c3862a5dc732a22794039e7672d34&query=${latitude},${longitude}`)
//         .then(response => {
//             response.json().then(data => {
//                 console.log(data);
//                 const location = data['location']['name']
//                 const description = data['current']['weather_descriptions'][0]
//                 const temperature = data['current']['temperature']
//                 const feelslike = data['current']['feelslike']
//                 console.log(`The weather in ${location} is ${description}. The temperature is about ${temperature} degrees and it feels like ${feelslike}`);
//             })
//         })
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                console.log(data.location);
                messageOne.textContent = data.location
                console.log(data.forecast);
                messageTwo.textContent = data.forecast
            }
        })
    })
})