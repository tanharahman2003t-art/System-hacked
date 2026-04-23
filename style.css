body, html {
    margin: 0; padding: 0; width: 100%; height: 100%;
    background-color: black; color: #ff0000;
    font-family: 'Courier New', Courier, monospace;
    overflow: hidden;
}

#matrix-canvas { position: absolute; top: 0; left: 0; z-index: 1; opacity: 0.3; }

#overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.98); z-index: 100;
    display: flex; justify-content: center; align-items: center; cursor: pointer;
}

.launch-btn {
    border: 2px solid #ff0000; padding: 20px; font-size: 1.2rem;
    box-shadow: 0 0 20px #ff0000; animation: pulse 1s infinite alternate;
}

@keyframes pulse { from { opacity: 1; } to { opacity: 0.4; } }

#main-ui {
    position: relative; z-index: 10; display: none;
    flex-direction: column; justify-content: center; align-items: center; height: 100vh;
}

/* Screen Shake Effect */
.shake { animation: shake 0.1s infinite; }
@keyframes shake {
    0% { transform: translate(1px, 1px); }
    50% { transform: translate(-2px, -1px); }
    100% { transform: translate(1px, 1px); }
}

.warning-header { font-size: 1.5rem; font-weight: bold; text-shadow: 0 0 10px red; }

#countdown {
    font-size: 5rem; border: 3px solid red; padding: 10px 30px;
    margin: 15px; background: rgba(255, 0, 0, 0.1);
}

.status-box {
    text-align: left; width: 85%; max-width: 450px;
    background: rgba(0,0,0,0.85); border-left: 3px solid red; padding: 15px; font-size: 0.8rem;
}

.status { color: #00ff00; font-weight: bold; float: right; }
.footer-msg { margin-top: 20px; font-size: 0.7rem; letter-spacing: 1px; color: gray; }
