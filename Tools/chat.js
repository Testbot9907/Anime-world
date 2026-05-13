// 𝦖 System By: Mr.King ⚔️
const axios = require("axios");

module.exports = async function (req, res) {
    const userMsg = req.query.msg;

    // চ্যাট ইন্টারফেস (UI) ⚔️
    if (!userMsg) {
        return res.send(`
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { background: #000; color: #fff; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; overflow-x: hidden; }
                    .chat-container { max-width: 500px; margin: auto; border: 2px solid #ff4757; border-radius: 20px; overflow: hidden; background: rgba(15,15,15,0.9); box-shadow: 0 0 20px #ff4757; }
                    .chat-header { background: #ff4757; padding: 15px; text-align: center; font-weight: bold; font-size: 20px; }
                    .chat-box { height: 400px; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; }
                    .msg { padding: 12px 18px; border-radius: 18px; max-width: 80%; line-height: 1.5; font-weight: bold; font-size: 15px; }
                    .user { background: #333; align-self: flex-end; border-bottom-right-radius: 2px; color: #fff; }
                    .bot { background: #ff4757; align-self: flex-start; border-bottom-left-radius: 2px; color: #fff; }
                    .input-area { padding: 15px; background: #111; display: flex; gap: 10px; border-top: 1px solid #222; }
                    input { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #ff4757; background: #000; color: #fff; outline: none; }
                    button { background: #ff4757; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; transition: 0.3s; }
                    button:active { transform: scale(0.9); }
                </style>
            </head>
            <body>
                <div class="chat-container">
                    <div class="chat-header">🕊️ 𝐇𝐈𝐍𝐀𝐓𝐀 𝐀𝐈 𝐂𝐇𝐀𝐓 ⚔️</div>
                    <div class="chat-box" id="chatBox">
                        <div class="msg bot">Bolo baby, ki bolte chao? ⚔️</div>
                    </div>
                    <form onsubmit="sendMessage(event)" class="input-area">
                        <input type="text" id="userInput" placeholder="Ask Hinata anything..." autocomplete="off" required>
                        <button type="submit">SEND</button>
                    </form>
                </div>
                <p style="text-align:center; color:#444; font-size:12px; margin-top:15px;">🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 ⚔️</p>

                <script>
                    async function sendMessage(e) {
                        e.preventDefault();
                        const input = document.getElementById('userInput');
                        const box = document.getElementById('chatBox');
                        const msg = input.value.trim();
                        if(!msg) return;

                        // ইউজারের মেসেজ অ্যাড করা ⚔️
                        box.innerHTML += '<div class="msg user">' + msg + '</div>';
                        input.value = '';
                        box.scrollTop = box.scrollHeight;

                        // লোডিং সিম্বল ⚔️
                        const loadingId = 'bot-' + Date.now();
                        box.innerHTML += '<div class="msg bot" id="' + loadingId + '">...</div>';
                        box.scrollTop = box.scrollHeight;

                        try {
                            const res = await fetch('/tools/chat?msg=' + encodeURIComponent(msg));
                            const data = await res.text();
                            document.getElementById(loadingId).innerText = data;
                        } catch (err) {
                            document.getElementById(loadingId).innerText = 'Error janu 🥹 API is busy!';
                        }
                        box.scrollTop = box.scrollHeight;
                    }
                </script>
            </body>
            </html>
        `);
    }

    try {
        // ১. আপনার দেওয়া বেস ইউআরএল থেকে এপিআই লিঙ্ক আনা ⚔️
        const baseRes = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        const apiUrl = baseRes.data.mahmud;

        // ২. সরাসরি Hinata API কল করা (ঠিক bby.js এর মতো) ⚔️
        const botRes = await axios.post(`${apiUrl}/api/hinata`, { 
            text: userMsg, 
            style: 3 
        });

        // ৩. এপিআই এর মেইন রেসপন্স মেসেজটি পাঠানো ⚔️
        const response = botRes.data.message || "Bolo baby, ami suntechi... ⚔️";
        res.send(response);

    } catch (err) {
        // এপিআই ডাউন থাকলে বা এরর হলে ⚔️
        res.send("error janu 🥹 API busy ase!");
    }
};
