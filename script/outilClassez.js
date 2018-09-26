var conversionTab = {}
	conversionTab["Échelles et escabeaux"] = ["Echelles","Échelles et escabeaux","Echeles","ʣhelles et escabeaux"]
	conversionTab["Autres outils, accessoires et consommables"] = ["Autres","Autres outils acc et consom","Autres outils","Autres_outils"]
	conversionTab["Outils électriques"] = ["Outils électrique","Outils_électrique","Outils_Electirque","Outils ꭥctrique"]
	conversionTab["Outils"] = ["Outils"]
	conversionTab["Sacs et coffres"] = ["Sac","Sac et coffres"]
	conversionTab["Pinces et dénudeurs"] = ["Pinces et dénudeurs","Pinces","Pinces et d꯵deurs"]
	conversionTab["Testeurs"] = ["Testeurs"]
	conversionTab["Tournevis"] = ["Tournevis"]
	conversionTab["Éclairage"] = ["Eclairage"]
	conversionTab["Impacts"] = ["Impacts"]
	conversionTab["Caméras"] = ["Caméras","Camera"]
	conversionTab["Protection"] = ["Protection"]

var conversionMetier = {}
	conversionMetier["Charpentier"] = "charpentier"
	conversionMetier["Couvreur"] = "couvreur"
	conversionMetier["Électricien"] = "electricien"
	conversionMetier["Ferblantier"] = "ferblantier"
	conversionMetier["Horticulteur"] = "horticulteur"
	conversionMetier["Inspecteur en batiment"] = "inspect_batiment"
	conversionMetier["Mécanicien"] = "mecanicien" 
	conversionMetier["Plombier"] = "plombier" 

	
var typeDoutilByMetier = {}
typeDoutilByMetier["Tous"] = ["Autres outils, accessoires et consommables","Échelles et escabeaux","Outils électriques","Protection","Sacs et coffres","Pinces et dénudeurs","Éclairage","Impacts","Testeurs","Tournevis"]
typeDoutilByMetier["Charpentier"] = ["Autres outils, accessoires et consommables","Échelles et escabeaux","Outils électriques","Protection","Sacs et coffres"]
typeDoutilByMetier["Couvreur"] = ["Autres outils, accessoires et consommables","Protection"]
typeDoutilByMetier["Électricien"] = ["Autres outils, accessoires et consommables","Échelles et escabeaux","Outils électriques","Pinces et dénudeurs","Sacs et coffres","Testeurs","Tournevis"]
typeDoutilByMetier["Ferblantier"] = ["Outils","Outils électriques","Protection"]
typeDoutilByMetier["Horticulteur"] = ["Autres outils, accessoires et consommables","Éclairage","Protection"]
typeDoutilByMetier["Inspecteur en batiment"] = ["Autres outils, accessoires et consommables","Caméras","Échelles et escabeaux","Outils électriques","Protection","Sacs et coffres","Testeurs","Tournevis"]
typeDoutilByMetier["Mécanicien"] = ["Autres outils, accessoires et consommables","Impacts","Outils électriques","Pinces et dénudeurs","Protection"]
typeDoutilByMetier["Plombier"] = ["Autres outils, accessoires et consommables","Caméras","Échelles et escabeaux","Outils électriques","Pinces et dénudeurs","Protection","Sacs et coffres","Tournevis"]

var load = function(){
	
	console.log(data)
	
	var metiers = ["Tous","Charpentier","Couvreur","Électricien","Ferblantier","Horticulteur","Inspecteur en batiment","Mécanicien","Plombier"]
	var selectMetier = document.getElementById("metier_dropD")
	
	for (m of metiers){
		var option = document.createElement("option");
		option.text = m;
		selectMetier.add(option);
	}
	
	selectMetier.selectedIndex = 0
	
	var typeDoutils = ["Tous","Autres outils, accessoires et consommables","Échelles et escabeaux","Outils électriques","Protection","Sacs et coffres","Pinces et dénudeurs","Éclairage","Impacts","Testeurs","Tournevis"]
	var selectTypeDoutils = document.getElementById("typeDoutils_dropD")
	
	for (t of typeDoutils){
		var option = document.createElement("option");
		option.text = t;
		selectTypeDoutils.add(option);
	}
	
	selectTypeDoutils.selectedIndex = 0
	
	
	
	
	
	var mainDiv = document.getElementById("outils")
	
	counter = 0
	text = ""
	
	for (e of data){
		
		text += "<div class=\"card\" style=\"width: 18rem;\"><img class=\"card-img-top\" src=\"./Images/"+
			e.Image+"\" alt=\"Card image cap\"><div class=\"card-body\"><h5 class=\"card-title\">"+
			e.Description +"</h5><div class=\"card-text\">"+
			cardText(e.Marque,e.NumeroPiece,e.Description,e.SiteWeb,e.Dimensions,e.Poids,e.Specs)+"</div></div></div>"

		counter +=1
		if(counter > 1000){
			break
		}
	}
	
	mainDiv.innerHTML = text
	
	
}

