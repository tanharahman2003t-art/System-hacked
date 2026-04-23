const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const alarm = document.getElementById('alarm');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01010182739475647382910010101";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
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
    
    // Play Alarm
    alarm.play();
    
    // Fullscreen
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();

    // Detect Device Name
    const modelText = document.getElementById('model');
    const ua = navigator.userAgent;
    if (ua.indexOf("Android") > -1) modelText.innerText = "ANDROID_OS_MOBILE";
    else if (ua.indexOf("iPhone") > -1) modelText.innerText = "IPHONE_APPLE_OS";
    else modelText.innerText = "WINDOWS_PC_USER";

    setInterval(drawMatrix, 40);

    let timeLeft = 60;
    const timerElem = document.getElementById('countdown');
    const mainUI = document.getElementById('main-ui');

    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;

        // Start Shaking and Vibration when 10 seconds left
        if (timeLeft <= 10) {
            mainUI.classList.add('shake');
            if (navigator.vibrate) navigator.vibrate(200);
        }

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("FATAL ERROR: OS DESTROYED.");
            window.location.reload();
        }
    }, 1000);
}

// Block Exit
window.onbeforeunload = () => "CRITICAL: Wiping data in progress!";
