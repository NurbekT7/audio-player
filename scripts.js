// Получаем элементы
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const volumeControl = document.getElementById('volume');
const trackList = document.getElementById('track-list');
const repeatOneBtn = document.getElementById('repeat-one');
const repeatAllBtn = document.getElementById('repeat-all');
const randomBtn = document.getElementById('random');
const stopBtn = document.getElementById('stop');

let tracks = [
  { name: 'Track 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Track 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { name: 'Track 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { name: 'Track 4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

let currentTrackIndex = 0;
let playbackMode = 'repeatAll'; // repeatOne, repeatAll, random

// Заполняем список треков
tracks.forEach((track, index) => {
  const li = document.createElement('li');
  li.textContent = track.name;
  li.dataset.index = index;
  trackList.appendChild(li);
});

// Функция для смены трека
function changeTrack(index) {
  audio.src = tracks[index].url;
  audio.play();
  currentTrackIndex = index;
  playPauseBtn.textContent = 'Пауза';
}

// Слушатель кликов на трек
trackList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const trackIndex = e.target.dataset.index;
    changeTrack(trackIndex);
  }
});

// Кнопка паузы/воспроизведения
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'Пауза';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'Продолжить';
  }
});

// Громкость
volumeControl.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

// Цикличное воспроизведение одного трека
repeatOneBtn.addEventListener('click', () => {
  playbackMode = 'repeatOne';
  audio.loop = true;
  audio.onended = null;
});

// Цикличное воспроизведение всего списка
repeatAllBtn.addEventListener('click', () => {
  playbackMode = 'repeatAll';
  audio.loop = false;
  audio.onended = () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    changeTrack(currentTrackIndex);
  };
});

// Рандомное воспроизведение
randomBtn.addEventListener('click', () => {
  playbackMode = 'random';
  audio.loop = false;
  audio.onended = () => {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    changeTrack(currentTrackIndex);
  };
});

// Остановка трека
stopBtn.addEventListener('click', () => {
  audio.pause();
  audio.currentTime = 0;
  playPauseBtn.textContent = 'Продолжить';
  audio.onended = null;
});

