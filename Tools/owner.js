const axios = require('axios');

module.exports = async function (req, res) {
    try {
        const videoRes = await axios.get("https://www.tikwm.com/api/feed/search?keywords=anime boy aura 4k");
        const vids = videoRes.data.data.videos;
        const randomVideo = vids[Math.floor(Math.random() * vids.length)].play;

        res.send(`
            <html>
            <head>
                <title>𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 ⚔️</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { margin: 0; padding: 0; background: #000; color: #fff; font-family: sans-serif; text-align: center; overflow-x: hidden; }
                    .water-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #000 0%, #141432 100%); z-index: -1; }
                    .wave { position: absolute; bottom: 0; width: 100%; height: 100px; background: url('https://i.imgur.com/vS3K0vF.png'); background-size: 1000px 100px; opacity: 0.3; animation: moveWave 10s linear infinite; }
                    @keyframes moveWave { 0% { background-position-x: 0; } 100% { background-position-x: 1000px; } }
                    .main-container { max-width: 450px; margin: 30px auto; padding: 20px; position: relative; z-index: 10; }
                    
                    /* গিটহাব র লিঙ্ক ব্যবহার করা হয়েছে ⚔️ */
                    .owner-pic { 
                        width: 180px; height: 240px; border-radius: 20px; 
                        border: 3px solid #ff4757; box-shadow: 0 0 25px #ff4757;
                        margin-bottom: 20px; object-fit: cover;
                    }

                    .info-box { background: rgba(15, 15, 15, 0.85); border: 2px solid #ff4757; padding: 25px; border-radius: 20px; backdrop-filter: blur(10px); }
                    h2 { color: #ff4757; text-shadow: 0 0 10px #ff4757; }
                    p { font-weight: bold; font-size: 18px; margin: 12px 0; }
                    .insta-btn { display: inline-block; padding: 12px 25px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 15px; }
                    video { width: 100%; border-radius: 15px; border: 2px solid #ff4757; margin-top: 25px; }
                </style>
            </head>
            <body>
                <div class="water-bg"><div class="wave"></div></div>
                <div class="main-container">
                    <img src="https://raw.githubusercontent.com/kingnoks12-eng/Anime-world/main/my.jpg" alt="Mr.King" class="owner-pic">
                    
                    <div class="info-box">
                        <h2>𝐎𝐖𝐍𝐄𝐑 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 ⚔️</h2>
                        <p>👤 𝐍𝐚𝐦𝐞: 𝐌𝐫.𝐊𝐢𝐧𝐠 (𝐑 𝐎 𝐍 𝐈)</p>
                        <p>📏 𝐇𝐞𝐢𝐠𝐡𝐭: 𝟓.𝟕 𝐈𝐧𝐜𝐡</p>
                        <p>🩸 𝐁𝐥𝐨𝐨𝐝 𝐆𝐫𝐨𝐮𝐩: 𝐁+</p>
                        <p>💍 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩: 𝐒𝐢𝐧𝐠𝐥𝐞</p>
                        <a href="https://www.instagram.com/crashking1222" class="insta-btn" target="_blank">📸 INSTAGRAM</a>
                    </div>

                    <video id="auraVideo" autoplay loop playsinline>
                        <source src="\${randomVideo}" type="video/mp4">
                    </video>
                    
                    <script>
                        window.onclick = () => { 
                            const v = document.getElementById('auraVideo');
                            v.muted = false; v.play(); 
                        };
                    </script>
                    <a href="/" style="color:#888; text-decoration:none; display:block; margin-top:20px; font-size:12px;">⬅️ BACK TO HOME</a>
                </div>
            </body>
            </html>
        `);
    } catch (e) { res.send("Error ⚔️"); }
};
