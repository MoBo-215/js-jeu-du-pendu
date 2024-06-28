var genererLettres = () => {
    var lettres = [];
    for(var i=65;i<=90;i++){
        lettres.push(String.fromCharCode(i));
    }
    return lettres;
};

var genererMot = () => {
     var nb_aleatoire = getRandomInt(0,mots.length-1);
     return mots[nb_aleatoire];
};

var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var recupLettresMapping = (lettres) => {
    var lettresMapping = lettres.map((lettre) => {
        return{
            lettre,
            choisie: false
        };
    });
    return lettresMapping;
};

var recupMotMapping = (mot) => {
    var motArray = mot.split("");
    var motMapping = motArray.map((lettre, index) => {
        var visible = false;
        if(index==0 || index==motArray.length-1){
            visible = true;
        }
        return{
            lettre,
            visible
        };
    });
    return motMapping;
};

var afficherLettres = (lettresMapping) => {
    var lettreHtml = lettresMapping.map((lettreMapping) => {
        if(lettreMapping.choisie==false){
            return "<li>"+lettreMapping.lettre+"</li>";
        }else {
            return '<li class="disabled">'+lettreMapping.lettre+'</li>';
        }
    });
    elements.lettres.querySelector("ul").innerHTML = lettreHtml.join("");
};

var afficherMot = (motMapping) => {
    var motHtml = motMapping.map((lettreMapping) => {
        if(lettreMapping.visible==true){
            return "<li>"+lettreMapping.lettre+"</li>";
        }else {
            return "<li>_</li>";
        }
    });
    elements.reponse.querySelector("ul").innerHTML = motHtml.join("");
};

var afficherErreurs = () => {
    elements.erreurs.innerHTML = `<img src="img/pendu${nb_erreurs}.png" alt="img_pendu">`;
}

var verifLettre = (lettre) => {
    var choix = false;
    var allLettresTrouvees = true;
    motMapping.forEach((lettreMapping) => {
        if(lettreMapping.lettre==lettre){
            lettreMapping.visible = true;
            choix = true;
        }

        if(lettreMapping.visible==false){
            allLettresTrouvees = false;
        }
    });

    lettresMapping.forEach((lettreMapping) => {
        if(lettreMapping.lettre==lettre){
            lettreMapping.choisie=true;
        }
    });

    afficherLettres(lettresMapping);

    if(choix==true){
        afficherMot(motMapping);
    }else {
        nb_erreurs++;
        afficherErreurs();
    }

    if(nb_erreurs==max_erreurs){
        perdu();
    }

    if(allLettresTrouvees==true){
        gagne();
    }
};

var perdu = () => {
    elements.lettres.innerHTML = '<h2 class="text-danger nosifer-regular ps-3">Vous êtes mort</h2><h2 class="text-danger"> (et nul) <(-_-)></h2>';
    setTimeout(() => {
        elements.audio.innerHTML = "";
        elements.erreurs.innerHTML = '<video controls autoplay width=400 id="saw_video"><source src="../img/saw_video.mp4" type="video/mp4" /></video>';
        var vid = document.getElementById("saw_video");
        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        }
    }, 1000);
}

var gagne = () => {
    document.querySelector("body").style.backgroundImage = "url('../img/background-gagne.jpg')";
    document.querySelector("body").style.color = "black";
    elements.audio.innerHTML = "";
    elements.erreurs.innerHTML = "";
    setTimeout(() => {
        elements.erreurs.innerHTML = '<video controls autoplay=true width=400 class="media-display-none"><source src="../img/mr-pringles-gagne.mp4" type="video/mp4" /></video>';
    }, 1000);
    elements.lettres.innerHTML = '<h2 class="text-primary ps-3">Vous êtes en vie !!! *(^-^)*</h2>';
}

var recommencer = () => {
    document.querySelector("body").style.backgroundImage = "url('../img/background-dark.jpg')";
    document.querySelector("body").style.color = "white";
    setTimeout(() => {
        location.reload();
    }, 500);
}