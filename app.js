// app.js

// Sample dynamic data for music genres
const songsData = {
    "rock": [
        {
            name: "Bohemian Rhapsody",
            artist: "Queen",
            url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
            cover: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg"
        },
        {
            name: "Smells Like Teen Spirit",
            artist: "Nirvana",
            url: "https://www.youtube.com/watch?v=hTWK2jv3ZSU",
            cover: "https://i.ytimg.com/vi/hTWK2jv3ZSU/hqdefault.jpg"
        }
    ],
    "pop": [
        {
            name: "Blinding Lights",
            artist: "The Weeknd",
            url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
            cover: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg"
        },
        {
            name: "Shape of You",
            artist: "Ed Sheeran",
            url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
            cover: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg"
        }
    ],
    "calm": [
        {
            name: "Weightless",
            artist: "Marconi Union",
            url: "https://www.youtube.com/watch?v=UfcAVejslrU",
            cover: "https://i.ytimg.com/vi/UfcAVejslrU/hqdefault.jpg"
        },
        {
            name: "Sunset Lover",
            artist: "Petit Biscuit",
            url: "https://www.youtube.com/watch?v=4sXpqLzmi9s",
            cover: "https://i.ytimg.com/vi/4sXpqLzmi9s/hqdefault.jpg"
        }
    ]
};

// Language dictionary
const translations = {
    "en": {
        "title": "Personalized Music Recommendation",
        "inputLabel": "Enter your music preference (e.g., Rock, Calm, Dance):",
        "recommendButton": "Get Recommendation",
        "recommendationsTitle": "Recommended Songs:",
        "noMatch": "No recommendations found. Try another genre like 'rock', 'pop', or 'calm'."
    },
    "es": {
        "title": "Recomendación de Música Personalizada",
        "inputLabel": "Introduce tu preferencia musical (por ejemplo, Rock, Calm, Dance):",
        "recommendButton": "Obtener Recomendación",
        "recommendationsTitle": "Canciones Recomendadas:",
        "noMatch": "No se encontraron recomendaciones. Prueba otro género como 'rock', 'pop' o 'calm'."
    },
    "fr": {
        "title": "Recommandation de Musique Personnalisée",
        "inputLabel": "Entrez votre préférence musicale (par exemple, Rock, Calm, Dance):",
        "recommendButton": "Obtenir la Recommandation",
        "recommendationsTitle": "Chansons Recommandées:",
        "noMatch": "Aucune recommandation trouvée. Essayez un autre genre comme 'rock', 'pop' ou 'calm'."
    }
};

// Change language based on user selection
function changeLanguage() {
    const lang = document.getElementById("language").value;
    document.getElementById("title").innerText = translations[lang].title;
    document.getElementById("inputLabel").innerText = translations[lang].inputLabel;
    document.getElementById("recommendButton").innerText = translations[lang].recommendButton;
    document.getElementById("recommendationsTitle").innerText = translations[lang].recommendationsTitle;
}

// Function to get recommendations based on user input
function getRecommendation() {
    const userInput = document.getElementById("musicPreference").value.toLowerCase();
    const songList = document.getElementById("songList");

    // Clear previous recommendations
    songList.innerHTML = '';

    // Find the genre based on user input
    let matchedSongs = songsData[userInput] || [];

    // Show recommendations
    if (matchedSongs.length > 0) {
        matchedSongs.forEach(song => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${song.cover}" alt="${song.name}" width="50" height="50">
                <a href="${song.url}" target="_blank">${song.name} by ${song.artist}</a>
            `;
            songList.appendChild(listItem);
        });
    } else {
        const noResultItem = document.createElement("li");
        noResultItem.textContent = translations[document.getElementById("language").value].noMatch;
        songList.appendChild(noResultItem);
    }
}

// Initial language setup
changeLanguage();
