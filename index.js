var REAL_SERVER = "http://peaceful-river-1294.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var page_path = LOCAL_TEST_SERVER;
var page_Name;
function test(){
	var names = "Aatrox Ahri Akali Alistar Amumu Anivia Annie Ashe Blitzcrank Brand Braum Caitlyn Cassiopeia Cho'Gath Corki Darius Diana Dr.Mundo Draven Elize Evelynn Ezreal Fiddlesticks Fiora Fizz Galio Gangplank Garen Gnar Gragas Graves Hecarim Heimerdinger Irelia Janna JarvanIV Jax Jayce Jinx Karma Karthus Kassadin Katarina Kayle Kennen Kha'Zix Kog'Maw LeBlanc LeeSin Leona Lissandra Lucian LuLu Lux Malphite Malzahar Maokai MasterYi MissFortune Mordekaiser Morgana Nami Nasus Nautilus Nocturne Nunu Olaf Orianna Pantheon Poppy Quinn Rammus Renekton Rengar Riven Rumble Ryze Sejuani Shaco Shen Shyvanna Singed Sion Sivir Skarner Sona Soraka Swain Syndra Talon Taric Teemo Thresh Tristana Trundle Tryndamere Twitch Varus Vayne Veigar Vel'Koz Vi Viktor Vladimir Volibear Warwick Wukong Xerath XinZhao Yasuo Yorick Zac Zed Ziggs Zilean Zyra";
	var newname = names.split(" ");
	for(var i =0; i < newname.length; i++){
				
	}
	console.log(newname);
}
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
var variableSummonerName = "cashinu";
$(function () 
{
	console.log("hi");
	var path = REAL_SERVER + "/league";
	//var variableSummonerName = "b3lik3t";
	var completeData;
	numberOfPages = 0;
	$.ajax({
	 	url: path,
	 	data: { 
	 		"complete_summoner_data":completeData,
	        "summoner_name": variableSummonerName
    	},
	 	context: document.body,
	 	crossDomain: true
	}).done(function( reply ) {
		keys = Object.keys(reply);
		alert("done pulling shit bitch");
		console.log(keys);
		//console.log(reply);
		console.log("pulling oen piece")
		organize(keys, reply);
	});	
} );

//MANGNAMGNAGMAGNAGMMANGNAGMANGNAMGNAG
//have multiple ajax calls and organize data when needed

//collective lists
var complete_Champions = {};
var complete_Runes = {};
var complete_Masteries = {};
var complete_Sumoner_Spells = {};
var complete_Items = {};
var player_summary = {};

