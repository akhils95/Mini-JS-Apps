const inputCode = document.getElementById('original_color_value');
const outputCode = document.getElementById('inverted_color_value');
const inputColor = document.getElementById('original_color');
const outputColor = document.getElementById('inverted_color');

let input = '';
let outHex = '';
let hex = '';

const checkInput = (e) => {
    if (e === '1' || e === '2' || e === '3' || e === '4' || e === '5' || e === '6' || e === '7' || e === '8' || e === '9' || e === '0' || e === 'a' || e === 'b' || e === 'c' || e === 'd' || e === 'e' || e === 'f' || e === 'A' || e === 'B' || e === 'C' || e === 'D' || e === 'E' || e === 'F') {
        if (input.length < 6) {
            input = input + e;
            if (input.length === 3) {
                hex = input[0] + input[0] + input[1] + input[1] + input[2] + input[2];
            }
            if (input.length === 6) {
                hex = input;
            }
        }
        
    }
    inputCode.innerText = input;
    if (hex.length === 3 || hex.length === 6) {
        outHex = invertColor(hex);
        outputCode.innerText = outHex;
        setBackground();
        outputColor.style.color = invertColorBW(outHex);
        inputColor.style.color = invertColorBW(hex);
    }
}

const invertColor = (h) => {
    let r = (255 - parseInt(h.slice(0, 2), 16)).toString(16);
    let g = (255 - parseInt(h.slice(2, 4), 16)).toString(16);
    let b = (255 - parseInt(h.slice(4, 6), 16)).toString(16);

    return r.padStart(2, '0') + b.padStart(2, '0') + g.padStart(2, '0');
}

const invertColorBW = (h) => {
    let r = parseInt(h.slice(0, 2), 16);
    let g = parseInt(h.slice(2, 4), 16);
    let b = parseInt(h.slice(4, 6), 16);

    return ((r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#ffffff');
}

const setBackground = () => {
    inputColor.style.background = '#'+hex;
    outputColor.style.background = '#'+outHex;
}

window.addEventListener('keyup', e => checkInput(e.key));
window.addEventListener('keydown', e => {
    if(e.key === 'Backspace') {
        input = input.slice(0, -1);
    }
})