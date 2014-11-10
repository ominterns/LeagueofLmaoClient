//beta version ready
var REAL_SERVER = "http://peaceful-river-1294.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var path2 = REAL_SERVER+ "/players";
var page_path = LOCAL_TEST_SERVER;
var page_Name;
var rune_on = false;
var masteries_on = false;
var profile_on = false;
var recent_on = false;
var ranked_on = false;
var leagues_on = false;
function pop(){
	var lmaoer = prompt("Please Enter Your Summoner Name \n ignore capitals mangs"); 
	if(lmaoer == "cazookie" || lmaoer == "mattmaster97" || lmaoer == "epicchewy"|| lmaoer == "fiars"|| lmaoer == "cashinu" || lmaoer == "balphi"){
		alert("O HEy MANGS DIDNT SEE YOU THERE MANGS");
		$.mobile.changePage( "#special", { transition: "slideup"} );
	}else{
		alert("get rekt u dumb piece of chit");
	}
}
function searchSummoner(){
	console.log("wow");
	var variableSummonerName1 = summoner.value;
	console.log(variableSummonerName1);
	$.mobile.changePage( "#summonerpage", { transition: "slideup"} );
}

// function changePath(page_name){
//	page_Name = page_name;
// 	path += "/" + page_Name;
// }
var variableSummonerName = "";
var summonerName = ""
function getData() 
{
	// clearAll();
	variableSummonerName = $("#summonername").val();
	summonerName = $("#summonername").val();
	variableSummonerName = removeSpace(variableSummonerName);
	console.log("hi " + variableSummonerName);
	var path = REAL_SERVER + "/league";
	alert("Searching for " + summonerName + " ... This might take a while");
	$.ajax({
	 	url: path,
	 	data: {
	        "summoner_name": variableSummonerName
    	},
	 	context: document.body,
	 	crossDomain: true
	}).done(function( reply ) {
		keys = Object.keys(reply);
		alert("Player Found!");
		//console.log(keys);
		//console.log(reply);
		//console.log("pulling oen piece")
		organize(keys, reply);
		$.mobile.changePage( "#summonerpage", { transition: "slideup"} );
	});	

	$("#summonerPageHeader").text("Welcome " + summonerName);
}

//MANGNAMGNAGMAGNAGMMANGNAGMANGNAMGNAG
//have multiple ajax calls and organize data when needed

//collective lists
var complete_Champions = {};
var complete_Runes = {};
var complete_Masteries = {};
var complete_Sumoner_Spells = {};
var complete_Items = {};
var complete_Profile = {};
var complete_Ranked = {};
var complete_Recent = {};

function organize(keys, data){
	for(var key in data){
		if(key == "summoner_spell_list"){
			complete_Sumoner_Spells = data[key];
			for(var key2 in data[key]){
				//console.log(data["summoner_spell_list"][key2]);
				console.log(complete_Sumoner_Spells);
			}
		}
		if(key == "champions"){
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "champ_names_des"){
			complete_Champions = data[key];
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "mastery_list"){
			complete_Masteries = data[key];
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "rune_list"){
			complete_Runes = data[key];
			for(var key2 in data[key]){
				
			}
		}
		if(key == "item_list"){
			complete_Items = data[key];
			console.log(complete_Items);
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "ranked"){//setup
			complete_Ranked = data[key];
			//console.log(complete_Ranked);
			for(var i = 0; i < data[key].length; i++){
				//console.log("ranked stats");
				var champ = searchChamp(data[key][i]["id"], complete_Champions);
				//console.log(champ);
				//console.log(data[key][i]["stats"]);
			}
		}
		if(key == "played_champ"){
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "summoner_spell"){
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "used_item"){
			for(var key2 in data[key]){
			}
		}
		if(key == "recent_games"){//setup
			complete_Recent = data[key];
			//console.log(complete_Recent);
			for(var i = 0; i < data[key].length; i++){
				//console.log("recent game stats");
				var champ = searchChamp(data[key][i]["championId"], complete_Champions);
				//console.log(champ);
				//console.log(data[key][i]["stats"]);
			}
		}
		if(key == "summoner_masteries"){//setup
			tableID = "masteries";
			for(var key2 in data[key]){
				for(var key3 in data[key][key2]){
					if(key3 == "pages"){
						mastery_output = data[key][key2][key3];
						//console.log(mastery_output);
						numberOfPages = data[key][key2][key3].length;
						//console.log("this guy has " + pagenumber + " mastery pages");
						for(var i = 0; i < data[key][key2][key3].length; i++){
							//console.log(data[key][key2][key3][i]);
							if(data[key][key2][key3][i].hasOwnProperty("masteries")){
								//console.log(data[key][key2][key3][i]["name"] + " IS available");
								for(var k = 0; k < data[key][key2][key3][i]["masteries"].length; k++){
								//console.log(data[key][key2][key3][i]["masteries"][k]["mastId"]);
								var mast_name = searchStatic( data[key][key2][key3][i]["masteries"][k]["id"], complete_Masteries);
								//console.log(mast_name);
								}
							}else{
								// console.log(data[key][key2][key3][i]["name"] + " IS NOT available");
							}
						}
					}
				}
			}
		}
		if(key == "summoner_runes"){//setup
			tableID = "runes";
			for(var key2 in data[key]){
				for(var key3 in data[key][key2]){
					if(key3 == "pages"){//pages is an array
						rune_output = data[key][key2][key3];
						//console.log(rune_output);
						//console.log("this guy has " + pagenumber + " rune pages"); 
						for(var i = 0; i < data[key][key2][key3].length; i++){
							//console.log(data[key][key2][key3][i]);
							if(data[key][key2][key3][i].hasOwnProperty("slots")){
								//console.log(data[key][key2][key3][i]["name"] + " IS available");
								for(var k = 0; k < data[key][key2][key3][i]["slots"].length; k++){
								//console.log(data[key][key2][key3][i]["slots"][k]["runeId"]);
								//var rune_name = searchStatic( data[key][key2][key3][i]["slots"][k]["runeId"], complete_Runes);
								//console.log(rune_name);
								}
							}else {//console.log(data[key][key2][key3][i]["name"] + " IS NOT available");

							}
						}
					}
				}
			}
		}
		if(key == "player_summary"){//hi
			complete_Profile = data[key];
			for(var i  = 0; i < data[key].length; i++){
				//console.log(data[key][i]["playerStatSummaryType"]);
				//console.log(data[key][i]["aggregatedStats"]);
				for(key2 in data[key][i]["aggregatedStats"]){
					//console.log(key2 + "      " + data[key][i]["aggregatedStats"][key2]);
				}
			}
		}
	}
}

function searchStatic(data_id, list){
	for(var key in list){
		if(key == "data"){
			for(var key2 in list[key]){
				if(key2 == data_id){
					return list[key][key2];
				}
			}
		}
	}
}
function searchSummSpell(data_id, list){
	for(key in list){
		for(key2 in list[key]){
			for(key3 in list[key][key2]){
				if(list[key][key2]["id"] == data_id){
					return list[key][key2];
				}
			}
		}
	}
}
function searchChamp(data_id, list){
	for(var key in list){
		if(list[key]["id"] == data_id){
			return list[key]["name"];
		}
	}
}
var tableID;
function loadProfile(){
	$("#profSet").remove();
	var profDiv = document.getElementById("profMain");
	var profHead = document.getElementById("profHead");
	
	$("#profContent").append('<div data-role = "collapsible-set" id = "profSet" data-content-theme="b"></div>');
	for(var i = 0; i < complete_Profile.length; i++){
		if(complete_Profile[i]["playerStatSummaryType"] == "Unranked" || complete_Profile[i]["playerStatSummaryType"] == "RankedSolo5x5" || complete_Profile[i]["playerStatSummaryType"] == "RankedTeam5x5" || complete_Profile[i]["playerStatSummaryType"] == "AramUnranked5x5"){
			var title = complete_Profile[i]["playerStatSummaryType"];

			if(title == "AramUnranked5x5"){title = "ARAM";}
			if(title == "Unranked"){ title = "Normal";}
			if(title == "RankedSolo5x5"){title = "YoloQueue";}
			if(title == "RankedTeam5x5"){title = "RankedTeam5s";}
			
			$("#profSet").append('<div data-role = "collapsible" id = "'+ title +'" data-content-theme="b"></div>');
			$("#" +title).append('<h1>'+title +'</h1>');
			$("#" + title).append('<div id="'+ title + 'Table"></div>');
			$("#"+title+"Table").append('<table data-role="table" id ="profTable"'+i+' data-mode = "reflow"><thead><tr id="profTableHead'+i+'""></tr></thead><tbody><tr id="profTableBody'+i+'"></tr></tbody></table>');
			var test_count = 0;
			var head_name = "";
			for(key in complete_Profile[i]["aggregatedStats"]){
				
				if(key == "totalChampionKills") head_name = "Total Champion Kills";
				if(key == "totalAssists") head_name = "Total Assists";
				if(key == "totalMinionKills") head_name = "Total Minion Kills";
				if(key == "totalTurretsKilled") head_name = "Total Turret Kills";
				if(key == "totalNeutralMinionsKilled") head_name = "Total Neutral Minion Kills";

				//console.log(key);

				$("#profTableHead"+i).append('<td>'+ head_name +'</td>');
				$("#profTableBody"+i).append('<td>'+ complete_Profile[i]["aggregatedStats"][key] +'</td>');	
			}
		} 
	}
	$("#profContent").trigger('create');
	$('[id=profHead]').text(summonerName);
	//console.log("sup " + variableSummonerName);
}

