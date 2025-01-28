const webcam = document.getElementById("webcam");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const moodLabel = document.getElementById("mood");

let model; // TensorFlow.js model

// Load the pre-trained model
async function loadModel() {
  model = await tf.loadLayersModel("model/model.json");
  console.log("Model loaded successfully!");
}

// Start the webcam
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcam.srcObject = stream;
    webcam.addEventListener("loadeddata", predictMood);
  } catch (error) {
    console.error("Error accessing webcam:", error);
    alert("Please allow access to the webcam to use this feature.");
  }
}

// Predict mood from webcam input
async function predictMood() {
  canvas.width = webcam.videoWidth;
  canvas.height = webcam.videoHeight;

  // Capture a frame from the webcam
  ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);

  // Preprocess the image
  const inputTensor = tf.browser.fromPixels(canvas)
    .resizeBilinear([224, 224]) // Resize to model's input size
    .expandDims(0) // Add batch dimension
    .toFloat()
    .div(tf.scalar(255)); // Normalize to [0, 1]

  // Predict emotion
  const predictions = await model.predict(inputTensor).data();
  const emotions = ["Happy", "Sad", "Angry", "Surprised", "Neutral"];
  const maxIndex = predictions.indexOf(Math.max(...predictions));
  const detectedMood = emotions[maxIndex];

  // Update the mood label
  moodLabel.textContent = detectedMood;

  // Repeat the process for real-time prediction
  requestAnimationFrame(predictMood);
}

// Initialize the application
(async function init() {
  await loadModel();
  await startWebcam();
})();
