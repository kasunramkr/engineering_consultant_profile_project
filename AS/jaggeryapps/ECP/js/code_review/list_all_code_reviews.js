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
    var workEmail = encodeURIComponent(getCookie("MAIL_ID"));
    var team = encodeURIComponent(getCookie("TEAM"));
    //alert("");
    $.ajax({
        url: "jag/code_review/codeReview.jag?action=getAllCodeReviews",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail,
            "team": team
        },
        timeout: 5000,
        cache: false,
        success: function(data) {
            var jsonData = JSON.parse(data);
            if (jsonData.data.Entries != null) {
                var entry = jsonData.data.Entries.Entry;
                var table = $('#reviews').DataTable({
                    //hide id coloum on table
                    "columnDefs": [{
                        targets: [4],
                        visible: false
                    }, {
                        // call "viewSingleCodeReview" function on a click in action coloum
                        targets: [3],
                        render: function(data, type, full, meta) {
                            return '<a id="new" onclick="viewSingleCodeReview(\'' + full[4] + '\')" ><i class="fw fw-view"></i>View</a>'
                        }
                    }],
                    // set Datatable default order to desc order of date(show last newest data first)
                    "order": [
                        [0, "desc"]
                    ]
                });
                for (var i = 0; i < entry.length; i++) {
                    var date = entry[i].date.split("/")
                    table.row.add([date[2] + "-" + date[1] + "-" + date[0], entry[i].team, entry[i].sender, 'V', entry[i].mailId]);
                }
                table.draw();
            } else {
                var table = $('#reviews').DataTable({
                    //hide id coloum on table
                    "columnDefs": [{
                        targets: [4],
                        visible: false
                    }]
                });
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#codeReviewListDiv").html($("<h5> Error while getting code review details </h5>"));
        }
    });
});
var viewSingleCodeReview = function(id) {
    window.location.href = "code_review_detail.jag?ID" + id + "END";
}