// function loadLeague(){

// }

function loadRanked(){
	var champPlayed = "";
	var totalGames = 0;
	if(ranked_on === false){
		ranked_on = true;
		$("#rankedContent").append('<div data-role = "collapsible-set" id = "rankedSet" data-content-theme="b"></div>');
		for(var i = 0; i < complete_Ranked.length - 1; i++){
			champPlayed = searchChamp(complete_Ranked[i]["id"], complete_Champions);
			totalGames = complete_Ranked[i]["stats"]["totalSessionsPlayed"];
			$("#rankedSet").append('<div data-role="collapsible" id ="champ'+i+'"><h1>'+champPlayed+'</h1></div>');
			$("#champ"+i).append('<ul data-role = "listview" id = "champList'+i+'"></ul>');
			$("#champList"+i).append('<li>Wins: '+complete_Ranked[i]["stats"]["totalSessionsWon"]+' , Losses: '+complete_Ranked[i]["stats"]["totalSessionsLost"]+'</li>');//winslosses
			$("#champList"+i).append('<li>Avg. Kills: '+complete_Ranked[i]["stats"]["totalChampionKills"]/totalGames+'</li>');//kills
			$("#champList"+i).append('<li>Avg. Deaths: '+complete_Ranked[i]["stats"]["totalDeathsPerSession"]/totalGames+'</li>');//deaths
			$("#champList"+i).append('<li>Avg. Assists: '+complete_Ranked[i]["stats"]["totalAssists"]/totalGames+'</li>');//assists
			$("#champList"+i).append('<li>Avg. CS: '+complete_Ranked[i]["stats"]["totalMinionKills"]/totalGames+'</li>');//creeps
			$("#champList"+i).append('<li>Avg. Gold: '+complete_Ranked[i]["stats"]["totalGoldEarned"]/totalGames+'</li>');
			$("#champList"+i).append('<li>More Stats to Come</li>');
		}
	$("#rankedContent").trigger('create');
	//console.log("done ranked");
	}
}
var win_loss;
function loadRecentMatches(){
	//console.log("recent");
	if(recent_on === false){
		recent_on = true;
		$("#recentContent").append('<div data-role = "collapsible-set" id = "recentSet" data-content-theme="b" id = "recentSet"></div>');
	//$("#recentSet").append('<div data-role = "collapsible"><h1>shit nigga</h1></div>');
	var champPlayed  = "";
	var gameType = "";
	var summspell1 = "";
	var summspell2 = "";
	
	for(var i = 0; i < complete_Recent.length; i++){
		if(complete_Recent[i]["stats"]["win"] === true){
			win_loss = 'a';
		} else{
			win_loss = 'b';
		}
		champPlayed = searchChamp(complete_Recent[i]["championId"], complete_Champions);
		gameType = complete_Recent[i]["subType"];
		if(gameType == "ARAM_UNRANKED_5x5") gameType = "ARAMERINO";
		$("#recentSet").append('<div data-role ="collapsible" data-content-theme="'+win_loss+'" id = "recentGame'+i+'"><h1>'+champPlayed+ '     --    '+ gameType +'</h1></div>');

		$("#recentGame"+i).append('<div data-role="collapsible" data-theme = "b" id="stats'+i+'"><h1>Stats</h1></div>');
		$("#stats" + i).append('<ul data-role = "listview" id ="statsList'+i+'"></ul>');
		$("#statsList"+i).append('<li>Kills: '+complete_Recent[i]["stats"]["championsKilled"]+'</li>');
		$("#statsList"+i).append('<li>Deaths: '+complete_Recent[i]["stats"]["numDeaths"]+'</li>');
		$("#statsList"+i).append('<li>Assists: '+complete_Recent[i]["stats"]["assists"]+'</li>');
		$("#statsList"+i).append('<li>Level: '+complete_Recent[i]["stats"]["level"]+'</li>');
		$("#statsList"+i).append('<li>Gold: '+complete_Recent[i]["stats"]["goldEarned"]+'</li>');
		summspell1 = searchSummSpell(complete_Recent[i]["spell1"], complete_Sumoner_Spells);
		summspell2 = searchSummSpell(complete_Recent[i]["spell2"], complete_Sumoner_Spells);
		$("#statsList"+i).append('<li>Summ. Spells: '+summspell1["name"] + ' , '+ summspell2["name"] +'</li>');
		
		$("#recentGame"+i).append('<div data-role="collapsible" data-theme = "b" id="items'+i+'"></div>');
		$("#items"+i).append('<h1>Items</h1>');
		$("#items"+i).append('<ul data-role = "listview" id = "itemsList'+i+'"></ul>');
		for(var k = 0; k < 7; k++){
			var itemUsed = "";
			if(complete_Recent[i]["stats"]["item"+k] === undefined){ 
			}else{
				itemUsed = searchStatic(complete_Recent[i]["stats"]["item"+k], complete_Items);
				$("#itemsList"+i).append('<li>'+itemUsed["name"]+ '</li>');
			}
		}
		$("#recentGame"+i).append('<div data-role="collapsible" data-theme = "b" id="damageDealt'+i+'"><h1>Damage Data</h1></div>');
		$("#damageDealt"+i).append('<ul data-role = "listview" id = "damageList'+i+'"></ul>');
		$("#damageList"+i).append('<li>Total Damage: '+complete_Recent[i]["stats"]["totalDamageDealt"]+'</li>');
		$("#damageList"+i).append('<li>Damage to Champs: '+complete_Recent[i]["stats"]["totalDamageDealtToChampions"]+'</li>');
		$("#damageList"+i).append('<li>Damage Taken: '+complete_Recent[i]["stats"]["totalDamageTaken"]+'</li>');
		$("#damageList"+i).append('<li>Magic Damage Dealt: '+complete_Recent[i]["stats"]["magicDamageDealtPlayer"]+'</li>');
		$("#damageList"+i).append('<li>Physical Damage Dealt: '+complete_Recent[i]["stats"]["physicalDamageDealtPlayer"]+'</li>');
		$("#damageList"+i).append('<li>Total Heal: '+complete_Recent[i]["stats"]["totalHeal"]+'</li>');

		$("#recentGame"+i).append('<div data-role="collapsible" data-theme = "b" id="fellowPlayers'+i+'"><h1>Fellow Players</h1>Coming SOON</div>');
		// $("#fellowPlayers"+i).append('<ul data-role ="listview" id = "playerList'+i+'"</ul>');
		// for(var z = 0 ; z< complete_Recent[i]["fellowPlayers"].length; z++){
		// 	playersID.push(complete_Recent[i]["fellowPlayers"][z]["summonerId"]);
		// 	console.log("holy molly");
		// 	console.log(playersID);
		// }
		// fellowPLAYers.push(findPlayerNames(playersID[z]));
		// for(var k = 0; k < playersID.length; k++){
		// 	console.log("lmao");
		// 	console.log(fellowPLAYers[k]);
		// }
		$("#recentGame"+i).append('<div data-role="collapsible" data-theme = "b" id="otherChit'+i+'"><h1>Bonusss</h1>Coming SOON</div>');
		fellowPLAYers = [];
		playersID = [];
	}
	$("#recentContent").trigger('create');
	//console.log("done");
	}
}
var playersID = [];
var fellowPLAYers = [];
//Player Array
function findPlayerNames(id){
	var name = "";
	var iD = id;
	$.ajax({
	 	url: path2,
	 	data: {
	        "ID": iD
    	},
	 	context: document.body,
	 	crossDomain: true
	}).done(function( reply ) {
		name = reply;
	});	
	return name;
}

