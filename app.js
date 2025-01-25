// app.js

// Song data with language tags
const songsData = {
    "en": [
        {
            name: "Shape of You",
            artist: "Ed Sheeran",
            url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
            cover: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
            language: "English",
            timePeriod: "2010s"
        },
        {
            name: "Blinding Lights",
            artist: "The Weeknd",
            url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
            cover: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
            language: "English",
            timePeriod: "2020s"
        }
    ],
    "hi": [
        {
            name: "Tum Hi Ho",
            artist: "Arijit Singh",
            url: "https://www.youtube.com/watch?v=Um6N6p5oWb8",
            cover: "https://i.ytimg.com/vi/Um6N6p5oWb8/hqdefault.jpg",
            language: "Hindi",
            timePeriod: "2010s"
        },
        {
            name: "Tum Jo Aaye",
            artist: "Rahat Fateh Ali Khan",
            url: "https://www.youtube.com/watch?v=lDtpSvjN-mI",
            cover: "https://i.ytimg.com/vi/lDtpSvjN-mI/hqdefault.jpg",
            language: "Hindi",
            timePeriod: "2000s"
        }
    ],
    "te": [
        {
            name: "Butta Bomma",
            artist: "Armaan Malik",
            url: "https://www.youtube.com/watch?v=MbqF2a5lRI0",
            cover: "https://i.ytimg.com/vi/MbqF2a5lRI0/hqdefault.jpg",
            language: "Telugu",
            timePeriod: "2020s"
        },
        {
            name: "Vachadayyo Saami",
            artist: "Anirudh Ravichander",
            url: "https://www.youtube.com/watch?v=Tx_oHgH7g0s",
            cover: "https://i.ytimg.com/vi/Tx_oHgH7g0s/hqdefault.jpg",
            language: "Telugu",
            timePeriod: "2010s"
        }
    ]
};

// Change language based on user selection
function changeLanguage() {
    const selectedLanguage = document.getElementById("language").value;
    displaySongs(selectedLanguage);
}

// Display songs based on the selected language
function displaySongs(language) {
    const songList = document.getElementById("songList");
    songList.innerHTML = ''; // Clear the previous list

    const songs = songsData[language];
    if (songs) {
        songs.forEach(song => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${song.cover}" alt="${song.name}" width="50" height="50">
                <a href="${song.url}" target="_blank">${song.name} by ${song.artist} (${song.timePeriod})</a>
            `;
            songList.appendChild(listItem);
        });
    } else {
        const noResultItem = document.createElement("li");
        noResultItem.textContent = "No songs available for this language.";
        songList.appendChild(noResultItem);
    }
}

// Initialize with default language as English
displaySongs("en");
