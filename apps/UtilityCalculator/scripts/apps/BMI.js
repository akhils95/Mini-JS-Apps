import { spacer } from '../components/spacer.js';
import { createInput } from "../components/input.js";
import { createSelection } from "../components/Selection.js";

const inputs = [
    {name: 'Metric', value: 'm'},
    {name: 'Imperial', value: 'i'}
];

let inputSystem = 'm';

const changeInputType = (e) => {
    inputSystem = e.target.options[e.target.selectedIndex].value;
    if(inputSystem === 'i') {
        const inputImperial = document.createElement('div');
        inputImperial.id="imp";
        inputImperial.classList.add('input-group');
        const feet = createInput('feet', 'number', false);
        feet.placeholder = 'Feet';
        const inches = createInput('inches', 'number', false);
        inches.placeholder ='Inches';
        inputImperial.appendChild(feet);
        inputImperial.appendChild(inches);
        document.getElementById('cm').replaceWith(inputImperial);
        document.getElementById('weight').placeholder = 'Pounds';
    } else {
        const height = createInput('cm', 'number', false);
        height.placeholder = "Centimeters";
        document.getElementById('imp').replaceWith(height);
        document.getElementById('weight').placeholder = 'Kilograms';
    }
}

const calculateBmi = (system) => {
    let weight = document.getElementById('weight').value;
    let height;
    let bmi;
    if (system === 'm') {
        height = document.getElementById('cm').value;
    } else {
        const feet = document.getElementById('feet').value;
        const inches = document.getElementById('inches').value;
        weight = weight * 0.453592;
        height = ( ( feet * 12 ) + ( inches * 1 ) ) * 2.54;
    }
    bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
    document.getElementById('bmi').value = bmi;
}

export const createBMICalculator = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('inner-wrapper');
    const heading = document.createElement('h1');
    heading.innerText = 'BMI Calculator';
    const weight = createInput('weight', 'number', false);
    weight.placeholder = "Kilograms";
    const height = createInput('cm', 'number', false);
    height.placeholder = "Centimeters";
    const inputType = createSelection('input', inputs);
    const output = createInput('bmi', 'number', true);
    const calculate = document.createElement('button');
    calculate.innerText = "Calculate";

    wrapper.appendChild(heading);
    wrapper.appendChild(weight);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(height);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(inputType);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(output);
    wrapper.appendChild(calculate);

    inputType.addEventListener('change', e => changeInputType(e));
    calculate.addEventListener('click', () => calculateBmi(inputType.value));

    return wrapper;
}