var mastery_output;
function loadMasteries(){
	if(masteries_on === false){
		masteries_on = true;
		$("#mastPageHeader").text('Choose a Mastery List');
		$("#mastPageHeader").css("text-align", "center");
		$("#masteryContent").append('<label for="select-choice-0" class="select"></label> <select name = "select-choice-0" id ="optionsMast"></select>');
		for(var i = 0; i < mastery_output.length; i++){
			var mastPageID = removeSpace(mastery_output[i]["name"]);
			$("#optionsMast").append('<option value ="'+mastPageID+'">'+mastery_output[i]["name"]+'</option>');
		}
		$("#masteryContent").append('<button class ="ui-btn" id = "masteryPageBtn" onclick = "refreshMast()">Press for Masteries</button>');
		$("#masteryContent").trigger('create');
	}
}
function refreshMast(){
	$('#mastList li').remove();
	$('#masteryContent div').remove();
	$("#mastTable").remove();
	mast_page_name = $("#optionsMast option:selected").text();
	$("#mastPageHeader").text(mast_page_name);
	var sortedMast = {};
	var mastName = "";
	for(var i = 0; i < mastery_output.length; i++){
		for(var k = 0; k <mastery_output[i]["masteries"].length; k++){
			mastName = searchStatic(mastery_output[i]["masteries"][k]["id"], complete_Masteries);
			$("#mastList").append('<li>'+ mastName["name"] +'<br>Rank: '+mastery_output[i]["masteries"][k]["rank"]+'</li>')
		}
	}
	$("#mastList").listview('refresh');
	$("#masteryContent").trigger('create');
}

