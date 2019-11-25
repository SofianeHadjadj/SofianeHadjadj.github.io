var dataPhoto, dataForm, urlBase='http://www.samszo.univ-paris8.fr/GEN/19/';
var vals = {"Pas besoin":1, "Besoin d'approfondissement":5, "Besoin urgent":10, "je ne connais pas du tout":1,"je connais un peu":5,"je vonnais bien":10,"je suis expert(e)":20};
var selectEtu;


    //récupération des données des formulaires google
    //"FormulaireGEN19.csv";//
    var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPYNknmIr5_bU7GfiJtuS_b9fGae7HZwcjAiMoAC24fLzIfxRtXQySMu3E95D3M595D3DYT7NUtvzt/pub?gid=760811187&single=true&output=csv'            
    var q = d3.queue()
    .defer(d3.csv, url)
    //.defer(d3.csv, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTOMGeNwb-DoechnH4p4xKS87Ts7apNS4-G9lLHhXW_90BP8ZsW4oRNKObk26hM5CW-0wA2mEqg1kaO/pub?output=csv')
    .awaitAll(function(error, results) {
      if (error) throw error;
      setData(results);
    });

    function setData(data){

            dataForm = data[0];
            let dataEtu = []; 
            

            //réorganise les datas
            dataForm.forEach(function(d, j){
                d.reponses = {'besoins':[],'competences':[],'outils':[]};
                for (let i in d) {
                    var prop = i.substring(i.indexOf("[")+1,i.indexOf("]")); 
                    var v = d[i];
                    var n = vals[v];
                    if(i.indexOf("besoins")>0){
                        d.reponses.besoins.push({'prop':prop,'importance':n,'expression':v,'id':j});
                        //d.reponses.push({'besoins':prop,'val':n,'lib':v});
                    }
                    if(i.indexOf("compétences")>0){
                        d.reponses.competences.push({'prop':prop,'importance':n,'expression':v,'id':j});
                    }
                    if(i.indexOf("outils utilisez")>0){
                        d.reponses.outils.push({'prop':prop,'importance':n,'expression':v,'id':j});
                    }                           
                }
            });     

            /*construction simple
            var arrDiv = d3.select("#container")
                .selectAll("div")
                .data(data)
                .enter().append("div")
                .text(function(d) { 
                        return d['Votre prénom'].toLowerCase() + ' ' + d['Votre nom'].toLowerCase(); 
                    });     
            arrDiv.append("img")
                .attr('src',function(d) { 
                        var item = dataPhoto.photoset.photo[d['N° photo']];
                    var src = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_s.jpg';
                        return src; 
                    });
            */

            /*construction bootstrap
            merci à https://getbootstrap.com/docs/4.0/components/card/
                <div class="col-sm-3 mb-4">
            <div class="card">
                    <img class="card-img img-fluid" src="<?php echo $picture_link; ?>" alt="Card image">
                    <p class="card-text"><?php echo $value['Prénom']; ?> <br> <?php echo $value['Nom']; ?> <br>
                    <small class="text-muted"><?php echo $value['E-mail']; ?></small>
                    </p>
            </div>
            </div>

            */
            var cards = d3.select('#etuCards').selectAll(".col-sm-4 mb-12").data(dataForm).enter()
                .append('div').attr('class','col-sm-4 mb-12').style('margin-bottom','10px')
                .append("div").attr('class','card');
            cards.append("img")
                    .attr('id',function(d, i) {return 'imgCard'+i})
                    .attr('class','card-img-top')
                    .attr('src',function(d) { 
                        //merci à https://davidwalsh.name/query-string-javascript
                        // https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
                        let url = new URL(d['Votre photo']);
                        let urlParam = new URLSearchParams(url.search);
                        let id = urlParam.get('id');
                        //merci à https://stackoverflow.com/questions/50664868/get-pictures-from-google-drive-folder-with-javascript-to-my-website
                        let urlTof = "https://drive.google.com/uc?id="+id+"&export=download";                        
                        return urlTof; 
                        });
            //ajoute l'overlay sur l'image pour le tooltip du diagramme
            cards.append("div")
                    .attr('id',function(d, i) {return 'imgOver'+i})
                    .attr('class','card-img-overlay')
                    .style('height','50%')
                    .on("click",function(e){
                        //console.log(e);
                        selectEtu = e;
                        $('#infosEtu').modal('show');
                    });

            //ajoute le corps de la carte
            var cardBody = cards.append('div').attr('class','card-body');
            cardBody.append('h4').attr('class','card-title')                
                        .text(function(d) { 
                            return d['Votre prénom'].toLowerCase(); 
                                });
            cardBody.append('h5').attr('class','card-title')                
                .text(function(d) { 
                    return d['Votre nom'].toLowerCase(); 
                        });
            cardBody.append('h6').text("plus d'infos...")
                .on("click",function(e){
                            console.log(e);
                            selectEtu = e;
                            $('#infosEtu').modal('show');
                        });

            //construction du layout pour les graphiques
            var html = '<div class="container"><div class="row">';
            html += '<div id="etudNum__Col1" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '<div id="etudNum__Col2" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '<div id="etudNum__Col3" class="col-sm" style="padding-right:0px;padding-left:0px;"></div>';
            html += '</div></div>';
            cardBody.append('div').attr('class','card-text').attr('id',function(d, i) { return 'etudNum_'+i; })
                .html(function(d, i) { return html.replace(/__/gi, "_"+i+"_");});               
            cards.append('div').attr('class','card-footer')
                .append('small').attr('class','text-muted')
                .text(function(d, i) {
                        //charge le graph des réponses
                        var size = 100;
                        drawGraphReponse("#etudNum_"+i+"_Col1", 'Besoins', d.reponses.besoins, size);
                        drawGraphReponse("#etudNum_"+i+"_Col2", 'Compétences', d.reponses.competences, size);
                        drawGraphReponse("#etudNum_"+i+"_Col3", 'Outils', d.reponses.outils, size);
                return d['Votre mail'].toLowerCase(); 
                    });

}

