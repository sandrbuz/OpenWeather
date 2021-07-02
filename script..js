let btnGet = document.querySelector('.btn');
let btnFahr = document.querySelector('.fahr');
let btnCels = document.querySelector('.cels');



const getWeather = (cityName) => {
    if (cityName) {


        document.querySelector('.filter').style.display = 'block';
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=655fdcf1aed1280abf8e870e95b28149`)

            .then(resp => resp.json())
            .then(data => {
                console.log(data);



                document.querySelector('.city-name-error').textContent = '';

                // document.querySelector('.filter').style.display = 'none';


                document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like - 273) + '&#8451;';
                document.querySelector('.wind-value').innerHTML = data.wind.speed + ' m/s';
                document.querySelector('.hum-value').innerHTML = data.main.humidity + '%';
                document.querySelector('.press-value').innerHTML = data.main.pressure + ' hPa';

                document.querySelector('.city').textContent = data.name;
                document.querySelector('.country').textContent = data.sys.country;
                document.querySelector('.weather').textContent = data.weather[0]['description'];

                if (cityName.length > 13) {
                    document.querySelector('.city').style.fontSize = '30px';
                    document.querySelector('.city').style.marginTop = '30px';
                } else {
                    document.querySelector('.city').style.fontSize = '60px';
                    document.querySelector('.city').style.marginTop = '0px';

                }

                let val = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
                $('#icon').attr('src', val);


                btnCels.disabled = true;
                btnFahr.disabled = false;

                btnFahr.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&#8457;';
                    btnFahr.disabled = true;
                    btnCels.disabled = false;
                    document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like) + '&#8451;';

                });
                btnCels.addEventListener('click', function () {
                    document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&#8451;';
                    btnCels.disabled = true;
                    btnFahr.disabled = false;
                    document.querySelector('.feel-value').innerHTML = Math.round(data.main.feels_like - 273) + '&#8451;';



                });


                // if (window.innerWidth < 650) {

                //     if (cityName.length < 10) {
                //         document.querySelector('.city').style.paddingTop = '30px';

                //     }

                // }
                // else {


                //     document.querySelector('.city').style.color = 'red';



                // }




            })
            .catch(function () {

                document.querySelector('.city-name-error').textContent = 'Not found';

            })
    }
    else {
        document.querySelector('.city-name-error').textContent = 'Bad request';

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


