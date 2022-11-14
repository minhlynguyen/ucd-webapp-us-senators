var xmlhttp = new XMLHttpRequest();
var url = "senators.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        //Parse the JSON data to a JavaScript variable. 
        var parsedObj = JSON.parse(xmlhttp.responseText);  
        // This function is defined below and deals with the JSON data parsed from the file. 
        displayLeader(parsedObj);
        countParty(parsedObj); 
        displaySenators(parsedObj);  
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
    var senatorInfo = "<table id = 'myTable'>";
    senatorInfo += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th></tr>";

    // This code iterates through all senators and adds their name, party, state and rank to a table
    for(var i = 0; i < senators.length; i++){
        var senatorFirstName = senators[i].person.firstname;
        var senatorLastName = senators[i].person.lastname;
        var senatorParty = senators[i].party;
        var senatorState = senators[i].state;
        var senatorGender = senators[i].person.gender_label;
        var senatorRank = senators[i].senator_rank_label;
        senatorInfo += "<tr><td>" + senatorFirstName + " " + senatorLastName + "</td>"
        + "<td>" + senatorParty + "</td>" + "<td>" + senatorState + "</td>"
        + "<td>" + senatorGender + "</td>" + "<td>" + senatorRank + "</td></tr>";
    }
    // Close the table element.
    senatorInfo += "</table>"; 
    
    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("id05").innerHTML = senatorInfo;

}

// Function to filter the table
// From W3S: https://www.w3schools.com/howto/howto_js_filter_table.asp
function filterByParty() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("partyInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function filterByState() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("stateInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function filterByGender() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("genderInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function filterByRank() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("rankInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }