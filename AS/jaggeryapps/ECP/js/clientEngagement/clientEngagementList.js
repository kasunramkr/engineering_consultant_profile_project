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
        url: "jag/clientEngagement/clientEngagements.jag?action=getClientEngagements",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": getCookie("MAIL_ID")
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            var table = $('#clinetEngagements').DataTable();
            var jsonData = JSON.parse(data);
            for (var i = 0; i < jsonData.Entries.Entry.length; i++) {
                var s_date = new Date(jsonData.Entries.Entry[i].start_date);
                var start_date = s_date.toLocaleDateString();
                var e_date = new Date(jsonData.Entries.Entry[i].end_date);
                var end_date = e_date.toLocaleDateString();
                var timeDiff = Math.abs(e_date.getTime() - s_date.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                // add a row with table data
                table.row.add([start_date, end_date, jsonData.Entries.Entry[i].allocation_type, diffDays, jsonData.Entries.Entry[i].location.replace(/<(?:.|\n)*?>/gm, ''), "", jsonData.Entries.Entry[i].customer_name, jsonData.Entries.Entry[i].clearance_status]);
            }
            table.draw();
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#clinetEngagements_wrapper").html($("<h5> Error while getting engagement details </h5>"));
        }
    });
});
$(function() {
    $('#clinetEngagements').DataTable({
        // set Data table default order to desc order of date(show last newest data first)
        "order": [
            [0, "desc"]
        ]
    });
});