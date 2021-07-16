import { spacer } from "../components/spacer.js";

const apps = ['Data', 'BMI', 'Age', 'Discount', 'Date', 'Length', 'Area', 'Volume', 'Temperature', 'Speed', 'Time', 'Mass', 'Numerical'];

const createAppIcon = (name) => {
    const appIcon = document.createElement('div');
    appIcon.classList.add('app-icon');
    appIcon.id = name;
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');
    const icon = document.createElement('img');
    icon.src = `images/icons/${name}.svg`;
    icon.alt = name;
    const appName = document.createElement('h1');
    appName.innerText = name;
    iconContainer.appendChild(icon);
    iconContainer.appendChild(appName);
    appIcon.appendChild(iconContainer);
    return appIcon;
}

export const loadMenu = () => {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    apps.forEach(app => {
        menu.appendChild(createAppIcon(app))
    })
    document.body.appendChild(spacer(50));
    document.body.appendChild(menu);
}