// 𝦖 System By: Mr.King ⚔️
module.exports = async function (req, res) {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title> SNAKE </title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                
                body { 
                    margin: 0; 
                    padding: 0; 
                    overflow: hidden; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    font-family: 'Segoe UI', sans-serif; 
                    color: #fff; 
                    
                    /* Fully Colorful Neon Background ⚔️ */
                    background: #000;
                    background-image: 
                        radial-gradient(circle at 20% 30%, rgba(255, 71, 87, 0.4) 0%, transparent 40%),
                        radial-gradient(circle at 80% 70%, rgba(0, 210, 255, 0.4) 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, rgba(123, 31, 162, 0.3) 0%, transparent 50%),
                        url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIWMjB6TTAgMjBoMjB2MjBIMFYyMHoyMCAwaDIwdjIwSDIwVjB6Ii8+PC9nPjwvZz48L3N2Zz4='); /* subtle grid */
                    background-blend-mode: screen;
                }

                /* Text & UI Glow ⚔️ */
                h2 { color: #fff; text-shadow: 0 0 5px #fff, 0 0 10px #ff4757, 0 0 20px #ff4757; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; }
                #scoreBoard { font-size: 20px; text-shadow: 0 0 10px #00d2ff; margin-bottom: 10px; color: #fff; }

                /* Game Screen  */
                #game-container { 
                    position: relative; 
                    width: 90vw; 
                    height: 55vh; 
                    border: 4px solid #fff; 
                    border-radius: 15px;
                    background: rgba(10, 10, 10, 0.9);
                    box-shadow: 0 0 15px #fff, 0 0 30px #ff4757, inset 0 0 10px #ff4757;
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    overflow: hidden;
                }
                canvas { display: block; border-radius: 12px; }

                /* Overlay Style  */
                #overlay { position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; text-align: center; padding: 20px; }
                #overlay h3 { color: #fff; text-shadow: 0 0 10px #ff4757; margin-bottom: 25px; font-size: 22px; text-transform: uppercase; }
                
                .mode-btn { 
                    width: 220px; 
                    padding: 14px; 
                    margin: 10px; 
                    border: 2px solid #fff; 
                    background: transparent; 
                    color: #fff; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    font-size: 17px; 
                    transition: 0.3s; 
                    text-transform: uppercase; 
                    box-shadow: 0 0 5px #fff, inset 0 0 5px #ff4757;
                }
                .mode-btn:hover { background: #ff4757; box-shadow: 0 0 15px #fff, 0 0 30px #ff4757; }
                .mode-btn:active { transform: scale(0.95); }

                /* Custom Pop-up  */
                #popup { 
                    display: none; 
                    position: fixed; 
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    width: 85%; 
                    background: rgba(15, 15, 15, 0.95); 
                    border: 3px solid #fff; 
                    padding: 30px; 
                    z-index: 100; 
                    border-radius: 25px; 
                    text-align: center; 
                    box-shadow: 0 0 20px #fff, 0 0 40px #ff4757, inset 0 0 15px #ff4757;
                }
                #popup h3 { color: #fff; text-shadow: 0 0 10px #ff4757; font-size: 26px; margin-bottom: 20px; text-transform: uppercase; }
                #popup p { font-size: 19px; margin-bottom: 12px; color: #fff; }
                #popup #finalScoreText { font-size: 22px; color: #00d2ff; text-shadow: 0 0 10px #00d2ff; }
                #popup .king { color: #fff; font-size: 15px; margin-top: 20px; font-style: italic; opacity: 0.8; }

                /* Controls  */
                .controls { display: grid; grid-template-columns: repeat(3, 70px); grid-gap: 15px; margin-top: 25px; }
                .btn { 
                    width: 70px; 
                    height: 70px; 
                    background: rgba(20, 20, 20, 0.8); 
                    border: 2px solid #fff; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: #fff; 
                    font-size: 32px; 
                    cursor: pointer; 
                    -webkit-tap-highlight-color: transparent; 
                    box-shadow: 0 0 10px #fff, 0 0 20px #ff4757;
                    transition: 0.2s;
                }
                .btn:active { background: #ff4757; box-shadow: 0 0 15px #fff, 0 0 40px #ff4757; }
                .up { grid-column: 2; } .left { grid-column: 1; } .right { grid-column: 3; } .down { grid-column: 2; }
            </style>
        </head>
        <body>
            
            <h2>𝐒𝐍𝐀𝐊𝐄 𝐍𝐄𝐎𝐍 ⚔️</h2>
            <div id="scoreBoard">𝐒𝐜𝐨𝐫𝐞: <span id="score">0</span></div>

            <div id="game-container">
                <div id="overlay">
                    <h3>⚡️ 𝐒𝐄𝐋𝐄𝐂𝐓 𝐃𝐈𝐅𝐅𝐈𝐂𝐔𝐋𝐓𝐘 ⚡️</h3>
                    <button class="mode-btn" onclick="startGame(200)">𝐍𝐎𝐑𝐌𝐀𝐋 (𝟑𝟎%)</button>
                    <button class="mode-btn" onclick="startGame(120)">𝐌𝐄𝐃𝐈𝐔𝐌 (𝟓𝟎%)</button>
                    <button class="mode-btn" onclick="startGame(75)">𝐇𝐀𝐑𝐃 (𝟕𝟎%)</button>
                </div>
                <canvas id="game"></canvas>
            </div>

            <div id="popup">
                <h3>💥 𝐆𝐀𝐌𝐄 𝐎𝐕𝐄𝐑 🐍 💥</h3>
                <p id="finalScoreText">𝐘𝐨𝐮𝐫 𝐒𝐜𝐨𝐫𝐞 : 0</p>
                <p class="king">𝐊𝐞𝐞𝐩 𝐢𝐭 𝐮𝐩 👀 𝐟𝐫𝐨𝐦 [𝐌𝐫.𝐊𝐢𝐧𝐠] 😯👈🏼</p>
                <button class="mode-btn" onclick="closePopup()" style="width:140px; margin-top:20px; font-size:15px; padding:12px;">🔄 𝐑𝐄𝐓𝐑𝐘</button>
            </div>

            <div class="controls">
                <div class="btn up" onclick="move('up')">▲</div>
                <div class="btn left" onclick="move('left')">◀</div>
                <div class="btn right" onclick="move('right')">▶</div>
                <div class="btn down" onclick="move('down')">▼</div>
            </div>

            <script>
                const canvas = document.getElementById("game");
                const ctx = canvas.getContext("2d");
                const container = document.getElementById("game-container");
                
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;

                const box = 20;
                let snake, food, d, score, gameLoop;

                function init() {
                    snake = [{x: 4 * box, y: 5 * box}];
                    spawnFood();
                    d = "right";
                    score = 0;
                    document.getElementById("score").innerText = score;
                }

                function spawnFood() {
                    food = { 
                        x: Math.floor(Math.random()*(Math.floor(canvas.width/box)))*box, 
                        y: Math.floor(Math.random()*(Math.floor(canvas.height/box)))*box 
                    };
                }

                function startGame(speed) {
                    document.getElementById("overlay").style.display = "none";
                    document.getElementById("popup").style.display = "none";
                    init();
                    if(gameLoop) clearInterval(gameLoop);
                    gameLoop = setInterval(draw, speed);
                }

                function move(dir) {
                    if(dir=="up" && d!="down") d="up";
                    if(dir=="down" && d!="up") d="down";
                    if(dir=="left" && d!="right") d="left";
                    if(dir=="right" && d!="left") d="right";
                }

                function draw() {
                    ctx.fillStyle = "rgba(10, 10, 10, 0.8)"; // slightly transparent canvas bg
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Food ⚔️
                    ctx.fillStyle = "#fff"; // central white for food
                    ctx.shadowBlur = 20; ctx.shadowColor = "#00d2ff"; // cyan neon glow
                    ctx.fillRect(food.x, food.y, box-2, box-2);
                    ctx.shadowBlur = 0;

                    // Snake ⚔️
                    for(let i=0; i<snake.length; i++){
                        ctx.fillStyle = (i==0) ? "#fff" : "#ff6b81"; // head white, body neon red
                        ctx.shadowBlur = 15; ctx.shadowColor = "#ff4757"; // red neon glow
                        ctx.fillRect(snake[i].x, snake[i].y, box-2, box-2);
                        ctx.shadowBlur = 0;
                    }

                    let headX = snake[0].x;
                    let headY = snake[0].y;

                    if(d == "left") headX -= box;
                    if(d == "up") headY -= box;
                    if(d == "right") headX += box;
                    if(d == "down") headY += box;

                    // Wall Collision (Game Over) ⚔️
                    if(headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
                        gameOver();
                        return;
                    }

                    // Self Collision ⚔️
                    for(let i=0; i<snake.length; i++){
                        if(headX == snake[i].x && headY == snake[i].y) {
                            gameOver();
                            return;
                        }
                    }

                    // Score Logic ⚔️
                    if(headX == food.x && headY == food.y){
                        score++;
                        document.getElementById("score").innerText = score;
                        spawnFood();
                    } else {
                        snake.pop();
                    }

                    snake.unshift({x: headX, y: headY});
                }

                function gameOver() {
                    clearInterval(gameLoop);
                    document.getElementById("finalScoreText").innerText = "𝐘𝐨𝐮𝐫 𝐒𝐜𝐨𝐫𝐞 : " + score;
                    document.getElementById("popup").style.display = "block";
                }

                function closePopup() {
                    document.getElementById("popup").style.display = "none";
                    document.getElementById("overlay").style.display = "flex";
                }
            </script>
        </body>
        </html>
    `);
};