function organize(keys, data){
	for(var key in data){
		if(key == "summoner_spell_list"){
			complete_Sumoner_Spells = data[key];
			for(var key2 in data[key]){
				//console.log(data["summoner_spell_list"][key2]);

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
			for(var key2 in data[key]){
				//console.log(data["champions"][key2]);
			}
		}
		if(key == "ranked"){//setup
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
				console.log();
			}
		}
		if(key == "recent_games"){//setup
			for(var i = 0; i < data[key].length; i++){
				//console.log("recent game stats");
				var champ = searchChamp(data[key][i]["championId"], complete_Champions);
				//console.log(champ);
				//console.log(data[key][i]["stats"]);
			}
		}
		// lolapi call for recent players not working at the moment if(key == "recent_players"){
		// 	for(var key2 in data[key]){
		// 		console.log(data["recent_players"][key2]);
		// 	}
		// }
		if(key == "summoner_masteries"){//setup
			tableID = "masteries";
			for(var key2 in data[key]){
				for(var key3 in data[key][key2]){
					if(key3 == "pages"){
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
						console.log(rune_output);
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
		if(key == "player_summary"){
			player_summary = data[key];
			for(var i  = 0; i < data[key].length; i++){
				console.log(data[key][i]["playerStatSummaryType"]);
				console.log(data[key][i]["aggregatedStats"]);
				for(key2 in data[key][i]["aggregatedStats"]){
					console.log(key2 + "      " + data[key][i]["aggregatedStats"][key2]);
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
function searchChamp(data_id, list){
	for(var key in list){
		if(list[key]["id"] == data_id){
			return list[key]["name"];
		}
	}
}

var tableID;

// function createTable(data){
// 	var body = document.getElementsByTagName("body")[0];
// 	var table = document.createElement("table");
// 	var table_body = document.createElement("tbody");
// 	for(var i = 0; i < )

// }

function testList(){
	var testDiv = document.createElement("div");
	testPage.appendChild(testDiv);
	var unorderedList = document.createElement("ul");
	unorderedList.setAttribute('id', 'testUnordered');
	testDiv.appendChild(unorderedList);
	testDiv.setAttribute('id', 'testList');

	$('[id=testList]').addClass('ui-content ui-page-theme-b');
	$('[id=testList]').attr('data-role','main');
	$('[id=testList]').attr('data-theme', 'b');

	$('[id=testUnordered]').attr('data-role', 'listview');
	$('[id=testUnordered]').addClass('ui-listview');
	console.log(rune_output[0]);
	for(var i = 0; i < rune_output[0]["slots"].length; i++){
		var cell = document.createElement("li");
		cell.setAttribute('id', 'cell');
		var setLink = document.createElement("a");
		setLink.setAttribute('id', 'link');
		var hID = "headerID" + i;
		var pID = "parID" + i;
		var header = document.createElement("h1");
		header.setAttribute('id',  hID);
		//console.log(header.id);
		var par = document.createElement("p");
		par.setAttribute('id', pID);
		//console.log(par.id);

		cell.appendChild(setLink);
		setLink.appendChild(header);
		setLink.appendChild(par);
		unorderedList.appendChild(cell);

		var rune_name = searchStatic(rune_output[0]["slots"][i]["runeId"], complete_Runes);
		// $(".headerCLASS")[i].html(rune_name["name"]);
		// $(".parCLASS")[i].html(rune_name["description"]);
		$("[id=" + hID + "]").text(rune_name["name"]);
		$("[id=" + pID + "]").text(rune_name["description"]);
		
		console.log(rune_name["name"]);
		console.log(rune_name["description"]);
		
	}
	//console.log(complete_Runes);
	//console.log(rune_output);
	//var testPage = document.getElementById('testPage');
	//console.log(testPage.id);
	
}

function loadProfile(){
	
	var profDiv = document.getElementById("profMain");
	var profHead = document.getElementById("profHead");
	

	$("#profContent").append('<div data-role = "collapsible-set" id = "profSet" data-content-theme="b"></div>');
	for(var i = 0; i < player_summary.length; i++){
		if(player_summary[i]["playerStatSummaryType"] == "Unranked" || player_summary[i]["playerStatSummaryType"] == "RankedSolo5x5" ||player_summary[i]["playerStatSummaryType"] == "RankedTeam5x5" || player_summary[i]["playerStatSummaryType"] == "AramUnranked5x5"){
			var title = player_summary[i]["playerStatSummaryType"];

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
			for(key in player_summary[i]["aggregatedStats"]){
				
				if(key == "totalChampionKills") head_name = "Total Champion Kills";
				if(key == "totalAssists") head_name = "Total Assists";
				if(key == "totalMinionKills") head_name = "Total Minion Kills";
				if(key == "totalTurretsKilled") head_name = "Total Turret Kills";
				if(key == "totalNeutralMinionsKilled") head_name = "Total Neutral Minion Kills";

				console.log(key);

				$("#profTableHead"+i).append('<td>'+ head_name +'</td>');
				$("#profTableBody"+i).append('<td>'+ player_summary[i]["aggregatedStats"][key] +'</td>');	
			}
		} 
	}
	$("#profContent").trigger('create');
	$('[id=profHead]').text(variableSummonerName);
	console.log("sup " + variableSummonerName);
}

function createNewDataPage(){

}

function loadRunes(){
	//recursive process to manage runes with different pages
	//select menu of all rune pages
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
var page_number = 0;
var differentrunes = {};
var rune_output;
var rune_page_name;
function refreshList(){
	console.log("refreshing list");
	$('#runeList li').remove();
	$('#runesMain div').remove();
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
		$("#runeList").append('<li id="'+a+'">'+key+ '     x' + sortedRunes[key] +'</li>');
		
		a++;
	}

	

	$('#runeList').listview('refresh');

}
var count = 1;
function runeManagement(data){
	count = 1;
	differentrunes = {};
	for(var i = 0; i < data.length - 1; i++){
		var rune_name1 = searchStatic(data[i]["runeId"], complete_Runes);
		var rune_name2 = searchStatic(data[i + 1]["runeId"], complete_Runes);
		console.log(rune_name1["description"] + "   " + rune_name2["name"]); 
		if(rune_name1 == rune_name2){
			count++;
			differentrunes["name"] = rune_name1["name"]
			differentrunes["name"][rune_name1["name"]] = count;
		}
		else{
			count = 1;
		}
		console.log(count + "  " + differentrunes["name"][rune_name1["name"]]);
	}
	return differentrunes;
}

function loadMasteries(){

}

function removeSpace(str){
	str = str.replace(/\s/g, '');
	return str;
}

var keys = {};