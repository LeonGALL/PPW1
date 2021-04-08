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

  this.velocite_x = 0;
  this.velocite_y = 0;

  this.force_x = 0;
  this.force_y = 0;

  if (masse <= 500) {
    this.radius = (masse / 500) * 5 + 5;
  } else {
    this.radius = (masse / 5000) * 10 + 7;
  } // Donne le rayon d'une particule.

  this.color = getRandomColor();

  this.deplacement = true;

  this.draw = function () {
    // Méthode qui dessine la particule
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
}



// Initialisation d'un ensemble de particules

var nbParticules_ini = 25; // Lors du chargement de la page il y a 25 Particules.
var tabParticules = new Array(nbParticules_ini);

for (let i = 0; i < nbParticules_ini; i++) {
  let masse = genereNombre(10, 100);
  let rad = 0.0;
  let ang = (2 * Math.PI * i) / nbParticules_ini;

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
tabParticules.push(grandeParticule);
grandeParticule.draw();




// Ajout de particules par double clic sur le canvas
canvas.addEventListener("dblclick", function () {
  addParticule(event, tabParticules);
});

var valmasse = document.getElementById("masse");
var valcolor = document.getElementById("color");

function addParticule(event, particules) {
  // Fonction qui crée la particule et l'affiche.
  var mouseX = event.pageX - canvas.offsetLeft;
  var mouseY = event.pageY - canvas.offsetTop;

  var particule_ajout = new Particule(parseInt(valmasse.value), mouseX, mouseY);

  particule_ajout.color = valcolor.value;
  particules.push(particule_ajout);
  particule_ajout.draw();
}




// Calcul du déplacement des particules
var dt = 0.2;

function calculDeplacements(particules, dt) {
  // Fonction qui calcule le déplacement des particules.
  const G = 1;
  for (let i = particules.length - 1; i >= 0; i--) {
    // On parcourt le tableau de particules dans le sens inverse (permet de supprimer des éléments).
    if (
      particules[i].x > canvas.width ||
      particules[i].x < 0 ||
      particules[i].y > canvas.width ||
      particules[i].y < 0
    ) {
      particules.splice(i, 1); // On supprime un élément qui n'est plus dans le canvas.
      continue;
    }

    if (particules[i].deplacement == false) {
      continue;
    }

    particules[i].force_x = 0;
    particules[i].force_y = 0;

    for (let j = 0; j < particules.length; j++) {
      if (i == j) {
        continue;
      }

      let dx = particules[j].x - particules[i].x;
      let dy = particules[j].y - particules[i].y;

      let r = Math.sqrt(dx * dx + dy * dy);
      let f = (G * particules[j].masse) / (r * r);

      particules[i].force_x += (f * dx) / r;
      particules[i].force_y += (f * dy) / r;
    }

    let ax = particules[i].force_x / particules[i].masse;
    let ay = particules[i].force_y / particules[i].masse;

    particules[i].velocite_x += ax * dt;
    particules[i].velocite_y += ay * dt;

    particules[i].x += particules[i].velocite_x * dt;
    particules[i].y += particules[i].velocite_y * dt;
  }
}




// Animations
var intevalID;
function animer() {
  intevalID = setInterval(function () {
    calculDeplacements(tabParticules, dt);
    ctx.fillStyle = "#171919";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let p = 0; p < tabParticules.length; p++) {
      tabParticules[p].draw();
    }
  }, 10);
}


// Accès aux boutons
var btnstart = document.getElementById("demarrer");
var btnstop = document.getElementById("arreter");

btnstart.addEventListener("click", function () {
  // Animation lors du click sur démarrer.
  clearInterval(intevalID); // Résoud le bug qui a lieu lors de double cliques sur le bouton démarrer (sinon, impossibilité d'arrêter l'animation si plusieurs cliques).
  animer();
});

btnstop.addEventListener("click", function () {
  // Arrêt de l'animation lors du click sur arrêter.
  clearInterval(intevalID);
});
