let btnGet = document.querySelector('.btn');


const getWeather = (cityName) => {
    if (cityName) {

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)
            .then(resp => resp.json())
            .then(data => {

            })
            .catch(function () {

            })
    }
    else {

    }
}

// default city
getWeather('Moscow');

// On btnGet
let userInput = document.querySelector('.inp');
btnGet.addEventListener('click', function () {
    const cityName = userInput.value;
    getWeather(cityName)

})


// on key Press (Enter)
userInput.onkeypress = function (event) {

    if (event.key == 'Enter') {
        const cityName = userInput.value;
        getWeather(cityName)
    }
}