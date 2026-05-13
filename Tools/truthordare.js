const axios = require("axios");

module.exports = async function (req, res) {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐓𝐑𝐔𝐓𝐇 𝐎𝐑 𝐃𝐀𝐑𝐄 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff;
                }

                /* Backgrounds ⚔️ */
                #bg-video {
                    position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%;
                    z-index: -2; object-fit: cover;
                }
                #fireworks-canvas {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    z-index: -1; display: none; background: #000;
                }

                .container {
                    width: 90%; max-width: 450px; background: rgba(0, 0, 0, 0.8);
                    padding: 30px; border-radius: 20px; border: 2px solid #ff00ff;
                    box-shadow: 0 0 30px #ff00ff; text-align: center; z-index: 10;
                    backdrop-filter: blur(10px);
                }

                h1 { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; margin-bottom: 20px; }
                .btn {
                    background: #ff00ff; color: #fff; border: none; padding: 15px 25px;
                    border-radius: 10px; cursor: pointer; margin: 10px; transition: 0.3s;
                }
                .btn:hover { transform: scale(1.1); box-shadow: 0 0 20px #ff00ff; }

                /* Spinner Logic ⚔️ */
                #spinner-wrap { position: relative; width: 200px; height: 200px; margin: 20px auto; display: none; }
                #bottle { 
                    width: 100%; height: 100%; 
                    background: url('https://pngimg.com/uploads/bottle/bottle_PNG2095.png') no-repeat center;
                    background-size: contain; transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
                }
                .indicator { position: absolute; font-size: 20px; color: #00ff00; }

                #ui-start, #ui-players, #ui-game, #ui-choice, #ui-final { display: none; }
                #ui-start { display: block; }

                .q-box { background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; margin-top: 20px; color: #00ff00; }
            </style>
        </head>
        <body>

            <video autoplay loop id="bg-video">
                <source src="https://files.catbox.moe/oox3u0.mp4" type="video/mp4">
            </video>

            <canvas id="fireworks-canvas"></canvas>

            <div class="container">
                <div id="ui-start">
                    <h1>𝐓𝐑𝐔𝐓𝐇 𝐎𝐑 𝐃𝐀𝐑𝐄 ⚔️</h1>
                    <button class="btn" onclick="initGame()">𝐆𝐀𝐌𝐄 𝐒𝐓𝐀𝐑𝐓 ⚔️</button>
                </div>

                <div id="ui-players">
                    <h2>প্লেয়ার সংখ্যা সিলেক্ট করো</h2>
                    <button class="btn" onclick="setupPlayers(2)">২ জন</button>
                    <button class="btn" onclick="setupPlayers(4)">৪ জন</button>
                </div>

                <div id="ui-game">
                    <div id="spinner-wrap">
                        <div id="bottle"></div>
                        <div class="indicator" style="top:-30px; left:45%;">⬆️</div>
                        <div class="indicator" style="bottom:-30px; left:45%;">⬇️</div>
                        <div class="indicator" id="ind-left" style="left:-30px; top:45%; display:none;">⬅️</div>
                        <div class="indicator" id="ind-right" style="right:-30px; top:45%; display:none;">➡️</div>
                    </div>
                    <button class="btn" onclick="spinBottle()">𝐒𝐏𝐈𝐍 𝐍𝐎𝐖 ⚔️</button>
                </div>

                <div id="ui-choice">
                    <h2 id="winner-text"></h2>
                    <button class="btn" style="background:#00ff00" onclick="showContent('truth')">𝐓𝐑𝐔𝐓𝐇</button>
                    <button class="btn" style="background:#ff0000" onclick="showContent('dare')">𝐃𝐀𝐑𝐄</button>
                </div>

                <div id="ui-final">
                    <div class="q-box" id="final-text"></div>
                    <button class="btn" onclick="resetSpin()">নক্সট রাউন্ড ⚔️</button>
                </div>
            </div>

            <script>
                const truths = [
                    "তোমার ক্রাশের নাম কি?", "শেষ কবে কার কাছে থাপ্পড় খেয়েছ?", "বন্ধুর মানিব্যাগ থেকে কখনো টাকা চুরি করেছ?", 
                    "কারো সাথে কি রিলেশন আছে?", "তোমার জীবনের সবচেয়ে বড় লজ্জা কি?", "কাকে সবচেয়ে বেশি হিংসে করো?",
                    "কাউকে কি কখনো গোপনে অপছন্দ করেছ?", "তোমার ফোনের পাসওয়ার্ড কি?", "শেষ কবে মিথ্যা বলেছ?",
                    "এই গ্রুপের কার ওপর তোমার গোপন ক্রাশ আছে?", "কারো সম্পর্কে কি কখনো মিথ্যা গুজব ছড়িয়েছ?",
                    "তোমার জীবনের সবচেয়ে বড় ভয় কি?", "কাউকে কি কখনো না বলে কিস করেছ?", "নিজের প্রাক্তনকে কি এখনো মিস করো?",
                    "কাউকে কি কখনো ব্লক করে পরে আবার আনব্লক করেছ?", "তোমার সবচেয়ে খারাপ অভ্যাস কি?",
                    "কারো ব্রাশ দিয়ে কি কখনো দাঁত মেজেছ?", "বন্ধুর গার্লফ্রেন্ডকে কি কখনো ভালো লেগেছে?",
                    "কাউকে কি কখনো প্র্যাঙ্ক কল করে ভয় দেখিয়েছ?", "তোমার সবচেয়ে বড় সিক্রেট কি?"
                    // ... এভাবেই ৫০টি অ্যাড করা যাবে
                ];

                const dares = [
                    "তোমার ক্রাশকে এখনই আই লাভ ইউ টেক্সট দাও।", "পাশের জনের নাকে ৫ সেকেন্ড জিহ্বা লাগাও।", 
                    "ফেসবুকে একটা ফানি স্ট্যাটাস দাও 'আমি গাধা' লিখে।", "আপনার মানিব্যাগ থেকে ২১০ টাকা পাশের জনকে দিয়ে দিন।",
                    "১০ বার কান ধরে উঠবস করো।", "এক মিনিট মুরগির মতো ডাকো।", "কাউকে ফোন করে ১০ সেকেন্ড অদ্ভুত আওয়াজ করো।",
                    "নিজের ফোনের গ্যালারি সবাইকে দেখাও।", "এক চামচ ঝাল মরিচের গুঁড়া খাও।", "নিজের সবচেয়ে পচা ছবি ডিপি দাও।",
                    "এই গ্রুপের একজনকে রোমান্টিক প্রপোজ করো।", "পাশের জনের পা টিপে দাও ২ মিনিট।",
                    "চোখ বন্ধ করে কারো একজনের ঠোঁটে আঙুল দাও।", "এক গ্লাস পানি ১০ সেকেন্ডে শেষ করো।",
                    "বন্ধুর কান কামড়ে ধরো ২ সেকেন্ড।", "একটা গান গেয়ে শোনাও জোরে।"
                    // ... এভাবেই ৫০টি অ্যাড করা যাবে
                ];

                let pCount = 0;

                function initGame() {
                    document.getElementById('bg-video').style.display = 'none';
                    document.getElementById('fireworks-canvas').style.display = 'block';
                    startFireworks();
                    switchUI('ui-players');
                }

                function setupPlayers(num) {
                    pCount = num;
                    if(num === 4) {
                        document.getElementById('ind-left').style.display = 'block';
                        document.getElementById('ind-right').style.display = 'block';
                    }
                    switchUI('ui-game');
                    document.getElementById('spinner-wrap').style.display = 'block';
                }

                function spinBottle() {
                    const bottle = document.getElementById('bottle');
                    const randDeg = Math.floor(Math.random() * 5000) + 3000;
                    bottle.style.transform = \`rotate(\${randDeg}deg)\`;

                    setTimeout(() => {
                        const actualDeg = randDeg % 360;
                        let winner = "";
                        if(pCount === 2) {
                            winner = (actualDeg > 0 && actualDeg < 180) ? "নিচের জন" : "উপরের জন";
                        } else {
                            if(actualDeg >= 0 && actualDeg < 90) winner = "ডান দিকের জন";
                            else if(actualDeg >= 90 && actualDeg < 180) winner = "নিচের জন";
                            else if(actualDeg >= 180 && actualDeg < 270) winner = "বাম দিকের জন";
                            else winner = "উপরের জন";
                        }
                        document.getElementById('winner-text').innerText = winner + " বিজয়ী!";
                        switchUI('ui-choice');
                    }, 3100);
                }

                function showContent(type) {
                    const list = type === 'truth' ? truths : dares;
                    const res = list[Math.floor(Math.random() * list.length)];
                    document.getElementById('final-text').innerText = res;
                    switchUI('ui-final');
                }

                function resetSpin() {
                    document.getElementById('bottle').style.transform = 'rotate(0deg)';
                    switchUI('ui-game');
                }

                function switchUI(id) {
                    ['ui-start', 'ui-players', 'ui-game', 'ui-choice', 'ui-final'].forEach(i => {
                        document.getElementById(i).style.display = i === id ? 'block' : 'none';
                    });
                }

                // Simple Fireworks Engine ⚔️
                function startFireworks() {
                    const canvas = document.getElementById('fireworks-canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    
                    let particles = [];
                    function createFirework() {
                        const x = Math.random() * canvas.width;
                        const y = Math.random() * canvas.height / 2;
                        const color = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
                        for(let i=0; i<30; i++) {
                            particles.push({x, y, vx: Math.random()*4-2, vy: Math.random()*4-2, age: 0, color});
                        }
                    }

                    function animate() {
                        ctx.fillStyle = 'rgba(0,0,0,0.1)';
                        ctx.fillRect(0,0,canvas.width, canvas.height);
                        particles.forEach((p, i) => {
                            p.x += p.vx; p.y += p.vy; p.age++;
                            ctx.fillStyle = p.color;
                            ctx.fillRect(p.x, p.y, 3, 3);
                            if(p.age > 50) particles.splice(i, 1);
                        });
                        if(Math.random() < 0.05) createFirework();
                        requestAnimationFrame(animate);
                    }
                    animate();
                }
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("Error");
    }
};
