// 𝦖 System By: Mr.King ⚔️
const axios = require('axios');

module.exports = async function (req, res) {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐄𝐘𝐄 𝐕𝐈𝐒𝐈𝐎𝐍 👀</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                
                body { 
                    background: #000; color: #fff; font-family: 'Segoe UI', sans-serif; 
                    display: flex; flex-direction: column; align-items: center; padding: 20px;
                    overflow: hidden; height: 100vh; position: relative;
                }

                /* Rain Animation ⚔️ */
                .rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
                .drop {
                    position: absolute; width: 2px; height: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    animation: fall linear infinite;
                }
                @keyframes fall { to { transform: translateY(100vh); } }

                .content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; width: 100%; }
                
                h1 { color: #00d2ff; text-shadow: 0 0 20px #00d2ff; margin-top: 20px; font-size: 26px; }
                .sub { color: #888; font-size: 11px; margin-bottom: 25px; }

                /* Password Overlay  */
                #passOverlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: #000; z-index: 100; display: flex;
                    flex-direction: column; align-items: center; justify-content: center;
                }
                .pass-box {
                    background: #111; padding: 30px; border-radius: 20px;
                    border: 2px solid #00d2ff; text-align: center; box-shadow: 0 0 30px rgba(0, 210, 255, 0.3);
                }
                
                input {
                    background: #1a1a1a; border: 1px solid #333; color: #fff;
                    padding: 12px 20px; border-radius: 10px; outline: none; width: 100%; margin-bottom: 15px;
                }
                button {
                    background: #00d2ff; color: #000; padding: 12px 30px;
                    border: none; border-radius: 10px; cursor: pointer; width: 100%;
                }

                /* Search & Video  */
                .search-box {
                    width: 100%; max-width: 400px; background: rgba(0,0,0,0.8);
                    padding: 8px; border-radius: 50px; border: 2px solid #00d2ff;
                    display: flex; align-items: center; margin-bottom: 25px;
                }
                #videoArea { width: 100%; max-width: 380px; }
                .video-card {
                    background: #000; border-radius: 20px; overflow: hidden;
                    border: 2px solid #00d2ff; box-shadow: 0 0 20px rgba(0,210,255,0.4);
                }
                video { width: 100%; display: block; max-height: 60vh; }
                .dl-btn { width: 100%; padding: 15px; background: #00d2ff; color: #000; text-align: center; text-decoration: none; display: block; }
            </style>
        </head>
        <body>

            <div id="passOverlay">
                <div class="pass-box">
                    <h2 style="color:#00d2ff; margin-bottom: 20px;">𝐄𝐍𝐓𝐄𝐑 𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃</h2>
                    <input type="password" id="passInput" placeholder="Password here...">
                    <button onclick="checkPass()">𝐔𝐍𝐋𝐎𝐂𝐊 ⚔️</button>
                </div>
            </div>

            <div class="rain" id="rainContainer"></div>

            <div class="content">
                <h1>𝐄𝐘𝐄 𝐕𝐈𝐒𝐈𝐎𝐍 </h1>
                <p class="sub">🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 ⚔️</p>

                <div class="search-box">
                    <input type="text" id="userInput" placeholder="Search (Sad, Love, Hindi, Bangla)...">
                    <button class="search-btn" onclick="getEyeVideo()" style="background:transparent; color:#00d2ff; border:none; padding:10px;">𝐒𝐄𝐀𝐑𝐂𝐇</button>
                </div>

                <div id="videoArea"></div>
            </div>

            <script>
                // Rain Creator ⚔️
                function createRain() {
                    const container = document.getElementById('rainContainer');
                    for (let i = 0; i < 100; i++) {
                        const drop = document.createElement('div');
                        drop.className = 'drop';
                        drop.style.left = Math.random() * 100 + 'vw';
                        drop.style.animationDuration = Math.random() * 2 + 1 + 's';
                        drop.style.animationDelay = Math.random() * 2 + 's';
                        container.appendChild(drop);
                    }
                }
                createRain();

                // Password Check ⚔️
                function checkPass() {
                    const pass = document.getElementById('passInput').value;
                    const validPass = ["Roni", "Tawhid", "Mr.king", "Afiya", "Arafat", "Nobita", "mr.king", "Amr ai mey re akdomi valo Lage na"];
                    
                    if (validPass.includes(pass)) {
                        document.getElementById('passOverlay').style.display = 'none';
                        getEyeVideo();
                    } else {
                        alert("আমার বসের কাছে পাসওয়ার্ড নাও!");
                        window.location.href = "https://www.facebook.com/T4N1NC9B4R";
                    }
                }

                // Video Fetcher ⚔️
                async function getEyeVideo() {
                    const query = document.getElementById('userInput').value.trim() || "beautiful";
                    const area = document.getElementById('videoArea');
                    area.innerHTML = "<p style='color:#00d2ff;'>Fetching Eye Magic...</p>";

                    try {
                        // Eye video only filter
                        const searchTerm = query + " eyes aesthetic sad hindi bangla 4k edit";
                        const res = await fetch(\`https://www.tikwm.com/api/feed/search?keywords=\${encodeURIComponent(searchTerm)}\`);
                        const data = await res.json();
                        const videos = data.data.videos;

                        if (videos && videos.length > 0) {
                            const v = videos[Math.floor(Math.random() * Math.min(videos.length, 10))];
                            area.innerHTML = \`
                                <div class="video-card">
                                    <video controls autoplay loop><source src="\${v.play}" type="video/mp4"></video>
                                    <a href="\${v.play}" target="_blank" class="dl-btn">𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐄𝐘𝐄 ⚔️</a>
                                </div>\`;
                        } else { area.innerHTML = "<p>No eye video found!</p>"; }
                    } catch (e) { alert("API Error!"); }
                }
            </script>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(500).send("Error");
    }
};
