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
$(document).ready(function(e) {
    // no of years to display code reviews for
    var nofYears = 3;
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i > currentYear - nofYears; i--) {
        $('#yearForCodeReviews').append($('<option />').val(i).html(i));
    }
});

function drowBarChart(year) {
    var workEmail = encodeURIComponent(getCookie("MAIL_ID"));
    document.cookie = "TEAM=" + $("#empTeam").text();
    var team = encodeURIComponent($("#empTeam").text());
    $.ajax({
        url: "jag/code_review/codeReview.jag?action=getCodeReviewStats",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "year": year,
            "workEmail": workEmail,
            "team": team
        },
        timeout: 5000,
        success: function(data) {
            var jsonData = JSON.parse(data);
            var obj = {};
            var entry = jsonData.data;
            obj["metadata"] = {
                "names": ["Number Of Reviews", "Quarter", "countType"],
                "types": ["linear", "ordinal", "ordinal"]
            };
            obj["data"] = [
                [Number(entry.teamQ1) + Number(entry.personalExceptionQ1), "Q1", "Team"],
                [Number(entry.personalNormalQ1) + Number(entry.personalExceptionQ1), "Q1", "Personal"],
                [Number(entry.teamQ2) + Number(entry.personalExceptionQ2), "Q2", "Team"],
                [Number(entry.personalNormalQ2) + Number(entry.personalExceptionQ2), "Q2", "Personal"],
                [Number(entry.teamQ3) + Number(entry.personalExceptionQ3), "Q3", "Team"],
                [Number(entry.personalNormalQ3) + Number(entry.personalExceptionQ3), "Q3", "Personal"],
                [Number(entry.teamQ4) + Number(entry.personalExceptionQ4), "Q4", "Team"],
                [Number(entry.personalNormalQ4) + Number(entry.personalExceptionQ4), "Q4", "Personal"],
            ];
            var data = JSON.stringify([obj]);
            var width = document.getElementById("dChart").offsetWidth;
            var config = {
                type: "bar",
                x: "Quarter",
                charts: [{
                    type: "bar",
                    y: "Number Of Reviews",
                    color: "countType",
                    mode: "group"
                }],
                maxLength: 8,
                width: width,
                height: 160
            };
            var barChart = new vizg(JSON.parse(data), config);
            barChart.draw("#dChart");
        },
        error: function(xhr, textStatus, errorThrown) {
            var div = document.getElementById("codeReview");
            div.innerHTML = "<h5>Error while getting code review details</h5>";
            $("#codeReviewViewAll").hide();
        }
    });
}
$(function() {
    //drow intial chart
    drowBarChart(document.getElementById("yearForCodeReviews").value);
    //when change happen on drop down recall "drowBarChart" function
    $('#yearForCodeReviews').on('change', function() {
        var year = this.value;
        drowBarChart(year);
    });
});