function drawGraphReponse(idE, titre, data, size){
    /*à voir si dimple marche mieux
    var svg = dimple.newSvg("#"+idE, 200, 200);
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(6, 6, 184, 184)
    myChart.addMeasureAxis("p", "val");
    var outerRing = myChart.addSeries("besoins", dimple.plot.pie);
    var innerRing = myChart.addSeries("compétences", dimple.plot.pie);
    var centerRing = myChart.addSeries("outils", dimple.plot.pie);
    // Negatives are calculated from outside edge, positives from center
    outerRing.innerRadius = "-10px";
    innerRing.outerRadius = "-20px";
    innerRing.innerRadius = "-30px";
    centerRing.outerRadius = "-40px";
    centerRing.innerRadius = "-50px";
    //myChart.addLegend(500, 20, 90, 300, "left");
    myChart.draw();
    */
    //
    var donut = donutChart()
        .width(size)
        .height(size)
        .cornerRadius(3) // sets how rounded the corners are on each slice
        .padAngle(0.015) // effectively dictates the gap between slices
        .variable('importance')
        .category('prop')
        .title(titre);
    d3.select(idE)
        .datum(data) // bind data to the div
        .call(donut); // draw chart in div
}

//merci à https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
function donutChart() {
    var width,
        height,
        margin = {top: 0, right: 0, bottom: 10, left: 0},
        colour = d3.scaleOrdinal(d3.schemeCategory20c), // colour scheme
        variable, // value in data that will dictate proportions on chart
        category, // compare data by
        padAngle, // effectively dictates the gap between slices
        floatFormat = d3.format('.4r'),
        cornerRadius, // sets how rounded the corners are on each slice
        percentFormat = d3.format(',.2%'),
        title;

    function chart(selection){
        selection.each(function(data) {
            // generate chart

            // ===========================================================================================
            // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
            var radius = Math.min(width, height) / 2;

            // creates a new pie generator
            var pie = d3.pie()
                .value(function(d) { return floatFormat(d[variable]); })
                .sort(null);

            // contructs and arc generator. This will be used for the donut. The difference between outer and inner
            // radius will dictate the thickness of the donut
            var arc = d3.arc()
                .outerRadius(radius * 0.8)
                .innerRadius(radius * 0.6)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle);

            // this arc is used for aligning the text labels
            var outerArc = d3.arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.9);
            // ===========================================================================================

            // ===========================================================================================
            // append the svg object to the selection
            var wSvg = width + margin.left + margin.right, hSvg = height + margin.top + margin.bottom; 
            var svg = selection.append('svg')
                .attr('width', wSvg)
                .attr('height', hSvg)
              .append('g')
                .attr('transform', 'translate(' + wSvg / 2 + ',' + hSvg / 2 + ')');             
            // ===========================================================================================
            // g elements to keep elements within svg modular
            svg.append('g').attr('class', 'slices');
            svg.append('g').attr('class', 'labelName');
            svg.append('g').attr('class', 'lines');
            // ===========================================================================================

            // ===========================================================================================
            // add and colour the donut slices
            var path = svg.select('.slices')
                .datum(data).selectAll('path')
                .data(pie)
              .enter().append('path')
                .attr('fill', function(d) { return colour(d.data[category]); })
                .attr('d', arc);
            // ===========================================================================================

            // ===========================================================================================
            /* add text labels
            var label = svg.select('.labelName').selectAll('text')
                .data(pie)
              .enter().append('text')
                .attr('dy', '.35em')
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return d.data[category] + ': <tspan>' + percentFormat(d.data[variable]) + '</tspan>';
                })
                .attr('transform', function(d) {

                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = outerArc.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    // if slice centre is on the left, anchor text to start, otherwise anchor to end
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });
            */
            // ===========================================================================================

            /* ===========================================================================================
            // add lines connecting labels to slice. A polyline creates straight lines connecting several points
            var polyline = svg.select('.lines')
                .selectAll('polyline')
                .data(pie)
              .enter().append('polyline')
                .attr('points', function(d) {

                    // see label transform function for explanations of these three lines.
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return [arc.centroid(d), outerArc.centroid(d), pos]
                });
            */
            // ===========================================================================================

            // ===========================================================================================

            //ajoute le titre
            svg.append('text')
                .html(title)            
                .attr('text-anchor', 'middle')
                .attr('y', hSvg/2);             


            // ===========================================================================================
            // add tooltip to mouse events on slices and labels
            d3.selectAll('.labelName text, .slices path').call(toolTip);
            // ===========================================================================================

            // ===========================================================================================
            // Functions

            // calculates the angle for the middle of a slice
            function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

            // function that creates and adds the tool tip to a selected element
            function toolTip(selection) {

                // add tooltip (svg circle element) when mouse enters label or slice
                selection.on('mouseenter', function (data) {
                    
                        //rend l'image trnasparente
                        d3.select('#imgCard'+data.data.id).style('opacity', 0.35);
                        //affiche le texte
                        d3.select('#imgOver'+data.data.id).html(toolTipHTML(data));                     

                    /*
                        svg.append('text')
                        .attr('class', 'toolCircle')
                        .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                        .html(toolTipHTML(data)) // add text to the circle.
                        .style('font-size', '.9em')
                        .style('text-anchor', 'middle'); // centres text in tooltip

                    svg.append('circle')
                        .attr('class', 'toolCircle')
                        .attr('r', radius * 0.55) // radius of tooltip circle
                        .style('fill', colour(data.data[category])) // colour based on category mouse is over
                        .style('fill-opacity', 0.35);
                    */
                });

                // remove the tooltip when mouse leaves the slice/label
                selection.on('mouseout', function (data) {
                    d3.selectAll('.toolCircle').remove();
                        //rend l'image normal
                        d3.select('#imgCard'+data.data.id).style('opacity', 1);
                        //supprime le texte
                        d3.select('#imgOver'+data.data.id).html("");                                            
                });
            }

            // function to create the HTML string for the tool tip. Loops through each key in data object
            // and returns the html string key: value
            function toolTipHTML(data) {

                    var tip = '<h6 class="card-title">'+data.data.prop+'</h6>'
                    tip += '<p class="card-text">'+data.data.expression+'</p>';
                /*
                    var tip = '',
                    i   = 0;

                for (var key in data.data) {

                    // if value is a number, format it as a percentage
                    var value = (!isNaN(parseFloat(data.data[key]))) ? percentFormat(data.data[key]) : data.data[key];

                    // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
                    // tspan effectively imitates a line break.
                    if (i === 0) tip += '<tspan x="0">' + key + ': ' + value + '</tspan>';
                    else tip += '<tspan x="0" dy="1.2em">' + key + ': ' + value + '</tspan>';
                    i++;
                }
                */
                return tip;
            }
            // ===========================================================================================

        });
    }

    // getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.radius = function(value) {
        if (!arguments.length) return radius;
        radius = value;
        return chart;
    };

    chart.padAngle = function(value) {
        if (!arguments.length) return padAngle;
        padAngle = value;
        return chart;
    };

    chart.cornerRadius = function(value) {
        if (!arguments.length) return cornerRadius;
        cornerRadius = value;
        return chart;
    };

    chart.colour = function(value) {
        if (!arguments.length) return colour;
        colour = value;
        return chart;
    };

    chart.variable = function(value) {
        if (!arguments.length) return variable;
        variable = value;
        return chart;
    };

    chart.category = function(value) {
        if (!arguments.length) return category;
        category = value;
        return chart;
    };

    chart.title = function(value) {
        if (!arguments.length) return title;
        title = value;
        return chart;
    };
    
    return chart;
}

