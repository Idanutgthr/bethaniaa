// Global variables
let currentScreen = 'screen1';
const audio = document.getElementById('global-audio');

// Function to load screens
function loadScreen(screenName) {
    const screenContainer = document.getElementById('screen-container');
    
    // Add fade out effect
    screenContainer.classList.add('fade-out');
    
    setTimeout(() => {
        // Load screen HTML
        fetch(`${screenName}.html`)
            .then(response => response.text())
            .then(html => {
                screenContainer.innerHTML = html;
                screenContainer.classList.remove('fade-out');
                screenContainer.classList.add('fade-in');
                
                // Load screen CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `css/${screenName}.css`;
                document.head.appendChild(link);
                
                // Load screen JS
                const script = document.createElement('script');
                script.src = `js/${screenName}.js`;
                script.onload = () => {
                    // Initialize screen
                    if (window.initScreen) window.initScreen();
                };
                document.body.appendChild(script);
                
                currentScreen = screenName;
                
                // Start music on screen 3
                if (screenName === 'screen3') {
                    playMusic();
                } else if (screenName === 'screen4') {
                    fadeOutMusic();
                }
            })
            .catch(error => {
                console.error('Error loading screen:', error);
            });
    }, 400);
    window.location.href = `${screenName}.html`;
}

// Audio functions
function playMusic() {
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Autoplay blocked"));
}

function fadeOutMusic() {
    const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            audio.pause();
            clearInterval(fadeOutInterval);
        }
    }, 200);
}

// Function to go to next screen
function goToNextScreen(nextScreen) {
    // Sembunyikan screen sekarang
    const currentScreen = document.querySelector('.screen');
    currentScreen.style.animation = 'fadeOut 0.8s ease-out forwards';
    
    setTimeout(() => {
        // Hapus screen lama
        currentScreen.remove();
        
        // Load screen baru
        loadScreen(nextScreen);
    }, 800);
}

// Add CSS for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Export functions globally
window.loadScreen = loadScreen;
window.goToNextScreen = goToNextScreen;
window.playMusic = playMusic;
window.fadeOutMusic = fadeOutMusic;