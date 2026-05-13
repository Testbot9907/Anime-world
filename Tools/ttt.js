// 𝦖 System By: Mr.King ⚔️
module.exports = async function (req, res) {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>𝐓𝐈𝐂 𝐓𝐀𝐂 𝐓𝐎𝐄 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #000; 
                    overflow: hidden; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    font-family: 'Segoe UI', sans-serif; 
                }

                /* Rotating Neon Lights Background ⚔️ */
                .light-wrapper { position: fixed; width: 100%; height: 100%; z-index: -1; overflow: hidden; }
                .light { 
                    position: absolute; width: 300px; height: 300px; border-radius: 50%; 
                    filter: blur(80px); opacity: 0.5; animation: rotate 10s linear infinite; 
                }
                .red-light { background: #ff4757; top: -50px; left: -50px; }
                .blue-light { background: #00d2ff; bottom: -50px; right: -50px; animation-direction: reverse; }
                @keyframes rotate { 0% { transform: translate(0,0); } 50% { transform: translate(100px, 100px); } 100% { transform: translate(0,0); } }

                h2 { color: #fff; text-shadow: 0 0 10px #ff4757, 0 0 20px #00d2ff; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 3px; }

                /* Game Board ⚔️ */
                .board { display: grid; grid-template-columns: repeat(3, 100px); grid-gap: 15px; z-index: 10; }
                .cell { 
                    width: 100px; height: 100px; background: rgba(15, 15, 15, 0.9); 
                    border: 2px solid #fff; border-radius: 15px; display: flex; 
                    align-items: center; justify-content: center; font-size: 45px; 
                    cursor: pointer; box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); 
                    transition: 0.3s; color: transparent;
                }
                .cell.x { color: #ff4757; text-shadow: 0 0 15px #ff4757; border-color: #ff4757; box-shadow: 0 0 20px #ff4757; }
                .cell.o { color: #00d2ff; text-shadow: 0 0 15px #00d2ff; border-color: #00d2ff; box-shadow: 0 0 20px #00d2ff; }

                /* Overlay & Selection ⚔️ */
                #overlay { position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; }
                .mode-btn { 
                    width: 220px; padding: 15px; margin: 10px; border: 2px solid #fff; 
                    background: transparent; color: #fff; border-radius: 15px; 
                    cursor: pointer; font-size: 18px; text-transform: uppercase; 
                    box-shadow: 0 0 10px #ff4757; transition: 0.3s;
                }
                .mode-btn:active { background: #ff4757; box-shadow: 0 0 30px #ff4757; }

                /* Numbers Label ⚔️ */
                .num-label { position: absolute; font-size: 12px; color: #444; top: 5px; left: 8px; }

                /* Popup Message ⚔️ */
                #status { position: fixed; bottom: 50px; background: rgba(255, 71, 87, 0.9); color: #fff; padding: 12px 25px; border-radius: 50px; display: none; z-index: 200; box-shadow: 0 0 20px #ff4757; }
            </style>
        </head>
        <body>
            <div class="light-wrapper">
                <div class="light red-light"></div>
                <div class="light blue-light"></div>
            </div>

            <div id="overlay">
                <h2 style="color:#ff4757; margin-bottom:30px;">𝐒𝐄𝐋𝐄𝐂𝐓 𝐌𝐎𝐃𝐄</h2>
                <button class="mode-btn" onclick="setMode('normal')">𝐍𝐎𝐑𝐌𝐀𝐋 ⚔️</button>
                <button class="mode-btn" onclick="setMode('hard')">𝐇𝐀𝐑𝐃 🔥</button>
            </div>

            <h2>𝐓𝐈𝐂 𝐓𝐀𝐂 𝐓𝐎𝐄 ⚔️</h2>
            <div class="board" id="board">
                <div class="cell" onclick="makeMove(0)"><span class="num-label">1</span></div>
                <div class="cell" onclick="makeMove(1)"><span class="num-label">2</span></div>
                <div class="cell" onclick="makeMove(2)"><span class="num-label">3</span></div>
                <div class="cell" onclick="makeMove(3)"><span class="num-label">4</span></div>
                <div class="cell" onclick="makeMove(4)"><span class="num-label">5</span></div>
                <div class="cell" onclick="makeMove(5)"><span class="num-label">6</span></div>
                <div class="cell" onclick="makeMove(6)"><span class="num-label">7</span></div>
                <div class="cell" onclick="makeMove(7)"><span class="num-label">8</span></div>
                <div class="cell" onclick="makeMove(8)"><span class="num-label">9</span></div>
            </div>

            <div id="status"></div>
            <button onclick="location.reload()" style="margin-top:30px; background:transparent; border:none; color:#555; cursor:pointer;">🔄 𝐑𝐄𝐒𝐄𝐓 𝐆𝐀𝐌𝐄</button>

            <script>
                let board = ["", "", "", "", "", "", "", "", ""];
                let gameActive = false;
                let difficulty = 'normal';
                const cells = document.querySelectorAll('.cell');

                function setMode(mode) {
                    difficulty = mode;
                    document.getElementById('overlay').style.display = 'none';
                    gameActive = true;
                }

                function makeMove(index) {
                    if (!gameActive) return;
                    if (board[index] !== "") {
                        showPopup("𝐓𝐡𝐢𝐬 𝐨𝐩𝐭𝐢𝐨𝐧 𝐢𝐬 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐭𝐚𝐤𝐞𝐧\\n[𝐘𝐨𝐮𝐫 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐢𝐠𝐧𝐨𝐫𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 🐍]");
                        return;
                    }

                    board[index] = "X";
                    cells[index].innerText = "X";
                    cells[index].classList.add('x');

                    if (checkWinner("X")) return endHandler("𝐘𝐞𝐬𝐬!!!! 𝐘𝐨𝐮 𝐰𝐨𝐧 🦜🦜");
                    if (board.every(cell => cell !== "")) return endHandler("𝐈𝐭'𝐬 𝐭𝐢𝐞 𝐛𝐫𝐨 🐍👈🏼");

                    gameActive = false; // Bot is thinking
                    setTimeout(botMove, 600);
                }

                function botMove() {
                    let move;
                    if (difficulty === 'hard') {
                        move = getBestMove();
                    } else {
                        let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
                        move = empty[Math.floor(Math.random() * empty.length)];
                    }

                    board[move] = "O";
                    cells[move].innerText = "O";
                    cells[move].classList.add('o');

                    if (checkWinner("O")) return endHandler("𝐊𝐞𝐞𝐩 𝐢𝐭 𝐮𝐩,,,,👀");
                    if (board.every(cell => cell !== "")) return endHandler("𝐈𝐭'𝐬 𝐭𝐢𝐞 𝐛𝐫𝐨 🐍👈🏼");
                    
                    gameActive = true;
                }

                function getBestMove() {
                    // Simple Hard AI Logic: Win or Block ⚔️
                    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
                    
                    // 1. Can Bot Win?
                    for(let p of winPatterns) {
                        let vals = p.map(i => board[i]);
                        if(vals.filter(v => v === "O").length === 2 && vals.filter(v => v === "").length === 1) {
                            return p[vals.indexOf("")];
                        }
                    }
                    // 2. Can Bot Block Player?
                    for(let p of winPatterns) {
                        let vals = p.map(i => board[i]);
                        if(vals.filter(v => v === "X").length === 2 && vals.filter(v => v === "").length === 1) {
                            return p[vals.indexOf("")];
                        }
                    }
                    // 3. Center or Random
                    if(board[4] === "") return 4;
                    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
                    return empty[Math.floor(Math.random() * empty.length)];
                }

                function checkWinner(player) {
                    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
                    return winPatterns.some(p => p.every(i => board[i] === player));
                }

                function showPopup(msg) {
                    const el = document.getElementById('status');
                    el.innerText = msg;
                    el.style.display = 'block';
                    setTimeout(() => { el.style.display = 'none'; }, 2000);
                }

                function endHandler(msg) {
                    gameActive = false;
                    setTimeout(() => {
                        alert(msg);
                        location.reload();
                    }, 500);
                }
            </script>
        </body>
        </html>
    `);
};
