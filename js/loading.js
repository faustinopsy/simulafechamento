const canvas = document.getElementById("loading");
const ctx = canvas.getContext("2d");
let animationFrame;
let isLoading = false;

canvas.width = 300;
canvas.height = 150;

const loading = [
    { x: 50, y: 75 },
    { x: 100, y: 50 },
    { x: 150, y: 75 },
    { x: 200, y: 100 },
    { x: 250, y: 75 },
    { x: 200, y: 50 },
    { x: 150, y: 25 },
    { x: 100, y: 50 },
    { x: 50, y: 75 },
];

function drawSignature(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.beginPath();

    for (let i = 0; i < loading.length; i++) {
        const { x, y } = loading[i];
        const nextPoint = loading[i + 1];
        if (!nextPoint) break;

        const progressX = x + (nextPoint.x - x) * progress;
        const progressY = y + (nextPoint.y - y) * progress;

        if (i === 0) {
            ctx.moveTo(progressX, progressY);
        } else {
            ctx.lineTo(progressX, progressY);
        }
    }

    ctx.stroke();
}

function loop() {
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / 1000;
        const normalizedProgress = Math.abs(Math.sin(progress * Math.PI));

        drawSignature(normalizedProgress);

        if (isLoading) {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    animationFrame = requestAnimationFrame(animate);
}

// Start Loading
document.getElementById("start-button").addEventListener("click", () => {
    if (isLoading) return;
    isLoading = true;
    loop();
    document.getElementById("stop-button").disabled = false;
    document.getElementById("start-button").disabled = true;
});

// Stop Loading
document.getElementById("stop-button").addEventListener("click", () => {
    isLoading = false;
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("stop-button").disabled = true;
    document.getElementById("start-button").disabled = false;
});
