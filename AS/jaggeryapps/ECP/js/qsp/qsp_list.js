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
        url: "jag/qsp/qsp_list.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        success: function(data) {
            var jsonData = JSON.parse(data);
            var table = $('#qsp').DataTable({
                "columnDefs": [{
                    targets: [3],
                    render: function(data, type, full, meta) {
                        return '<a id="new" href="" onclick="viewSingleQSP(\'' + full[1] + ',' + full[0] + ',' + full[2] + ',Ishan Jayawardena\')" ><i class="fw fw-view"></i>View</a>'
                    }
                }]
            });
            for (i = 0; i < (jsonData.data.qsp_list.length) - 2; i++) {
                table.row.add([jsonData.data.qsp_list[i + 2].qsp.period, jsonData.data.qsp_list[i + 2].qsp.role, jsonData.data.qsp_list[i + 2].qsp.client, 'V']);
            }
            table.draw();
        }
    });
});
var viewSingleQSP = function(indata) {
    window.location.href = "qsp_detail.jag?" + indata;
}