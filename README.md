<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Personalized Music Player</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="music-player">
    <h1>AI Personalized Music Player</h1>
    <label for="mood">Choose your mood:</label>
    <select id="mood">
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
      <option value="relaxed">Relaxed</option>
      <option value="energetic">Energetic</option>
    </select>
    <button onclick="suggestSong()">Get Song Suggestion</button>
    <div id="suggestion">
      <h2>Suggested Song:</h2>
      <p id="song-name">Select a mood to get started!</p>
      <audio id="audio" controls></audio>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
