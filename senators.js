var xmlhttp = new XMLHttpRequest();
var url = "senators.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        //Parse the JSON data to a JavaScript variable. 
        var parsedObj = JSON.parse(xmlhttp.responseText);  
        // This function is defined below and deals with the JSON data parsed from the file. 
        displayJSON(parsedObj);   
    }
};

function displayJSON(obj) {
    
    var senators = obj.objects;
    var democratCount = 0;
    var republicanCount = 0;
    var independentCount = 0;

    
    // This code iterates through the party and writes html code to put the color information in a table.   
    for (var i=0; i < senators.length; i++){    
        if (senators[i].party === "Democrat"){
            democratCount++;
        } else if (senators[i].party === "Republican"){
            republicanCount++;
        } else {
            independentCount++;
        }          
        //partyInfo += "<tr><td>" + colorName + "</td><td>" + colorValue + "</td></tr>";
    }
     // Close the table element.
    //partyInfo += "</table>"; 
    
    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("id01").innerHTML = democratCount;
    document.getElementById("id02").innerHTML = republicanCount;
    document.getElementById("id03").innerHTML = independentCount;
    
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

console.log(parsedObj)