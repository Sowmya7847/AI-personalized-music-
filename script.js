const songs = {
  happy: {
    name: "Happy by Pharrell Williams",
    url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
  },
  sad: {
    name: "Someone Like You by Adele",
    url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
  },
  relaxed: {
    name: "Weightless by Marconi Union",
    url: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
  },
  energetic: {
    name: "Eye of the Tiger by Survivor",
    url: "https://www.bensound.com/bensound-music/bensound-energy.mp3"
  }
};

function suggestSong() {
  const mood = document.getElementById('mood').value;
  const suggestion = songs[mood];
  if (suggestion) {
    document.getElementById('song-name').innerText = suggestion.name;
    const audio = document.getElementById('audio');
    audio.src = suggestion.url;
    audio.load();
  } else {
    document.getElementById('song-name').innerText = "No suggestion available.";
  }
}
