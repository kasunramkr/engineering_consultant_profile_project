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
    displayLeaveChartStatus();
    $("#leave_year").change(function(e) {
        displayLeaveChartStatus();
    });
});
var displayLeaveChartStatus = function() {
    $.ajax({
        url: "jag/leave_summary/getVacationLeave.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: {
            "selected_year": $('#leave_year').val()
        },
        success: function(data) {
            var jsonData = JSON.parse(data);
            var obj = {};
            obj["metadata"] = {
                "names": ["leaveType", "count"],
                "types": ["ordinal", "linear"]
            };
            obj["data"] = [
                ["Sick", parseInt(jsonData.data.LeaveSummary.Sick)],
                ["Other", parseInt(jsonData.data.LeaveSummary.Other)]
            ];
            var data = JSON.stringify([obj]);
            var width = document.getElementById("dChartPie").offsetWidth * (60 / 100);
            var height = document.getElementById("dChartPie").offsetHeight * (60 / 100);
            var configPie = {
                charts: [{
                    type: "arc",
                    x: "count",
                    color: "leaveType",
                    mode: "pie"
                }],
                width: width,
                height: 125
            };
            var pieChart = new vizg(JSON.parse(data), configPie);
            pieChart.draw("#dChartPie");
            if (jsonData.data.LeaveSummary.LastLeaveStart != "") {
                document.getElementById("lastLeave").innerHTML = jsonData.data.LeaveSummary.LastLeaveStart + " - " + jsonData.data.LeaveSummary.LastLeaveEnd;
                document.getElementById("noLastleaves").innerHTML = " (" + jsonData.data.LeaveSummary.NofLastLeaves + " days)";
            }
        }
    });
};