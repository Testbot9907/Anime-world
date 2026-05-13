const axios = require("axios");

module.exports = async function (req, res) {
    try {
        // ভিডিও কিওয়ার্ডস এবং ক্যাপশন লজিক
        const brokenTags = [
            "sad shayari status video", "broken heart status bangla",
            "sad lofi song edit", "sad lyrics status", "anime sad broken edit"
        ];
        
        const brokenCaptions = [
            "\"মাঝে মাঝে নিজেকে খুব একা মনে হয়, যেন এই পৃথিবীতে আমার কেউ নেই।\"",
            "\"স্বপ্নগুলো আজ কাঁচের মতো ভেঙে চুরমার হয়ে গেছে।\"",
            "\"ভালোবাসা মানেই কি শুধু অবহেলা আর চোখের জল?\""
        ];

        // API Logic: সার্চ বা র‍্যান্ডম ভিডিও আনা
        if (req.query.get === 'video') {
            let searchQuery = req.query.q;
            let finalTag;

            if (searchQuery) {
                // ইউজার যা-ই সার্চ করুক, সাথে স্যাড কিওয়ার্ড যোগ হবে
                finalTag = searchQuery + " hindi bangla anime sad status broken";
            } else {
                finalTag = brokenTags[Math.floor(Math.random() * brokenTags.length)];
            }

            const tikRes = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(finalTag)}`);
            const videos = tikRes.data?.data?.videos;
            
            if (!videos || videos.length === 0) return res.json({ error: true });

            const selected = videos[Math.floor(Math.random() * videos.length)];
            const randomQuote = brokenCaptions[Math.floor(Math.random() * brokenCaptions.length)];
            
            return res.json({ url: selected.play, quote: randomQuote });
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐁𝐫𝐨𝐤𝐞𝐧 𝐯𝐢𝐝𝐞𝐨𝐬 💔</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff; position: relative;
                }

                #rain-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }

                .container {
                    width: 90%; max-width: 380px; background: rgba(0, 0, 0, 0.85);
                    padding: 20px; border-radius: 20px; border: 2px solid #ff0000;
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.4); text-align: center; 
                    z-index: 10; backdrop-filter: blur(8px);
                }

                h1 { color: #ff0000; margin-bottom: 10px; font-size: 20px; text-shadow: 0 0 10px #ff0000; }
                
                /* Search Bar Style */
                .search-box {
                    display: flex; gap: 5px; margin-bottom: 15px;
                }
                #search-input {
                    flex: 1; background: #111; border: 1px solid #ff0000;
                    color: #fff; padding: 8px; border-radius: 5px; outline: none; font-size: 12px;
                }

                #quote-text {
                    font-size: 12px; color: #ccc; margin-bottom: 10px; font-style: italic;
                    min-height: 35px; display: block;
                }

                video {
                    width: 100%; border-radius: 12px; border: 1px solid #ff0000;
                    box-shadow: 0 0 20px rgba(255, 0, 0, 0.2); max-height: 45vh; object-fit: cover;
                }

                .btn {
                    display: inline-block; margin-top: 15px; background: #ff0000;
                    color: #fff; padding: 10px; border-radius: 50px;
                    font-size: 14px; cursor: pointer; transition: 0.3s; 
                    box-shadow: 0 0 10px #ff0000; border: none; width: 100%;
                }
                .btn:hover { transform: scale(1.02); }

                .footer { margin-top: 15px; font-size: 10px; color: #666; }
            </style>
        </head>
        <body>
            <canvas id="rain-canvas"></canvas>
            
            <div class="container">
                <h1>𝐁𝐫𝐨𝐤𝐞𝐧 𝐯𝐢𝐝𝐞𝐨𝐬 💔</h1>
                
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="সার্চ করুন (যেমন: অরিজিৎ সিং)...">
                    <button onclick="loadVideo(true)" style="background:#ff0000; border:none; padding:0 10px; border-radius:5px; cursor:pointer;">🔍</button>
                </div>

                <span id="quote-text">⚡ Loading vibe...</span>
                <video id="vid-player" controls autoplay loop></video>

                <button onclick="loadVideo(false)" class="btn">𝐍𝐄𝐗𝐓 𝐒𝐀𝐃 𝐕𝐈𝐁𝐄 💔</button>
                <div class="footer">𝐒𝐲𝐬𝐭𝐞ম 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</div>
            </div>

            <script>
                // Matrix Rain Logic
                const canvas = document.getElementById("rain-canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const characters = "💔01SAD💔";
                const matrix = characters.split("");
                const font_size = 14;
                const columns = canvas.width / font_size;
                const drops = [];
                for (let x = 0; x < columns; x++) { drops[x] = 1; }

                function draw() {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#ff0000"; 
                    ctx.font = font_size + "px 'Courier New'";
                    for (let i = 0; i < drops.length; i++) {
                        const text = matrix[Math.floor(Math.random() * matrix.length)];
                        ctx.fillText(text, i * font_size, drops[i] * font_size);
                        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
                        drops[i]++;
                    }
                }
                setInterval(draw, 50);

                // Video loading logic with Search
                async function loadVideo(isSearch) {
                    const btn = document.querySelector('.btn');
                    const searchVal = document.getElementById('search-input').value;
                    btn.innerText = "⚡ Loading...";
                    
                    let url = window.location.pathname + '?get=video';
                    if (isSearch && searchVal) url += '&q=' + encodeURIComponent(searchVal);

                    try {
                        const res = await fetch(url);
                        const data = await res.json();
                        if(data.error) return alert("কিছু পাওয়া যায়নি বস!");
                        document.getElementById('vid-player').src = data.url;
                        document.getElementById('quote-text').innerText = data.quote;
                    } catch(e) { alert("Server Busy!"); }
                    btn.innerText = "𝐍𝐄𝐗𝐓 𝐒𝐀𝐃 𝐕𝐈𝐁𝐄 💔";
                }
                loadVideo(false);
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("Broken Heart Error!");
    }
};
