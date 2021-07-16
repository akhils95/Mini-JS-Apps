import { createInput } from "../components/input.js";
import { createSelection } from "../components/Selection.js";

const inputs =[
    {name: 'Byte', value: 'B'},
    {name: 'Kilobyte', value: 'KB'},
    {name: 'Megabyte', value: 'MB'},
    {name: 'Gigabyte', value: 'GB'},
    {name: 'Terabyte', value: 'TB'},
    {name: 'Petabyte', value: 'PB'}
];

const b = 1;
const kb = 2;
const mb = 3;
const gb = 4;
const tb = 5;
const pb = 6;

const takeInput = (i, o, val) => {
    switch(i) {
        case 'B':
            return compareOutput(b, o, val);
        case 'KB':
            return compareOutput(kb, o, val);
        case 'MB':
            return compareOutput(mb, o, val);
        case 'GB':
            return compareOutput(gb, o, val);
        case 'TB':
            return compareOutput(tb, o, val);
        case 'PB':
            return compareOutput(pb, o, val);
    }
}

const compareOutput = (i, o, val) => {
    switch(o) {
        case 'B':
            return convert(i, b, val);
        case 'KB':
            return convert(i, kb, val);
        case 'MB':
            return convert(i, mb, val);
        case 'GB':
            return convert(i, gb, val);
        case 'TB':
            return convert(i, tb, val);
        case 'PB':
            return convert(i, pb, val);
    }
}

const convert = (i, o, val) => {
    if(o-i === 0) {
        return val;
    } else {
        return (val*Math.pow(1024, i-o)).toFixed(15).replace(/\.?0+$/,"");
    }
}

export const createDataConvertor = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('inner-wrapper');
    const heading = document.createElement('h1');
    heading.innerText = 'Data Convertor';
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
        outputValue.value = takeInput(inputType.value, outputType.value, inputValue.value);
    });
    wrapper.appendChild(heading);
    wrapper.appendChild(inputValue);
    wrapper.appendChild(selectWrap);
    wrapper.appendChild(outputValue);
    wrapper.appendChild(convertBtn);
    return wrapper;
}