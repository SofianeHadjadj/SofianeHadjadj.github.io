var vals = {"Pas besoin":0, "Besoin d'approfondissement":50, "Besoin urgent":100, "je ne connais pas du tout":0,"je connais un peu":25,"je connais bien":65,"je suis expert(e)":100};
var d1 = [];
var dCompetence = [];
var valeur_competence = {"competence":[],"score":[]}
var score_competence_global = [];
var dBesoin = []
var valeur_besoin = {"besoin":[],"score":[]}
var score_besoin_global = []
var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv';        

var q = d3.queue()
.defer(d3.csv, url)
.awaitAll(function(error, results) {
  if (error) throw error;
  setData(results);
});

function setData(data) {
	dataForm = data[0];
	dataForm.forEach(function(d, j){
		d.reponses = {'besoins':[],'competences':[],'outils':[],'framework' :[],'langages':[],'langues':[]};
		for (let i in d) {
			var prop = i.substring(i.indexOf("[")+1,i.indexOf("]")); 
			var v = d[i];
			var n = vals[v];
			if(i.indexOf("besoins")>0){
				d.reponses.besoins.push({'prop':prop,'importance':n,'expression':v,'id':j});
			}
			if(i.indexOf("compétences")>0){
				d.reponses.competences.push({'prop':prop,'importance':n,'expression':v,'id':j});
			}
			if(i.indexOf("outils utilisez")>0){
				d.reponses.outils.push({'prop':prop,'importance':n,'expression':v,'id':j});
			}
			if(i.indexOf("framework utilisez")>0){
                d.reponses.framework.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }
            if(i.indexOf("langages utilisez")>0){
                d.reponses.langages.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }
            if(i.indexOf("langues parlez")>0){
                d.reponses.langues.push({'prop':prop,'importance':n,'expression':v,'id':j});
            }									
		}
		d1.push(d)
        dCompetence.push(d.reponses.competences)
        dBesoin.push(d.reponses.besoins)
	});

	function getPhoto(i){
		let url = new URL(d1[i]['Votre photo']);
	    let urlParam = new URLSearchParams(url.search);
	    let id = urlParam.get('id');
	    let urlTof = "https://drive.google.com/uc?id="+id+"&export=download";  
		return urlTof
	}

	globalCompetences()
	globalBesoins()
	for(var i = 0; i <= dCompetence.length; i++) {
		d3.select('#derouleur').append('option').text(dCompetence[0][i]['prop']).attr("value",dCompetence[0][i]['prop']);
	}

	$("#derouleur").change();
}

$( document ).ready(function() {
	$("#derouleur").on("change",function(){
		d3.selectAll('#li').remove()
		for(var i = 0; i <= dCompetence.length; i++)
		{
			for(var j = 0; j <= dCompetence.length; j++)
			{
				//console.log(dCompetence[i][j]['prop']);
				if(dCompetence[i][j]['prop'] === this.value )
				{	
					bestScoreC(dCompetence,i,j)
					bestScoreB(dBesoin,i,j)
					console.log(i);
					console.log(j);
				}
			}
		}

	});
});

function giveName(id){
	return(d1[id]['Votre prénom'] + " "+d1[id]['Votre nom'] )
}

function bestScoreC(dCompetence,i,j) {
	if(dCompetence[i][j].importance==100) {
		var name = giveName(i);
		console.log(dCompetence[i][j].importance);
		d3.select('#listeScore').append('li').attr("style","color:#3071b2;font-size:18px").attr("id","li").text(name);
	} else if (dCompetence[i][j].importance==65) {
		var name = giveName(i);
		console.log(dCompetence[i][j].importance);
		d3.select('#listeScoreC').append('li').attr("style","color:#45a597;font-size:18px").attr("id","li").text(name);
	}
}

function bestScoreB(dBesoin,i,j) {
	if(dBesoin[i][j].importance==100) {
		var name = giveName(i);
		console.log(dBesoin[i][j].importance);
		d3.select('#listeScoreB').append('li').attr("style","color:#fc4141;font-size:18px").attr("id","li").text(name); 	
	} else if (dBesoin[i][j].importance==50) {
		var name = giveName(i);
		console.log(dBesoin[i][j].importance);
		d3.select('#listeScoreD').append('li').attr("style","color:#9e6696;font-size:18px").attr("id","li").text(name); 
	}
}

function globalCompetences() {	
	for( var j = 0; j <=dCompetence.length; j++){
		score_competence_global[j] = 0; 
        for( var i = 0; i < dCompetence.length ; i++){
			valeur_competence.competence = dCompetence[i][j]['prop'];
			if(dCompetence[i][j]['importance'] !=undefined){
				valeur_competence.score = dCompetence[i][j]['importance'];
				score_competence_global[j] = score_competence_global[j] + valeur_competence.score; 
			}
    	}
		score_competence_global[j] = score_competence_global[j] / dCompetence.length;
		document.getElementById('wrap_cp').innerHTML += '<div class="pd_b">'
						+'<h4 class="progress-title">'+valeur_competence.competence+'</h4>'
						+'<div class="progress green">'
						    +'<div class="progress-bar" style="width:'+score_competence_global[j]+'%; background:#5fad56;">'
						        +'<div class="progress-value">'+score_competence_global[j]+'%</div>'
				                +'</div>'
				            +'</div>'
				        +'</div>';	
	}
}

function globalBesoins() {
	for( var j = 0; j <=dBesoin.length; j++){
		score_besoin_global[j] = 0;
        for( var i = 0; i < dBesoin.length ; i++){
			valeur_besoin.besoin = dBesoin[i][j]['prop'];
			if(dBesoin[i][j]['importance'] !=undefined){
				valeur_besoin.score = dBesoin[i][j]['importance']
				score_besoin_global[j] = score_besoin_global[j] + valeur_besoin.score ;
			}
    	}
		score_besoin_global[j] = score_besoin_global[j] / dBesoin.length
		document.getElementById('wrap_bs').innerHTML += '<div class="pd_b">'
						+'<h4 class="progress-title">'+valeur_besoin.besoin+'</h4>'
						+'<div class="progress blue">'
						    +'<div class="progress-bar" style="width:'+score_besoin_global[j]+'%; background:#3485ef;">'
						        +'<div class="progress-value">'+score_besoin_global[j]+'%</div>'
				                +'</div>'
				            +'</div>'
				        +'</div>';	
	}
}