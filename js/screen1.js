document.addEventListener('DOMContentLoaded', function() {
    console.log('Screen 1 Initialized 🎉');
    
    // Elements
    const clickMeBtn = document.getElementById('clickMeBtn');
    const floatingEmojis = document.getElementById('floating-emojis');
    const clickSound = document.getElementById('clickSound');
    
    // Emoji list for floating animation
    const emojis = ['❤️', '💖', '💕', '😊', '😍', '🥰', '🌸', '🌺', '🌷', '💐', '🎀', '🧁', '🍰', '🎂', '🍭', '🍬', '🦋', '🐇', '🐰', '💝'];
    
    // Create floating emojis
    function createFloatingEmojis() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFloatingEmoji();
            }, i * 400);
        }
        
        // Continue creating emojis
        setInterval(createFloatingEmoji, 1000);
    }
    
    function createFloatingEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.fontSize = (Math.random() * 25 + 18) + 'px';
        
        // Random animation duration and delay
        const duration = Math.random() * 8 + 4;
        const delay = Math.random() * 2;
        
        emoji.style.animation = `floatUp ${duration}s linear ${delay}s forwards`;
        
        floatingEmojis.appendChild(emoji);
        
        // Remove emoji after animation completes
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Button click handler
    function handleButtonClick() {
        // Play click sound
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log('Sound play failed'));
        }
        
        // Add click effect
        clickMeBtn.style.animation = 'none';
        clickMeBtn.style.transform = 'scale(0.95)';
        
        // Create burst effect dengan warna palette
        createClickBurst();
        
        // Navigate to next screen after delay
        setTimeout(() => {
            window.location.href = 'screen2.html';
        }, 800);
    }
    
    // Create particle burst on click
    function createClickBurst() {
        const rect = clickMeBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const colors = ['#FEEAC9', '#FFCDC9', '#FDACAC', '#FD7979'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.innerHTML = '❤️';
            
            // Random position around button
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 40;
            
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
            particle.style.zIndex = '9999';
            particle.style.pointerEvents = 'none';
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                {
                    transform: `translate(0, 0) scale(1) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // Add CSS for burst particles
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
        .burst-particle {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            filter: drop-shadow(0 0 5px rgba(253, 121, 121, 0.5));
        }
    `;
    document.head.appendChild(burstStyle);
    
    // Initialize
    function init() {
        // Start floating emojis
        createFloatingEmojis();
        
        // Add event listeners
        clickMeBtn.addEventListener('click', handleButtonClick);
        
        // Add hover effect
        clickMeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        clickMeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Touch device support
        clickMeBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        clickMeBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
        });
        
        // REMOVED AUTO-CLICK TIMEOUT
        // Tidak ada timeout untuk auto-click
    }
    
    // Start everything
    init();
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            handleButtonClick();
        }
    });
});