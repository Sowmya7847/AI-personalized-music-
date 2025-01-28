from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from magenta.models.melody_rnn import melody_rnn_sequence_generator
from magenta.protobuf import generator_pb2, music_pb2
from magenta.music import sequence_proto_to_midi_file
from midi2audio import FluidSynth

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Define supported moods and their tempos
MOODS = {
    "calm": 60,
    "happy": 120,
    "energetic": 150,
    "sad": 50,
    "romantic": 70
}

# Directory to store generated music files
OUTPUT_DIR = "static/music"
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Helper function: Get tempo based on mood
def get_tempo(mood):
    return MOODS.get(mood.lower(), 120)  # Default to 120 BPM if mood is not found

# Helper function: Generate music based on mood
def generate_music(mood):
    # Load pre-trained Magenta model
    bundle = magenta.music.read_bundle_file("attention_rnn.mag")
    generator = melody_rnn_sequence_generator.MelodyRnnSequenceGenerator(
        model=magenta.music.sequence_generator_bundle.SequenceGeneratorBundle(bundle),
        steps_per_quarter=4
    )

    # Define primer sequence with tempo
    tempo = get_tempo(mood)
    primer_sequence = music_pb2.NoteSequence()
    primer_sequence.tempos.add(qpm=tempo)

    # Set generator options (16 seconds of music)
    generator_options = generator_pb2.GeneratorOptions()
    generator_options.generate_sections.add(start_time=0, end_time=16)

    # Generate the NoteSequence
    sequence = generator.generate(primer_sequence, generator_options)

    # Save MIDI file
    midi_path = os.path.join(OUTPUT_DIR, f"{mood}_music.mid")
    sequence_proto_to_midi_file(sequence, midi_path)

    # Convert MIDI to MP3
    fs = FluidSynth()
    mp3_path = os.path.join(OUTPUT_DIR, f"{mood}_music.mp3")
    fs.midi_to_audio(midi_path, mp3_path)

    return mp3_path

# API endpoint: Get available moods
@app.route('/moods', methods=['GET'])
def get_moods():
    return jsonify({"moods": list(MOODS.keys())})

# API endpoint: Generate music for a mood
@app.route('/generate', methods=['POST'])
def generate():
    # Get the mood from the request
    mood = request.json.get('mood')
    if mood not in MOODS:
        return jsonify({"error": "Mood not supported!"}), 400

    # Generate music
    music_path = generate_music(mood)
    music_url = f"http://127.0.0.1:5000/{music_path}"  # Adjust for deployment URL
    return jsonify({"music_url": music_url})

# Serve generated music files
@app.route('/static/music/<filename>')
def serve_music(filename):
    return send_from_directory(OUTPUT_DIR, filename)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
