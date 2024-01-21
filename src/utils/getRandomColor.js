const MAX_BIT_VALUE = 256;

function getRandomColor() {
    const red = Math.floor(Math.random() * MAX_BIT_VALUE);
    const green = Math.floor(Math.random() * MAX_BIT_VALUE);
    const blue = Math.floor(Math.random() * MAX_BIT_VALUE);
    return `rgb(${red}, ${green}, ${blue})`;
}

export default getRandomColor;
