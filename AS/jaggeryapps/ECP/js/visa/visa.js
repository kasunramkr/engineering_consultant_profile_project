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
//define variable for maximum no of lines on the table
var maxTableLines = 5;
$(document).ready(function() {
    $.ajax({
        url: "jag/visa/visa.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": getCookie("MAIL_ID")
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            var jsonData = JSON.parse(data);
            var visaTable = document.getElementById("visa");
            var visaHover = document.getElementById("visaHover");
            if(JSON.stringify(jsonData.data.Visas)=="{}"){
                $("#visa").remove();
                $( "#visaTopic" ).text("No Visa Details Available");
            }
            else {
                var visa = jsonData.data.Visas.Visa;
                for (var i = 0; i < visa.length; i++) {
                    //break loop when no of maximum numbers are filled
                    if (i === maxTableLines) {
                        break;
                    }
                    //add a row to table
                    var row = visaTable.insertRow(i + 1);
                    addTableRow(visa, row, i);
                }
                if (visa.length > maxTableLines) {
                    //enable "Other countries" link
                    $("#otherCountries").html("Other countries");
                    for (i = maxTableLines; i < visa.length; i++) {
                        var row = visaHover.insertRow(i - maxTableLines + 1);
                        addTableRow(visa, row, i);
                    }
                }
            }

        },
        error: function(xhr, textStatus, errorThrown) {
            $("#visa").html($("<h5> Error while getting visa details </h5>"));
        }
    });
});
/**
 * create table row and insert it in to table
 * @param {json} visa
 * @param {TableRow} row
 * @param {number} i
 */
function addTableRow(visa, row, i) {
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var countryCode = visa[i].country;
    cell1.innerHTML = '<img class="flag flag-' + countryCode.toLowerCase() + '" alt=""/> ' + getCountryName(countryCode);
    //get date from datetime object
    cell2.innerHTML = visa[i].end_date.split("T")[0];
}