import { loadMenu } from "./apps/Home.js";
import { createDataConvertor } from "./apps/Data.js";
import { createBMICalculator } from "./apps/BMI.js";
import { createDiscountCalculator } from "./apps/Discount.js";
import { createTempConvertor } from "./apps/Temperature.js";
import { backBtn } from "./components/backBtn.js";

const sample = document.createElement('div');
sample.classList.add('inner-wrapper');
sample.innerText = "Will work on that";

const changeRoute = (route) => {
    cleanSpace();
    switch(route) {
        case 'Data':
            populateApp(createDataConvertor());
        break;
        case 'BMI':
            populateApp(createBMICalculator());
        break;
        case 'Age':
            populateApp(sample);
        break;
        case 'Discount':
            populateApp(createDiscountCalculator());
        break;
        case 'Date':
            populateApp(sample);
        break;
        case 'Length':
            populateApp(sample);
        break;
        case 'Area':
            populateApp(sample);
        break;
        case 'Volume':
            populateApp(sample);
        break;
        case 'Temperature':
            populateApp(createTempConvertor());
        break;
        case 'Speed':
            populateApp(sample);
        break;
        case 'Time':
            populateApp(sample);
        break;
        case 'Mass':
            populateApp(sample);
        break;
        case 'Numerical':
            populateApp(sample);
        break;
        default:         
            loadMenu();
            document.querySelectorAll('.app-icon').forEach(el => {
                el.addEventListener('click', () => {
                    changeRoute(el.id.toString());
                })
            })
        break;
    }
}

const populateApp = (app) => {
    const appPg = document.createElement('div');
    appPg.classList.add('app');
    appPg.id='app';
    const homeBtn = backBtn();
    homeBtn.addEventListener('click', () => changeRoute('Home'));
    appPg.appendChild(homeBtn);
    appPg.appendChild(app);
    document.body.appendChild(appPg);
}

const cleanSpace = () => {
    document.body.innerHTML = '';
}

changeRoute('Home');