//Fin appel JSON



//gestion des fenêtre modale
//l'événement d'ouverture
$('#infosEtu').on('show.bs.modal', function (e) {
    //console.log(e);
    console.log(selectEtu);

    d3.select('#modalEtuTitle').text(selectEtu['Votre prénom']+' '+selectEtu['Votre nom']);
    var url = "https://jardindesconnaissances.univ-paris8.fr/samszo/DWM/18-19/diigo.php?user="+selectEtu['Votre compte Diigo'];
    var htm = '<p><a href="'+url+'">'+url+'</a></p>';
    htm += '<iframe id="ifDiigoEtu" title="Diigo étudiant" src="'+url+'"></iframe>';
    d3.select('#diigoTags').html(htm);
    url = selectEtu['site'];
    htm = '<p><a href="'+url+'">'+url+'</a></p>';
    htm += '<iframe id="ifSitePerso" title="Site Perso" src="'+url+'"></iframe>';
    d3.select('#sitePerso').html(htm);
 
    /*selectEtu['Votre compte Diigo']
    ht= '<div class="diigo-tags">';
    ht += '<div class="diigo-banner sidebar-title" style="font: bold 12px arial;margin-bottom:5px;">';
    ht += '<a href="https://www.diigo.com">';
    ht += '<img src="https://www.diigo.com/images/ii_blue.gif" width="16" height="16" alt="diigo"/>';
    ht += '</a>';
    ht += '<a href="https://www.diigo.com/cloud/luckysemiosis">';
    ht += 'My Diigo Tags';
    ht += '</a></div>';
    //d3.select('#modalEtuBody').html(ht);
    d3.html("diigo.php", function(html) {
        //d3.select('#modalEtuBody').append(html);
        document.getElementById('modalEtuBody').appendChild(html);
    });
    */
})
//l'événement de fin d'ouverture
$('#infosEtu').on('shown.bs.modal', function (e) {
    //console.log(e);
    /**Création du script 
     * merci à https://www.journaldunet.fr/web-tech/developpement/1202955-comment-inclure-un-fichier-javascript-dans-un-autre-fichier-javascript/
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = "https://www.diigo.com/tools/tagrolls_script/luckysemiosis?icon;size=11-23;color=87ceeb-0000ff;title=My%20Diigo%20Tags;name;showadd;v=3" ;
    document.getElementById('modalEtuBody').appendChild(js);
    **/

    //pour mettre le contenu des tabs à 100%
    d3.select("#myTabContent").style('height',d3.select("#modalEtuBody").style('height'));
    //affiche la tab du site perso
    $('#sitePerso').tab('show');
    
})

