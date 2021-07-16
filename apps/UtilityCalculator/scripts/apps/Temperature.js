import { createInput } from "../components/input.js";
import { createSelection } from "../components/Selection.js";

const inputs =[
    {name: 'Celcius', value: 'C'},
    {name: 'Fahrenheit', value: 'F'},
    {name: 'Kelvin', value: 'K'}
];

const toCelcius = (from, value) => {
    if(from === 'F') {
        return ((value - 32) * 5 / 9).toFixed(2).replace(/\.?0+$/,"");
    } else if (from === 'K') {
        return value - 273.15;
    }
}

const fromCelcius = (to, value) => {
    if(to === 'F') {
        return ((value * 9 / 5) + 32).toFixed(2).replace(/\.?0+$/,"");
    } else {
        return (value * 1) + 273.15;
    }
}

const convert = (typeIn, typeOut, value) => {
    if (typeIn === typeOut) {
        return value;
    } else if (typeIn !== 'C') {
        if (typeOut === 'C') return toCelcius(typeIn, value);
        else return fromCelcius(typeOut, toCelcius(typeIn, value));
    } else {
        return fromCelcius(typeOut, value);
    }
    
}


export const createTempConvertor = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('inner-wrapper');
    const heading = document.createElement('h1');
    heading.innerText = 'Temperature Convertor';
    const inputValue = createInput('dataIn', 'number', false);
    const selectWrap = document.createElement('div');
    selectWrap.classList.add('selection-wrapper');
    const inputType = createSelection('input', inputs);
    const to = document.createElement('h3');
    to.innerText = 'TO';
    const outputType = createSelection('output', inputs);
    selectWrap.appendChild(inputType);
    selectWrap.appendChild(to);
    selectWrap.appendChild(outputType);
    const outputValue = createInput('dataOut', 'number', true);
    const convertBtn = document.createElement('button');
    convertBtn.innerText = 'Convert';
    convertBtn.addEventListener('click', () => {
        outputValue.value = convert(inputType.value, outputType.value, inputValue.value);
    });
    wrapper.appendChild(heading);
    wrapper.appendChild(inputValue);
    wrapper.appendChild(selectWrap);
    wrapper.appendChild(outputValue);
    wrapper.appendChild(convertBtn);
    return wrapper;
}