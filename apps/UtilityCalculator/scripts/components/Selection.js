export const createSelection = (id, arr) => {
    const selection = document.createElement('select');
    selection.id = id;
    arr.forEach(el => {
        const option = document.createElement('option');
        option.value = el.value;
        option.innerText = el.name;
        selection.appendChild(option);
    });
    return selection;
}