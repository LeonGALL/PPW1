// Page de code de l'application js d'animation des particules.
// PW1 Léon GALL, Nicolas JARDINÉ


// Accès au canvas
var canvas = document.getElementById("affichage");
var ctx = canvas.getContext("2d");


// Générer un nombre entier entre min(inclus) et max(exclus)
function genereNombre(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// Générer une couleur en héxadécimal aléatoirement
// Snippet récupéré sur https://stackoverflow.com/a/1484514
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



// Classe particule
function Particule(masse, x, y) {
  this.masse = masse;

  this.x = x;
  this.y = y;

  this.velocite_x;
  this.velocite_y;

  this.force_x;
  this.force_y;

  if (masse <= 500) {
    this.radius = (masse/500)*5 + 5;
  } else {
    this.radius = (masse /5000)* 10 + 5;
  }// J'ai fait moi-même cette formule.

  this.color = getRandomColor();

  this.deplacement = true;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
}



// Initialisation d'un ensemble de particules

var nbParticules = 25;
var tabParticules = new Array(nbParticules);

for (let i = 0; i < nbParticules; i++) {
  let masse = genereNombre(10, 100);
  let rad = 0.0;
  let ang = (2 * Math.PI * i) / nbParticules;
  if (masse < 50) {
    rad = genereNombre(50, 100);
  } else {
    rad = genereNombre(100, 200);
  }
  let x = canvas.width / 2 + rad * Math.sin(ang);
  let y = canvas.height / 2 + rad * Math.cos(ang);

  let nouvelleParticule = new Particule(masse, x, y);

  nouvelleParticule.velocite_x = -0.01 * rad * Math.cos(ang);
  nouvelleParticule.velocite_y = 0.01 * rad * Math.sin(ang);

  nouvelleParticule.draw();

  tabParticules[i] = nouvelleParticule;
}

// Ajout d'une particule de taille importante
let centre_x = canvas.width / 2;
let centre_y = canvas.height / 2;
let grande_masse = 3000;

var grandeParticule = new Particule(grande_masse, centre_x, centre_y);
grandeParticule.deplacement = false;
grandeParticule.draw();
