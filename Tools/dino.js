module.exports = async function (req, res) {
    try {
        res.send(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐇𝐀𝐂𝐊𝐄𝐑 𝐃𝐈𝐍𝐎 𝐑𝐔𝐍 </title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-weight: bold; }
                body { 
                    background: #050505; font-family: 'Courier New', monospace;
                    height: 100vh; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; overflow: hidden; color: #00ff00;
                }
                .game-box {
                    width: 95%; max-width: 600px; background: rgba(0,0,0,0.9);
                    border: 2px solid #00ff00; border-radius: 15px; padding: 15px;
                    box-shadow: 0 0 30px rgba(0, 255, 0, 0.3); text-align: center; position: relative;
                }
                h1 { font-size: 22px; text-shadow: 0 0 10px #00ff00; margin-bottom: 10px; }
                canvas { 
                    background: #111; display: block; margin: 10px auto; 
                    border-radius: 10px; border: 1px dashed #00ff00; max-width: 100%;
                }
                .info { font-size: 13px; margin-top: 5px; color: #888; }
                
                /* Hack System Styling */
                .secret-trigger {
                    margin-top: 15px; font-size: 11px; color: #333; cursor: pointer; transition: 0.3s;
                }
                .secret-trigger:hover { color: #00ff00; text-shadow: 0 0 5px #00ff00; }
                
                .hack-panel {
                    display: none; margin-top: 15px; padding: 15px; border-top: 2px dashed #ff0000;
                    background: rgba(20, 0, 0, 0.7); border-radius: 10px;
                }
                .hack-panel h2 { color: #ff0000; font-size: 16px; margin-bottom: 10px; text-shadow: 0 0 8px #ff0000; }
                .hack-btn {
                    background: #ff0000; color: #000; border: none; padding: 8px 15px;
                    border-radius: 5px; cursor: pointer; font-size: 12px; margin: 5px; transition: 0.3s;
                }
                .hack-btn:hover { box-shadow: 0 0 15px #ff0000; transform: scale(1.05); }
                .hack-input {
                    background: #000; border: 1px solid #ff0000; color: #ff0000;
                    padding: 6px; border-radius: 5px; width: 100px; text-align: center; outline: none;
                }
            </style>
        </head>
        <body>

            <div class="game-box">
                <h1>𝐃𝐈𝐍𝐎 𝐇𝐀𝐂𝐊𝐄𝐑 𝐑𝐔𝐍 🦖</h1>
                <div id="score-board" style="font-size: 16px; margin-bottom: 5px;">SCORE: 00000</div>
                
                <canvas id="gameCanvas" width="600" height="200"></canvas>
                
                <div class="info">Tap screen / Press SPACE to Jump</div>
                
                <div class="secret-trigger" onclick="unlockHack()">[ BYPASS CORE SYSTEM ]</div>

                <div class="hack-panel" id="hack-menu">
                    <h2>⚠️ ⚔️ MR.KING HACK PANEL UNLOCKED ⚔️ ⚠️</h2>
                    <button class="hack-btn" id="god-btn" onclick="toggleGodMode()">GOD MODE: OFF</button>
                    | 
                    <input type="number" class="hack-input" id="set-score" placeholder="Set Score">
                    <button class="hack-btn" onclick="injectScore()">INJECT SCORE</button>
                </div>
            </div>

            <script>
                const canvas = document.getElementById("gameCanvas");
                const ctx = canvas.getContext("2d");

                // Game Variables
                let dino = { x: 50, y: 140, wy: 140, width: 25, height: 40, vy: 0, jumped: false };
                let obstacles = [];
                let score = 0;
                let gameSpeed = 5;
                let isGameOver = false;
                
                // Hack Statuses
                let isGodMode = false;

                // Game Controller Loops
                function spawnObstacle() {
                    if (isGameOver) return;
                    let type = Math.random() > 0.5 ? {w: 15, h: 35} : {w: 25, h: 45};
                    obstacles.push({ x: canvas.width, y: 180 - type.h, width: type.w, height: type.h });
                    setTimeout(spawnObstacle, Math.random() * 1500 + 1000 / (gameSpeed * 0.2));
                }

                function update() {
                    if (isGameOver) return;

                    // Score progression
                    score++;
                    document.getElementById("score-board").innerText = "SCORE: " + String(score).padStart(5, '0');
                    if (score % 500 === 0) gameSpeed += 0.5;

                    // Dino Physics
                    if (dino.jumped) {
                        dino.vy += 0.6; // Gravity
                        dino.y += dino.vy;
                        if (dino.y >= dino.wy) {
                            dino.y = dino.wy;
                            dino.vy = 0;
                            dino.jumped = false;
                        }
                    }

                    // Obstacles Loop
                    for (let i = obstacles.length - 1; i >= 0; i--) {
                        obstacles[i].x -= gameSpeed;

                        // Collision Detection
                        if (!isGodMode && 
                            dino.x < obstacles[i].x + obstacles[i].width &&
                            dino.x + dino.width > obstacles[i].x &&
                            dino.y < obstacles[i].y + obstacles[i].height &&
                            dino.y + dino.height > obstacles[i].y) {
                                isGameOver = true;
                        }

                        if (obstacles[i].x + obstacles[i].width < 0) {
                            obstacles.splice(i, 1);
                        }
                    }
                }

                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw Ground Line
                    ctx.strokeStyle = isGodMode ? "#ff0000" : "#00ff00";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, 180);
                    ctx.lineTo(canvas.width, 180);
                    ctx.stroke();

                    // Draw Dino (Cyber Style)
                    ctx.fillStyle = isGodMode ? "#ff00ff" : "#00ff00";
                    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
                    // Dino Eye
                    ctx.fillStyle = "#000";
                    ctx.fillRect(dino.x + 15, dino.y + 8, 4, 4);

                    // Draw Obstacles (Cactus style bricks)
                    ctx.fillStyle = "#ff0000";
                    obstacles.forEach(obs => {
                        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                    });

                    if (isGameOver) {
                        ctx.fillStyle = "#ff0000";
                        ctx.font = "20px Courier New";
                        ctx.fillText("⚠️ SYSTEM CRASHED (GAME OVER) ⚠️", canvas.width/2 - 180, canvas.height/2);
                        ctx.font = "14px Courier New";
                        ctx.fillText("Tap / Space to Reboot System", canvas.width/2 - 110, canvas.height/2 + 30);
                    }
                }

                function gameLoop() {
                    update();
                    draw();
                    requestAnimationFrame(gameLoop);
                }

                function doJump() {
                    if (isGameOver) {
                        // Reset Game
                        obstacles = [];
                        score = 0;
                        gameSpeed = 5;
                        isGameOver = false;
                        dino.y = dino.wy;
                        return;
                    }
                    if (!dino.jumped) {
                        dino.vy = -10.5; // Jump Force
                        dino.jumped = true;
                    }
                }

                // Controls listeners
                window.addEventListener("keydown", (e) => { if (e.code === "Space") doJump(); });
                canvas.addEventListener("touchstart", (e) => { e.preventDefault(); doJump(); });
                canvas.addEventListener("mousedown", doJump);

                // --- HACK ENGINE LOGIC ---
                function unlockHack() {
                    let pass = prompt("Enter Master Hack Password:");
                    if (pass === "Nomnomm123") {
                        document.getElementById("hack-menu").style.display = "block";
                        alert("ACCESS GRANTED. GOD MODE ENGINE INJECTED.");
                    } else {
                        alert("ACCESS DENIED. BRUTEFORCE DETECTED.");
                    }
                }

                function toggleGodMode() {
                    isGodMode = !isGodMode;
                    const btn = document.getElementById("god-btn");
                    if(isGodMode) {
                        btn.innerText = "GOD MODE: ACTIVE";
                        btn.style.background = "#00ff00";
                    } else {
                        btn.innerText = "GOD MODE: OFF";
                        btn.style.background = "#ff0000";
                    }
                }

                function injectScore() {
                    let newScore = parseInt(document.getElementById("set-score").value);
                    if (!isNaN(newScore)) {
                        score = newScore;
                        alert("Score injected successfully!");
                    }
                }

                // Start Game Engine
                spawnObstacle();
                gameLoop();
            </script>
        </body>
        </html>
        `);
    } catch (e) {
        res.status(500).send("Game Core Error!");
    }
};
