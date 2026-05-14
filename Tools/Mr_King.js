const axios = require("axios");

module.exports = async function (req, res) {
    try {
        // পাসওয়ার্ড এবং এপিআই সেটিংস
        const allowedPasswords = ["Mr.king", "Tawhid", "Roni", "R O Ni", "mr.king"];
        const auraTags = ["Car 4k edit", "anime 4k aura", "anime aura", "bike aura", "ego aura edit"];
        
        // এপিআই থেকে ভিডিও আনার লজিক (আপনার ভিডিও এপিআই এর আদলে)
        if (req.query.get === 'video') {
            const pass = req.query.p;
            if (!allowedPasswords.includes(pass)) return res.json({ error: "Unauthorized" });

            let searchQuery = req.query.q;
            // সার্চ করলে বা না করলে সবসময় Aura keywords যুক্ত হবে
            let finalTag = searchQuery ? searchQuery + " 4k aura edit status" : auraTags[Math.floor(Math.random() * auraTags.length)];

            const tikRes = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(finalTag)}`);
            const videos = tikRes.data?.data?.videos;
            
            if (!videos || videos.length === 0) return res.json({ error: "No video found" });
            const selected = videos[Math.floor(Math.random() * videos.length)];
            return res.json({ url: selected.play });
        }

        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐌𝐑.𝐊𝐈𝐍𝐆 𝐀𝐔𝐑𝐀 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: url('https://files.catbox.moe/h953qb.jpeg') no-repeat center center fixed;
                    background-size: cover; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff;
                }
                .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 1; }

                .container {
                    width: 90%; max-width: 400px; background: rgba(0, 0, 0, 0.8);
                    padding: 30px; border-radius: 20px; border: 2px solid #00ff00;
                    box-shadow: 0 0 30px rgba(0, 255, 0, 0.5); text-align: center; z-index: 10;
                    backdrop-filter: blur(10px);
                }

                #pass-screen { display: block; }
                #video-screen { display: none; }

                input {
                    width: 100%; background: #111; border: 1px solid #00ff00;
                    color: #fff; padding: 12px; border-radius: 10px; margin-bottom: 15px;
                    outline: none; text-align: center;
                }

                .btn {
                    background: #00ff00; color: #000; border: none; padding: 15px;
                    border-radius: 50px; cursor: pointer; width: 100%; box-shadow: 0 0 15px #00ff00;
                    transition: 0.3s; font-size: 16px;
                }
                .btn:hover { transform: scale(1.05); }

                video {
                    width: 100%; border-radius: 15px; border: 1px solid #00ff00;
                    margin-top: 15px; max-height: 50vh; object-fit: cover;
                }
                .footer { margin-top: 20px; font-size: 10px; color: #aaa; }
            </style>
        </head>
        <body>
            <div class="overlay"></div>
            
            <div class="container" id="pass-screen">
                <h1 style="color:#00ff00; margin-bottom:20px">𝐀𝐔𝐓𝐇𝐄𝐍𝐓𝐈𝐂𝐀𝐓𝐈𝐎𝐍</h1>
                <input type="password" id="pass-input" placeholder="Enter Secret Password...">
                <button class="btn" onclick="checkPass()">𝐔𝐍𝐋𝐎𝐂𝐊 𝐀𝐔𝐑𝐀 ⚔️</button>
            </div>

            <div class="container" id="video-screen">
                <h1 style="color:#00ff00; margin-bottom:10px">𝐌𝐑.𝐊𝐈𝐍𝐆 𝐀𝐔𝐑𝐀 ⚔️</h1>
                <input type="text" id="search-input" placeholder="Search Aura (Car, Bike, Anime)...">
                <button class="btn" style="padding:8px" onclick="loadVideo(true)">𝐒𝐄𝐀𝐑𝐂𝐇 𝐀𝐔𝐑𝐀</button>
                
                <video id="vid-player" controls autoplay loop></video>
                <button class="btn" style="margin-top:15px" onclick="loadVideo(false)">𝐍𝐄𝐗𝐓 𝐀𝐔𝐑𝐀 ⚔️</button>
                <div class="footer">𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</div>
            </div>

            <script>
                let currentPass = "";
                const allowed = ["Mr.king", "Tawhid", "Roni", "R O Ni", "mr.king"];

                function checkPass() {
                    const input = document.getElementById('pass-input').value;
                    if (allowed.includes(input)) {
                        currentPass = input;
                        document.getElementById('pass-screen').style.display = 'none';
                        document.getElementById('video-screen').style.display = 'block';
                        loadVideo(false);
                    } else {
                        alert("ভুল পাসওয়ার্ড বস! ⚔️");
                    }
                }

                async function loadVideo(isSearch) {
                    const searchVal = document.getElementById('search-input').value;
                    let url = window.location.pathname + '?get=video&p=' + encodeURIComponent(currentPass);
                    if (isSearch && searchVal) url += '&q=' + encodeURIComponent(searchVal);

                    try {
                        const res = await fetch(url);
                        const data = await res.json();
                        if(data.error) return alert("Error fetching aura!");
                        document.getElementById('vid-player').src = data.url;
                    } catch(e) { alert("Server Busy!"); }
                }
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("System Error!");
    }
};
