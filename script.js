// Load moods dynamically
const moodDropdown = document.getElementById('moodDropdown');
const generateBtn = document.getElementById('generateBtn');
const player = document.getElementById('player');

async function loadMoods() {
  const response = await fetch('http://127.0.0.1:5000/moods');
  const data = await response.json();
  data.moods.forEach(mood => {
    const option = document.createElement('option');
    option.value = mood;
    option.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
    moodDropdown.appendChild(option);
  });
}

async function generateMusic() {
  const selectedMood = moodDropdown.value;
  const response = await fetch('http://127.0.0.1:5000/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood: selectedMood }),
  });

  if (response.ok) {
    const data = await response.json();
    player.src = `http://127.0.0.1:5000/${data.music_url}`;
    player.style.display = 'block';
  } else {
    alert('Error generating music. Please try again.');
  }
}

generateBtn.addEventListener('click', generateMusic);

// Load moods when the page loads
window.onload = loadMoods;
