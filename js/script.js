const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar");
volBar = wrapper.querySelector("#vol-bar");

let musicIndex = 0;
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb].name;
  musicArtist.innerText = allMusic[indexNumb].artist;
  musicImg.src = `images/music-1.png`;
  mainAudio.src = `songs/music-1.mp3`;
}

function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  isMusicPlay ? pauseMusic() : playMusic();
});

mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; 
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});

document.querySelector(".range").addEventListener("change", (e)=>{
  if(document.querySelector(".vol").getElementsByTagName("img")[0].src.includes("mute.svg")){
      document.querySelector(".vol").getElementsByTagName("img")[0].src = document.querySelector(".vol").getElementsByTagName("img")[0].src.replace("mute.svg", "volume.svg")
  }
  mainAudio.volume = parseInt(e.target.value)/100;
})

document.querySelector(".vol").getElementsByTagName("img")[0].addEventListener("click", (e)=>{
  if(e.target.src.includes("volume.svg")){
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      mainAudio.volume = 0;
      document.querySelector(".range").value = 0;
  }
  else{
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      mainAudio.volume = 0.3;
      document.querySelector(".range").value = 30;
  }
})