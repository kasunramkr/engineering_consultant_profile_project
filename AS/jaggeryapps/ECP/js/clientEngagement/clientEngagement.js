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

var currentYearRow=[0,0,0,0,0,0];
var nextYearRow=[0,0,0,0,0,0];

$(document).ready(function() {
    $.ajax({
        url: "jag/clientEngagement/clientEngagements.jag?action=getClientEngagementWeeks",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": getCookie("MAIL_ID")
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            var date = new Date(); // define current date
            var Entry = JSON.parse(data).Entries.Entry;
            var table = document.getElementById("ClientEngTable");
            var currentYear = date.getFullYear(); // set current year
            var nextYear = currentYear + 1; // set next year
            // set current and next year values on table
            $("#nextYear").html(nextYear);
            $("#currentYear").html(currentYear);

            for(var i=0;i<Entry.length;i++){
                if(Number(Entry[i].type)===20){
                    addToTable(currentYear,nextYear,Entry[i],0);
                }
                else if(Number(Entry[i].type)===12){
                    addToTable(currentYear,nextYear,Entry[i],1);
                }
                else if(Number(Entry[i].type)===22){
                    addToTable(currentYear,nextYear,Entry[i],2);
                }
                else if(Number(Entry[i].type)===19){
                    addToTable(currentYear,nextYear,Entry[i],3);
                }
                else if(Number(Entry[i].type)===41){
                    addToTable(currentYear,nextYear,Entry[i],4);
                }
                else if(Number(Entry[i].type)===46){
                    addToTable(currentYear,nextYear,Entry[i],5);
                }
            }

            //nextYear coloum
            table.rows[1].cells[1].innerHTML = Number(nextYearRow[0]);
            table.rows[2].cells[1].innerHTML = Number(nextYearRow[1]);
            table.rows[3].cells[1].innerHTML = Number(nextYearRow[2]);
            table.rows[4].cells[1].innerHTML = Number(nextYearRow[3]);
            table.rows[5].cells[1].innerHTML = Number(nextYearRow[4]);
            table.rows[6].cells[1].innerHTML = Number(nextYearRow[5]);

            //next year coloum
            table.rows[1].cells[2].innerHTML = Number(currentYearRow[0]);
            table.rows[2].cells[2].innerHTML = Number(currentYearRow[1]);
            table.rows[3].cells[2].innerHTML = Number(currentYearRow[2]);
            table.rows[4].cells[2].innerHTML = Number(currentYearRow[3]);
            table.rows[5].cells[2].innerHTML = Number(currentYearRow[4]);
            table.rows[6].cells[2].innerHTML = Number(currentYearRow[5]);

            //calculate total values
            $("#tTotal").html(Number(table.rows[1].cells[1].textContent) + Number(table.rows[1].cells[2].textContent) + Number(table.rows[1].cells[3].textContent));
            $("#cTotal").html(Number(table.rows[2].cells[1].textContent) + Number(table.rows[2].cells[2].textContent) + Number(table.rows[2].cells[3].textContent));
            $("#pocTotal").html(Number(table.rows[3].cells[1].textContent) + Number(table.rows[3].cells[2].textContent) + Number(table.rows[3].cells[3].textContent));
            $("#qspTotal").html(Number(table.rows[4].cells[1].textContent) + Number(table.rows[4].cells[2].textContent) + Number(table.rows[4].cells[3].textContent));
            $("#fireTotal").html(Number(table.rows[5].cells[1].textContent) + Number(table.rows[5].cells[2].textContent) + Number(table.rows[5].cells[3].textContent));
            $("#salesTotal").html(Number(table.rows[6].cells[1].textContent) + Number(table.rows[6].cells[2].textContent) + Number(table.rows[6].cells[3].textContent));

            $("#nextTotal").html(Number(table.rows[1].cells[1].textContent) + Number(table.rows[2].cells[1].textContent) + Number(table.rows[3].cells[1].textContent) + Number(table.rows[4].cells[1].textContent) + Number(table.rows[5].cells[1].textContent) + Number(table.rows[6].cells[1].textContent));
            $("#currentTotal").html(Number(table.rows[1].cells[2].textContent) + Number(table.rows[2].cells[2].textContent) + Number(table.rows[3].cells[2].textContent) + Number(table.rows[4].cells[2].textContent) + Number(table.rows[5].cells[2].textContent) + Number(table.rows[6].cells[2].textContent));
            // this row used to show old data in table, it is commented because database has no old data
            // $("#oldTotal").html(Number(table.rows[1].cells[3].textContent)+Number(table.rows[2].cells[3].textContent)+Number(table.rows[3].cells[3].textContent)+Number(table.rows[4].cells[3].textContent)+Number(table.rows[5].cells[3].textContent)+Number(table.rows[6].cells[3].textContent));
            $("#finalTotal").html(Number(table.rows[7].cells[1].textContent) + Number(table.rows[7].cells[2].textContent));

        },
        error: function(xhr, textStatus, errorThrown) {
            $("#clientEngagementDiv").html($("<h5> Error while getting engagement details </h5>"));
            $("#clientEngagementDivViewAll").hide();
        }
    });
});

/**
 * create table row and insert it in to table
 * @param {json} Entry
 * @param {Number} position
 * @param {Number} nextYear
 * @param {Number} currentYear
 */
function addToTable(currentYear,nextYear,Entry,postion) {
    var startdate=new Date(Entry.start_date);
    var startYear=startdate.getFullYear();
    var weeks;

    var enddate=new Date(Entry.end_date);
    var endYear=enddate.getFullYear();

    if(startYear===currentYear){
        if(endYear===currentYear){
            //if start date is in current year and end date is also in current year
            weeks=Math.ceil(Math.round((enddate.getTime()-startdate.getTime())/(1000*60*60*24))/7 );
            currentYearRow[postion]=currentYearRow[postion]+weeks;
        }
        else if(endYear===nextYear){
            //if start date is in current year and end date is in next year
            weeks=Math.ceil(Math.round(((new Date(startdate.getFullYear(), 11, 31)).getTime()-startdate.getTime())/(1000*60*60*24))/7 );
            currentYearRow[postion]=currentYearRow[postion]+weeks;

            weeks=Math.ceil(Math.round((enddate.getTime()-(new Date(enddate.getFullYear(), 0, 1)).getTime())/(1000*60*60*24))/7 );
            nextYearRow[postion]=nextYearRow[postion]+weeks;
        }
        else {
            //if start date is in current year and end date is a value that is in after next year
            weeks=Math.ceil(Math.round(((new Date(startdate.getFullYear(), 11, 31)).getTime()-startdate.getTime())/(1000*60*60*24))/7 );
            currentYearRow[postion]=currentYearRow[postion]+weeks;

            weeks=Math.ceil(Math.round(((new Date(nextYear, 11, 31)).getTime()-(new Date(nextYear, 0, 1)).getTime())/(1000*60*60*24))/7 );
            nextYearRow[postion]=nextYearRow[postion]+weeks;
        }
    }
    else if(startYear===nextYear){
        if(endYear===nextYear){
            //if start date is in next year and end date is also in next year
            weeks=Math.ceil(Math.round((enddate.getTime()-startdate.getTime())/(1000*60*60*24))/7 );
            nextYearRow[postion]=nextYearRow[postion]+weeks;
        }
        else {
            //if start date is in next year and end date is a value that is in after next year
            weeks=Math.ceil(Math.round(((new Date(startdate.getFullYear(), 11, 31)).getTime()-startdate.getTime())/(1000*60*60*24))/7 );
            nextYearRow[postion]=nextYearRow[postion]+weeks;
        }
    }
}
