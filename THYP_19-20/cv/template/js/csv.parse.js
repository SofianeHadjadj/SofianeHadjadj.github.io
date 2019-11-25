		d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv").then((data) => {

				// ### INITIALISATION DU PORTFOLIO AVEC LE PROFIL PAR DEFAUT ###

				//$("#mapshow1").addClass("important");
				
				document.getElementById('speciality').innerHTML = " " + data[18]["Vos spécialités"];	
				document.getElementById('emailfront').innerHTML = data[18]["Votre mail"];

				langues.forEach(function(langue) {

					var level;
					switch(data[18]["Quelles langues parlez vous ? ["+langue+"]"]) {
						case "je ne connais pas du tout":
						level = rien;
						break;

						case "je connais un peu": 
						level = unpeu;
						break;

						case "je connais bien": 
						level = bien;
						break;

						case "je suis expert(e)": 
						level = tresbien;
						break;
			
					}
					if (level != rien) {
						if (level != undefined) {
							document.getElementById(langue).innerHTML = langue.toUpperCase() + " : " + level;
						}
					}
				});

				languages.forEach(function(language) {	
					var lvllg;
					switch(data[18]["Quelles langages utilisez vous ? ["+language+"]"]) {
						case "je ne connais pas du tout":
						lvllg = rien;
						break;

						case "je connais un peu": 
						lvllg = unpeu;
						break;

						case "je connais bien": 
						lvllg = bien;
						break;

						case "je suis expert(e)": 
						lvllg = tresbien;
						break;
					}		
					if (lvllg != rien) {
						document.getElementById('prog').innerHTML += "<div class='tag pink'>"+language+"</div>";	
					}	
				});

				framework.forEach(function(frmwork) {	
					var lvlfm;
					switch(data[18]["Quelles framework utilisez vous ? ["+frmwork+"]"]) {
						case "je ne connais pas du tout":
						lvlfm = rien;
						break;

						case "je connais un peu": 
						lvlfm = unpeu;
						break;

						case "je connais bien": 
						lvlfm = bien;
						break;

						case "je suis expert(e)": 
						lvlfm = tresbien;
						break;
					}		
					if (lvlfm != rien) {
						document.getElementById('prog').innerHTML += "<div class='tag blue'>"+frmwork+"</div>";	
					}	
				});

				outils.forEach(function(outil) {	
					var lvlot;
					switch(data[18]["Quelles outils utilisez vous ? ["+outil+"]"]) {
						case "je ne connais pas du tout":
						lvlot = rien;
						break;

						case "je connais un peu": 
						lvlot = unpeu;
						break;

						case "je connais bien": 
						lvlot= bien;
						break;

						case "je suis expert(e)": 
						lvlot = tresbien;
						break;
					}		
					if (lvlot != rien) {
						document.getElementById('tools').innerHTML += "<div class='tag green'>"+outil+"</div>";	
					}	
				});

				competences.forEach(function(competence) {	
					var lvlcp;
					switch(data[18]["Quelles sont vos compétences ? ["+competence+"]"]) {
						case "je ne connais pas du tout":
						lvlcp = rien;
						break;

						case "je connais un peu": 
						lvlcp = unpeu;
						break;

						case "je connais bien": 
						lvlcp= bien;
						break;

						case "je suis expert(e)": 
						lvlcp = tresbien;
						break;
					}		
					if (lvlcp != rien) {
						document.getElementById('comp').innerHTML += "<li class='listcomp'>"+competence.toUpperCase()+"</li>";	
					}	
				});				

                var numetu = data[18]["N° étudiant"];

				d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTDaWciiOoWzdcJ2FicK9v9CN64A7T7kfxiEck4rhGoO3jg6Wt4H2Mn4JBotZ4D1WS8yzuMQiuoAcqA/pub?gid=962807497&single=true&output=csv"
					).then((dataX) => {

					document.getElementById('description').innerHTML = dataX[0]["Courte description de vous"];
					document.getElementById('mycv').innerHTML = '<a class="primary_btn" href="'+dataX[0]["Votre cv"]+'" target="_blank"><span>Download my CV</span></a>';

						var upr1 = new URL(dataX[0]["Photo projet 1"]);
                     	var uspr1 = new URLSearchParams(upr1.search);
                     	var idpr1 = uspr1.get('id');
                    	var ipr1 = "https://drive.google.com/uc?id="+idpr1+"&export=download"; 
						document.getElementById('imgpr1').setAttribute("src", ipr1);
						document.getElementById('linkpr1').setAttribute("href", dataX[0]["Lien projet 1"]);

						var upr2 = new URL(dataX[0]["Photo projet 2"]);
                     	var uspr2 = new URLSearchParams(upr2.search);
                     	var idpr2 = uspr2.get('id');
                    	var ipr2 = "https://drive.google.com/uc?id="+idpr2+"&export=download"; 
						document.getElementById('imgpr2').setAttribute("src", ipr2);
						document.getElementById('linkpr2').setAttribute("href", dataX[0]["Lien projet 2"]);

						var upr3 = new URL(dataX[0]["Photo projet 3"]);
                     	var uspr3 = new URLSearchParams(upr3.search);
                     	var idpr3 = uspr3.get('id');
                     	var ipr3 = "https://drive.google.com/uc?id="+idpr3+"&export=download";
						document.getElementById('imgpr3').setAttribute("src", ipr3);
						document.getElementById('linkpr3').setAttribute("href", dataX[0]["Lien projet 3"]);

						document.getElementById('ln1').innerHTML = "<a href='"+dataX[0]["Votre compte linkedin"]+"' target='_blank' title='Linkedin'><i class='ti-linkedin'></i></a>"
						document.getElementById('ln2').innerHTML = "<a href='"+dataX[0]["Votre compte linkedin"]+"' target='_blank' title='Linkedin'><i class='ti-linkedin'></i></a>"
						
						document.getElementById('sk1').innerHTML = "<a href='skype:"+dataX[0]["Votre compte skype"]+"' target='_blank' title='Linkedin'><i class='ti-skype'></i></a>"
						document.getElementById('sk2').innerHTML = "<a href='skype:"+dataX[0]["Votre compte skype"]+"' target='_blank' title='Linkedin'><i class='ti-skype'></i></a>"

						document.getElementById('gt1').setAttribute("href", 'https://github.com/'+data[18]["Votre compte GitHub"]);
						document.getElementById('gt2').setAttribute("href", 'https://github.com/'+data[18]["Votre compte GitHub"]);
						
				});

			// ### ATTRIBUTION D'UN INDEX A CHAQUE ETUDIANT ###

			for (var i = 0; i <= data.length -1; i++) {
				if (i == 18) {
					etudiant.innerHTML += '<option value="'+i+'"  selected>'+data[i]["Votre prénom"]+' '+data[i]["Votre nom"]+'</option>';
				}
				else{
					etudiant.innerHTML += '<option value="'+i+'">'+data[i]["Votre prénom"]+' '+data[i]["Votre nom"]+'</option>';
				}
			}

			// ### MISE A JOUR DU PROFIL EN FONCTION DE LA SELECTION DE L'ETUDIANT ###

			etudiant.onchange = function(){
				//console.log(typeof etudiant.value);
				if (etudiant.value == "18") {
					$(".mappover").show();
				} else {
					$(".mappover").hide();
				}
				if (etudiant.value != "") {
					document.getElementById('speciality').innerHTML = " " + data[etudiant.value]["Vos spécialités"];
					document.getElementById('emailfront').innerHTML = data[etudiant.value]["Votre mail"];

					document.getElementById('prog').innerHTML = "";
					document.getElementById('tools').innerHTML = "";
					document.getElementById('comp').innerHTML = "";
					document.getElementById('ln1').innerHTML = "";
					document.getElementById('ln2').innerHTML = "";
					document.getElementById('sk1').innerHTML = "";
					document.getElementById('sk2').innerHTML = "";
					
					let url = new URL(data[etudiant.value]['Votre photo']);
                    let urlParam = new URLSearchParams(url.search);
                    let id = urlParam.get('id');
                    let urlTof = "https://drive.google.com/uc?id="+id+"&export=download"; 

                    if (etudiant.value == 18) {
                    	document.getElementById('photo').setAttribute("src", "img/banner/home-right.png");
                    } else {
                   		document.getElementById('photo').setAttribute("src", urlTof);
                   	}

                   	// // ### Fonction pour redresser Nestor miskin...

                   	// if (etudiant.value == 14) {
                   	// 	setTimeout( document.getElementById('photo').setAttribute('style', 'transform: rotate(-90deg)') , 5000);
                    // } else {
                    // 	document.getElementById('photo').setAttribute('style', 'transform: rotate(0)');
                    // }

                   	var numetu = data[etudiant.value]["N° étudiant"];

					langues.forEach(function(langue) {
						document.getElementById(langue).innerHTML  = "";
						var level;
						switch(data[etudiant.value]["Quelles langues parlez vous ? ["+langue+"]"]) {
							case "je ne connais pas du tout":
							level = rien;
							break;

							case "je connais un peu": 
							level = unpeu;
							break;

							case "je connais bien": 
							level = bien;
							break;

							case "je suis expert(e)": 
							level = tresbien;
							break;
				
						}
						if (level != rien) {
							if (level != undefined) {
								document.getElementById(langue).innerHTML = langue.toUpperCase() + " : " + level;
							}
						}
					});

					languages.forEach(function(language) {	
						var lvllg;
						switch(data[etudiant.value]["Quelles langages utilisez vous ? ["+language+"]"]) {
							case "je ne connais pas du tout":
							lvllg = rien;
							break;

							case "je connais un peu": 
							lvllg = unpeu;
							break;

							case "je connais bien": 
							lvllg = bien;
							break;

							case "je suis expert(e)": 
							lvllg = tresbien;
							break;
						}		
						if (lvllg != rien) {
							document.getElementById('prog').innerHTML += "<div class='tag pink'>"+language+"</div>";	
						}	
					});

					framework.forEach(function(frmwork) {	
						var lvlfm;
						switch(data[etudiant.value]["Quelles framework utilisez vous ? ["+frmwork+"]"]) {
							case "je ne connais pas du tout":
							lvlfm = rien;
							break;

							case "je connais un peu": 
							lvlfm = unpeu;
							break;

							case "je connais bien": 
							lvlfm = bien;
							break;

							case "je suis expert(e)": 
							lvlfm = tresbien;
							break;
						}		
						if (lvlfm != rien) {
							document.getElementById('prog').innerHTML += "<div class='tag blue'>"+frmwork+"</div>";	
						}	
					});			

					outils.forEach(function(outil) {	
						var lvlot;
						switch(data[etudiant.value]["Quelles outils utilisez vous ? ["+outil+"]"]) {
							case "je ne connais pas du tout":
							lvlot = rien;
							break;

							case "je connais un peu": 
							lvlot = unpeu;
							break;

							case "je connais bien": 
							lvlot= bien;
							break;

							case "je suis expert(e)": 
							lvlot = tresbien;
							break;
						}		
						if (lvlot != rien) {
							document.getElementById('tools').innerHTML += "<div class='tag green'>"+outil+"</div>";	
						}	
					});

					competences.forEach(function(competence) {	
						var lvlcp;
						switch(data[etudiant.value]["Quelles sont vos compétences ? ["+competence+"]"]) {
							case "je ne connais pas du tout":
							lvlcp = rien;
							break;

							case "je connais un peu": 
							lvlcp = unpeu;
							break;

							case "je connais bien": 
							lvlcp= bien;
							break;

							case "je suis expert(e)": 
							lvlcp = tresbien;
							break;
						}		
						if (lvlcp != rien) {
							document.getElementById('comp').innerHTML += "<li class='listcomp'>"+competence.toUpperCase()+"</li>";	
						}	
					});								

					d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTDaWciiOoWzdcJ2FicK9v9CN64A7T7kfxiEck4rhGoO3jg6Wt4H2Mn4JBotZ4D1WS8yzuMQiuoAcqA/pub?gid=962807497&single=true&output=csv"
						).then((dataX) => {

						// Merci à "https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key" pour la solution du mapping

						let merged = [];

						for(let i=0; i<data.length; i++) {
						  merged.push({
						   ...data[i], 
						   ...(dataX.find((itmInner) => itmInner["Num étudiant"] === data[i]["N° étudiant"]))}
						  );
						}

						if (merged[etudiant.value]["Num étudiant"] != undefined) {
							document.getElementById('description').innerHTML = merged[etudiant.value]["Courte description de vous"];
							if (merged[etudiant.value]["Votre cv"] != "") {
								document.getElementById('mycv').innerHTML = '<a class="primary_btn" href="'+merged[etudiant.value]["Votre cv"]+'" target="_blank"><span>Download my CV</span></a>';
							} else {
								document.getElementById('mycv').innerHTML = "";
							}
						} else {
							document.getElementById('description').innerHTML = "À venir !";
							document.getElementById('mycv').innerHTML = "";							
						}

						if ((merged[etudiant.value]["Photo projet 1"] != undefined) && (merged[etudiant.value]["Photo projet 1"] != "")){
							var upr1 = new URL(merged[etudiant.value]["Photo projet 1"]);
	                     	var uspr1 = new URLSearchParams(upr1.search);
	                     	var idpr1 = uspr1.get('id');
	                    	var ipr1 = "https://drive.google.com/uc?id="+idpr1+"&export=download"; 
							document.getElementById('imgpr1').setAttribute("src", ipr1);
							document.getElementById('linkpr1').setAttribute("href", merged[etudiant.value]["Lien projet 1"]);
							document.getElementById('pav').innerHTML = "";
						} else {
							document.getElementById('imgpr1').setAttribute("src", "");
							document.getElementById('linkpr1').setAttribute("href", "");
							document.getElementById('pav').innerHTML = "À venir !";
						}
						if ((merged[etudiant.value]["Photo projet 2"] != undefined) && (merged[etudiant.value]["Photo projet 2"] != "")){
							var upr2 = new URL(merged[etudiant.value]["Photo projet 2"]);
	                     	var uspr2 = new URLSearchParams(upr2.search);
	                     	var idpr2 = uspr2.get('id');
	                    	var ipr2 = "https://drive.google.com/uc?id="+idpr2+"&export=download"; 
							document.getElementById('imgpr2').setAttribute("src", ipr2);
							document.getElementById('linkpr2').setAttribute("href", merged[etudiant.value]["Lien projet 2"]);
							document.getElementById('pav').innerHTML = "";
						} else {
							document.getElementById('imgpr2').setAttribute("src", "");
							document.getElementById('linkpr2').setAttribute("href", "");
							document.getElementById('pav').innerHTML = "À venir !";
						}
						if ((merged[etudiant.value]["Photo projet 3"] != undefined) && (merged[etudiant.value]["Photo projet 3"] != "")){
							var upr3 = new URL(merged[etudiant.value]["Photo projet 3"]);
	                     	var uspr3 = new URLSearchParams(upr3.search);
	                     	var idpr3 = uspr3.get('id');
	                     	var ipr3 = "https://drive.google.com/uc?id="+idpr3+"&export=download";
							document.getElementById('imgpr3').setAttribute("src", ipr3);
							document.getElementById('linkpr3').setAttribute("href", merged[etudiant.value]["Lien projet 3"]);
							document.getElementById('pav').innerHTML = "";
						} else {
							document.getElementById('imgpr3').setAttribute("src", "");
							document.getElementById('linkpr3').setAttribute("href", "");
							document.getElementById('pav').innerHTML = "À venir !";
						}

						if ((merged[etudiant.value]["Votre compte linkedin"] != undefined) && (merged[etudiant.value]["Votre compte linkedin"] != "")) {
							document.getElementById('ln1').innerHTML = "<a href='"+merged[etudiant.value]["Votre compte linkedin"]+"' target='_blank' title='Linkedin'><i class='ti-linkedin'></i></a>"
							document.getElementById('ln2').innerHTML = "<a href='"+merged[etudiant.value]["Votre compte linkedin"]+"' target='_blank' title='Linkedin'><i class='ti-linkedin'></i></a>"
						}
						else {
							document.getElementById('ln1').innerHTML = "";
							document.getElementById('ln2').innerHTML = "";
						}

						if ((merged[etudiant.value]["Votre compte skype"] != undefined) && (merged[etudiant.value]["Votre compte skype"] != "")) {
							document.getElementById('sk1').innerHTML = "<a href='skype:"+merged[etudiant.value]["Votre compte skype"]+"' target='_blank' title='Linkedin'><i class='ti-skype'></i></a>"
							document.getElementById('sk2').innerHTML = "<a href='skype:"+merged[etudiant.value]["Votre compte skype"]+"' target='_blank' title='Linkedin'><i class='ti-skype'></i></a>"
						}
						else {
							document.getElementById('sk1').innerHTML = "";
							document.getElementById('sk2').innerHTML = "";
						}

						document.getElementById('gt1').setAttribute("href", 'https://github.com/'+data[etudiant.value]["Votre compte GitHub"]);
						document.getElementById('gt2').setAttribute("href", 'https://github.com/'+data[etudiant.value]["Votre compte GitHub"]);

					});
				}
			};

		});