var parsedObj;
var senators;
var uniqueParties;
var xmlhttp = new XMLHttpRequest();
var url = "senators.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {        
        //Parse the JSON data to a JavaScript variable. 
        parsedObj = JSON.parse(xmlhttp.responseText);  
        senators = parsedObj.objects;
        uniqueParties = [];
        for(i = 0; i < senators.length; i++){
            if(uniqueParties.indexOf(senators[i].party)== -1){
                uniqueParties.push(senators[i].party)
            }
        }
        // This function is defined below and deals with the JSON data parsed from the file. 
        displayLeader();
        countParty(); 
        displaySenators();  
        populatePartyFilter();
        populateStatesFilter();
        populateGenderFilter();
        populateRankFilter();
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function countParty() {
    var out = "";
    for (var i = 0; i < uniqueParties.length; i++){
        out += '<div class="party-container"><div class="party-count"><h3>' + uniqueParties[i] + '</h3><p class="senator-no">'
        var count = 0;
        for (var j=0; j < senators.length; j++){
            if (senators[j].party === uniqueParties[i]){
                count++;
            } 
        }
        out += count + '</p></div></div>';          
    }
    document.getElementById("id01").innerHTML = out;
}


function displayLeader(){
    var out = "";
    //This code iterates through the senators and display the senators with leadership role, grouped by party
    for (var i = 0; i < uniqueParties.length; i++){
        out += '<div><h3>'
        out += uniqueParties[i]
        out += ' leaders</h3>'
        var count = 0
        for (j = 0; j < senators.length; j++){
            if (uniqueParties[i] === senators[j].party && senators[j].leadership_title !== null){
                count += 1;
                out += '<div class = "leadercontainer">';
                out += '<p class = "leadername">';
                out += senators[j].person.firstname + ' '+ senators[j].person.lastname;
                out += '</p><p class = "role">';
                out += senators[j].leadership_title;
                out += '</p></div>';   
            } 
        }
        if (count == 0){
        out += '<p class = "noleader"> There is no ' + uniqueParties[i] + ' leader<p>';
        }
        out += '</div>'
    ;        
    }
    document.getElementById("id04").innerHTML = out; 
}


function displaySenators() {
  var senatorInfo = "<table id = 'allSenatorsTable'>";
  senatorInfo += "<thead><tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th></tr></thead>";

  // This code iterates through all parties and senators and adds their name, party, state and rank to a table
  for(var i = 0; i < uniqueParties.length; i++){
      for(var j = 0; j < senators.length; j++){
          if (uniqueParties[i] == senators[j].party){
              var senatorFirstName = senators[j].person.firstname;
              var senatorLastName = senators[j].person.lastname;
              var senatorParty = senators[j].party;
              var senatorState = senators[j].state;
              var senatorGender = senators[j].person.gender_label;
              var senatorRank = senators[j].senator_rank_label;
              senatorInfo += "<tbody><tr id=\"viewdetail\" onclick=\"detailedInfo(" + j + ')\">'
              + "<td>" + senatorFirstName + " " + senatorLastName + "</td>"
              + "<td>" + senatorParty + "</td>" 
              + "<td>" + senatorState + "</td>"
              + "<td>" + senatorGender + "</td>" 
              + "<td>" + senatorRank + "</td></tr></tbody>" ;
            }
        }
  }
  
  senatorInfo += "</table>"; 
  
  document.getElementById("id05").innerHTML = senatorInfo;
}

function filterFunction() {
  // Adapted from W3S: https://www.w3schools.com/howto/howto_js_filter_table.asp
  // And also: https://stackoverflow.com/questions/61189530/html-table-multiple-column-filters 
  var partyInput = document.getElementById("partyInput");
  var stateInput = document.getElementById("stateInput");
  var genderInput = document.getElementById("genderInput");
  var rankInput = document.getElementById("rankInput");
  var table = document.getElementById("allSenatorsTable");

  var partyFilter = partyInput.value.toUpperCase();
  var stateFilter = stateInput.value.toUpperCase();
  var genderFilter = genderInput.value.toUpperCase();
  var rankFilter = rankInput.value.toUpperCase();
  var tr = table.rows;

  // Error checking for if no results match filters input.
  // rows -= 1 as to not include table headers.
  // If rows == hidden_rows, means all rows are hidden i.e. no results match
  var rows = tr.length;
  rows -= 1;
  hidden_rows = 0;

  var resultFound = false;
  
  for (var i = 1; i < tr.length; i++) {
    td = tr[i].cells;
    tdParty = td[1].innerText;
    tdState = td[2].innerText;
    tdGender = td[3].innerText;
    tdRank = td[4].innerText;
    if (tdParty.toUpperCase().indexOf(partyFilter) > -1 &&
    tdState.toUpperCase().indexOf(stateFilter) > -1 &&
    (!genderFilter || tdGender.toUpperCase() === genderFilter) &&
    tdRank.toUpperCase().indexOf(rankFilter) > -1) {
      resultFound = true;
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
      hidden_rows += 1;
    }
  }
  // Produces error message if no results found
  if (hidden_rows == rows){
    output = "Error: No results seem to match. Please try a different combination of filters.";
    document.getElementById("errorHandle").innerHTML = output;
} else {
    output = "";
    document.getElementById("errorHandle").innerHTML = output;
}
}


