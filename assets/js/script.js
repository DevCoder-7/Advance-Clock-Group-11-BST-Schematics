document.addEventListener('DOMContentLoaded', () => {
    const clockSection = document.getElementById('clock-section');
    const timerSection = document.getElementById('timer-section');
    const stopwatchSection = document.getElementById('stopwatch-section');

    document.getElementById('clock-menu').addEventListener('click', () => {
        clockSection.style.display = 'block';
        timerSection.style.display = 'none';
        stopwatchSection.style.display = 'none';
    });

    document.getElementById('timer-menu').addEventListener('click', () => {
        clockSection.style.display = 'none';
        timerSection.style.display = 'block';
        stopwatchSection.style.display = 'none';
    });

    document.getElementById('stopwatch-menu').addEventListener('click', () => {
        clockSection.style.display = 'none';
        timerSection.style.display = 'none';
        stopwatchSection.style.display = 'block';
    });

    // Initialize default section
    clockSection.style.display = 'block';

    // Real-Time Clock
    const clockElement = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Timer
    let timerInterval;
    const timerDisplay = document.getElementById('timer-display');
    const startTimerButton = document.getElementById('start-timer');
    const stopTimerButton = document.getElementById('stop-timer');
    const resetTimerButton = document.getElementById('reset-timer');
    const audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');

    function resetTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00:00';
        document.getElementById('hours').value = 0;
        document.getElementById('minutes').value = 0;
        document.getElementById('seconds').value = 0;
    }

    startTimerButton.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value, 10);
        const minutes = parseInt(document.getElementById('minutes').value, 10);
        const seconds = parseInt(document.getElementById('seconds').value, 10);
        let totalTime = (hours * 3600) + (minutes * 60) + seconds;

        if (isNaN(totalTime) || totalTime <= 0) {
            alert('Please enter a valid time.');
            return;
        }

        timerInterval = setInterval(() => {
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                audio.play();
                alert('Time\'s up!');
            } else {
                totalTime--;
                const hrs = Math.floor(totalTime / 3600);
                const mins = Math.floor((totalTime % 3600) / 60);
                const secs = totalTime % 60;
                timerDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    });

    stopTimerButton.addEventListener('click', () => {
        clearInterval(timerInterval);
    });

    resetTimerButton.addEventListener('click', () => {
        resetTimer();
    });

    // Stopwatch
    let stopwatchInterval;
    let elapsedTime = 0;
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const startStopwatchButton = document.getElementById('start-stopwatch');
    const stopStopwatchButton = document.getElementById('stop-stopwatch');
    const resetStopwatchButton = document.getElementById('reset-stopwatch');
    const secondHand = document.getElementById('second-hand');

    startStopwatchButton.addEventListener('click', () => {
        stopwatchInterval = setInterval(() => {
            elapsedTime += 100;
            const seconds = (elapsedTime / 1000) % 60;
            const rotation = seconds * 6; // 360 degrees / 60 seconds = 6 degrees per second
            secondHand.style.transform = `rotate(${rotation}deg)`;
            const hours = Math.floor(elapsedTime / 3600000);
            const mins = Math.floor((elapsedTime % 3600000) / 60000);
            const secs = Math.floor((elapsedTime % 60000) / 1000);
            stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 100);
    });

    stopStopwatchButton.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
    });

    resetStopwatchButton.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        secondHand.style.transform = 'rotate(0deg)';
        stopwatchDisplay.textContent = '00:00:00';
    });

    // Dark Mode
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const modeIcon = document.getElementById('mode-icon');

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
        } else {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
        }
    });

    // Set to light mode
    document.body.classList.add('light-mode');
});
