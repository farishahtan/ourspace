/* --- 1. SECURE LOGIN SYSTEM (WITH AUDIO ACTIVATION) --- */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userField = document.getElementById('username').value.trim().toLowerCase();
        const passField = document.getElementById('password').value.trim();
        const errorMsg = document.getElementById('errorMessage');
        const music = document.getElementById('bgMusic');

        if ((userField === 'syafiqboi' || userField === 'ainfarishah') && passField === '21052025') {
            errorMsg.innerText = "";
            
            // Start the music immediately on click interaction to bypass browser blocks
            if (music) {
                music.play().then(() => {
                    // Save music state so dashboard knows it's supposed to be playing
                    localStorage.setItem('musicPlaying', 'true');
                    
                    // Stagger the redirect slightly so the browser registers the audio stream safely
                    setTimeout(() => {
                        window.location.href = 'dashboard.html'; 
                    }, 100);
                }).catch(err => {
                    // Fallback redirect if audio stream engine stumbles
                    window.location.href = 'dashboard.html';
                });
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            errorMsg.innerText = "Access Denied. Incorrect name or date key. ❤️";
        }
    });
}

/* --- 2. ANNIVERSARY TIME COUNTER --- */
const startDate = new Date(2025, 4, 21); // May 21, 2025
function updateCounter() {
    const counterEl = document.getElementById('anniversaryCounter');
    if (!counterEl) return;

    const now = new Date();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    counterEl.innerText = `${days} days, ${hours} hours, ${minutes} minutes since we began.`;
}
updateCounter();
setInterval(updateCounter, 60000);

/* --- 3. DYNAMIC FULLSCREEN 'LOVE RAIN' --- */
const canvas = document.getElementById('loveRainCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let maxParticles = 100;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = Math.random() * 1.2 + 0.8;
            this.size = Math.random() * 1.5 + 0.5;
            this.type = 'drop';
            this.opacity = Math.random() * 0.5 + 0.2;
            this.fadeSpeed = 0.003;
            this.r = 255;
            this.g = Math.floor(Math.random() * 60 + 140);
            this.b = Math.floor(Math.random() * 60 + 160);
        }
        update() {
            this.y += this.speedY; this.x += this.speedX;
            if (this.type === 'drop' && this.y > canvas.height * 0.75) {
                this.type = 'heart'; this.size = Math.random() * 3 + 2.5; this.speedY = 0.3;
            }
            if (this.type === 'heart') { this.opacity -= this.fadeSpeed; }
            if (this.y > canvas.height || this.opacity <= 0 || this.x < 0 || this.x > canvas.width) { this.reset(); }
        }
        draw() {
            ctx.beginPath();
            if (this.type === 'drop') {
                ctx.strokeStyle = `rgba(174, 186, 255, ${this.opacity})`;
                ctx.lineWidth = 1; ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.speedX * 2, this.y + this.size * 2); ctx.stroke();
            } else if (this.type === 'heart') {
                ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
                ctx.moveTo(this.x, this.y + this.size);
                ctx.bezierCurveTo(this.x - this.size, this.y - this.size / 2, this.x - this.size, this.y - this.size, this.x, this.y);
                ctx.bezierCurveTo(this.x + this.size, this.y - this.size, this.x + this.size, this.y - this.size / 2, this.x, this.y + this.size);
                ctx.fill();
            }
            ctx.closePath();
        }
    }

    for (let i = 0; i < maxParticles; i++) { particles.push(new Particle()); }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) { p.update(); p.draw(); }
        requestAnimationFrame(animate);
    }
    animate();
}

/* --- 4. CUSTOM LOGOUT POP-UP INTERACTION --- */
function openLogoutModal(event) {
    event.preventDefault();
    document.getElementById('logoutModal').classList.add('active');
}

function openTrapModal() {
    document.getElementById('logoutModal').classList.remove('active'); 
    document.getElementById('trapModal').classList.add('active');       
}