function masteryManagement(){

}

function loadRunes(){
	//recursive process to manage runes with different pages
	//select menu of all rune pages
	if(rune_on === false){
		rune_on = true;	
		$("#runePageHeader").text('Choose a Rune Page');
		$("#runePageHeader").css("text-align", "center");
		$("#runes").append('<label for="select-choice-0" class="select"></label> <select name = "select-choice-0" id ="options"></select>');
		for(var i = 0; i < rune_output.length; i++){
			var runePageID = removeSpace(rune_output[i]["name"]);
			$("#options").append('<option value ="'+runePageID+'">'+rune_output[i]["name"]+'</option>');
		}
		$("#runes").append('<button class ="ui-btn" id="runePageBtn" onclick=refreshList()>Press for Runes</button>');
		$("#runes").trigger('create');
	}
}

var page_number = 0;
var differentrunes = {};
var runeNames = {};
var runesDescription = {};
var rune_output;
var rune_page_name;
function refreshList(){
	console.log("refreshing list");
	$('#runeList li').remove();
	$('#runesMain div').remove();
	$("#runeTable").remove();
	rune_page_name = $("#options option:selected").text();
	$("#runePageHeader").text(rune_page_name);
	console.log(rune_page_name);
	var sortedRunes = {};
	for(var i = 0; i < rune_output.length; i++){
		if(rune_output[i]["name"] == rune_page_name){
			sortedRunes = runeManagement(rune_output[i]["slots"]);
		}
	}
	var a = 0;
	console.log(sortedRunes);
	$('#runesMain').append('<div id="runeTable"><table data-role="table" data-mode="reflow" id="runeTableStats"><thead>Total Stats from Runes<tr id="runeTableHead""></tr></thead><tbody><tr id="runeTableBody"></tr></tbody></table></div>');
	for(key in sortedRunes){
		if(key == "name"){
			for(key2 in sortedRunes[key]){
				$("#runeList").append('<li id="'+a+'">'+key2+ '     x  ' + sortedRunes[key][key2] +'</li>');
			}
		}
		// if(key == "description"){
		// 	for(key2 in sortedRunes[key]){
		// 		$('#runeTableHead').append('<td>'+ sortedRunes[key][key2] +'</td>');
		// 		$('#runeTableBody').append('<td>'+ sortedRunes[key][key2] +'</td>');
		// 	}
		// }
		a++;
	}
	$('#runeList').listview('refresh');
	$('#runesMain').trigger('create');
}

var count = 1;
function runeManagement(data){
	count = 1;
	differentrunes = {};
	runesDescription = {};
	runeNames = {};
	for(var i = 0; i < data.length - 1; i++){
		var rune_name1 = searchStatic(data[i]["runeId"], complete_Runes);
		var rune_name2 = searchStatic(data[i + 1]["runeId"], complete_Runes);
		console.log(rune_name1["description"] + "   " + rune_name2["name"]); 
		if(rune_name1 == rune_name2){
			count++;
			runeNames[rune_name1["name"]] = count;
			runesDescription[rune_name1["decription"]] = rune_name1["description"];
		}
		else{
			count = 1;
		}
		console.log(count + "  " + runeNames[rune_name1["name"]]);
	}
	differentrunes["name"] = runeNames;
	differentrunes["description"] = runesDescription;
	return differentrunes;
}

