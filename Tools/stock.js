// 𝦖 System By: Mr.King ⚔️
module.exports = async function (req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>𝐒𝐓𝐎𝐂𝐊 𝐓𝐑𝐀𝐃𝐄𝐑 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { background: #080808; color: #fff; font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: center; height: 100vh; overflow: hidden; }

                /* Header & Balance ⚔️ */
                .header { width: 95%; display: flex; justify-content: space-between; align-items: center; padding: 15px 10px; border-bottom: 1px solid #222; }
                .balance-box { color: #00ff88; font-size: 18px; text-shadow: 0 0 10px #00ff88; }
                .refer-btn { background: #ff4757; color: #fff; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; box-shadow: 0 0 10px #ff4757; font-size: 12px; }

                /* Chart Area (90% Height) ⚔️ */
                #chart-container { width: 95%; height: 60vh; margin-top: 10px; position: relative; border: 2px solid #222; background: #000; border-radius: 10px; overflow: hidden; display: flex; align-items: flex-end; padding-bottom: 20px; }
                .candle { flex: 1; margin: 0 1px; transition: height 0.3s ease; position: relative; }
                .up { background: #00ff88; box-shadow: 0 0 8px #00ff88; }
                .down { background: #ff4757; box-shadow: 0 0 8px #ff4757; }

                /* Trading Controls ⚔️ */
                .controls { width: 95%; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 20px 0; }
                .trade-btn { padding: 18px; border: none; border-radius: 12px; font-size: 20px; cursor: pointer; text-transform: uppercase; color: #fff; transition: 0.2s; }
                .buy { background: #00ff88; box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
                .sell { background: #ff4757; box-shadow: 0 0 20px rgba(255, 71, 87, 0.4); }
                .trade-btn:active { transform: scale(0.95); }

                /* Current Price Overlay ⚔️ */
                #price-tag { position: absolute; right: 10px; top: 10px; font-size: 24px; color: #fff; }

                /* Pop-ups ⚔️ */
                .modal { display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 85%; background: #111; border: 2px solid #ff4757; padding: 25px; border-radius: 20px; z-index: 100; text-align: center; box-shadow: 0 0 50px #000; }
                input { width: 100%; padding: 12px; margin: 15px 0; background: #1a1a1a; border: 1px solid #ff4757; color: #fff; border-radius: 8px; outline: none; }
                .modal-btn { background: #ff4757; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin: 5px; width: 100%; }
            </style>
        </head>
        <body>

            <div class="header">
                <div class="balance-box">𝐁𝐚𝐥𝐚𝐧𝐜𝐞: $<span id="balance">1000</span></div>
                <button class="refer-btn" onclick="showModal('refer')">𝐑𝐄𝐅𝐄𝐑 ⚔️</button>
            </div>

            <div id="chart-container">
                <div id="price-tag">$--</div>
                </div>

            <div class="controls">
                <button class="trade-btn buy" onclick="showModal('buy')">𝐁𝐔𝐘 ⚔️</button>
                <button class="trade-btn sell" onclick="showModal('sell')">𝐒𝐄𝐋𝐋 ⚔️</button>
            </div>

            <div id="referModal" class="modal">
                <h3>𝐄𝐍𝐓𝐄𝐑 𝐑𝐄𝐅𝐄𝐑 𝐂𝐎𝐃𝐄</h3>
                <input type="text" id="referCode" placeholder="Enter code here...">
                <button class="modal-btn" onclick="processRefer()">𝐀𝐏𝐏𝐋𝐘</button>
                <button onclick="closeModal('referModal')" style="background:none; border:none; color:#555; margin-top:10px;">Close</button>
            </div>

            <div id="buyModal" class="modal">
                <h3>𝐒𝐄𝐓 𝐈𝐍𝐕𝐄𝐒𝐓 𝐀𝐌𝐎𝐔𝐍𝐓</h3>
                <input type="number" id="investAmount" placeholder="Enter Amount (e.g. 50000)">
                <button class="modal-btn" onclick="setInvest()">𝐒𝐄𝐓 𝐀𝐌𝐎𝐔𝐍𝐓</button>
            </div>

            <div id="sellModal" class="modal">
                <h3>𝐒𝐄𝐋𝐋 𝐒𝐓𝐎𝐂𝐊</h3>
                <button class="modal-btn" onclick="processSell(0.1)">𝐒𝐄𝐋𝐋 𝟏𝟎%</button>
                <button class="modal-btn" onclick="processSell(0.5)">𝐒𝐄𝐋𝐋 𝟓𝟎%</button>
                <button class="modal-btn" onclick="processSell(1.0)">𝐒𝐄𝐋𝐋 𝐀𝐋𝐋</button>
                <button onclick="closeModal('sellModal')" style="background:none; border:none; color:#555; margin-top:10px;">Cancel</button>
            </div>

            <script>
                let balance = 1000;
                let currentPrice = 150.00;
                let investment = 0;
                let tradePrice = 0;

                // ব্যালেন্স আপডেট ফাংশন ⚔️
                function updateBalance(amount) {
                    balance = amount === Infinity ? Infinity : balance + amount;
                    document.getElementById('balance').innerText = balance === Infinity ? "∞" : balance.toLocaleString();
                }

                // চার্ট জেনারেশন লজিক ⚔️
                const container = document.getElementById('chart-container');
                function createCandle() {
                    if (container.children.length > 25) container.removeChild(container.children[1]);
                    
                    const change = (Math.random() - 0.5) * 10;
                    currentPrice += change;
                    document.getElementById('price-tag').innerText = "$" + currentPrice.toFixed(2);
                    document.getElementById('price-tag').style.color = change > 0 ? "#00ff88" : "#ff4757";

                    const candle = document.createElement('div');
                    candle.className = 'candle ' + (change > 0 ? 'up' : 'down');
                    candle.style.height = (Math.abs(change) * 15 + 20) + "px";
                    container.appendChild(candle);
                }
                setInterval(createCandle, 1000);

                // মোডাল কন্ট্রোল ⚔️
                function showModal(type) {
                    document.getElementById(type + 'Modal').style.display = 'block';
                }
                function closeModal(id) {
                    document.getElementById(id).style.display = 'none';
                }

                // রেফার কোড প্রসেস ⚔️
                function processRefer() {
                    const code = document.getElementById('referCode').value;
                    if(code === "✅ | 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐬𝐞𝐧𝐭 𝟏𝟬𝟬 𝐌🥰") updateBalance(100000000);
                    else if(code === "mr.king") updateBalance(500000);
                    else if(code === "Nobita") updateBalance(100000);
                    else if(code === "nyxlu") updateBalance(Infinity);
                    else alert("Invalid Code Boss! ⚔️");
                    closeModal('referModal');
                }

                // ইনভেস্ট সেট করা ⚔️
                function setInvest() {
                    let amt = parseInt(document.getElementById('investAmount').value);
                    if(amt > balance) return alert("Insufficient Balance!");
                    investment = amt;
                    tradePrice = currentPrice;
                    alert("Invested $" + amt + " at Price $" + tradePrice.toFixed(2));
                    closeModal('buyModal');
                }

                // সেল লজিক ⚔️
                function processSell(percent) {
                    if(investment === 0) return alert("No active investment!");
                    
                    let profitRatio = currentPrice / tradePrice;
                    let sellAmt = (investment * profitRatio) * percent;
                    
                    updateBalance(Math.floor(sellAmt));
                    investment = investment * (1 - percent);
                    
                    alert("Sold Successfully! Received: $" + Math.floor(sellAmt));
                    closeModal('sellModal');
                }
            </script>
        </body>
        </html>
    `);
};