function detailedInfo(i) {
        
  var office = senators[i].extra.office;
  var dateOfBirth = senators[i].person.birthday;
  var startDate = senators[i].startdate;
  var twitterId = senators[i].person.twitterid;
  var youtubeId = senators[i].person.youtubeid;
  var website = senators[i].website;
  
  if (youtubeId == null){
      youtubeId_out = "";
  } else {
    youtubeId_out = '<tr class="info-row"><td class="info-label">Youtube ID: </td><td class="info-value">' + youtubeId + '</td></tr>' ;
    }

  if (twitterId == null){
      twitterId_out = "";
  } else {twitterId_out = '<tr class="info-row"><td class="info-label">Twitter ID: </td><td class="info-value">' + twitterId + '</td></tr>';
 }


  var detail_out = ''
  detail_out += '<div class="sidebar">';
  detail_out += '<div class="sidebar-header">';
  detail_out += '<div class="sidebar-title"><h4>Senator Information</h4></div><i id="toggle" onclick="hideParentDiv()" class="bx bx-x"></i></div>';
  detail_out += '<div class="info"><table class="info-box">'
  detail_out += '<tr class="info-row"><td class="info-label">Office: </td><td class="info-value">' + office + '</td></tr>';
  detail_out += '<tr class="info-row"><td class="info-label">Date of Birth: </td><td class="info-value">' + dateOfBirth + '</td></tr>';
  detail_out += '<tr class="info-row"><td class="info-label">Start Date: </td><td class="info-value">' +  startDate + '</td></tr>';
  detail_out += twitterId_out + youtubeId_out;
  detail_out += '<tr class="info-row"><td class="info-label">Website: </td><td class="info-value"><a href="'+ website + '">' + website + '</a></td></tr>';
  detail_out += '</table>'

  
  document.getElementById("id06").innerHTML = detail_out;
  
  var targetDiv = document.getElementById("id06");

  if (targetDiv.style.display == "none") {
    targetDiv.style.display = "block";
  } 

}

// Function to populate the party filter dropdown
// Code adapted from https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
function populatePartyFilter() {

    var partyList = document.getElementById("partyInput");

    for (i = 0; i < uniqueParties.length; i++){
        var option = uniqueParties[i];
        var element = document.createElement("option");
        element.textContent = option;
        partyList.appendChild(element);
    }

}

// Function to populate the state filter dropdown
function populateStatesFilter() {
    
    var uniqueStates = [];

    // Creating an array of unique states
    for (i = 0; i < senators.length; i++) {
        if (uniqueStates.indexOf(senators[i].state) == -1) {
            uniqueStates.push(senators[i].state);
        }
    }

    uniqueStates.sort();
    
    var statesList = document.getElementById("stateInput");

    for (i = 0; i < uniqueStates.length; i++){
        var option = uniqueStates[i];
        var element = document.createElement("option");
        element.textContent = option;
        statesList.appendChild(element);
    }

}

// Function to populate the gender filter dropdown
function populateGenderFilter() {
    
    var uniqueGenders = [];

    // Creating an array of unique genders
    for (i = 0; i < senators.length; i++) {
        if (uniqueGenders.indexOf(senators[i].person.gender_label) == -1) {
            uniqueGenders.push(senators[i].person.gender_label);
        }
    }

    uniqueGenders.sort();
    var genderList = document.getElementById("genderInput");

    for (i = 0; i < uniqueGenders.length; i++){
        var option = uniqueGenders[i];
        var element = document.createElement("option");
        element.textContent = option;
        genderList.appendChild(element);
    }

}

// Function to populate the rank filter dropdown
function populateRankFilter() {
    
    var uniqueRanks = [];
    
    // Creating an array of unique ranks
    for (i = 0; i < senators.length; i++) {
        if (uniqueRanks.indexOf(senators[i].senator_rank_label) == -1) {
            uniqueRanks.push(senators[i].senator_rank_label);
        }
    }

    uniqueRanks.sort();
    var ranksList = document.getElementById("rankInput");

    for (i = 0; i < uniqueRanks.length; i++){
        var option = uniqueRanks[i];
        var element = document.createElement("option");
        element.textContent = option;
        ranksList.appendChild(element);
    }

}

// Function to close the detail 
function hideParentDiv(){
var btn = event.target;
    var parentDiv = btn.parentNode.parentNode.parentNode;
    parentDiv.style.display = "none";
}