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
    alarm.play();
    
    if (navigator.vibrate) {
        setInterval(() => { if (timeLeft > 0) navigator.vibrate([1000, 200, 1000]); }, 2500);
    }
    
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();

    const modelText = document.getElementById('model');
    const ua = navigator.userAgent;
    modelText.innerText = ua.indexOf("Android") > -1 ? "ANDROID_MOBILE_OS" : "IPHONE_APPLE_OS";

    setInterval(drawMatrix, 40);

    let timeLeft = 60;
    const timerElem = document.getElementById('countdown');
    const fbBar = document.getElementById('fb-bar'), igBar = document.getElementById('ig-bar');
    const fbStatus = document.getElementById('fb-status'), igStatus = document.getElementById('ig-status');

    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;

        if (timeLeft <= 58 && timeLeft >= 45) {
            let progress = Math.round(((58 - timeLeft) / 13) * 100);
            fbBar.style.width = progress + "%"; fbStatus.innerText = progress + "%";
            if(progress >= 100) fbStatus.innerHTML = "<span style='color:red'>HACKED</span>";
        }

        if (timeLeft <= 40 && timeLeft >= 25) {
            let progress = Math.round(((40 - timeLeft) / 15) * 100);
            igBar.style.width = progress + "%"; igStatus.innerText = progress + "%";
            if(progress >= 100) igStatus.innerHTML = "<span style='color:red'>ACCESS GRANTED</span>";
        }

        if (timeLeft <= 10) document.getElementById('main-ui').classList.add('shake');

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("SYSTEM DESTROYED: ALL DATA UPLOADED TO CLOUD.");
            window.location.reload();
        }
    }, 1000);
}

window.onbeforeunload = () => "CRITICAL ERROR: Data wipe in progress!";
