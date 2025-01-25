// 1. Install the dotenv package
// npm install dotenv

// 2. Import dotenv to load environment variables
require('dotenv').config();

// 3. Fetching libraries for HTTP requests
const fetch = require('node-fetch');

// 4. Retrieve Client ID and Client Secret from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// 5. Function to get Spotify Access Token
async function getSpotifyAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error_description);
        }
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
}

// 6. Function to get genres from Spotify API
async function getGenres(token) {
    try {
        const response = await fetch('https://api.spotify.com/v1/browse/categories', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data.categories.items; // Return the list of genres
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

// 7. Function to get playlists by genre from Spotify API
async function getPlaylistsByGenre(token, genreId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return data.playlists.items; // Return the list of playlists
    } catch (error) {
        console.error('Error fetching playlists by genre:', error);
    }
}

// 8. Main Function to Initialize App
async function initialize() {
    try {
        const token = await getSpotifyAccessToken(); // Get access token
        if (!token) {
            console.error('Failed to get Spotify access token');
            return;
        }

        const genres = await getGenres(token); // Get genres
        if (!genres || genres.length === 0) {
            console.error('No genres found');
            return;
        }

        console.log('Available Genres:');
        genres.forEach(genre => {
            console.log(`${genre.name} (${genre.id})`); // Display genres
        });

        // Example: Get playlists for a specific genre (e.g., "pop")
        const genreId = 'pop'; // Change this to any genre ID from the list
        const playlists = await getPlaylistsByGenre(token, genreId);
        if (playlists && playlists.length > 0) {
            console.log(`Playlists for Genre '${genreId}':`);
            playlists.forEach(playlist => {
                console.log(`${playlist.name} (${playlist.tracks.total} tracks)`); // Display playlists
            });
        } else {
            console.error('No playlists found for this genre');
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// 9. Call the initialization function
initialize();
