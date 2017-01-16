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
$(window).ready(function() {
    $.ajax({
        url: "jag/support_feedback/support_feadback_list.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "mailId": getCookie("MAIL_ID")
        },
        success: function(data) {
            var jsonData = JSON.parse(data);
            //Feedback list
            var table = $('#supportFeedback').DataTable({
                "columnDefs": [{
                    targets: [1],
                    visible: false
                }, {
                    targets: [4],
                    render: function(data, type, full, meta) {
                        return '<a id="new" onclick="viewSingleCodeReview(\'' + full[4] + '\')" ><i class="fw fw-view"></i>View</a>'
                    }
                }],
                "order": [
                    [0, "desc"]
                ]
            });
            for (i = 0; i < jsonData.data.FeedBacks.FeedBack.length; i++) {
                table.row.add([jsonData.data.FeedBacks.FeedBack[i].year_week.substring(0, 4) + " - " + jsonData.data.FeedBacks.FeedBack[i].year_week.substring(4, 6), jsonData.data.FeedBacks.FeedBack[i].id, jsonData.data.FeedBacks.FeedBack[i].lead_rating, '', '']);
            }
            table.draw();
            //line chart
            var obj = {};
            obj["metadata"] = {
                "names": ["Week", "Points", "horsepower", "EngineType"],
                "types": ["linear", "linear", "ordinal", "ordinal"]
            };
            obj["data"] = [
                [1, 1, 1, "Piston"],
                [2, 4, 1, "Piston"],
                [3, 2, 1, "Piston"]
            ];
            var data = JSON.stringify([obj]);
            var config = {
                x: "Week",
                charts: [{
                    type: "line",
                    range: "true",
                    y: "Points",
                    color: "EngineType"
                }],
                maxLength: 50,
                width: 500,
                height: 200
            };
            var barChart = new vizg(JSON.parse(data), config);
            barChart.draw("#lineChart");
        }
    });
});