function removeSpace(str){
	str = str.replace(/\s/g, '');
	str = str.toLowerCase();
	return str;
}

var keys = {};

//Share to Omlet Integration

function shareToOmlet(event){
	console.log("Sharing game!");
	if( Omlet.isInstalled() )
	{
		// SaveGame();
		var rdl = Omlet.createRDL({
                noun: "game",
                displayTitle: "League of LMAO",
                displayThumbnailUrl: "http://mobi-summer-luke.s3.amazonaws.com/LeagueofLmaoClient/leagueoflmaothumbnail.png",
                displayText: "Search for your favorite players! Look at player game data, check out champion rotations and patch updates, and learn all about League of Legends!",  
                webCallback:  "http://mobi-summer-luke.s3.amazonaws.com/LeagueofLmaoClient/leagueofhtml.html",
               // json: gameState,
                callback: encodeURI(window.location.href)
            });
      	Omlet.exit(rdl);
      	console.log("shared!");
	}
	else
	{
		console.log("woops straight goofin");
	}
}

var gameState = {};

function Initialize(old, params) {
return params;
}

function Update(old, params) {

	old.gameState = params["gameState"];
	console.log("Updating!!!");
	return old;
}

function InitialDocument() {
	var initValues = {
		'creator': Omlet.getIdentity(), 
      	'gameState': ""
    };
  	return initValues;
}

function DocumentCreated(doc) {
  	console.log("Document has been created.");
}

function ReceiveUpdate(doc) {
	myDoc = doc;
	for( key in myDoc ){
		console.log(key);
  	}
	console.log( "gameState: " + myDoc["gameState"] );
	gameState = JSON.parse( myDoc["gameState"] );
	
	LoadGame();
	console.log("I received an update");
}

function DidNotReceiveUpdate(doc) {
console.log("I did not receive an update");
}

//////////////////////////////
///// Framework Code   ///////
//////////////////////////////

var documentApi;
var myDoc;
var myDocId;

function watchDocument(docref, OnUpdate) {
	documentApi.watch(docref, function(updatedDocRef) {
		if (docref != myDocId) {
			console.log("Wrong document!!");
		} else {
	      	documentApi.get(docref, OnUpdate);
	    }
	}, function(result) {
	var timestamp = result.Expires;
   	var expires = timestamp - new Date().getTime();
	var timeout = 0.8 * expires;
	setTimeout(function() {
  	watchDocument(docref, OnUpdate);
	}, timeout);
	}, Error);
}

function initDocument() {
if (Omlet.isInstalled()) {
    	documentApi = Omlet.document;
    	_loadDocument();
  	}
}

function hasDocument() {
	var docIdParam = window.location.hash.indexOf("/docId/");
    return (docIdParam != -1);
}

function getDocumentReference() {
	var docIdParam = window.location.hash.indexOf("/docId/");
	if (docIdParam == -1) return false;
	var docId = window.location.hash.substring(docIdParam+7);
	var end = docId.indexOf("/");
	if (end != -1) {
  	docId = docId.substring(0, end);
	}
	return docId;
}

function _loadDocument() {
  	if (hasDocument()) {
    	myDocId = getDocumentReference();
    	documentApi.get(myDocId, ReceiveUpdate);
		watchDocument(myDocId, ReceiveUpdate);
	} else {
    	documentApi.create(function(d) {
      	myDocId = d.Document;33
      	location.hash = "#/docId/" + myDocId;
      	documentApi.update(myDocId, Initialize, InitialDocument(), 
	function() {
      	documentApi.get(myDocId, DocumentCreated);
	}, function(e) {
      	alert("error: " + JSON.stringify(e));
    });
      	watchDocument(myDocId, ReceiveUpdate);
		}, function(e) {
  		alert("error: " + JSON.stringify(e));
		});
  	}
}

Omlet.ready(function() {
	if( hasDocument() )
	{
		console.log("I have the document");
		initDocument();
	}
	else
	{
		console.log("I do not have the document.");
		console.log("\t...creating document");
		initDocument();
	}
} );

