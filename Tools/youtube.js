const axios = require("axios");

module.exports = async function (req, res) {
    try {
        // আপনার দেওয়া GitHub Base API URL লজিক
        const baseApiUrl = async () => {
            const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
            return base.data.api;
        };

        // যদি সার্চ বা ডাউনলোডের রিকোয়েস্ট আসে
        if (req.query.search) {
            const baseUrl = await baseApiUrl();
            const result = (await axios.get(`${baseUrl}/ytFullSearch?songName=${encodeURIComponent(req.query.search)}`)).data.slice(0, 8);
            return res.json(result);
        }

        if (req.query.dl) {
            const baseUrl = await baseApiUrl();
            const format = req.query.format || 'mp4';
            const vidId = req.query.dl;
            const dlRes = await axios.get(`${baseUrl}/ytDl3?link=${vidId}&format=${format}&quality=3`);
            return res.json(dlRes.data);
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    min-height: 100vh; display: flex; align-items: center; justify-content: center;
                    color: #fff; overflow-x: hidden; padding: 20px;
                }
                #rain-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }

                .container {
                    width: 100%; max-width: 500px; background: rgba(0, 0, 0, 0.9);
                    padding: 25px; border-radius: 20px; border: 2px solid #ff0000;
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.4); text-align: center; z-index: 10;
                }
                h1 { color: #ff0000; margin-bottom: 20px; text-shadow: 0 0 10px #ff0000; }

                .search-box { display: flex; gap: 10px; margin-bottom: 20px; }
                input { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #ff0000; background: #111; color: #fff; outline: none; }
                .btn { background: #ff0000; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; transition: 0.3s; }
                .btn:hover { background: #cc0000; transform: scale(1.05); }

                #results { display: grid; grid-template-columns: 1fr; gap: 15px; max-height: 400px; overflow-y: auto; padding-right: 5px; }
                .video-card { background: #111; border: 1px solid #333; padding: 10px; border-radius: 10px; display: flex; align-items: center; gap: 10px; text-align: left; }
                .video-card img { width: 80px; border-radius: 5px; }
                .video-info { flex: 1; }
                .video-info p { font-size: 12px; color: #ccc; margin-bottom: 5px; }
                .dl-btns { display: flex; gap: 5px; }
                .dl-btns button { font-size: 10px; padding: 5px; }

                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-thumb { background: #ff0000; border-radius: 10px; }
            </style>
        </head>
        <body>
            <canvas id="rain-canvas"></canvas>
            <div class="container">
                <h1>𝐘𝐎𝐔𝐓𝐔𝐁𝐄 ⚔️</h1>
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="গান বা ভিডিওর নাম লিখুন...">
                    <button class="btn" onclick="searchYtb()">🔍</button>
                </div>
                <div id="results"></div>
                <div style="margin-top:20px; font-size:10px; color:#555">𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</div>
            </div>

            <script>
                // Matrix Rain
                const canvas = document.getElementById("rain-canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = window.innerWidth; canvas.height = window.innerHeight;
                const characters = "0101YTBPURE01";
                const matrix = characters.split("");
                const font_size = 14;
                const columns = canvas.width / font_size;
                const drops = [];
                for (let x = 0; x < columns; x++) drops[x] = 1;
                function draw() {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#ff0000"; ctx.font = font_size + "px serif";
                    for (let i = 0; i < drops.length; i++) {
                        const text = matrix[Math.floor(Math.random() * matrix.length)];
                        ctx.fillText(text, i * font_size, drops[i] * font_size);
                        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) drops[i] = 0;
                        drops[i]++;
                    }
                }
                setInterval(draw, 50);

                // Search & Download Logic
                async function searchYtb() {
                    const query = document.getElementById('search-input').value;
                    if(!query) return alert("কিছু তো লিখুন বস!");
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = "<p>⏳ সার্চ হচ্ছে...</p>";

                    const res = await fetch(window.location.pathname + '?search=' + encodeURIComponent(query));
                    const data = await res.json();
                    resultsDiv.innerHTML = "";
                    
                    data.forEach(vid => {
                        resultsDiv.innerHTML += \`
                            <div class="video-card">
                                <img src="\${vid.thumbnail}" alt="thumb">
                                <div class="video-info">
                                    <p style="font-size:11px; color:#fff">\${vid.title.substring(0,40)}...</p>
                                    <div class="dl-btns">
                                        <button class="btn" onclick="downloadVid('\${vid.id}', 'mp4')">📹 Video</button>
                                        <button class="btn" style="background:#fff; color:#000" onclick="downloadVid('\${vid.id}', 'mp3')">🎵 Audio</button>
                                    </div>
                                </div>
                            </div>
                        \`;
                    });
                }

                async function downloadVid(id, format) {
                    alert("ডাউনলোড লিঙ্ক জেনারেট হচ্ছে, একটু অপেক্ষা করুন...");
                    const res = await fetch(window.location.pathname + '?dl=' + id + '&format=' + format);
                    const data = await res.json();
                    if(data.downloadLink) {
                        window.open(data.downloadLink, '_blank');
                    } else {
                        alert("ডাউনলোড লিঙ্ক পাওয়া যায়নি!");
                    }
                }
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("YT Server Error!");
    }
};
