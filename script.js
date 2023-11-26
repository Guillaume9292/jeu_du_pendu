let recommencer = document.querySelector(".recommencer");
let proposer = document.querySelector(".Proposer");
let commentaires = document.querySelector("#commentaires");

let lettres = document.querySelectorAll(".lettre");
let essais = document.querySelector("#essais")
let image= document.querySelector("img");
let motChoisi="";

const motADecouvrir = [
  "BONZAI",
  "COLOMBE",
  "ICEBERG",
  "BISCORNU",
  "JACINTHE",
  "BOWLING",
  "CARAPACE",
  "HERISSON",
  "ESCARGOT",
  "BATEAU",
  "SCARABEE",
  "FEERIQUE",
  "ESCAPADE",
  "PARFUM",
  "LECTURE",
  "CONCEPT",
];

//Changement d'apparence des lettres de l'alphabet avec effet grossissant et couleur rose
lettres.forEach((lettre) => {
  lettre.addEventListener("mouseover", () => {
    lettre.style.fontWeight = "bold";
    lettre.style.scale = 1.2;
    lettre.style.cursor = "pointer";
  });

  lettre.addEventListener("mouseout", () => {
    lettre.style.fontWeight = "normal";
    lettre.style.scale = 1;
  });
});


//créer les cases avec underscrores en fonction du nombre de lettres du mot à découvrir
function creerCases(mot) {
  const conteneurCases = document.querySelector("#cases");

  motDivise.forEach((letr) => {
    const caseDiv = document.createElement("div");
    if (letr === " ") {
      caseDiv.textContent = " ";
    } else {
      caseDiv.textContent = "_";
    }
    caseDiv.style.margin = "10px";
    caseDiv.style.border = "1px solid black";
    caseDiv.style.padding = "10px";
    caseDiv.style.marginBottom = "20px";
    caseDiv.style.height = "32px";
    caseDiv.classList.add('caseDiv')
    conteneurCases.appendChild(caseDiv);
  });
}


//Fonction pour choisir le mot à deviner
function choisirMotAleatoire() {
  const indiceAleatoire = Math.floor(Math.random() * motADecouvrir.length);
  let motAleatoire = motADecouvrir[indiceAleatoire];
  return motAleatoire;
}

motChoisi = choisirMotAleatoire();
console.log(motChoisi);


//Couper le mot à deviner en lettres dans le tableau
let mot = motChoisi;
let motDivise = mot.split("");
console.log(motDivise);

creerCases(mot);


function jouer(){

//Récupérer la lettre cliquée
let vies = 7;
let lettresCliquees = [];
let lettresCorrectes = 0;

lettres.forEach((lettre) =>
  lettre.addEventListener("click", (e) => {
  let lettreCliquee = e.target.textContent;
   
    console.log("lettreCliquee:" + lettreCliquee);
    console.log("lettresCliquees:" + lettresCliquees);

    // Vérifier si la lettre a déjà été utilisée
    if (!lettresCliquees.includes(lettreCliquee)) {
    lettresCliquees.push(lettreCliquee);
    let lettreCorrecte = false;

    // Parcourir le mot pour vérifier si la lettre cliquée est correcte
    // Si la lettre est correcte, elle devient rose
      motDivise.forEach((lettreDuMot, index) => {
      if (lettreDuMot.toUpperCase() === lettreCliquee.toUpperCase()) {
      allCaseDiv[index].textContent = lettreDuMot;
      lettreCorrecte = true;
      lettre.style.backgroundColor = '#f55e71'; 
      lettresCorrectes++
      } 
      });

    //dire "Vous avez gagné quand toutes les lettres ont été trouvées"
      if (lettresCorrectes === motDivise.length){
      commentaires.textContent=("Vous avez GAGNÉ !");
      }

    //Gestion des vies avec image du pendu qui correspond au nombre de vies
      if (!lettreCorrecte) {
      vies--;
      essais.textContent = `Attention, il vous reste ${vies} vies`;
      console.log(vies);
      image.src = `img/${vies}.png`;
        
      } 
      
      //Quand le joueur n'a plus de vies, le clavier disparaît 
      //afin qu'il ne puisse plus cliquer sur une lettre
      if(vies === 0){
        essais.textContent = `Vous n'avez plus de vies`;
        commentaires.textContent = ("Malheureusement, vous avez perdu !");
        document.getElementById("alphabet").hidden = true;
        document.getElementById("pied").hidden = true;
      }
    } else {
      commentaires.textContent = "Vous avez déjà choisi cette lettre.";
    }
  })
);
};


const allCaseDiv = document.querySelectorAll('.caseDiv')
console.log(allCaseDiv);

jouer();


//Refaire une partie en demandant une confirmation au joueur
recommencer.addEventListener("click", ()=>{
  let Rejouer = confirm ("Vous souhaitez recommencer ?");
  if (Rejouer == true) {
    location.reload();
} else {
  alert("Dommage...");
}
});


//Proposer un mot avec la possibilité d'indiquer la réponse en minuscule ou majuscule
proposer.addEventListener("click", () =>{
  let proposition = prompt("Proposez un mot : ");
  if (proposition.toUpperCase() == motChoisi){
  commentaires.textContent =("Vous avez gagné !!, le mot est bien " + motChoisi);
  } else {
    alert("Cette réponse est erronée.")};
});
