const axios = require("axios");

const baseApiUrl = async () => {
    const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
    return base.data.mahmud;
};

module.exports = async function (req, res) {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐀𝐋𝐋-𝐈𝐍-𝐎𝐍𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; color: #fff; font-family: 'Segoe UI', sans-serif;
                    display: flex; flex-direction: column; align-items: center; padding: 20px;
                    min-height: 100vh;
                }
                
                h1 { color: #00d2ff; text-shadow: 0 0 20px #00d2ff; margin: 30px 0; font-size: 24px; text-align: center; }

                .main-box {
                    width: 100%; max-width: 450px; background: #0a0a0a;
                    padding: 20px; border-radius: 15px; border: 2px solid #00d2ff;
                    box-shadow: 0 0 25px rgba(0, 210, 255, 0.2);
                }
                
                input { 
                    width: 100%; background: #111; border: 1px solid #333; color: #fff; 
                    padding: 15px; border-radius: 10px; outline: none; margin-bottom: 20px;
                    font-size: 14px;
                }
                
                .btn { 
                    width: 100%; background: #00d2ff; color: #000; border: none; 
                    padding: 15px; border-radius: 10px; cursor: pointer; font-size: 16px;
                    transition: 0.3s;
                }
                .btn:active { transform: scale(0.98); }

                #status { display: none; margin: 20px 0; color: #eccc68; font-size: 14px; }

                #result-area { display: none; margin-top: 30px; width: 100%; max-width: 450px; text-align: center; }
                video { width: 100%; border-radius: 12px; border: 2px solid #00d2ff; margin-bottom: 20px; }
                
                .dl-now { 
                    display: block; background: #00ff00; color: #000; padding: 15px; 
                    text-decoration: none; border-radius: 10px; font-size: 15px;
                }
                
                .footer { color: #444; font-size: 10px; margin-top: 40px; letter-spacing: 1px; }
            </style>
        </head>
        <body>

            <h1>𝐀𝐋𝐋-𝐈𝐍-𝐎𝐍𝐄 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 ⚔️</h1>

            <div class="main-box">
                <input type="text" id="videoUrl" placeholder="Paste Video Link (FB, TT, YT, IG)..." autocomplete="off">
                <button class="btn" onclick="downloadVideo()">𝐒𝐓𝐀𝐑𝐓 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 ⚔️</button>
            </div>

            <div id="status">⏳ 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠... 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭, 𝐁𝐨𝐬𝐬!</div>

            <div id="result-area">
                <video id="v-player" controls></video>
                <a id="v-link" href="#" target="_blank" class="dl-now">𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐕𝐈𝐃𝐄𝐎 𝐍𝐎𝐖 ⚔️</a>
            </div>

            <div class="footer">𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 ⚔️</div>

            <script>
                async function downloadVideo() {
                    const url = document.getElementById('videoUrl').value.trim();
                    if (!url) return alert("বস, লিঙ্কটা তো দিন!");

                    const status = document.getElementById('status');
                    const resArea = document.getElementById('result-area');
                    const player = document.getElementById('v-player');
                    const link = document.getElementById('v-link');

                    status.style.display = "block";
                    resArea.style.display = "none";

                    try {
                        // Fetching Base API from the script logic
                        const baseRes = await fetch("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
                        const baseData = await baseRes.json();
                        const base = baseData.mahmud;

                        const apiUrl = \`\${base}/api/download/video?link=\${encodeURIComponent(url)}\`;
                        
                        // We use the direct URL for the player
                        player.src = apiUrl;
                        link.href = apiUrl;

                        // Check if the link is valid by trying to load it
                        player.onloadeddata = () => {
                            status.style.display = "none";
                            resArea.style.display = "block";
                        };

                        player.onerror = () => {
                            throw new Error();
                        };

                    } catch (e) {
                        status.style.display = "none";
                        alert("ডাউনলোড করতে সমস্যা হয়েছে! সঠিক লিঙ্ক দিয়েছেন তো?");
                    }
                }
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("Server Error");
    }
};