//gestion des ouverture de tab
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  if(e.target.id=='veilleRecap-tab'){
        //initiale la tab
        d3.select('#veilleRecapDiv').remove();
        let divRecapVeille = d3.select('#veilleRecap').append('div')
            .attr('id','veilleRecapDiv')
            .attr('style','height: 100%;overflow:scroll;');
        //affichage de la présentation au format .md
        var url = "../"+selectEtu['Votre compte GitHub']+"/veille.md";
        var cont = divRecapVeille.append('div');
        mdToHtml(url,cont);
        //affiche la veille des formulaires
        divRecapVeille.append('h1').html('Réponses aux formulaires').append('ul');
        if(selectEtu['alertes']){
            divRecapVeille.append('h2').html('Alertes Google');
            let ulAG = divRecapVeille.append('ul');
            ulAG.selectAll('li').data(selectEtu['alertes']).enter().append('li').html(function(d){return d;});
        }else divRecapVeille.append('h2').html("Aucunne alertes Google");        
        if(selectEtu['alertes']){
            divRecapVeille.append('h2').html('Newsletter')
            let ulNL = divRecapVeille.append('ul');
            ulNL.selectAll('li').data(selectEtu['newletters']).enter().append('li')
            .html(function(d){return '<a href="'+d+'" target="_blank">'+d+'</a>';});
        }else divRecapVeille.append('h2').html("Aucunne Newsletter");

                
  }
  if(e.target.id=='rssFlux-tab'){
        let urlBaseGit = 'https://raw.githubusercontent.com/samszo/GEN_19/master/'+selectEtu['Votre compte GitHub']+'/dashboard.xml'    
        let oOpml = new opml({'urlData':urlBaseGit,'idCont':'rssFlux'});
  }
  /*
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
    })
*/
})

function mdToHtml(u, cont){

    $.ajax({
        url: u,
        type: 'GET',
        crossDomain: true,
        success: function(data) { 
            var converter = new showdown.Converter(),
            html      = converter.makeHtml(data);
            cont.html(html);
        },
        error: function(error) { 
            console.log(error); 
        },
    });         
}