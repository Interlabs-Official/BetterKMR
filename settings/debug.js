    (function() {
      const outputEl = document.getElementById('output');
      const inputEl = document.getElementById('cmdline');

      const commands = {
        help: {
          description: 'List available commands',
          exec: () => {
            const list = Object.keys(commands)
              .map(cmd => `${cmd} - ${commands[cmd].description}`)
              .join('\n');
            writeOutput(list);
          }
        },
        echo: {
          description: 'Echo the input text',
          exec: args => writeOutput(args.join(' '))
        },
        clear: {
          description: 'Clear the terminal screen',
          exec: () => { outputEl.textContent = ''; }
        },
        kmrfetch: {
          description: 'An awesome utility to view some specs the browser sees.',
          exec: () => {
            const manifest = chrome.runtime && chrome.runtime.getManifest ? chrome.runtime.getManifest() : {};
            outputEl.textContent = ''
            writeOutput("========== KMRFetch @ WebbyTerm ==========");
            const info = [
"       .--.          OS: " + navigator.platform,
"      |o_o |         Browser: " + navigator.userAgent.replace(/\(.+?\)/g, ''),
"      |:_/ |         Resolution: " + screen.width + 'x' + screen.height,
"     //   \ \          CPU Cores: " + navigator.hardwareConcurrency + " (probably not accurate)",
"    (|     | )       Memory: " + (navigator.deviceMemory || 'n/a') + ' GB'  + " (probably not accurate)",
"   /'\_   _/'\\        Language: " + navigator.language,
"   \___)=(___/        Extension Version: " + (manifest.version || 'n/a')
            ];
            writeOutput(info.join('\n'));
          }
        },
        exit: {
          description: 'Exits the terminal',
          exec: () => {
            window.location.href = chrome.runtime.getURL("settings/index.html");
          }
        },
        kmrtools: {
            description: 'Tools for managing BetterKMR via debug',
            exec: (args) => {
                try {
                    if (args[0] && args[0].toLowerCase() == "theme") {
                        if (args[1] && args[1].toLowerCase() == "set") {
                            chrome.storage.sync.set({'theme-id-text': args[2]});
                            writeOutput("Current theme set to ID " + args[2] + " successfully.");
                        }
                    } else if (args[0] && args[0].toLowerCase() == "backup") {
                        if (args[1] && args[1].toLowerCase() == "create") {
                            chrome.storage.local.get('themes', data => {
                                if (data.themes) {
                                    createThemeBackup(data.themes);
                                } else {
                                    writeOutput("Service \"kmrtools\" failed, received response: no theme storage value exists to backup (exit code 100)");
                                }
                            });
                        } else {
                            writeOutput("Service \"kmrtools\" failed, received response: no valid second argument provided (exit code 101)");
                        }
                    } else {
                        writeOutput("Service \"kmrtools\" failed, received response: no valid first argument provided (exit code 102)");
                    }
                } catch (error) {
                    writeOutput(`Service \"kmrtools\" produced a console error, received response: ${error} (exit code 103)`);
                }
            }
        },
        about: {
            description: 'About BetterKMR',
            exec: () => {
                writeOutput(`
------------------------------
BetterKMR
Version ${chrome.runtime.getManifest().version}
Created by InterLabs
------------------------------
BetterKMR WebbyTerm & Navbar Editor
Version 0.1.0 (alpha)
Created by InterLabs
------------------------------
BetterKMR Visual Theme & Code Editor
Version 1.1.0
Created by InterLabs
------------------------------
                    `)
            }
        }
      };

      	function createThemeBackup(themes) {
            const backupData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                themes: themes
            };
            
            const blob = new Blob([JSON.stringify(backupData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `betterkmr-themes-backup-${new Date().toISOString().slice(0,10)}.bktbackup`;
            
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
            
            return backupData;
        }

      function writeOutput(text) {
        text.split('\n').forEach(line => {
          const div = document.createElement('div');
          div.textContent = line;
          div.classList.add('line');
          outputEl.appendChild(div);
        });
        outputEl.scrollTop = outputEl.scrollHeight;
      }

      inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const inputText = inputEl.value.trim();
          if (inputText) {
            writeOutput(`user@btrkmr:~$ ${inputText}`);
            const [cmd, ...args] = inputText.split(' ');
            if (commands[cmd]) {
              commands[cmd].exec(args);
            } else {
              writeOutput(`${cmd}: command not found`);
            }
          }
          inputEl.value = '';
        }
      });

      document.body.addEventListener('click', () => inputEl.focus());

    writeOutput(`
Welcome to BetterKMR WebbyTerm v${chrome.runtime.getManifest().version} (${navigator.userAgent})
This terminal-like interface is designed for BetterKMR developers and users who want quick configuration.
By using BetterKMR you agree to the Terms of Service & Privacy Policy. Hyperlinks to them can be found on the About & Contact page.
Type 'help' for help, 'exit' to go back to the main settings page.
! WARNING ! Executing commands in here could cause destructive actions that could be quite bad. ONLY use this if you know what you're doing.
    `);
    })();