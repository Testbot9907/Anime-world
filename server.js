const express = require('express');
const axios = require('axios');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 2026;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mr_king_ultra_secret_key',
    resave: false,
    saveUninitialized: true
}));

// ফোল্ডার পাথ ফিক্সড করা হয়েছে (Case Sensitive) ⚔️
const toolsPath = path.join(__dirname, 'Tools');
if (!fs.existsSync(toolsPath)) fs.mkdirSync(toolsPath);

let globalNoti = "Welcome to Anime World! ⚔️ System By: Mr.King";

app.get('/', (req, res) => {
    let tools = [];
    if (fs.existsSync(toolsPath)) {
        tools = fs.readdirSync(toolsPath).filter(file => file.endsWith('.js'));
    }

    // টুলস লিস্টের রেন্ডারিং ফিক্স করা হয়েছে ⚔️
    let toolsHtml = tools.map(t => {
        let name = t.replace('.js', '').toUpperCase();
        return `<a href="/tools/${t.replace('.js', '')}">🛠️ ⚔️ ${name}</a>`;
    }).join('');

    const isAdmin = req.session.isAdmin === true;

    res.send(`
        <html>
        <head>
            <title>𝐀𝐧𝐢𝐦𝐞 𝐖𝐨𝐫𝐥𝐝 ⚔️</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #000; color: #fff; font-family: sans-serif; margin: 0; overflow-x: hidden; }
                canvas { position: fixed; top: 0; left: 0; z-index: -1; width: 100%; height: 100%; }
                .main-box { position: relative; max-width: 450px; margin: 70px auto; background: rgba(10, 10, 10, 0.85); padding: 25px; border-radius: 20px; border: 2px solid #ff4757; text-align: center; backdrop-filter: blur(8px); }
                .noti-bar { background: rgba(255, 71, 87, 0.2); border-bottom: 2px solid #ff4757; padding: 12px; overflow: hidden; white-space: nowrap; position: sticky; top: 0; z-index: 100; }
                .noti-text { display: inline-block; padding-left: 100%; animation: marquee 12s linear infinite; font-weight: bold; color: #00ff00; }
                @keyframes marquee { 0% { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }
                .sidenav { height: 100%; width: 0; position: fixed; z-index: 200; top: 0; left: 0; background-color: #111; overflow-x: hidden; transition: 0.5s; padding-top: 60px; border-right: 2px solid #ff4757; }
                .sidenav a { padding: 12px 25px; text-decoration: none; font-size: 18px; color: #bbb; display: block; border-bottom: 1px solid #222; }
                .menu-btn { font-size: 18px; cursor: pointer; position: fixed; top: 65px; left: 15px; color: #ff4757; background: #000; padding: 10px; border-radius: 10px; border: 1px solid #ff4757; z-index: 90; }
                input { width: 90%; padding: 12px; border-radius: 10px; margin-bottom: 15px; background: #000; border: 1px solid #ff4757; color: #fff; text-align: center; }
                .get-btn { background: #ff4757; color: #fff; padding: 12px; border: none; border-radius: 10px; width: 100%; font-weight: bold; cursor: pointer; }
                video { width: 100%; margin-top: 20px; border-radius: 15px; border: 2px solid #ff4757; }
            </style>
        </head>
        <body>
            <div class="noti-bar"><div class="noti-text">⚔️ ${globalNoti} ⚔️</div></div>
            <span class="menu-btn" onclick="openNav()">☰ 𝐌𝐄𝐍𝐔</span>
            <canvas id="fireworks"></canvas>
            
            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" onclick="closeNav()" style="font-size:35px; position:absolute; right:20px; top:10px; color:#ff4757;">&times;</a>
                <h3 style="color:#ff4757; text-align:center;">𝐓𝐨𝐨𝐥𝐬 𝐋𝐢𝐬𝐭 ⚔️</h3>
                ${toolsHtml || '<p style="color:#444; padding:20px;">No tools found.</p>'}
                <hr style="border: 0.5px solid #333;">
                ${isAdmin ? `
                <div style="padding: 15px;">
                    <button onclick="addNoti()" style="background:#00ff00; color:#000; width:100%; padding:10px; border:none; border-radius:5px; font-weight:bold; cursor:pointer;">➕ UPDATE NOTI</button>
                </div>
                ` : `<a href="/login" style="font-size: 14px; color: #444;">🔒 Admin Login</a>`}
            </div>

            <div class="main-box">
                <h2 style="color:#ff4757">⚔️ 𝐀𝐧𝐢𝐦𝐞 𝐖𝐨𝐫𝐥𝐝 ⚔️</h2>
                <input type="text" id="q" placeholder="Enter Anime/Character Name">
                <button class="get-btn" onclick="load()">🚀 GET VIDEO</button>
                <div id="v"></div>
            </div>

            <script>
                function openNav() { document.getElementById("mySidenav").style.width = "270px"; }
                function closeNav() { document.getElementById("mySidenav").style.width = "0"; }
                
                function addNoti() {
                    const t = prompt("Enter Notification Text:");
                    if(t) window.location.href = "/set-noti?text=" + encodeURIComponent(t);
                }

                async function load() {
                    const v = document.getElementById('v');
                    v.innerHTML = "<p style='color:#ff4757;'>🎬 Searching Anime...</p>";
                    const res = await fetch('/get-vid?q=' + encodeURIComponent(document.getElementById('q').value));
                    const data = await res.json();
                    if(data.url) v.innerHTML = '<video controls autoplay loop><source src="'+data.url+'"></video>';
                    else v.innerHTML = "Not found! ⚔️";
                }

                // --- Fireworks Background ---
                const canvas = document.getElementById('fireworks');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth; canvas.height = window.innerHeight;
                let particles = [];
                function Particle(x, y, color) {
                    this.x = x; this.y = y; this.color = color;
                    this.velocity = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 };
                    this.alpha = 1;
                    this.update = () => {
                        this.x += this.velocity.x; this.y += this.velocity.y; this.alpha -= 0.01;
                        ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath();
                        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fillStyle = this.color;
                        ctx.fill(); ctx.restore();
                    };
                }
                function animate() {
                    requestAnimationFrame(animate);
                    ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(0,0,canvas.width,canvas.height);
                    particles.forEach((p, i) => { if(p.alpha > 0) p.update(); else particles.splice(i, 1); });
                    if(Math.random() < 0.05) {
                        const x = Math.random() * canvas.width; const y = Math.random() * canvas.height;
                        const c = \`hsl(\${Math.random()*360}, 50%, 50%)\`;
                        for(let i=0; i<15; i++) particles.push(new Particle(x, y, c));
                    }
                }
                animate();
            </script>
        </body>
        </html>
    `);
});

