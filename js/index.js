const cellSize = 50;

const draw = (image) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const height = image.height();
    const width = image.width();
    const cells = image.cells();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    debugger;
    // fill
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const idx = (y * width + x) * 3;
            const color = `rgb(${cells[idx + 0]},${cells[idx + 1]},${
                cells[idx + 2]
            })`;
            context.fillStyle = color;
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    for (let x = 0; x <= width; x++) {
        context.beginPath();
        context.moveTo(x * cellSize, 0);
        context.lineTo(x * cellSize, height * cellSize);
        context.stroke();
    }
    for (let y = 0; y <= height; y++) {
        context.beginPath();
        context.moveTo(0, y * cellSize);
        context.lineTo(width * cellSize, y * cellSize);
        context.stroke();
    }
};

const setupCanvas = (image) => {
    const canvas = document.getElementById('canvas');

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        x = Math.floor(x / cellSize);
        y = Math.floor(y / cellSize);
        image.brush(x, y, [200, 255, 200]);
        draw(image);
    });
};

async function main() {
    const lib = await import('../pkg/index.js').catch(console.error);
    const { Image } = lib;
    const image = new Image(10, 10);
    setupCanvas(image);
    draw(image);
}

main();
