var xmlhttp = new XMLHttpRequest();
var url = "senators.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        //Parse the JSON data to a JavaScript variable. 
        var parsedObj = JSON.parse(xmlhttp.responseText);  
        // This function is defined below and deals with the JSON data parsed from the file. 
        displayJSON(parsedObj);
        displayLeader(parsedObj);
    }
};

function displayJSON(obj) {

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


xmlhttp.open("GET", url, true);
xmlhttp.send();

console.log(parsedObj)