document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const clockSection = document.getElementById('clock-section');
    const timerSection = document.getElementById('timer-section');
    const stopwatchSection = document.getElementById('stopwatch-section');
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const timezoneDisplay = document.getElementById('timezone-display');
    const timerDisplay = document.getElementById('timer-display');
    const audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const secondHand = document.getElementById('second-hand');
    const modeIcon = document.getElementById('mode-icon');
    
    // Menu Navigation
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
    const timezones = ['WIB', 'WITA', 'WIT'];
    let currentZoneIndex = 0;

    function updateClock() {
        const now = new Date();
        let offset;

        // Set offset based on selected timezone
        switch(timezones[currentZoneIndex]) {
            case 'WITA':
                offset = 8; // UTC+8
                break;
            case 'WIT':
                offset = 9; // UTC+9
                break;
            case 'WIB':
            default:
                offset = 7; // UTC+7
                break;
        }

        const localTime = new Date(now.getTime() + (offset * 60 * 60 * 1000));
        const dateString = localTime.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeString = localTime.toLocaleTimeString('en-GB', { hour12: false });

        dateElement.textContent = dateString;
        clockElement.textContent = timeString;
        timezoneDisplay.textContent = timezones[currentZoneIndex];
    }

    // Change timezone with arrow buttons
    document.getElementById('prev-timezone').addEventListener('click', () => {
        currentZoneIndex = (currentZoneIndex - 1 + timezones.length) % timezones.length;
        updateClock();
    });

    document.getElementById('next-timezone').addEventListener('click', () => {
        currentZoneIndex = (currentZoneIndex + 1) % timezones.length;
        updateClock();
    });

    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock();

    // Timer
    let timerInterval;

    const startTimer = () => {
        const hours = parseInt(document.getElementById('hours').value, 10) || 0;
        const minutes = parseInt(document.getElementById('minutes').value, 10) || 0;
        const seconds = parseInt(document.getElementById('seconds').value, 10) || 0;
        let totalTime = (hours * 3600) + (minutes * 60) + seconds;

        if (totalTime <= 0) {
            alert('Please enter a valid time.');
            return;
        }

        timerInterval = setInterval(() => {
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                audio.play();
                alert("Time's up!");
            } else {
                totalTime--;
                const hrs = Math.floor(totalTime / 3600);
                const mins = Math.floor((totalTime % 3600) / 60);
                const secs = totalTime % 60;
                timerDisplay.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    };

    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('stop-timer').addEventListener('click', () => clearInterval(timerInterval));
    document.getElementById('reset-timer').addEventListener('click', () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00:00';
        ['hours', 'minutes', 'seconds'].forEach(id => document.getElementById(id).value = 0);
    });

    // Stopwatch
    let stopwatchInterval, elapsedTime = 0;

    const startStopwatch = () => {
        stopwatchInterval = setInterval(() => {
            elapsedTime += 100;
            const seconds = (elapsedTime / 1000) % 60;
            secondHand.style.transform = `rotate(${seconds * 6}deg)`; // 6 degrees per second
            const hours = Math.floor(elapsedTime / 3600000);
            const mins = Math.floor((elapsedTime % 3600000) / 60000);
            const secs = Math.floor((elapsedTime % 60000) / 1000);
            stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 100);
    };

    document.getElementById('start-stopwatch').addEventListener('click', startStopwatch);
    document.getElementById('stop-stopwatch').addEventListener('click', () => clearInterval(stopwatchInterval));
    document.getElementById('reset-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        secondHand.style.transform = 'rotate(0deg)';
        stopwatchDisplay.textContent = '00:00:00';
    });

    // Dark Mode Toggle
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        modeIcon.classList.toggle('fa-moon', !document.body.classList.contains('dark-mode'));
        modeIcon.classList.toggle('fa-sun', document.body.classList.contains('dark-mode'));
    };

    document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

    // Default mode
    document.body.classList.add('light-mode');
});
