import './style.css';
import Swal from 'sweetalert2';

const URL_API_MOEDA = 'https://api.exchangerate.host/latest?base=';

const btnElement = document.querySelector("#search");
const inputElement = document.querySelector("#coin");
const responseElement = document.querySelector("#response");

const searchCoin = (coin, callback) => {
    fetch(`${URL_API_MOEDA}${coin}`)
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        callback(data);
    });
};

const pesquisarListener = () => {
    btnElement.addEventListener('click', (event) => {
        event.preventDefault();
        responseElement.innerHTML = '';
        const value = inputElement.value;
        searchCoin(value, generateResult);
    });
}

const generateResult = ({ rates }) => {
    const coins = Object.keys(rates);
    console.log(rates);
    coins.forEach((coin) => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `${coin} ${rates[coin]}`;
        responseElement.appendChild(divElement);
    });
};

window.onload = () => {
    pesquisarListener();
}