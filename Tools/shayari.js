const axios = require("axios");

module.exports = async function (req, res) {
    try {
        // শায়ারি কিওয়ার্ডস যা থেকে র‍্যান্ডম সার্চ হবে
        const shayariTags = [
            "sad shayari status video",
            "hindi love shayari 4k edit",
            "bangla sad shayari status",
            "attitude shayari video 4k",
            "romantic shayari status hindi",
            "broken heart shayari 4k"
        ];

        const randomTag = shayariTags[Math.floor(Math.random() * shayariTags.length)];

        // Tikwm API Search Logic (আপনার দেওয়া বটের কোড অনুযায়ী)
        const tikRes = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomTag)}`);
        const videos = tikRes.data?.data?.videos;

        if (!videos || videos.length === 0) throw new Error("No video found");

        // র‍্যান্ডম একটি ভিডিও সিলেক্ট করা
        const selected = videos[Math.floor(Math.random() * videos.length)];
        const videoUrl = selected.play;

        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐒𝐇𝐀𝐘𝐀𝐑𝐈 𝐖𝐎𝐑𝐋𝐃 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff; position: relative;
                }

                /* Rotating Green Neon Border */
                body::before {
                    content: '';
                    position: absolute;
                    width: 200%; height: 200%;
                    background-image: conic-gradient(transparent, transparent, transparent, #00ff00);
                    animation: rotate 4s linear infinite;
                    z-index: -2;
                }
                body::after {
                    content: '';
                    position: absolute;
                    inset: 5px;
                    background: radial-gradient(circle, #000 30%, #050505 100%);
                    z-index: -1;
                }

                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .container {
                    width: 90%; max-width: 400px; background: rgba(0, 0, 0, 0.9);
                    padding: 25px; border-radius: 25px; border: 2px solid #00ff00;
                    box-shadow: 0 0 40px rgba(0, 255, 0, 0.5);
                    text-align: center; z-index: 10; backdrop-filter: blur(15px);
                }

                h1 { color: #00ff00; margin-bottom: 20px; font-size: 22px; text-shadow: 0 0 10px #00ff00; }

                video {
                    width: 100%; border-radius: 15px; border: 1px solid #00ff00;
                    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
                    max-height: 55vh; object-fit: cover;
                }

                .btn {
                    display: inline-block; margin-top: 25px; background: #00ff00;
                    color: #000; padding: 15px 35px; border-radius: 50px;
                    text-decoration: none; font-size: 16px; cursor: pointer;
                    transition: 0.3s; box-shadow: 0 0 15px #00ff00;
                    border: none; outline: none;
                }
                .btn:hover { box-shadow: 0 0 30px #00ff00; transform: scale(1.05); }

                .footer { margin-top: 20px; font-size: 11px; color: #aaa; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>𝐒𝐇𝐀𝐘𝐀𝐑𝐈 𝐕𝐈𝐃𝐄𝐎 ⚔️</h1>
                
                <video controls autoplay loop name="media">
                    <source src="${videoUrl}" type="video/mp4">
                </video>

                <button onclick="location.reload()" class="btn">𝐍𝐄𝐗𝐓 𝐒𝐇𝐀𝐘𝐀𝐑𝐈 ⚔️</button>
                
                <div class="footer">𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖</div>
            </div>
        </body>
        </html>
        `);
    } catch (e) {
        console.error(e);
        res.status(500).send("Tikwm Error: " + e.message);
    }
};
