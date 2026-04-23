const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0"; // Matrix Green
    ctx.font = fontSize + "px arial";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

function initiateHack() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('main-ui').style.display = 'flex';
    
    // Request Fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    // Start Matrix Background
    setInterval(drawMatrix, 33);

    // Vibration (if mobile)
    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 300]);

    // Timer Logic
    let timeLeft = 60;
    const timerElem = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("TOTAL SYSTEM OVERRIDE COMPLETE. DATA DELETED.");
            window.location.reload();
        }
    }, 1000);
}

// Disable Back Button / Exit
window.onbeforeunload = function() {
    return "Malware detected! Leaving will crash your Android OS.";
};