function closeLogoutModal() {
    document.getElementById('logoutModal').classList.remove('active');
    document.getElementById('trapModal').classList.remove('active');
}

/* --- 5. NATIVE AUTOMATIC FLOWER BURST & AUDIO SYNC SYSTEM --- */
window.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    
    // --- AUDIO SYNC LOOP TRACKING ---
    if (music) {
        // If music was previously playing, restore timestamps and play
        if (localStorage.getItem('musicPlaying') === 'true') {
            const savedTime = localStorage.getItem('musicTime');
            if (savedTime) {
                music.currentTime = parseFloat(savedTime);
            }
            
            // Play audio track smoothly
            music.play().catch(e => console.log("Waiting for user tap to sync music."));
        }

        // Continually track exact millisecond time offsets in case of page hops
        setInterval(() => {
            if (!music.paused) {
                localStorage.setItem('musicTime', music.currentTime);
            }
        }, 400);
    }

    // --- BURST TRIGGER ANIMATION ---
    if (document.getElementById('anniversaryCounter')) {
        triggerNativeFlowerExplosion();
    }
});

function triggerNativeFlowerExplosion() {
    const flowerEmojis = ['🌸', '🌹', '🌺', '🌻', '💖', '✨'];
    const totalCount = 120; 

    for (let i = 0; i < totalCount; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        
        flower.style.position = 'fixed';
        flower.style.zIndex = '99999';
        flower.style.fontSize = (Math.random() * 20 + 26) + 'px'; 
        flower.style.pointerEvents = 'none';
        flower.style.userSelect = 'none';
        
        const isLeftCannon = Math.random() > 0.5;
        const targetX = isLeftCannon ? 0 : window.innerWidth;
        const targetY = window.innerHeight * 0.85;
        
        flower.style.left = targetX + 'px';
        flower.style.top = targetY + 'px';
        document.body.appendChild(flower);
        
        const angleRange = isLeftCannon ? (Math.random() * 60 + 15) : (Math.random() * 60 + 105);
        const radian = angleRange * (Math.PI / 180);
        const coreVelocity = Math.random() * 14 + 11;
        
        let moveX = Math.cos(radian) * coreVelocity;
        let moveY = -Math.sin(radian) * coreVelocity; 
        const fallingGravity = 0.38;
        let runningX = targetX;
        let runningY = targetY;
        let currentOpacity = 1;

        function dynamicRender() {
            moveY += fallingGravity; 
            runningX += moveX;
            runningY += moveY;
            currentOpacity -= 0.014;

            flower.style.left = runningX + 'px';
            flower.style.top = runningY + 'px';
            flower.style.opacity = currentOpacity;

            if (currentOpacity > 0 && runningY < window.innerHeight && runningX > 0 && runningX < window.innerWidth) {
                requestAnimationFrame(dynamicRender);
            } else {
                flower.remove();
            }
        }
        
        setTimeout(() => {
            requestAnimationFrame(dynamicRender);
        }, Math.random() * 350);
    }
}

/* --- 6. FLOATING AUDIO PLAY & PAUSE TOGGLE ENGINE --- */
function toggleDashboardMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggleBtn');
    if (!music || !btn) return;

    music.volume = 0.8; 

    if (music.paused) {
        music.play()
            .then(() => {
                btn.innerText = "⏸ Pause Music";
                localStorage.setItem('musicPlaying', 'true');
            })
            .catch(err => {
                // FIX: Quietly handle errors in the background console instead of popping up an alert box
                console.warn("Audio element playback waiting for direct user tap interaction.", err);
            });
    } else {
        music.pause();
        btn.innerText = "▶ Play Music";
        localStorage.setItem('musicPlaying', 'false');
    }
}

// Auto-sync button state across page loads
window.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggleBtn');
    
    if (music && localStorage.getItem('musicPlaying') === 'true') {
        music.play()
            .then(() => {
                if(btn) btn.innerText = "⏸ Pause Music";
            })
            .catch(() => {
                if(btn) btn.innerText = "▶ Play Music";
            });
    }
});