// Configuration untuk Screen 2
const SCREEN2_CONFIG = {
    chatFiles: [],
    currentChatIndex: 0,
    totalChats: 0,
    chatSound: null,
    isTransitioning: false,
    floatingEmojis: [],
    chatQueue: [],
    isChatCompleted: false,
    isCharactersInitialized: false // FLAG BARU: status karakter
};

// Initialize Screen 2
document.addEventListener('DOMContentLoaded', function() {
    console.log('Screen 2 Initialized 💬');
    
    // Elements
    const chatSound = document.getElementById('chatSound');
    const chatContainer = document.querySelector('.chat-container');
    const charactersSection = document.querySelector('.characters-section');
    const letsGoSection = document.querySelector('.lets-go-section');
    const chatInstruction = document.querySelector('.chat-instruction');
    const floatingEmojisContainer = document.getElementById('floating-emojis');
    const letsGoBtn = document.querySelector('.lets-go-btn');
    
    // Set config
    SCREEN2_CONFIG.chatSound = chatSound;
    
    // ⚠️ SET KARAKTER KE STATE AWAL YANG TIDAK TERLIHAT
    initializeCharacters();
    
    // ⚠️ NONAKTIFKAN LET'S GO BUTTON AWALNYA
    if (letsGoBtn) {
        letsGoBtn.style.pointerEvents = 'none';
        letsGoBtn.style.opacity = '0.5';
        letsGoBtn.style.cursor = 'not-allowed';
    }
    
    // Start floating emojis
    createFloatingEmojis();
    
    // Detect available chat images
    detectChatImages();
    
    // Setup chat container
    setupChatContainer();
    
    // ⚠️ ANIMASI KARAKTER DIMULAI SETELAH SEMUA SIAP
    setTimeout(() => {
        animateCharactersEntry();
    }, 300);
    
    // Event Listeners
    document.addEventListener('click', handleScreenClick);
    document.addEventListener('touchstart', handleScreenClick);
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
            handleScreenClick();
        }
    });
    
    // Initialize first chat setelah delay
    setTimeout(() => {
        showNextChat();
    }, 1800); // ⚠️ TAMBAH DELAY AGAR KARAKTER SUDAH MASUK
    
    // ⚠️ FUNCTION UNTUK INISIALISASI KARAKTER
    function initializeCharacters() {
        const bethaChar = document.querySelector('.betha-character');
        const wildanChar = document.querySelector('.wildan-character');
        
        if (bethaChar) {
            // Reset posisi awal - TIDAK TERLIHAT
            bethaChar.style.opacity = '0';
            bethaChar.style.transform = 'translateX(-100px) scale(0.9)';
            bethaChar.style.transition = 'none'; // ⚠️ NO TRANSITION AWAL
        }
        
        if (wildanChar) {
            wildanChar.style.opacity = '0';
            wildanChar.style.transform = 'translateX(100px) scale(0.9)';
            wildanChar.style.transition = 'none';
        }
    }
    
    // ⚠️ FUNCTION ANIMASI MASUK KARAKTER
    function animateCharactersEntry() {
        const bethaChar = document.querySelector('.betha-character');
        const wildanChar = document.querySelector('.wildan-character');
        
        if (bethaChar) {
            // Reset CSS animation pertama
            bethaChar.style.animation = 'none';
            
            // Force reflow
            void bethaChar.offsetWidth;
            
            // Apply transition
            bethaChar.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Animate masuk
            setTimeout(() => {
                bethaChar.style.opacity = '1';
                bethaChar.style.transform = 'translateX(0) scale(1)';
                
                // Setelah animasi utama selesai, baru tambahkan float animation
                setTimeout(() => {
                    bethaChar.style.animation = 'floatCharacter 3s ease-in-out infinite';
                    bethaChar.style.transition = 'none'; // Hapus transition untuk float
                }, 1200);
            }, 100);
        }
        
        if (wildanChar) {
            // Wildan masuk dengan delay
            setTimeout(() => {
                wildanChar.style.animation = 'none';
                void wildanChar.offsetWidth;
                
                wildanChar.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                setTimeout(() => {
                    wildanChar.style.opacity = '1';
                    wildanChar.style.transform = 'translateX(0) scale(1)';
                    
                    setTimeout(() => {
                        wildanChar.style.animation = 'floatCharacter 3s ease-in-out infinite 0.5s';
                        wildanChar.style.transition = 'none';
                        
                        // ⚠️ SET FLAG KARAKTER SUDAH SIAP
                        SCREEN2_CONFIG.isCharactersInitialized = true;
                    }, 1200);
                }, 100);
            }, 500); // Wildan delay 0.5 detik
        }
    }
    
    // Function untuk membuat floating emojis
    function createFloatingEmojis() {
        const emojis = ['❤️', '💖', '💕', '💗', '💓', '✨', '🌟', '💫', '🌸', '💌'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFloatingEmoji();
            }, i * 300);
        }
        
        setInterval(createFloatingEmoji, 1200);
        
        function createFloatingEmoji() {
            const emoji = document.createElement('div');
            emoji.className = 'floating-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = (Math.random() * 20 + 15) + 'px';
            
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 2;
            
            emoji.style.animation = `floatUp ${duration}s linear ${delay}s forwards`;
            
            floatingEmojisContainer.appendChild(emoji);
            SCREEN2_CONFIG.floatingEmojis.push(emoji);
            
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.remove();
                    const index = SCREEN2_CONFIG.floatingEmojis.indexOf(emoji);
                    if (index > -1) {
                        SCREEN2_CONFIG.floatingEmojis.splice(index, 1);
                    }
                }
            }, (duration + delay) * 1000);
        }
    }
    
    function detectChatImages() {
        const maxChats = 10;
        const chatFiles = [];
        
        for (let i = 1; i <= maxChats; i++) {
            const filename = `chat${i}.png`;
            chatFiles.push(filename);
        }
        
        SCREEN2_CONFIG.chatFiles = chatFiles;
        SCREEN2_CONFIG.totalChats = chatFiles.length;
        
        console.log(`Detected ${SCREEN2_CONFIG.totalChats} chat images`);
    }
    
    function setupChatContainer() {
        chatContainer.innerHTML = '';
        
        SCREEN2_CONFIG.chatFiles.forEach((filename, index) => {
            const isYou = (index % 2 === 0);
            const chatMessage = createChatMessage(filename, isYou, index);
            chatContainer.appendChild(chatMessage);
        });
    }
    
    function createChatMessage(filename, isYou, index) {
        const chatDiv = document.createElement('div');
        chatDiv.className = `chat-message ${isYou ? 'you' : 'betha'}`;
        chatDiv.dataset.index = index;
        
        const profilePhoto = isYou ? 'wildan_profile.png' : 'betha_profile.png';
        
        chatDiv.innerHTML = `
            ${!isYou ? `
                <div class="profile-photo">
                    <img src="assets/profile_photos/${profilePhoto}" alt="${isYou ? 'Wildan' : 'Betha'}" 
                         onerror="this.style.display='none'; this.parentElement.innerHTML='👤'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center';">
                </div>
            ` : ''}
            
            <div class="chat-bubble">
                <img src="assets/chats/${filename}" alt="Chat ${index + 1}" class="chat-image"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='💬 Chat ${index + 1}'; this.parentElement.style.color='white';">
            </div>
            
            ${isYou ? `
                <div class="profile-photo">
                    <img src="assets/profile_photos/${profilePhoto}" alt="${isYou ? 'Wildan' : 'Betha'}"
                         onerror="this.style.display='none'; this.parentElement.innerHTML='👤'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center';">
                </div>
            ` : ''}
        `;
        
        return chatDiv;
    }
    
    function handleScreenClick(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // ⚠️ CEK APAKAH CHAT SUDAH SELESAI
        if (SCREEN2_CONFIG.isChatCompleted) {
            return;
        }
        
        if (SCREEN2_CONFIG.isTransitioning) return;
        
        if (SCREEN2_CONFIG.chatSound) {
            SCREEN2_CONFIG.chatSound.currentTime = 0;
            SCREEN2_CONFIG.chatSound.volume = 0.2;
            SCREEN2_CONFIG.chatSound.play().catch(err => console.log('Sound play failed'));
        }
        
        showNextChat();
    }
    
    function showNextChat() {
        if (SCREEN2_CONFIG.isTransitioning) return;
        
        const currentIndex = SCREEN2_CONFIG.currentChatIndex;
        const totalChats = SCREEN2_CONFIG.totalChats;
        
        if (currentIndex >= totalChats) {
            endChatSequence();
            return;
        }
        
        SCREEN2_CONFIG.isTransitioning = true;
        
        if (currentIndex > 0) {
            const prevChat = document.querySelector(`.chat-message[data-index="${currentIndex - 1}"]`);
            if (prevChat && prevChat.classList.contains('active')) {
                const isPrevYou = (currentIndex - 1) % 2 === 0;
                prevChat.classList.add(isPrevYou ? 'slide-out' : 'slide-out');
                
                setTimeout(() => {
                    prevChat.classList.remove('active', 'slide-out');
                    prevChat.style.display = 'none';
                    showNewChat(currentIndex);
                }, 800);
            } else {
                showNewChat(currentIndex);
            }
        } else {
            showNewChat(currentIndex);
        }
    }
    
    function showNewChat(index) {
        const nextChat = document.querySelector(`.chat-message[data-index="${index}"]`);
        if (nextChat) {
            nextChat.style.display = 'flex';
            nextChat.classList.remove('slide-in', 'slide-out');
            
            setTimeout(() => {
                nextChat.classList.add('slide-in');
                
                setTimeout(() => {
                    nextChat.classList.add('active');
                    SCREEN2_CONFIG.currentChatIndex = index + 1;
                    
                    setTimeout(() => {
                        SCREEN2_CONFIG.isTransitioning = false;
                    }, 300);
                }, 50);
            }, 10);
        } else {
            SCREEN2_CONFIG.isTransitioning = false;
            endChatSequence();
        }
    }
    
    function endChatSequence() {
        console.log('All chats displayed, showing Let\'s Go button');
        
        SCREEN2_CONFIG.isChatCompleted = true;
        document.removeEventListener('click', handleScreenClick);
        document.removeEventListener('touchstart', handleScreenClick);
        
        if (chatInstruction) {
            chatInstruction.style.opacity = '0';
            chatInstruction.style.transform = 'translateY(20px) scale(0.95)';
            chatInstruction.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                chatInstruction.style.display = 'none';
            }, 800);
        }
        
        // ⚠️ ANIMASI KARAKTER KELUAR DENGAN SMOOTH
        animateCharactersExit();
        
        // Show Let's Go section setelah delay
        setTimeout(() => {
            if (letsGoSection) {
                letsGoSection.classList.add('show');
            }
            
            chatContainer.style.opacity = '0';
            chatContainer.style.transform = 'translateY(30px) scale(0.95)';
            chatContainer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                chatContainer.style.display = 'none';
                
                if (letsGoBtn) {
                    setTimeout(() => {
                        letsGoBtn.style.pointerEvents = 'auto';
                        letsGoBtn.style.opacity = '1';
                        letsGoBtn.style.cursor = 'pointer';
                        letsGoBtn.addEventListener('click', goToScreen3);
                    }, 500);
                }
            }, 800);
        }, 1200); // ⚠️ TAMBAH DELAY UNTUK ANIMASI KARAKTER KELUAR
    }
    
    // ⚠️ FUNCTION ANIMASI KARAKTER KELUAR
    function animateCharactersExit() {
        const bethaChar = document.querySelector('.betha-character');
        const wildanChar = document.querySelector('.wildan-character');
        
        if (bethaChar) {
            bethaChar.style.animation = 'none';
            bethaChar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                bethaChar.style.opacity = '0';
                bethaChar.style.transform = 'translateY(-50px) translateX(-20px) scale(0.9)';
            }, 100);
        }
        
        if (wildanChar) {
            setTimeout(() => {
                wildanChar.style.animation = 'none';
                wildanChar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    wildanChar.style.opacity = '0';
                    wildanChar.style.transform = 'translateY(-50px) translateX(20px) scale(0.9)';
                }, 100);
            }, 200); // Wildan keluar lebih lambat
        }
    }
    
    // Function to go to screen 3
    window.goToScreen3 = function() {
        if (!SCREEN2_CONFIG.isChatCompleted || SCREEN2_CONFIG.isTransitioning) {
            console.log('Cannot go to screen 3 yet. Chat not completed or transitioning.');
            return;
        }
        
        SCREEN2_CONFIG.isTransitioning = true;
        
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.95)';
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            window.location.href = 'screen3.html';
        }, 800);
    };
    
    if (letsGoBtn) {
        letsGoBtn.addEventListener('click', function(e) {
            if (!SCREEN2_CONFIG.isChatCompleted) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Let\'s Go button is disabled during chat sequence');
                return false;
            }
        });
    }
});