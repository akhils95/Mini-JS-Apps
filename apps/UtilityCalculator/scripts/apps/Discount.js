import { createInput } from "../components/input.js";
import { spacer } from "../components/spacer.js";

const calculate = (discount, amount) => {
    let save, payAmount;
    save = 'You Save ' + (discount * amount / 100);
    payAmount = 'You Pay ' + (amount - (discount * amount / 100));
    return [payAmount, save];
}

export const createDiscountCalculator = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('inner-wrapper');
    const heading = document.createElement('h1');
    heading.innerText = 'Discount Calculator';
    const inputValue = createInput('dataIn', 'number', false);
    inputValue.placeholder = "Enter the amout";
    const inputDiscount = createInput('discount', 'number', false);
    inputDiscount.placeholder = "Enter the discount percentage";
    const outputValue = createInput('dataOut', 'text', true);
    const outputDiscount = createInput('discountAmount', 'text', true);
    const convertBtn = document.createElement('button');
    convertBtn.innerText = 'Convert';
    convertBtn.addEventListener('click', () => {
        outputValue.value = calculate(inputDiscount.value, inputValue.value)[0];
        outputDiscount.value = calculate(inputDiscount.value, inputValue.value)[1];
    });
    wrapper.appendChild(heading);
    wrapper.appendChild(inputValue);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(inputDiscount);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(outputValue);
    wrapper.appendChild(spacer(25));
    wrapper.appendChild(outputDiscount);
    wrapper.appendChild(convertBtn);
    return wrapper;
}