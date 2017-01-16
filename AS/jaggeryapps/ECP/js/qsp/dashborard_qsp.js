/*
~   Copyright (c) 2005-2016, WSO2 Inc. (http://wso2.org) All Rights Reserved.
~
~   Licensed under the Apache License, Version 2.0 (the "License");
~   you may not use this file except in compliance with the License.
~   You may obtain a copy of the License at
~
~        http://www.apache.org/licenses/LICENSE-2.0
~
~   Unless required by applicable law or agreed to in writing, software
~   distributed under the License is distributed on an "AS IS" BASIS,
~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
~   See the License for the specific language governing permissions and
~   limitations under the License.
*/
$(document).ready(function() {
    $.ajax({
        url: "jag/qsp/dashborard_qsp.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        success: function(data) {
            var jsonData = JSON.parse(data);
            if (jsonData.data.LatestQSP.feedback1.rolePlayed != "") {
                $("#date").text(jsonData.data.LatestQSP.feedback1.timePeriod);
                $("#client").text(jsonData.data.LatestQSP.feedback1.qspClient);
                $("#role").text(jsonData.data.LatestQSP.feedback1.rolePlayed);
                // Find a <table> element with id="myTable":
                var table = document.getElementById("myTable");
                // Create an empty <tr> element and add it to the 1st position of the table:
                var row = table.insertRow(1);
                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                // Add some text to the new cells:
                cell1.innerHTML = jsonData.data.LatestQSP.feedback1.recommendForLead;
                cell2.innerHTML = jsonData.data.LatestQSP.feedback1.recommendForConsultant;
                cell3.innerHTML = jsonData.data.LatestQSP.feedback1.recommendedBy;
                if (jsonData.data.LatestQSP.feedback2.recommendForLead != "") {
                    // Find a <table> element with id="myTable":
                    var table = document.getElementById("myTable");
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(2);
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    // Add some text to the new cells:
                    cell1.innerHTML = jsonData.data.LatestQSP.feedback2.recommendForLead;
                    cell2.innerHTML = jsonData.data.LatestQSP.feedback2.recommendForConsultant;
                    cell3.innerHTML = jsonData.data.LatestQSP.feedback2.recommendedBy;
                }
            } else {
                var h = document.createElement("H1");
                var t = document.createTextNode("No QSP details for this user");
                h.appendChild(t);
                $("body").empty();
                h.className += " otherclass";
                $("body").append(h);
            }
        }
    });
});

function getQSPLidt() {
    wso2.gadgets.navigate.navigatePage({
        url: "https://localhost:9443/portal/dashboards/sds/page3?preview=true"
    });
}