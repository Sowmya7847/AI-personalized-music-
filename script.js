// Songs object with songs in Hindi, English, and Telugu for each mood
const songs = {
  happy: [
    { name: "Happy by Pharrell Williams (English)", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { name: "Badtameez Dil from Yeh Jawaani Hai Deewani (Hindi)", url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" },
    { name: "Darshana from Sita Ramam (Telugu)", url: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3" }
  ],
  sad: [
    { name: "Someone Like You by Adele (English)", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { name: "Tum Hi Ho from Aashiqui 2 (Hindi)", url: "https://www.bensound.com/bensound-music/bensound-sadday.mp3" },
    { name: "Ninnu Kori Varnam from Gharshana (Telugu)", url: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3" }
  ],
  relaxed: [
    { name: "Imagine by John Lennon (English)", url: "https://www.bensound.com/bensound-music/bensound-dreams.mp3" },
    { name: "Senorita from Zindagi Na Milegi Dobara (Hindi)", url: "https://www.bensound.com/bensound-music/bensound-memories.mp3" },
    { name: "Samajavaragamana from Ala Vaikunthapurramuloo (Telugu)", url: "https://www.bensound.com/bensound-music/bensound-sweet.mp3" }
  ],
  energetic: [
    { name: "Eye of the Tiger by Survivor (English)", url: "https://www.bensound.com/bensound-music/bensound-energy.mp3" },
    { name: "Jai Ho from Slumdog Millionaire (Hindi)", url: "https://www.bensound.com/bensound-music/bensound-extremeaction.mp3" },
    { name: "Dhaari Choodu from Krishnarjuna Yuddham (Telugu)", url: "https://www.bensound.com/bensound-music/bensound-highoctane.mp3" }
  ]
};

// Function to suggest a random song based on mood
function suggestSong() {
  const mood = document.getElementById('mood').value;

  if (songs[mood] && songs[mood].length > 0) {
    // Get a random song from the selected mood
    const randomIndex = Math.floor(Math.random() * songs[mood].length);
    const suggestion = songs[mood][randomIndex];

    // Update the song suggestion and audio player
    document.getElementById('song-name').innerText = suggestion.name;
    const audio = document.getElementById('audio');
    audio.src = suggestion.url;
    audio.load();
  } else {
    document.getElementById('song-name').innerText = "No suggestion available.";
  }
}
