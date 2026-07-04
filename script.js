const playlist = [
    { title: "Ed Maverick - Fuentes De Ortiz", src: "recurses/Music/Ed Maverick - Fuentes De Ortiz.mp3" },
    { title: "Ed Maverick - Acurrucar", src: "recurses/Music/Ed Maverick - Acurrucar.mp3" },
    { title: "Ed Maverick - a mis amigos", src: "recurses/Music/Ed Maverick - a mis amigos.mp3" },
    { title: "Ed Maverick - HOY SOMOS NUEVOS SERES (MASTER 2)", src: "recurses/Music/Ed Maverick - HOY SOMOS NUEVOS SERES (MASTER 2).mp3" },
    { title: "Ed Maverick - valor de más", src: "recurses/Music/Ed Maverick - valor de más.mp3" },
    { title: "Ed Maverick - nube gris", src: "recurses/Music/Ed Maverick - nube gris.mp3" },
    { title: "Ed Maverick - violento", src: "recurses/Music/Ed Maverick - violento.mp3" },
    { title: "Ed Maverick - arcoíris", src: "recurses/Music/Ed Maverick - arcoíris.mp3" },
    { title: "loop", src: "recurses/Music/loop.mp3" } 
];

let songIndex = 0;
let isMuted = false;

const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('btn-play');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const muteBtn = document.getElementById('btn-mute');
const songTitle = document.getElementById('current-song-title');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');

function shufflePlaylist(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadSong(song) {
    songTitle.innerText = song.title;
    audio.src = song.src;
}

function playSong() {
    audio.play().then(() => {
        playBtn.innerHTML = "<span>PAUSE</span>"; 
    }).catch(error => {
        console.log("El navegador requiere interacción previa.");
    });
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "<span>PLAY</span>"; 
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = playlist.length - 1;
    }
    loadSong(playlist[songIndex]);
    playSong();
});

function nextSong() {
    songIndex++;
    if (songIndex > playlist.length - 1) {
        songIndex = 0;
    }
    loadSong(playlist[songIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
});

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteBtn.innerHTML = isMuted ? "<span>UNMUTE</span>" : "<span>MUTE</span>"; 
});

audio.addEventListener('ended', nextSong);

const clickIndicator = document.getElementById('click-indicator');

shufflePlaylist(playlist);
loadSong(playlist[songIndex]);

audio.play().then(() => {
    playBtn.innerHTML = "<span>PAUSE</span>";
    clickIndicator.classList.add('hidden');
}).catch(error => {
    console.log("Autoplay bloqueado por el navegador. Mostrando aviso...");
    
    clickIndicator.classList.remove('hidden');
    
    const iniciarMusica = () => {
        audio.play().then(() => {
            playBtn.innerHTML = "<span>PAUSE</span>";
            clickIndicator.classList.add('hidden');
            document.removeEventListener('click', iniciarMusica);
        });
    };
    
    document.addEventListener('click', iniciarMusica);
});