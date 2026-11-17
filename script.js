const playlist = [
    { title: "Ed Maverick - Fuentes De Ortiz", src: "recurses/Music/Ed Maverick - Fuentes De Ortiz.mp3" },
    { title: "Ed Maverick - Acurrucar", src: "recurses/Music/Ed Maverick - Acurrucar.mp3" },
    { title: "Ed Maverick - a mis amigos", src: "recurses/Music/Ed Maverick - a mis amigos.mp3" },
    { title: "Ed Maverick - HOY SOMOS NUEVOS SERES (MASTER 2)", src: "recurses/Music/Ed Maverick - HOY SOMOS NUEVOS SERES (MASTER 2).mp3" },
    { title: "Ed Maverick - valor de más", src: "recurses/Music/Ed Maverick - valor de más.mp3" },
    { title: "Ed Maverick - nube gris", src: "recurses/Music/Ed Maverick - nube gris.mp3" },
    { title: "Ed Maverick - violento", src: "recurses/Music/Ed Maverick - violento.mp3" },
    { title: "Ed Maverick - arcoíris", src: "recurses/Music/Ed Maverick - arcoíris.mp3" },
    { title: "loop", src: "recurses/Music/loop.mp3" },
    { title: "Ed Maverick - NO TODO ES PARTE DE LA VIDA", src: "recurses/Music/Ed Maverick - NO TODO ES PARTE DE LA VIDA.mp3"},
    { title: "Ed Maverick, niño viejo - me inundo", src: "recurses/Music/Ed Maverick, niño viejo - me inundo.mp3"},
    { title: "ESCOMBRO", src: "recurses/Music/ESCOMBRO.mp3"},
    { title: "Ed Maverick - tendría que hablar de luz", src: "recurses/Music/Ed Maverick - tendría que hablar de luz.mp3"},
    { title: "Ed Maverick, Little Jesus - SAHUARO", src: "recurses/Music/Ed Maverick, Little Jesus - SAHUARO.mp3"},
    { title: "Ed Maverick - en las buenas y en las malas", src: "recurses/Music/Ed Maverick - en las buenas y en las malas.mp3"} 
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

document.addEventListener("DOMContentLoaded", () => {
    const btnVerMas = document.getElementById("btn-ver-mas-portafolio");
    const hiddenVideos = document.querySelectorAll(".hidden-video");
    const btnVerMasBlog = document.getElementById("btn-ver-mas-blog");
    const hiddenBlogs = document.querySelectorAll(".hidden-blog");

    if (btnVerMas) {
        btnVerMas.addEventListener("click", () => {
            const estaOculto = hiddenVideos[0].style.display === "none" || hiddenVideos[0].style.display === "";

            if (estaOculto) {
                hiddenVideos.forEach(video => {
                    video.style.display = "block";
                });
                btnVerMas.querySelector("span").textContent = "Ver menos";
            } else {
                hiddenVideos.forEach(video => {
                    video.style.display = "none";
                });
                btnVerMas.querySelector("span").textContent = "Ver más";
                
                document.getElementById("portafolio").scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (btnVerMasBlog) {
        btnVerMasBlog.addEventListener("click", () => {
            const estaOculto = hiddenBlogs[0].style.display === "none" || hiddenBlogs[0].style.display === "";

            if (estaOculto) {
                hiddenBlogs.forEach(item => {
                    item.style.display = "block";
                });
                btnVerMasBlog.querySelector("span").textContent = "Ver menos";
            } else {
                hiddenBlogs.forEach(item => {
                    item.style.display = "none";
                });
                btnVerMasBlog.querySelector("span").textContent = "Ver más";
            }
        });
    }
});