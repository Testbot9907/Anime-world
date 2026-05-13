// 𦖠 System By: Mr.King ⚔️
module.exports = async function (req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>𝐌𝐑.𝐊𝐈𝐍𝐆 𝐇𝐀𝐂𝐊𝐄𝐑 𝐓𝐄𝐑𝐌𝐈𝐍𝐀𝐋 ⚔️</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    background: #000; color: #00ff00; font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
                    padding: 15px; height: 100vh; display: flex; flex-direction: column; overflow: hidden;
                }
                
                /* Terminal Output Area ⚔️ */
                #term-body { flex: 1; overflow-y: auto; font-size: 14px; line-height: 1.4; letter-spacing: 0.5px; }
                .line { margin-bottom: 3px; word-break: break-all; }
                .prompt { color: #00ff00; font-weight: bold; margin-right: 5px; }
                .input-text { color: #ffffff; } /* User type color white for clarity */
                
                /* Colors for Hacker Vibe ⚔️ */
                .cyan { color: #00d2ff; }
                .purple { color: #bc13fe; }
                .yellow { color: #ffff00; }
                .red { color: #ff0000; }
                .green { color: #00ff00; }
                .bold { font-weight: bold; }

                /* Input Section ⚔️ */
                .input-row { display: flex; align-items: center; background: #000; padding-top: 5px; border-top: 1px solid #111; }
                input { 
                    flex: 1; background: transparent; border: none; color: #ffffff;
                    outline: none; font-size: 14px; font-family: inherit;
                }
                
                #term-body::-webkit-scrollbar { width: 3px; }
                #term-body::-webkit-scrollbar-thumb { background: #222; }
            </style>
        </head>
        <body>

            <div id="term-body">
                <div class="line purple bold">
<pre>
    ███╗   ███╗██████╗     ██╗  ██╗██╗███╗   ██╗ ██████╗ 
    ████╗ ████║██╔══██╗    ██║ ██╔╝██║████╗  ██║██╔════╝ 
    ██╔████╔██║██████╔╝    █████╔╝ ██║██╔██╗ ██║██║  ███╗
    ██║╚██╔╝██║██╔══██╗    ██╔═██╗ ██║██║╚██╗██║██║   ██║
    ██║ ╚═╝ ██║██║  ██║    ██║  ██╗██║██║ ╚████║╚██████╔╝
    ╚═╝     ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ </pre>
                </div>
                <div class="line green">Welcome to Mr.King Framework v3.0.4</div>
                <div class="line cyan">System: Linux 5.15.0-x86_64</div>
                <div class="line yellow">Type 'help' or 'menu' to display available tools.</div>
                <div id="output"></div>
            </div>

            <div class="input-row">
                <span class="prompt">root@king:~$</span>
                <input type="text" id="user-input" autofocus spellcheck="false" autocomplete="off">
            </div>

            <script>
                const input = document.getElementById('user-input');
                const output = document.getElementById('output');
                const termBody = document.getElementById('term-body');

                const toolMenu = \`
<span class="green bold">--- MR.KING HACKING TOOLS ---</span><br>
[01] Facebook Phishing      [05] DDOS Attack<br>
[02] Temp-Mail Generator    [06] ID Cloning<br>
[03] Info Gathering         [07] WiFi Brute Force<br>
[04] IP Tracker             [00] Exit Framework<br>
<span class="yellow">Select an option to start...</span>\`;

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const cmd = input.value.trim();
                        if (!cmd) return;

                        // Displaying user command clearly
                        const cmdLine = document.createElement('div');
                        cmdLine.className = 'line';
                        cmdLine.innerHTML = \`<span class="prompt">root@king:~$</span> <span class="input-text">\${cmd}</span>\`;
                        output.appendChild(cmdLine);

                        processCommand(cmd.toLowerCase());

                        input.value = '';
                        termBody.scrollTop = termBody.scrollHeight;
                    }
                });

                function processCommand(cmd) {
                    let response = '';
                    switch(cmd) {
                        case 'help':
                        case 'menu':
                            response = toolMenu;
                            break;
                        case '1':
                        case '01':
                            simulateTask("Initializing FB Phishing Tool...", "Generating Link: https://fb-login.sh/login?id=832");
                            break;
                        case '2':
                        case '02':
                            response = "TempMail: <span class='cyan'>king_hacker7@mailto.plus</span>";
                            break;
                        case '3':
                        case '03':
                            simulateTask("Scanning network targets...", "Found 3 vulnerable IPs in local range.");
                            break;
                        case '5':
                        case '05':
                            simulateTask("Starting UDP Flood...", "Target 127.0.0.1 is being hammered...");
                            break;
                        case '6':
                        case '06':
                            simulateTask("Loading ID List...", "Cloning process: 14% [FAILED: Captcha detected]");
                            break;
                        case 'clear':
                            output.innerHTML = '';
                            return;
                        default:
                            response = \`<span class="red">Command not recognized. Type 'menu'.</span>\`;
                    }
                    if (response) writeToTerminal(response);
                }

                function simulateTask(startMsg, endMsg) {
                    writeToTerminal(\`<span class="yellow">[WAIT] \${startMsg}</span>\`);
                    setTimeout(() => {
                        writeToTerminal(\`<span class="green">[OK] \${endMsg}</span>\`);
                    }, 1500);
                }

                function writeToTerminal(text) {
                    const line = document.createElement('div');
                    line.className = 'line';
                    line.innerHTML = text;
                    output.appendChild(line);
                    termBody.scrollTop = termBody.scrollHeight;
                }

                document.addEventListener('click', () => input.focus());
            </script>
        </body>
        </html>
    `);
};
