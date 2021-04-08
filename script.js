// Pour afficher/masquer le menu de contrôle lors du clic:

var controle = document.getElementById("controle");
var txtcontrole = document.getElementById("afficher_controle");

txtcontrole.addEventListener("click", dispcontrol);

function dispcontrol() {
  if (controle.style.display === "block") {
    controle.style.display = "none";
    txtcontrole.innerHTML = "&dArr; Afficher les contrôles";
  } else {
    controle.style.display = "block";
    txtcontrole.innerHTML = "&rArr; Masquer les contrôles";
  }
}

// Pour faire un joli effet sur les boutons au survol et au click:

var btnstart = document.getElementById("demarrer");
var btnstop = document.getElementById("arreter");

btnstart.addEventListener("mouseover", function () {
  changetxt(this, "&#x25BA;");
  changebackgroundcolor(this, "rgba(102, 255, 102, 0.8)");
});

btnstart.addEventListener("mouseout", function () {
  changetxt(this, "Démarrer");
  changebackgroundcolor(this, "rgba(102, 255, 102, 0.9)");
});

btnstart.addEventListener("click", function () {
  changebackgroundcolor(this, "springgreen");
});

btnstop.addEventListener("mouseover", function () {
  changetxt(this, "&#9641;");
  changebackgroundcolor(this, "rgba(255, 51, 51, 0.8)");
});

btnstop.addEventListener("mouseout", function () {
  changetxt(this, "Arrêter");
  changebackgroundcolor(this, "rgba(255, 51, 51, 0.9)");
});

btnstop.addEventListener("click", function () {
  changebackgroundcolor(this, "tomato");
});

function changetxt(to, text) {
  to.innerHTML = text;
}

function changebackgroundcolor(to, color) {
  to.style.backgroundColor = color;
}

// Afficher la valeur de la masse sélectionnéee

var aff_valmasse = document.getElementById("value_masse");
var valmasse = document.getElementById("masse");

changetxt(aff_valmasse, valmasse.value);

valmasse.addEventListener("input", function () {
  changetxt(aff_valmasse, this.value);
});
