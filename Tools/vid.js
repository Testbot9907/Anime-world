const axios = require("axios");

module.exports = async function (req, res) {
    try {
        // আপনার GitHub-এর Raw লিঙ্ক (Videodata.json ফাইলের জন্য)
        const jsonUrl = "https://raw.githubusercontent.com/kingnoks12-eng/Anime-world/main/Videodata.json";

        // JSON ফাইলটি থেকে ডেটা নিয়ে আসা
        const response = await axios.get(jsonUrl);
        const videoList = response.data.girl;

        if (!videoList || videoList.length === 0) {
            throw new Error("No videos found in JSON");
        }

        // র‍্যান্ডম একটি ভিডিও লিঙ্ক সিলেক্ট করা
        const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];

        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Girls video 🤫</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff; position: relative;
                }

                /* Matrix Rain Canvas */
                #rain-canvas {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
                }

                .container {
                    width: 90%; max-width: 380px; background: rgba(0, 0, 0, 0.85);
                    padding: 20px; border-radius: 20px; border: 2px solid #00ff00;
                    box-shadow: 0 0 30px rgba(0, 255, 0, 0.4); text-align: center; 
                    z-index: 10; backdrop-filter: blur(8px);
                }

                h1 { color: #00ff00; margin-bottom: 15px; font-size: 20px; text-shadow: 0 0 10px #00ff00; }

                video {
                    width: 100%; border-radius: 12px; border: 1px solid #00ff00;
                    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2); max-height: 55vh; object-fit: cover;
                }

                .btn {
                    display: inline-block; margin-top: 20px; background: #00ff00;
                    color: #000; padding: 12px 30px; border-radius: 50px;
                    font-size: 15px; cursor: pointer; transition: 0.3s; 
                    box-shadow: 0 0 15px #00ff00; border: none; width: 100%;
                }
                .btn:hover { box-shadow: 0 0 25px #00ff00; transform: scale(1.03); }

                .footer { margin-top: 15px; font-size: 10px; color: #666; letter-spacing: 1px; }
            </style>
        </head>
        <body>
            <canvas id="rain-canvas"></canvas>
            
            <div class="container">
                <h1>Girls video 🤫</h1>
                
                <video id="vid" controls autoplay loop>
                    <source src="${randomVideo}" type="video/mp4">
                </video>

                <button onclick="location.reload()" class="btn">𝐍𝐄𝐗𝐓 𝐕𝐈𝐃𝐄𝐎 ⚔️</button>
                
                <div class="footer">𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</div>
            </div>

            <script>
                // Hacker Rain Animation
                const canvas = document.getElementById("rain-canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const characters = "01010101⚔️KING⚔️KING⚔️";
                const matrix = characters.split("");
                const font_size = 14;
                const columns = canvas.width / font_size;
                const drops = [];

                for (let x = 0; x < columns; x++) { drops[x] = 1; }

                function draw() {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#00ff00"; 
                    ctx.font = font_size + "px 'Courier New'";

                    for (let i = 0; i < drops.length; i++) {
                        const text = matrix[Math.floor(Math.random() * matrix.length)];
                        ctx.fillText(text, i * font_size, drops[i] * font_size);
                        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
                        drops[i]++;
                    }
                }
                setInterval(draw, 50);
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("System Error boss!");
    }
};
