const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const alarm = document.getElementById('alarm');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fixed: Shudhu 01 na, ekhon real hacker characters thakbe
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*<>?/[]{}+-";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0"; // Matrix Green
    ctx.font = fontSize + "px 'Courier New'";
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

function initiateHack() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('main-ui').style.display = 'flex';
    
    // SOUND FIX: Alarm play kora
    alarm.muted = false; // Unmute force
    alarm.play().catch(e => console.log("Sound error: ", e));
    
    // VIBRATION FIX: Intense Pulse Pattern
    if (navigator.vibrate) {
        // Phone-ke jore vibrate koranor jonno loop logic
        const vibratePattern = () => {
            navigator.vibrate([2000, 500, 2000, 500, 2000]);
        };
        vibratePattern(); // Initial trigger
        setInterval(vibratePattern, 5000); // Repeat every 5 seconds
    }
    
    // Fullscreen trigger
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();

    const modelText = document.getElementById('model');
    const ua = navigator.userAgent;
    modelText.innerText = ua.indexOf("Android") > -1 ? "ANDROID_TARGET_DEVICE" : "IPHONE_TARGET_OS";

    setInterval(drawMatrix, 40);

    let timeLeft = 60;
    const timerElem = document.getElementById('countdown');
    const fbBar = document.getElementById('fb-bar'), igBar = document.getElementById('ig-bar');
    const fbStatus = document.getElementById('fb-status'), igStatus = document.getElementById('ig-status');

    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;

        // FB & IG Loading Logic
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

        // Final Panic Shake
        if (timeLeft <= 15) document.body.classList.add('shake');

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            alert("SYSTEM OVERRIDE SUCCESSFUL. ALL FILES ENCRYPTED.");
            window.location.reload();
        }
    }, 1000);
}