var cardText = function(Marque,NumPiece,Description,SiteWeb,Dimensions,Poids,Specs){
	text = "<p>Marque : "+Marque+"</p>"+
		"<p># Piece : "+NumPiece+"</p>"+
		"<a target=\"_blank\" href=\""+SiteWeb+"\">Site Web</a>"+
		((Dimensions != "N/A")?"<p>Dimensions : "+Dimensions+"</p>":"")+
		((Poids != "N/A")?"<p>Poids : "+Poids+"</p>":"")+
		"<br><a target=\"_blank\" href=\"http://toolsbox.ca/wp-content/uploads/2018/09/"+Specs+"\">Specification</a>"
		
	return text
}


var dropDownChange = function(){
	
	var metier_dropD = document.getElementById("metier_dropD")
	
	var metierSelected = metier_dropD.options[metier_dropD.selectedIndex].text;
	
	var typeDoutils_dropD = document.getElementById("typeDoutils_dropD")
	
	var typeDoutilsSelected = typeDoutils_dropD.options[typeDoutils_dropD.selectedIndex].text;
	
	
	var modifedData = []
	var numList = []
	
	for (var e of data){
		
		if( (typeDoutilsSelected == "Tous" || conversionTab[typeDoutilsSelected].includes(e.outils_type) ) && (metierSelected == "Tous" || e.metier == conversionMetier[metierSelected] ) && ! numList.includes(e.NumeroPiece)){
			numList.push(e.NumeroPiece)
			modifedData.push(e)
		}
		
	}
	
	var mainDiv = document.getElementById("outils")
	
	counter = 0
	text = ""
	
	for (e of modifedData){
		
		text += "<div class=\"card\" style=\"width: 18rem;\"><img class=\"card-img-top\" src=\"./Images/"+
			e.Image+"\" alt=\"Card image cap\"><div class=\"card-body\"><h5 class=\"card-title\">"+
			e.Description +"</h5><div class=\"card-text\">"+
			cardText(e.Marque,e.NumeroPiece,e.Description,e.SiteWeb,e.Dimensions,e.Poids,e.Specs)+"</div></div></div>"

		counter +=1
		if(counter > 1000){
			break
		}
	}
	
	mainDiv.innerHTML = text
	
	var selectTypeDoutils = document.getElementById("typeDoutils_dropD");
	for (i in selectTypeDoutils){
		selectTypeDoutils.remove(i);
	}
	
	var option = document.createElement("option");
	option.text = "Tous";
	selectTypeDoutils.add(option);
	for (t of typeDoutilByMetier[metierSelected]){
		var option = document.createElement("option");
		option.text = t;
		selectTypeDoutils.add(option);
	}

	if( ! typeDoutilByMetier[metierSelected].includes(typeDoutilsSelected) )
	{
		
		selectTypeDoutils.selectedIndex = 0
		var modifedData = []
		var numList = []
		
		for (var e of data){
			
			if( (metierSelected == "Tous" || e.metier == conversionMetier[metierSelected] ) && ! numList.includes(e.NumeroPiece)){
				numList.push(e.NumeroPiece)
				modifedData.push(e)
			}
			
		}
		text = ""
		for (e of modifedData){
			
			text += "<div class=\"card\" style=\"width: 18rem;\"><img class=\"card-img-top\" src=\"./Images/"+
				e.Image+"\" alt=\"Card image cap\"><div class=\"card-body\"><h5 class=\"card-title\">"+
				e.Description +"</h5><div class=\"card-text\">"+
				cardText(e.Marque,e.NumeroPiece,e.Description,e.SiteWeb,e.Dimensions,e.Poids,e.Specs)+"</div></div></div>"

			counter +=1
			if(counter > 1000){
				break
			}
		}
		mainDiv.innerHTML = text
	}
	else{
		selectTypeDoutils.selectedIndex = typeDoutilByMetier[metierSelected].indexOf(typeDoutilsSelected) +1
	}
	
}
	
	