// ভিডিও রিকল বন্ধ করার জন্য রেন্ডম লজিক ⚔️
app.get('/get-vid', async (req, res) => {
    try {
        const query = (req.query.q || "anime edit 4k") + " anime edit";
        const r = await axios.get("https://www.tikwm.com/api/feed/search?keywords=" + encodeURIComponent(query));
        const vids = r.data.data.videos;
        const randomVid = vids[Math.floor(Math.random() * vids.length)]; // প্রতিবার আলাদা ভিডিও আসবে
        res.json({ url: randomVid.play });
    } catch (e) { res.json({ error: true }); }
});

// টুলস রাউট ফিক্স করা হয়েছে ⚔️
app.get('/tools/:name', (req, res) => {
    const fileName = req.params.name + '.js';
    const filePath = path.join(toolsPath, fileName);
    if (fs.existsSync(filePath)) {
        try {
            // ক্যাশ ক্লিয়ার করে ফাইল রিলোড করা হচ্ছে
            delete require.cache[require.resolve(filePath)];
            const tool = require(filePath);
            tool(req, res);
        } catch (e) { res.send("Tool Error: " + e.message); }
    } else {
        res.status(404).send("Tool not found! ⚔️ Check your 'Tools' folder name.");
    }
});

app.get('/login', (req, res) => {
    res.send(`<body style="background:#000; color:#ff4757; text-align:center; padding-top:100px;">
        <form action="/login" method="POST" style="border:2px solid #ff4757; display:inline-block; padding:20px; border-radius:15px;">
            <h2>👑 ADMIN LOGIN</h2>
            <input type="text" name="user" placeholder="Admin" style="padding:10px; margin:5px;"><br>
            <input type="password" name="pass" placeholder="Pass" style="padding:10px; margin:5px;"><br>
            <button type="submit" style="background:#ff4757; color:#fff; padding:10px 20px; border:none; border-radius:5px; cursor:pointer;">LOGIN</button>
        </form>
    </body>`);
});

app.post('/login', (req, res) => {
    if (req.body.user === 'Mr.King' && req.body.pass === 'Admin2004@dj') {
        req.session.isAdmin = true;
        res.redirect('/');
    } else res.send("Wrong Password Boss! ⚔️");
});

app.get('/set-noti', (req, res) => {
    if (req.session.isAdmin) {
        globalNoti = req.query.text;
        res.redirect('/');
    } else res.status(403).send("Forbidden");
});

app.listen(port);
