var parsedObj;
var xmlhttp = new XMLHttpRequest();
var url = "senators.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        //Parse the JSON data to a JavaScript variable. 
        parsedObj = JSON.parse(xmlhttp.responseText);  
        // This function is defined below and deals with the JSON data parsed from the file. 
        displayLeader(parsedObj);
        countParty(parsedObj); 
        displaySenators(parsedObj);  
        populatePartyFilter(parsedObj);
        populateStatesFilter(parsedObj);
        populateGenderFilter(parsedObj);
        populateRankFilter(parsedObj);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();



function countParty(obj) {
    
    var senators = obj.objects;
    var uniqueParties = [];
    var out = "";

    for(i = 0; i < senators.length; i++){
        if(uniqueParties.indexOf(senators[i].party)== -1){
            uniqueParties.push(senators[i].party)
        }
    }

    out += '<div>';
    for (var i = 0; i < uniqueParties.length; i++){
        out += '<div class="party-container"><div class="party-count"><h3>' + uniqueParties[i] + '</h3> <p class="senator-no">'
        var count = 0;
        for (var j=0; j < senators.length; j++){
            if (senators[j].party === uniqueParties[i]){
                count++;
            } 
        }
        out += count + '</p>';          
    }
    out += '</div>';
    document.getElementById("id01").innerHTML = out;

}



function displayLeader(obj){

    var senators = obj.objects;
    var out = "";
    var data = parsedObj.objects;
    var uniqueParties = [];

    // Creating an array of unique parties
    for (i = 0; i < data.length; i++) {
        if (uniqueParties.indexOf(data[i].party) == -1) {
            uniqueParties.push(data[i].party);
        }
    }

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


function displaySenators(obj) {
  var senators = obj.objects;
  var senatorInfo = "<table id = 'allSenatorsTable'>";
  senatorInfo += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th></tr>";

  var uniqueParties = [];
  // Creating an array of unique parties
  for (i = 0; i < senators.length; i++) {
      if (uniqueParties.indexOf(senators[i].party) == -1) {
          uniqueParties.push(senators[i].party);
      }
  }

  // This code iterates through all senators and adds their name, party, state and rank to a table
  for(var i = 0; i < uniqueParties.length; i++){
      for(var j = 0; j < senators.length; j++){
          if (uniqueParties[i] == senators[j].party){
              var senatorFirstName = senators[j].person.firstname;
              var senatorLastName = senators[j].person.lastname;
              var senatorParty = senators[j].party;
              var senatorState = senators[j].state;
              var senatorGender = senators[j].person.gender_label;
              var senatorRank = senators[j].senator_rank_label;
              senatorInfo += "<tr onclick=\"detailedInfo(parsedObj," + j + ")\"><td>" + senatorFirstName + " " + senatorLastName + "</td>"
              + "<td>" + senatorParty + "</td>" 
              + "<td>" + senatorState + "</td>"
              + "<td>" + senatorGender + "</td>" 
              + "<td>" + senatorRank + "</td></tr>" ;
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

function detailedInfo(obj, i) {
       
  var detailedArray = obj.objects;
 
  var office = detailedArray[i].extra.office;
  var dateOfBirth = detailedArray[i].person.birthday;
  var startDate = detailedArray[i].startdate;
  var twitterId = detailedArray[i].person.twitterid;
  var youtubeId = detailedArray[i].person.youtubeid;
  var website = detailedArray[i].website;
  
  if (youtubeId == null){
      youtubeId_out = "";
  } else {youtubeId_out = "<br>Youtube ID: " + youtubeId;}

  if (twitterId == null){
      twitterId_out = "";
  } else {twitterId_out = "<br>Twitter ID: " + twitterId;}


  var detail_out = "Office: " + office +
  "<br>Date of Birth: " + dateOfBirth +
  "<br>Start date: " + startDate +
  twitterId_out +
  youtubeId_out +
  "<br>Website: <a href=\"" + website + "\">" + website;
  
  document.getElementById("id06").innerHTML = detail_out;
  
}

// Function to populate the party filter dropdown
// Code adapted from https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
function populatePartyFilter(obj) {
    var data = obj.objects;
    var uniqueParties = [];

     // Creating an array of unique Parties
    for (i = 0; i < data.length; i++) {
    if (uniqueParties.indexOf(data[i].party) == -1) {
        uniqueParties.push(data[i].party);
    }
    }

    // uniqueParties.sort();
    var partyList = document.getElementById("partyInput");

    for (i = 0; i < data.length; i++){
        var option = uniqueParties[i];
        var element = document.createElement("option");
        element.textContent = option;
        partyList.appendChild(element);
    }

}

// Function to populate the state filter dropdown
function populateStatesFilter(obj) {
    var data = obj.objects;
    var uniqueStates = [];

    // Creating an array of unique states
    for (i = 0; i < data.length; i++) {
        if (uniqueStates.indexOf(data[i].state) == -1) {
            uniqueStates.push(data[i].state);
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
function populateGenderFilter(obj) {
    var data = obj.objects;
    var uniqueGenders = [];

    // Creating an array of unique genders
    for (i = 0; i < data.length; i++) {
        if (uniqueGenders.indexOf(data[i].person.gender_label) == -1) {
            uniqueGenders.push(data[i].person.gender_label);
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
function populateRankFilter(obj) {
    var data = obj.objects;
    var uniqueRanks = [];

    // Creating an array of unique states
    for (i = 0; i < data.length; i++) {
        if (uniqueRanks.indexOf(data[i].senator_rank_label) == -1) {
            uniqueRanks.push(data[i].senator_rank_label);
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
