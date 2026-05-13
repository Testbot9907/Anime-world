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
            <title>𝐌𝐄𝐌𝐄 𝐕𝐈𝐃𝐄𝐎 𝐇𝐔𝐁 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; color: #fff; font-family: 'Segoe UI', sans-serif; 
                    display: flex; flex-direction: column; align-items: center; padding: 20px;
                    overflow-x: hidden; min-height: 100vh; position: relative;
                }
                body::before {
                    content: ""; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
                    background: conic-gradient(transparent, #bc13fe, transparent 30%);
                    animation: rotateDJ 4s linear infinite; z-index: -1; opacity: 0.3;
                }
                @keyframes rotateDJ { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                h1 { color: #bc13fe; text-shadow: 0 0 20px #bc13fe; margin: 20px 0 5px; font-size: 24px; }
                .sub { color: #888; font-size: 11px; margin-bottom: 25px; }
                .search-box {
                    width: 100%; max-width: 400px; background: rgba(20, 20, 20, 0.9);
                    padding: 8px; border-radius: 50px; border: 2px solid #bc13fe;
                    display: flex; align-items: center; margin-bottom: 25px;
                    box-shadow: 0 0 15px rgba(188, 19, 254, 0.4);
                }
                input { flex: 1; background: transparent; border: none; color: #fff; padding: 10px 15px; font-size: 15px; outline: none; }
                .search-btn { background: #bc13fe; color: #fff; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; }
                #videoArea { width: 100%; max-width: 380px; }
                .video-card {
                    background: #000; border-radius: 20px; overflow: hidden;
                    border: 2px solid #bc13fe; box-shadow: 0 0 25px rgba(188, 19, 254, 0.5);
                }
                video { width: 100%; display: block; max-height: 60vh; border-bottom: 3px solid #bc13fe; }
                .dl-btn { width: 100%; padding: 15px; background: #bc13fe; color: #fff; text-align: center; text-decoration: none; display: block; font-size: 16px; }
                #loader { display: none; color: #bc13fe; margin-bottom: 15px; }
            </style>
        </head>
        <body>
            <h1>𝐌𝐄𝐌𝐄 𝐕𝐈𝐃𝐄𝐎 𝐇𝐔𝐁 ⚔️</h1>
            <p class="sub">🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 ⚔️</p>
            <div class="search-box">
                <input type="text" id="userInput" placeholder="Type what meme you want..." autocomplete="off">
                <button class="search-btn" onclick="getSingleMeme()">𝐒𝐄𝐀𝐑𝐂𝐇</button>
            </div>
            <div id="loader">👶🏼👈🏼 𝐅𝐞𝐭𝐜𝐡𝐢𝐧𝐠 𝐓𝐨𝐩 𝐐𝐮𝐚𝐥𝐢𝐭𝐲 𝐌𝐞𝐦𝐞...</div>
            <div id="videoArea"></div>
            <script>
                async function getSingleMeme() {
                    const query = document.getElementById('userInput').value.trim() || "funny memes";
                    const area = document.getElementById('videoArea');
                    const loader = document.getElementById('loader');
                    loader.style.display = 'block'; area.innerHTML = "";
                    try {
                        const res = await fetch(\`https://www.tikwm.com/api/feed/search?keywords=\${encodeURIComponent(query + " funny memes 4k")}\`);
                        const data = await res.json();
                        const videos = data.data.videos;
                        loader.style.display = 'none';
                        if (videos && videos.length > 0) {
                            const selected = videos[Math.floor(Math.random() * Math.min(videos.length, 10))];
                            area.innerHTML = \`
                                <div class="video-card">
                                    <video controls autoplay loop><source src="\${selected.play}" type="video/mp4"></video>
                                    <a href="\${selected.play}" target="_blank" class="dl-btn">𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐌𝐄 ⚔️</a>
                                </div>\`;
                        } else { area.innerHTML = "<p>No Meme Found!</p>"; }
                    } catch (e) { loader.style.display = 'none'; alert("API Error!"); }
                }
                window.onload = getSingleMeme;
            </script>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};
