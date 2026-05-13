const axios = require("axios");

module.exports = async function (req, res) {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> 𝐌𝐔𝐒𝐈𝐂 𝐒𝐘𝐒𝐓𝐄𝐌 </title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; font-family: 'Segoe UI', sans-serif;
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    overflow: hidden; color: #fff;
                }

                #bg-video {
                    position: fixed; right: 0; bottom: 0;
                    min-width: 100%; min-height: 100%;
                    z-index: -2; object-fit: cover; filter: brightness(0.3);
                }

                .container {
                    width: 90%; max-width: 400px; background: rgba(0, 0, 0, 0.85);
                    padding: 30px; border-radius: 20px; border: 2px solid #00ff00;
                    box-shadow: 0 0 30px rgba(0, 255, 0, 0.4);
                    text-align: center; z-index: 1; backdrop-filter: blur(15px);
                }

                h1 { color: #00ff00; text-shadow: 0 0 10px #00ff00; margin-bottom: 25px; font-size: 24px; }

                input {
                    width: 100%; background: #111; border: 1px solid #00ff00;
                    color: #fff; padding: 14px; border-radius: 10px; outline: none;
                    margin-bottom: 15px; font-size: 14px; text-align: center;
                }

                .btn {
                    width: 100%; background: #00ff00; color: #000; border: none;
                    padding: 14px; border-radius: 10px; cursor: pointer; font-size: 16px;
                    transition: 0.3s; box-shadow: 0 0 10px #00ff00;
                }

                .sound-ctrl {
                    position: fixed; top: 20px; right: 20px; z-index: 10;
                    background: rgba(0, 255, 0, 0.1); border: 1px solid #00ff00;
                    color: #00ff00; padding: 10px 15px; border-radius: 50px; cursor: pointer;
                }

                #login-sec { display: block; }
                #tool-sec { display: none; }
                #status { display: none; margin: 15px 0; color: #ffff00; font-size: 13px; }
                #result { display: none; margin-top: 20px; }
                
                audio { width: 100%; margin-top: 10px; filter: invert(1); }
            </style>
        </head>
        <body>

            <video autoplay loop id="bg-video" muted>
                <source src="https://files.catbox.moe/oox3u0.mp4" type="video/mp4">
            </video>

            <button class="sound-ctrl" onclick="toggleSound()" id="sound-btn">🔇 𝐒𝐎𝐔𝐍𝐃: 𝐎𝐅𝐅</button>

            <div class="container" id="login-sec">
                <h1>𝐒𝐘𝐒𝐓𝐄𝐌 𝐋𝐎𝐆𝐈𝐍 </h1>
                <input type="password" id="pass-input" placeholder="Enter Admin Password...">
                <button class="btn" onclick="checkPass()">𝐀𝐂𝐂𝐄𝐒𝐒 𝐒𝐈𝐍𝐆 ⚔️</button>
            </div>

            <div class="container" id="tool-sec">
                <h1> 𝐒𝐈𝐍𝐆 </h1>
                
                <input type="text" id="song-name" placeholder="Enter Song Name or Lyrics...">
                
                <button class="btn" onclick="generateMusic()">𝐏𝐋𝐀𝐘 𝐌𝐔𝐒𝐈𝐂 ⚔️</button>

                <div id="status">⏳ 𝐒𝐞𝐚𝐫𝐜𝐡𝐢𝐧𝐠 & 𝐋𝐨𝐚𝐝𝐢𝐧𝐠...</div>

                <div id="result">
                    <p id="playing-title" style="font-size: 14px; color: #00ff00; margin-bottom: 10px;"></p>
                    <audio id="audio-player" controls></audio>
                </div>
            </div>

            <script>
                const video = document.getElementById('bg-video');
                const validPasswords = ["nom nom", "arafat00", "mr.king@#"];

                function toggleSound() {
                    video.muted = !video.muted;
                    document.getElementById('sound-btn').innerText = video.muted ? "🔇 𝐒𝐎𝐔𝐍𝐃: 𝐎𝐅𝐅" : "🔊 𝐒𝐎𝐔𝐍𝐃: 𝐎𝐍";
                }

                function checkPass() {
                    const input = document.getElementById('pass-input').value;
                    if (validPasswords.includes(input.toLowerCase())) {
                        document.getElementById('login-sec').style.display = 'none';
                        document.getElementById('tool-sec').style.display = 'block';
                    } else {
                        alert("Access Denied!");
                    }
                }

                async function generateMusic() {
                    const songName = document.getElementById('song-name').value.trim();
                    const status = document.getElementById('status');
                    const resDiv = document.getElementById('result');
                    const audio = document.getElementById('audio-player');

                    if (!songName) return alert("গানের নাম দিন বস!");

                    status.style.display = "block";
                    resDiv.style.display = "none";

                    try {
                        const baseRes = await fetch("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
                        const baseData = await baseRes.json();
                        const base = baseData.mahmud.replace(/\\/$/, "");

                        // Using Mahmud's Music/Sing API ⚔️
                        const musicUrl = \`\${base}/api/sing?text=\${encodeURIComponent(songName)}\`;
                        
                        audio.src = musicUrl;
                        document.getElementById('playing-title').innerText = "Now Playing: " + songName;

                        audio.oncanplay = () => {
                            status.style.display = "none";
                            resDiv.style.display = "block";
                            audio.play();
                        };

                        audio.onerror = () => {
                            throw new Error();
                        };

                    } catch (e) {
                        status.style.display = "none";
                        alert("গানটি পাওয়া যায়নি বা সার্ভার এরর!");
                    }
                }
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("Error");
    }
};
