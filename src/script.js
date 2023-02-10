import './style.css';
import Swal from 'sweetalert2';
/* Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  }) */

const URL_API_MOEDA = 'https://api.exchangerate.host/latest?base=';

const btnElement = document.querySelector("#search");
const inputElement = document.querySelector("#coin");
const responseElement = document.querySelector("#response");

const searchCoin = (callback) => {
    const coinSelected = inputElement.value;
    fetch(`${URL_API_MOEDA}${coinSelected}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            callback(data);
        })
};

const getDefault = () => {
    const coinSelected = inputElement.value;
    return fetch(`${URL_API_MOEDA}${coinSelected}`)
        .then((response) => response.json())
        .then((data) => data);
};

const validatorKey = (valor) => {
    return getDefault().then((dados) => {
        const k = Object.keys(dados.rates);
        return k.some((b) => b === valor)
    });
};

const pesquisarListener = () => {
    btnElement.addEventListener('click', (event) => {
        event.preventDefault();
        responseElement.innerHTML = '';
        const value = inputElement.value;
        if (value === ''){
            Swal.fire({
                title: 'Ops ...',
                text: 'Você precisa passar uma moeda',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } 
        if (validatorKey(value) === false){
            Swal.fire({
                title: 'Ops ...',
                text: 'Moeda não existente!',
                icon: 'error',
                confirmButtonText: 'OK'
            }) 
        } 
        if (validatorKey(value) === true) {
            searchCoin(generateResult);
        }

            
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