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
        populateStates(parsedObj)
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function countParty(obj) {
    
    var senators = obj.objects;
    var democratCount = 0;
    var republicanCount = 0;
    var independentCount = 0;

    
    // This code iterates through the senators and counts the number in each party
    for (var i=0; i < senators.length; i++){    
        if (senators[i].party === "Democrat"){
            democratCount++;
        } else if (senators[i].party === "Republican"){
            republicanCount++;
        } else {
            independentCount++;
        }          
    }

    document.getElementById("id01").innerHTML = democratCount;
    document.getElementById("id02").innerHTML = republicanCount;
    document.getElementById("id03").innerHTML = independentCount;
    
}

party = ["Democrat", "Republican", "Independent"]

function displayLeader(obj){

    var senators = obj.objects;
    var out = "";

    //This code iterates through the senators and display the senators with leadership role, grouped by party
    for (var i = 0; i < party.length; i++){
        for (var j = 0; j < senators.length; j++){
            if (party[i] === senators[j].party && senators[j].leadership_title !== null){
                out += '<ul>'+ senators[j].leadership_title + ': ' + senators[j].person.firstname + ' ' 
                        + senators[j].person.lastname + ' (' + senators[j].party + ')</ul>'
            }
        }
    }

    document.getElementById("id04").innerHTML = out; 
}


function displaySenators(obj) {
  var senators = obj.objects;
  var senatorInfo = "<table id = 'allSenatorsTable'>";
  senatorInfo += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th></tr>";

  // This code iterates through all senators and adds their name, party, state and rank to a table
  for(var i = 0; i < party.length; i++){
      for(var j = 0; j < senators.length; j++){
          if (party[i] == senators[j].party){
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

// Function to populate the state filter dropdown
function populateStates(obj) {
    var data = obj.objects;
    var uniqueStates = [];

    // Creating an array of unique states
    for (i = 0; i < data.length; i++) {
        if (uniqueStates.indexOf(data[i].state) == -1) {
            uniqueStates.push(data[i].state);
        }
    }

    // Code adapted from https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array
    var statesList = document.getElementById("stateInput");

    for (i = 0; i < uniqueStates.length; i++){
        var option = uniqueStates[i];
        var element = document.createElement("option");
        element.textContent = option;
        statesList.appendChild(element);
    }

}