// User doodle drawing canvas
let userCanvas = document.getElementById("userCanvas");
let userContext = userCanvas.getContext("2d");
userContext.fillStyle = "#fff";
userContext.fillRect(0, 0, userCanvas.width, userCanvas.height);

// Evolutionary copying canvas
let copyCanvas = document.getElementById("copyCanvas");
let copyContext = copyCanvas.getContext("2d");
copyContext.fillStyle = "#fff";
copyContext.fillRect(0, 0, copyCanvas.width, copyCanvas.height);
