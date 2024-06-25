var elements = {
    erreurs: null,
    reponse: null,
    lettres: null
};

var mots = [
    "JAVASCRIPT",
    "JEUDUPENDU",
    "PERLINPINPIN",
    "MILWAUKEE",
    "ACCORARENA",
    "BASKETBALL",
    "FOOTBALL",
    "VOYAGER",
    "DEVELOPPER",
    "DECOUVRIR",
    "MARRAKECH",
    "TECHNOLOGIE",
    "LYNX",
    "REFACTORING",
    "CHICO",
    "DENT",
    "AFRO",
    "HAMBURGER",
    "KETCHUP",
    "KEROZENE",
    "JETPRIVE",
    "MARSUPILAMI",
    "PILOTAGE",
    "SCHTROUMPF",
    "CHICKEN",
    "YAKITORI",
    "OSAKA",
    "OKINAWA",
    "SCOOTER",
    "BECANE",
    "MISSILE",
    "CAVE",
    "FAUTEUIL",
    "CANAPE-LIT",
    "NUMEROLOGIE",
    "SCIENTOLOGIE",
    "SUPERSTAR",
    "DERANGE",
    "CASSOS",
    "ANONYME",
    "INCONNU",
    "VALSE"
];

var regex = /^[A-Za-z]$/;

var lettres = [];
var mot = "";
var motMapping = [];
var lettresMapping = [];
var nb_erreurs = 0;
var max_erreurs = 8;

var init = () => {
    elements.audio = document.querySelector("#audio");
    elements.erreurs = document.querySelector("#erreurs");
    elements.reponse = document.querySelector("#reponse");
    elements.lettres = document.querySelector("#lettres");
    
    mot = genererMot();
    motMapping = recupMotMapping(mot);
    lettres = genererLettres();
    lettresMapping = recupLettresMapping(lettres);
    afficherMot(motMapping);
    afficherLettres(lettresMapping);
    
    elements.lettres.addEventListener("click", ({target}) => {
        if(target.matches("li")){
            verifLettre(target.innerHTML);
        }
    });
    
    document.addEventListener("keydown", ({keyCode}) => {
        var lettre = String.fromCharCode(keyCode);
        if(regex.test(lettre)){
            verifLettre(lettre);
        }
    });
};

window.onload = init;