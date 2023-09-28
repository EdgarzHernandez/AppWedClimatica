
// Seleccionamos los elementos del DOM que vamos a utilizar
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Agregamos un evento de clic al botón de búsqueda
search.addEventListener('click', () => {
    // Definimos la clave API y obtenemos el valor del campo de entrada
    const APIKey = 'c92c42141064788c934552d92560f27f';
    const city = document.querySelector('.search-box input').value;
     // Si el campo de entrada está vacío, no hacemos nada
    if (city === '')
        return;

     // Realizamos una solicitud a la API para obtener información sobre el clima de la ciudad ingresada
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=es`)
        .then(response => response.json())
        .then(json => {
           // Si la respuesta es un error 404, mostramos un mensaje de error
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            // Si no hay errores, ocultamos el mensaje de error
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            // Seleccionamos los elementos del DOM donde vamos a mostrar la información sobre el clima
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            // Dependiendo del clima, mostramos una imagen diferente
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                case 'Snowy':
                    image.src = 'img/snowy.png';
                    break;

                default:
                    image.src = '';
            }
            // Mostramos la información sobre el clima en los elementos seleccionados
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
             // Hacemos visibles los elementos donde se muestra la información sobre el clima
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.remove('fadeIn');
            weatherDetails.classList.remove('fadeIn');

            // Agregamos la clase 'fadeIn' para re iniciar la animación
           setTimeout(function() 
           {
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
           }, 10);

            container.style.height = '590px';


        });


});
