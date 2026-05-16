const moods = {
  focused:{
    bg1:"#06111f",
    bg2:"#0e2b4f",
    accent:"#45d483",
    particleSpeed:0.3,
    music:"songs/focused.mp3",
    code:`system.mode = "focused"
tabs_open = 12
energy = stable
mind.noise = low
mission = "deep work"
status = "locked in"`
  },

  chaotic:{
    bg1:"#18000e",
    bg2:"#aab300a0",
    accent:"#ff9100",
    particleSpeed:1.8,
    music:"https://youtu.be/ZFWC4SiZBao?si=lL1Ymu0CxO1jcnzF",
    code:`brain.activity = overload
emotion = "chaotic"
playlist = "ultraviolence"
notifications = 47
reality = unstable
status = "running wild"`
  },

  dreamy:{
    bg1:"#0c0820",
    bg2:"#39276d",
    accent:"#7ce7ff",
    particleSpeed:0.5,
    music:"songs/dreamy.mp3",
    code:`reality.opacity = 34%
mind = floating
citylights = active
focus = cloud-shaped
emotion = "dreamy"
status = "watching neon rain"`
  },

  melancholic:{
    bg1:"#09121f",
    bg2:"#273f66",
    accent:"#8aa6ff",
    particleSpeed:0.2,
    music:"songs/melancholic.mp3",
    code:`weather = "internal rain"
heart = reflective
social.battery = 12%
playlist = "slow reverb"
emotion = melancholic
status = "processing memories"`
  },

  confident:{
    bg1:"#1a1202",
    bg2:"#7b4c00",
    accent:"#ffb347",
    particleSpeed:1,
    music:"songs/confident.mp3",
    code:`confidence = 100%
fear = null
presence = dominant
mind.os = elevated
aura = glowing
status = "main character mode"`
  }
};

const moodSelect = document.getElementById("mood");
const button = document.getElementById("bootBtn");
const codeBlock = document.getElementById("codeBlock");
const audio = document.getElementById("bgMusic");

button.addEventListener("click",()=>{

  const current = moods[moodSelect.value];

  document.documentElement.style.setProperty("--bg1",current.bg1);
  document.documentElement.style.setProperty("--bg2",current.bg2);
  document.documentElement.style.setProperty("--accent",current.accent);

  audio.src = current.music;
  audio.volume = 0.5;

  audio.play().catch(()=>{
    console.log("Autoplay bloqueado até interação do usuário.");
  });

  typeCode(current.code);

  particleMultiplier = current.particleSpeed;

});

function typeCode(text){

  codeBlock.textContent = "";

  let i = 0;

  const typing = setInterval(()=>{

    codeBlock.textContent += text.charAt(i);

    i++;

    if(i >= text.length){
      clearInterval(typing);
    }

  },16);
}

/* PARTICLES */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particleMultiplier = 0.5;

const particles = [];

for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    dx:(Math.random()-.5),
    dy:(Math.random()-.5)
  });
}

function animate(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,.6)";
    ctx.fill();

    p.x += p.dx * particleMultiplier;
    p.y += p.dy * particleMultiplier;

    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
