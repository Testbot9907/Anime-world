// 𝦖 System By: Mr.King ⚔️
const axios = require("axios");

module.exports = async function (req, res) {
    const query = req.query.search;

    // সার্চ না করলে ইনপুট বক্স দেখাবে ⚔️
    if (!query) {
        return res.send(`
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { margin: 0; padding: 0; background: #000; color: #fff; font-family: 'Segoe UI', sans-serif; overflow: hidden; }
                    
                    /* Star Moving Animation ⚔️ */
                    .stars-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%); }
                    .star { position: absolute; background: white; border-radius: 50%; opacity: 0.5; animation: moveStars linear infinite; }
                    @keyframes moveStars { from { transform: translateY(0px); } to { transform: translateY(-1000px); } }

                    .search-container { position: relative; z-index: 10; max-width: 450px; margin: 80px auto; padding: 30px; text-align: center; border-radius: 25px; background: rgba(0, 0, 0, 0.7); border: 2px solid #ff4757; box-shadow: 0 0 20px rgba(255, 71, 87, 0.4); backdrop-filter: blur(5px); }
                    h2 { color: #ff4757; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 25px; }
                    input { width: 85%; padding: 15px; border-radius: 12px; border: 1px solid #ff4757; background: rgba(0,0,0,0.5); color: #fff; outline: none; margin-bottom: 20px; font-weight: bold; }
                    button { background: linear-gradient(45deg, #ff4757, #ff6b81); color: #fff; padding: 15px 30px; border: none; border-radius: 12px; cursor: pointer; font-weight: bold; width: 100%; transition: 0.3s; }
                    button:hover { transform: scale(1.05); box-shadow: 0 0 15px #ff4757; }
                </style>
            </head>
            <body>
                <div class="stars-container" id="stars"></div>
                <div class="search-container">
                    <h2>🎧 𝐋𝐘𝐑𝐈𝐂𝐒 𝐒𝐓𝐀𝐓𝐔𝐒 🎼</h2>
                    <form action="/tools/lyrics" method="GET">
                        <input type="text" name="search" placeholder="Enter Song Name (e.g. Oporadhi)" required>
                        <button type="submit">🎬 GET LYRIC VIDEO</button>
                    </form>
                    <a href="/" style="color:#666; text-decoration:none; font-size:12px; display:block; margin-top:20px;">⬅️ BACK TO HOME</a>
                </div>

                <script>
                    // স্টার জেনারেটর ⚔️
                    const starsWrap = document.getElementById('stars');
                    for (let i = 0; i < 100; i++) {
                        const star = document.createElement('div');
                        star.className = 'star';
                        const size = Math.random() * 3 + 'px';
                        star.style.width = size;
                        star.style.height = size;
                        star.style.left = Math.random() * 100 + '%';
                        star.style.top = Math.random() * 100 + '%';
                        star.style.animationDuration = (Math.random() * 5 + 3) + 's';
                        starsWrap.appendChild(star);
                    }
                </script>
            </body>
            </html>
        `);
    }

    try {
        // লিরিক্স ভিডিওর জন্য এপিআই সার্চ ⚔️
        const finalQuery = `${query} lyrics status video 4k`;
        const resSearch = await axios.get(`https://lyric-search-neon.vercel.app/kshitiz?keyword=${encodeURIComponent(finalQuery)}`);
        const videoList = resSearch.data;

        if (!videoList || videoList.length === 0) {
            return res.send("<h2>⚠️ No lyrics video found!</h2><a href='/tools/lyrics' style='color:#ff4757'>Try Again</a>");
        }

        const selectedVideo = videoList[Math.floor(Math.random() * Math.min(videoList.length, 5))];
        const videoUrl = selectedVideo.videoUrl;

        res.send(`
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { background: #000; color: #fff; font-family: sans-serif; text-align: center; padding: 20px; }
                    .video-card { max-width: 450px; margin: auto; padding: 20px; background: rgba(15,15,15,0.9); border: 2px solid #ff4757; border-radius: 20px; box-shadow: 0 0 20px #ff4757; }
                    video { width: 100%; border-radius: 15px; border: 1px solid #ff4757; margin: 20px 0; }
                    .btn { display: inline-block; background: #ff4757; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 5px; }
                </style>
            </head>
            <body>
                <div class="video-card">
                    <h3 style="color:#ff4757">✅ 𝐋𝐲𝐫𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 𝐑𝐞𝐚𝐝𝐲 ⚔️</h3>
                    <video controls autoplay loop>
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                    <p style="font-size:14px; color:#888;">Search: ${query}</p>
                    <a href="${videoUrl}" download class="btn">📥 DOWNLOAD</a>
                    <a href="/tools/lyrics" class="btn" style="background:#333;">🔍 SEARCH AGAIN</a>
                </div>
                <p style="margin-top:20px; color:#444;">🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</p>
            </body>
            </html>
        `);

    } catch (err) {
        res.status(500).send("<h2>❌ API Error!</h2><a href='/tools/lyrics'>Try Again</a>");
    }
};
          
