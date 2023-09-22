var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dev@gmail.com',
    pass: 'this is my password'
  }
});

var mailOptions = {
  from: 'dev@gmail.com',
  to: '108@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy! try 2'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});