// ====== دوست من - نسخه نهایی (در همه صفحات) ======

(function() {
    'use strict';

    // ====== کاراکترها ======
    const characters = [
        { 
            id: 'moon', 
            emoji: '🌙', 
            name: 'ماه‌جان', 
            desc: 'دوست آروم و مهربون',
            messages: [
                'سلام کوچولو! 🌙 امشب با هم ستاره‌ها رو بشماریم؟',
                'سلام دوست عزیزم! 🌙 چقدر دلم برات تنگ شده بود!',
                'اووووف! 🌙 بالاخره اومدی! بیا بریم ماه‌گردی!',
                'میدونی چرا ماه همیشه خوشحاله؟ چون پنیر دوست داره! 🧀🌙',
                'یادت باشه که همیشه می‌تونی به من تکیه کنی! 🌙'
            ]
        },
        { 
            id: 'star', 
            emoji: '⭐', 
            name: 'ستاره‌جان', 
            desc: 'دوست پرانرژی و شاد',
            messages: [
                'سلام! ⭐ چقدر امروز خوشحالم که تورو دیدم!',
                'یو هوووو! ⭐ من اینجام! بیا بریم بازی کنیم!',
                'سلام دوست خوبم! ⭐ امروز یه روز فوق‌العاده‌ست!',
                'میدونی چرا ستاره‌ها خوشحالن؟ چون همیشه می‌تونن برق بزنن! ✨⭐',
                'همیشه مثل یه ستاره بدرخش! ⭐ حتی اگه کسی نبینه!'
            ]
        },
        { 
            id: 'cloud', 
            emoji: '☁️', 
            name: 'ابرجان', 
            desc: 'دوست رؤیایی و بامزه',
            messages: [
                'سلاااام! ☁️ من ابرجانم! بیا بریم تو آسمون پرواز کنیم!',
                'چطوری دوست نازنینم؟ ☁️ امروز هوا برای پرواز عالیه!',
                'اوهوم! ☁️ من اینجام! بارون رو دوست داری؟',
                'میدونی ابرا چرا اینقدر سفیدن؟ چون همیشه حمام می‌رن! 🚿☁️',
                'همیشه رویاهای بزرگ داشته باش! مثل من که می‌خوام کل زمین رو ببینم! ☁️'
            ]
        },
        { 
            id: 'rabbit', 
            emoji: '🐰', 
            name: 'خرگوشک', 
            desc: 'دوست ناز و بازیگوش',
            messages: [
                'چی کار می‌کنی؟ 🐰 من هویج خوردم! تو چی؟',
                'سلام دوست نازنینم! 🐰 بیا بریم تو باغچه بازی کنیم!',
                'هوپ هوپ! 🐰 من اینجام! کی می‌خواد با من مسابقه بده؟',
                'میدونی خرگوشا چرا اینقدر سریع می‌دون؟ چون هویج انرژی‌ده‌ست! 🥕🐰',
                'همیشه مثل خرگوشا پرانرژی باش! ولی یادت باشه استراحت هم مهمه! 🐰'
            ]
        },
        { 
            id: 'bear', 
            emoji: '🧸', 
            name: 'خرس کوچولو', 
            desc: 'دوست مهربون و بغل‌کردنی',
            messages: [
                'غوووغ! 🧸 من اینجام! بیا بغلم کن!',
                'سلام عزیزم! 🧸 چقدر دلم برات تنگ شده بود!',
                'اومدم که باهات باشم! 🧸 می‌خوای بریم عسل بخوریم؟',
                'میدونی خرسا چرا اینقدر پشمالون؟ چون پتو دوست دارن! 🧸',
                'همیشه مهربون باش مثل خرسا! 🧸 دنیا با مهربونی قشنگ‌تر میشه!'
            ]
        }
    ];

    let selectedChar = null;
    let chatTimeout = null;
    let isWaving = false;
    let isInitialized = false;

    // ====== پیدا کردن کاراکتر انتخاب شده ======
    function getSelectedChar() {
        const saved = localStorage.getItem('myFriend');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                const found = characters.find(c => c.id === data.id);
                if (found) return found;
            } catch (e) {}
        }
        return characters[0];
    }

    // ====== ایجاد المنت دوست ======
    function createFriend() {
        // اگه قبلاً ساخته شده یا در صفحه friend.html هستیم، صبر کن
        if (document.getElementById('friendHelper')) return;
        if (window.location.pathname.includes('friend.html')) {
            // در صفحه friend.html، فقط اگه کاربر انتخاب کرده باشه
            const saved = localStorage.getItem('myFriend');
            if (!saved) return;
        }

        isInitialized = true;
        selectedChar = getSelectedChar();

        // استایل‌ها (اگه قبلاً اضافه نشده)
        if (!document.getElementById('friendStyles')) {
            const style = document.createElement('style');
            style.id = 'friendStyles';
            style.textContent = `
                .friend-helper {
                    position: fixed;
                    bottom: 25px;
                    right: 25px;
                    z-index: 9999;
                    cursor: pointer;
                    background: rgba(255, 254, 248, 0.92);
                    backdrop-filter: blur(10px);
                    border-radius: 60px;
                    padding: 0.7rem 1.4rem 0.7rem 1.2rem;
                    border: 2px solid rgba(212, 197, 249, 0.3);
                    box-shadow: 0 8px 35px rgba(160, 130, 200, 0.25);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    animation: bounceFriend 3s ease-in-out infinite;
                    transition: all 0.3s ease;
                }
                .friend-helper:hover {
                    transform: scale(1.08) !important;
                    box-shadow: 0 12px 50px rgba(160, 130, 200, 0.4);
                    border-color: #D4C5F9;
                }
                .friend-helper .helper-emoji {
                    font-size: 2.5rem;
                    display: inline-block;
                    transition: transform 0.3s ease;
                }
                .friend-helper:hover .helper-emoji {
                    transform: scale(1.2) rotate(-10deg);
                }
                .friend-helper .helper-text {
                    font-size: 0.9rem;
                    color: #334756;
                    max-width: 160px;
                    line-height: 1.4;
                    font-weight: 400;
                }
                .friend-helper .helper-bubble {
                    background: rgba(212, 197, 249, 0.12);
                    border-radius: 30px;
                    padding: 0.3rem 1rem;
                    position: relative;
                }
                .friend-helper .helper-bubble::after {
                    content: '';
                    position: absolute;
                    right: -10px;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 8px solid transparent;
                    border-right-color: rgba(212, 197, 249, 0.12);
                }
                .friend-helper .helper-dot {
                    width: 10px;
                    height: 10px;
                    background: #4A8DB7;
                    border-radius: 50%;
                    display: inline-block;
                    animation: pulseDot 2s ease-in-out infinite;
                    margin-right: 2px;
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.7); }
                }
                @keyframes bounceFriend {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes waveHand {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-30deg); }
                    75% { transform: rotate(30deg); }
                }
                .friend-helper.waving .helper-emoji {
                    animation: waveHand 0.6s ease-in-out 4;
                }
                .friend-chat-box {
                    position: fixed;
                    bottom: 100px;
                    right: 25px;
                    z-index: 9998;
                    background: rgba(255, 254, 248, 0.96);
                    backdrop-filter: blur(12px);
                    border-radius: 28px;
                    padding: 1rem 1.8rem 1rem 1.5rem;
                    border: 2px solid rgba(212, 197, 249, 0.2);
                    box-shadow: 0 12px 45px rgba(160, 130, 200, 0.2);
                    max-width: 320px;
                    display: none;
                    animation: fadeChat 0.4s ease;
                }
                .friend-chat-box.show {
                    display: block;
                }
                .friend-chat-box .chat-close {
                    position: absolute;
                    top: 4px;
                    left: 12px;
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #334756;
                    opacity: 0.3;
                    transition: opacity 0.2s;
                }
                .friend-chat-box .chat-close:hover {
                    opacity: 1;
                }
                .friend-chat-box .chat-row {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding-left: 1.2rem;
                }
                .friend-chat-box .chat-emoji {
                    font-size: 2.2rem;
                    animation: bounceChar 2s ease-in-out infinite;
                }
                @keyframes bounceChar {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .friend-chat-box .chat-msg {
                    font-size: 0.95rem;
                    color: #334756;
                    line-height: 1.7;
                    font-weight: 350;
                }
                .friend-chat-box .chat-msg .highlight {
                    color: #4A8DB7;
                    font-weight: 500;
                }
                @keyframes fadeChat {
                    0% { opacity: 0; transform: scale(0.9) translateY(15px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @media (max-width: 480px) {
                    .friend-helper {
                        bottom: 15px;
                        right: 15px;
                        padding: 0.4rem 0.8rem;
                        gap: 0.4rem;
                    }
                    .friend-helper .helper-emoji { font-size: 1.8rem; }
                    .friend-helper .helper-text { font-size: 0.7rem; max-width: 90px; }
                    .friend-helper .helper-dot { width: 6px; height: 6px; }
                    .friend-chat-box {
                        bottom: 80px;
                        right: 15px;
                        max-width: 220px;
                        padding: 0.8rem 1rem;
                    }
                    .friend-chat-box .chat-emoji { font-size: 1.6rem; }
                    .friend-chat-box .chat-msg { font-size: 0.8rem; }
                    .friend-chat-box .chat-row { gap: 0.5rem; padding-left: 0.8rem; }
                }
            `;
            document.head.appendChild(style);
        }

        // ساخت helper (اگه وجود نداشته باشه)
        if (!document.getElementById('friendHelper')) {
            const div = document.createElement('div');
            div.id = 'friendHelper';
            div.className = 'friend-helper';
            div.innerHTML = `
                <span class="helper-emoji" id="helperEmoji">${selectedChar.emoji}</span>
                <div class="helper-bubble">
                    <span class="helper-text" id="helperText">${selectedChar.name} همراه شماست</span>
                    <span class="helper-dot"></span>
                </div>
            `;
            document.body.appendChild(div);

            // رویداد کلیک
            document.getElementById('friendHelper').addEventListener('click', function(e) {
                e.stopPropagation();
                showFriendMessage();
                waveFriend();
            });
        }

        // ساخت چت باکس (اگه وجود نداشته باشه)
        if (!document.getElementById('friendChatBox')) {
            const chatBox = document.createElement('div');
            chatBox.id = 'friendChatBox';
            chatBox.className = 'friend-chat-box';
            chatBox.innerHTML = `
                <button class="chat-close" onclick="closeFriendChat()">✕</button>
                <div class="chat-row">
                    <span class="chat-emoji" id="chatEmoji">${selectedChar.emoji}</span>
                    <span class="chat-msg" id="chatMsg">سلام! <span class="highlight">من ${selectedChar.name} هستم!</span> 🎈</span>
                </div>
            `;
            document.body.appendChild(chatBox);
        }

        // به‌روزرسانی
        updateFriend();

        // پیام خوش‌آمدگویی (اگه قبلاً نمایش داده نشده)
        if (!sessionStorage.getItem('friendWelcomed')) {
            setTimeout(() => {
                const msgs = [
                    `سلام! <span class="highlight">من ${selectedChar.name} هستم!</span> 🎈 خوشحالم که اینجایی!`,
                    `${selectedChar.emoji} امروز روز خوبیه! چطور هستی؟`,
                    `${selectedChar.emoji} دلم برات تنگ شده بود! خوش اومدی!`
                ];
                showFriendMessage(msgs[Math.floor(Math.random() * msgs.length)]);
                sessionStorage.setItem('friendWelcomed', 'true');
            }, 1500);
        }
    }

    // ====== نمایش پیام ======
    window.showFriendMessage = function(msg) {
        const chatBox = document.getElementById('friendChatBox');
        const chatMsg = document.getElementById('chatMsg');
        const chatEmoji = document.getElementById('chatEmoji');
        
        if (!chatBox) return;
        
        const char = getSelectedChar();
        
        if (msg) {
            chatMsg.innerHTML = msg;
        } else {
            const messages = char.messages || [
                `سلام! ${char.emoji} چطوری؟`,
                `${char.emoji} من اینجام!`,
                `${char.emoji} دلم برات تنگ شده بود!`,
                `${char.emoji} بیا بریم بازی!`,
                `${char.emoji} امروز روز خوبیه!`
            ];
            chatMsg.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        }
        
        chatEmoji.textContent = char.emoji;
        chatBox.classList.add('show');
        
        clearTimeout(chatTimeout);
        chatTimeout = setTimeout(() => {
            chatBox.classList.remove('show');
        }, 5000);
    };

    // ====== بستن چت ======
    window.closeFriendChat = function() {
        const chatBox = document.getElementById('friendChatBox');
        if (chatBox) chatBox.classList.remove('show');
        clearTimeout(chatTimeout);
    };

    // ====== دست تکون دادن ======
    window.waveFriend = function() {
        if (isWaving) return;
        isWaving = true;
        const helper = document.getElementById('friendHelper');
        if (helper) {
            helper.classList.add('waving');
            setTimeout(() => {
                helper.classList.remove('waving');
                isWaving = false;
            }, 2500);
        }
    };

    // ====== به‌روزرسانی دوست ======
    window.updateFriend = function() {
        const char = getSelectedChar();
        const emoji = document.getElementById('helperEmoji');
        const text = document.getElementById('helperText');
        const chatEmoji = document.getElementById('chatEmoji');
        if (emoji) emoji.textContent = char.emoji;
        if (text) text.textContent = char.name + ' همراه شماست';
        if (chatEmoji) chatEmoji.textContent = char.emoji;
    };

    // ====== بستن با کلیک روی پس‌زمینه ======
    document.addEventListener('click', function(e) {
        const chatBox = document.getElementById('friendChatBox');
        const helper = document.getElementById('friendHelper');
        if (chatBox && chatBox.classList.contains('show')) {
            if (!chatBox.contains(e.target) && !helper.contains(e.target)) {
                chatBox.classList.remove('show');
                clearTimeout(chatTimeout);
            }
        }
    });

    // ====== مقداردهی اولیه ======
    function initFriend() {
        // اگه در صفحه friend.html هستیم و هنوز کاراکتری انتخاب نشده، صبر کن
        if (window.location.pathname.includes('friend.html')) {
            const saved = localStorage.getItem('myFriend');
            if (!saved) {
                // منتظر میمونیم تا کاربر انتخاب کنه
                return;
            }
        }
        createFriend();
    }

    // اجرا بعد از لود کامل صفحه
    if (document.readyState === 'complete') {
        setTimeout(initFriend, 300);
    } else {
        window.addEventListener('load', function() {
            setTimeout(initFriend, 300);
        });
    }

    // برای friend.html، وقتی کاراکتر انتخاب شد، اجرا کن
    window.initFriendAfterSelect = function() {
        setTimeout(function() {
            createFriend();
            setTimeout(function() {
                const char = getSelectedChar();
                showFriendMessage(`سلام! <span class="highlight">من ${char.name} هستم!</span> 🎈 خوشحالم که انتخابم کردی!`);
                waveFriend();
            }, 500);
        }, 300);
    };

    // هر ۱۰ ثانیه چک کن
    setInterval(function() {
        if (document.getElementById('friendHelper')) {
            updateFriend();
        }
    }, 10000);

})();