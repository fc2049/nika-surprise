const scoreDisplay = document.getElementById('score');
const letter = document.getElementById('letter');
const intro = document.getElementById('intro');
const bgMusic = document.getElementById('bg-music');

let score = 0;
let heartsOnScreen = [];

// --- Música de fundo ---
bgMusic.volume = 0.3;
bgMusic.play().catch(() => {
  document.body.addEventListener('click', () => bgMusic.play());
});

// --- Mostrar intro por alguns segundos ---
setTimeout(() => {
  intro.style.opacity = 0;
  setTimeout(() => { intro.style.display = 'none'; scoreDisplay.style.opacity = 1; startGame(); }, 1500);
}, 3500);

// --- Função principal do jogo ---
function startGame() {
  // Spawn automático de corações
  setInterval(() => {
    if(score < 10) createHeart();
  }, 1200);
}

// --- Criar corações com limite máximo ---
function createHeart() {
  // Limitar 5 corações na tela
  if(heartsOnScreen.length >= 5){
    const oldest = heartsOnScreen.shift();
    oldest.remove();
  }

  const heart = document.createElement('img');
  heart.className = 'heart';
  heart.src = 'assets/gifs/heart.gif'; // seu GIF
  heart.style.left = Math.random() * 90 + 'vw';
  heart.style.top = Math.random() * 80 + 'vh';
  document.body.appendChild(heart);
  heartsOnScreen.push(heart);

  heart.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `❤️ ${score} / 10`;
    heart.remove();
    heartsOnScreen = heartsOnScreen.filter(h => h !== heart);
    spawnConfetti(heart.offsetLeft, heart.offsetTop);
    playSound('assets/sounds/click.mp3');
    if(score >= 10) showLetter();
  });
}

// --- Confetti ---
function spawnConfetti(x, y){
  for(let i=0;i<25;i++){
    const conf = document.createElement('div');
    conf.className='confetti';
    conf.style.left=x+'px';
    conf.style.top=y+'px';
    conf.style.backgroundColor=`hsl(${Math.random()*360},100%,70%)`;
    conf.style.width=Math.random()*8+4+'px';
    conf.style.height=conf.style.width;
    conf.style.animationDuration=1+Math.random()*1.5+'s';
    document.body.appendChild(conf);
    setTimeout(()=>conf.remove(),3000);
  }
  playSound('assets/sounds/confetti.mp3');
}

// --- Sons ---
function playSound(src){
  const sound = new Audio(src);
  sound.volume = 0.5;
  sound.play();
}

// --- Carta ---
function showLetter(){
  letter.classList.add('show');
}
