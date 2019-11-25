var langueFile = "./data/french.json";

langue.onchange = function(){
	if (langue.value == "fr") {
		langueFile = "./data/french.json";
	}
	else if (langue.value == "en") {
		langueFile = "./data/english.json";
	}
	else if (langue.value == "ar") {
		langueFile = "./data/3arab.json";
	}

d3.json(langueFile).then((data) => {
	// Menu
	document.getElementById('accueil').innerHTML = data.menu.accueil
	document.getElementById('ensavoirplus').innerHTML = data.menu.ensavoirplus
	document.getElementById('mesvoyages').innerHTML = data.menu.mesvoyages
	document.getElementById('mescompetences').innerHTML = data.menu.mescompetences
	document.getElementById('mesprojets').innerHTML = data.menu.mesprojets
	document.getElementById('mecontacter').innerHTML = data.menu.mecontacter

    document.getElementById('salutation').innerHTML = data.salutation;
    document.getElementById('identite').innerHTML = data.identite;
    if (langue.value != "ar") {
    	document.getElementById('super').innerHTML = data.super;
    	document.getElementById('suparb').innerHTML = "";
    } else {
    	document.getElementById('super').innerHTML = "";
    	document.getElementById('suparb').innerHTML = " "+data.super;
    }
    document.getElementById('apropos').innerHTML = data.apropos;
    document.getElementById('parle').innerHTML = data.parle;
    document.getElementById('voyages').innerHTML = data.voyages;
    document.getElementById('competences').innerHTML = data.competences;
    	document.getElementById('comp1').innerHTML = data.comp1;
    	document.getElementById('comp2').innerHTML = data.comp2;
    	document.getElementById('comp3').innerHTML = data.comp3;
    document.getElementById('projets').innerHTML = data.projets;
    	document.getElementById('titpr1').innerHTML = data.titpr1;
    	document.getElementById('titpr2').innerHTML = data.titpr2;
    	document.getElementById('titpr3').innerHTML = data.titpr3;
    document.getElementById('contacter').innerHTML = data.contacter;
    document.getElementById('ecrivez').innerHTML = data.ecrivez;
    document.getElementById('envoyer').innerHTML = data.envoyer;
});

}

