
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const keyStrokes = [];

rl.question("Press Enter to start recording keyboard strokes...", () => {
  const GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;

  const v = new GlobalKeyboardListener();

  // Log every key that's pressed.
  v.addListener(function (e) {
    const key = e.name;
    keyStrokes.push(key);
    process.stdout.write(`${key} `); // Print key on the same line
  });

  // Stop recording and exit when Enter key is pressed
  rl.on("line", (input) => {
    if (input === "") {
      v.removeListener(); // Remove the listener when Enter is pressed
      rl.close();
      console.log("\nRecording stopped.");
      console.log("Recorded key strokes:", keyStrokes);
    }
  });
});


/*
var GlobalKeyboardListener = require("node-global-key-listener").GlobalKeyboardListener;

const v = new GlobalKeyboardListener();

//Log every key that's pressed.
v.addListener(function (e) {
    console.log(
        `${e.name} `
    );
});

//Call one listener only once (demonstrating removeListener())
calledOnce = function (e) {
    v.removeListener(calledOnce);
};
v.addListener(calledOnce);

/* 
 To add logging of errors please use. This is hopefully not needed in most cases, but may still be useful in production.
    new GlobalKeyboardListener({
        windows: {
            onError: (errorCode) => console.error("ERROR: " + errorCode),
            onInfo: (info) => console.info("INFO: " + info)
        },
        mac: {
            onError: (errorCode) => console.error("ERROR: " + errorCode),
        }
    })
*/