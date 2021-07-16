export const createInput = (id, type, isDisabled) => {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.disabled = isDisabled;
    return input;
}