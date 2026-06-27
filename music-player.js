// ====== پخش‌کننده موسیقی سراسری ======

(function() {
    'use strict';

    // ====== تنظیمات ======
    var settings = {
        // آدرس آهنگ (می‌تونی عوض کنی)
        songUrl: 'background-music.mp3',
        // میزان صدا (۰ تا ۱)
        volume: 0.3,
        // پخش خودکار
        autoPlay: true
    };

    // ====== ایجاد عنصر صوتی ======
    var audio = new Audio();
    audio.src = settings.songUrl;
    audio.volume = settings.volume;
    audio.loop = true; // تکرار بی‌نهایت

    var isPlaying = false;
    var isMuted = false;

    // ====== ایجاد دکمه پخش ======
    function createMusicButton() {
        // اگه قبلاً ساخته شده، برمیگردیم
        if (document.getElementById('musicControlBtn')) return;

        // استایل دکمه
        var style = document.createElement('style');
        style.textContent = `
            .music-control-btn {
                position: fixed;
                bottom: 90px;
                left: 25px;
                z-index: 9999;
                background: rgba(255,254,248,0.92);
                backdrop-filter: blur(10px);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                border: 2px solid rgba(212,197,249,0.3);
                box-shadow: 0 8px 25px rgba(160,130,200,0.2);
                cursor: pointer;
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                color: #334756;
                font-family: 'Vazirmatn', 'Segoe UI', system-ui, sans-serif;
            }
            .music-control-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 12px 35px rgba(160,130,200,0.3);
                border-color: #D4C5F9;
            }
            .music-control-btn.playing {
                background: rgba(212,197,249,0.15);
                border-color: #D4C5F9;
            }
            .music-control-btn .tooltip {
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255,254,248,0.95);
                backdrop-filter: blur(8px);
                padding: 0.3rem 1rem;
                border-radius: 30px;
                font-size: 0.75rem;
                color: #334756;
                white-space: nowrap;
                border: 1px solid rgba(212,197,249,0.15);
                box-shadow: 0 4px 15px rgba(160,130,200,0.1);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            .music-control-btn:hover .tooltip {
                opacity: 1;
            }
            @media (max-width: 480px) {
                .music-control-btn {
                    bottom: 75px;
                    left: 15px;
                    width: 42px;
                    height: 42px;
                    font-size: 1.2rem;
                }
                .music-control-btn .tooltip {
                    font-size: 0.65rem;
                    padding: 0.2rem 0.7rem;
                    bottom: 50px;
                }
            }
        `;
        document.head.appendChild(style);

      
        // رویداد کلیک
        btn.addEventListener('click', function() {
            toggleMusic();
        });

        // شروع خودکار
        if (settings.autoPlay) {
            // تلاش برای پخش خودکار (با تاخیر)
            setTimeout(function() {
                playMusic();
            }, 1000);
        }

        // به‌روزرسانی وضعیت
        updateButtonState();
    }

    // ====== پخش موسیقی ======
    function playMusic() {
        audio.play().then(function() {
            isPlaying = true;
            updateButtonState();
        }).catch(function(e) {
            // اگر مرورگر اجازه نداد، نمایش خطا نده
            console.log('پخش خودکار ممکن نیست، کاربر باید کلیک کند');
            // دکمه رو به حالت آماده نشون بده
            isPlaying = false;
            updateButtonState();
        });
    }

    // ====== توقف موسیقی ======
    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateButtonState();
    }

    // ====== قطع/وصل ======
    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    // ====== به‌روزرسانی دکمه ======
    function updateButtonState() {
        var icon = document.getElementById('musicIcon');
        var tooltip = document.getElementById('musicTooltip');
        var btn = document.getElementById('musicControlBtn');

        if (!icon || !tooltip || !btn) return;

        if (isPlaying) {
            icon.textContent = '🔊';
            tooltip.textContent = 'موسیقی روشن';
            btn.classList.add('playing');
        } else {
            icon.textContent = '🔇';
            tooltip.textContent = 'موسیقی خاموش';
            btn.classList.remove('playing');
        }
    }

    // ====== ذخیره وضعیت در localStorage ======
    function saveState() {
        localStorage.setItem('musicPlaying', isPlaying ? 'true' : 'false');
    }

    function loadState() {
        var saved = localStorage.getItem('musicPlaying');
        if (saved === 'true') {
            // اگه قبلاً روشن بوده، دوباره پخش کن
            setTimeout(function() {
                playMusic();
            }, 500);
        }
    }

    // ====== ذخیره وضعیت قبل از بستن صفحه ======
    window.addEventListener('beforeunload', function() {
        saveState();
    });

    // ====== اجرا ======
    function initMusicPlayer() {
        createMusicButton();
        loadState();

        // وقتی کاربر با صفحه تعامل کرد، اگه آهنگ پخش نشده، پخش کن
        document.addEventListener('click', function() {
            if (!isPlaying && settings.autoPlay) {
                playMusic();
            }
        }, { once: true });
    }

    // اجرا بعد از لود کامل
    if (document.readyState === 'complete') {
        setTimeout(initMusicPlayer, 300);
    } else {
        window.addEventListener('load', function() {
            setTimeout(initMusicPlayer, 300);
        });
    }

    // برای دسترسی از کنسول
    window.__musicPlayer = {
        play: playMusic,
        pause: pauseMusic,
        toggle: toggleMusic,
        setVolume: function(v) { audio.volume = v; },
        isPlaying: function() { return isPlaying; }
    };

})();