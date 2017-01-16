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
    var mailId = parent.window.location.href.split("ID")[1].split("END")[0];
    $.ajax({
        url: "jag/code_review/codeReview.jag?action=getCodeReviewDetails",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "mailId": mailId
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            var jsonData = JSON.parse(data);
            var entry=jsonData.data.Entries.Entry;
            $("#date").text(entry.date);
            $("#team").text(entry.team);
            $("#sender").text(entry.sender);
            $("#participants").text(entry.participants);
            $("#title").text(entry.title);
            $("#notes").text(entry.notes);
        },
        error: function(xhr, textStatus, errorThrown){
            $("#codeReviewDetailsDiv").html($("<h5> Error while getting code review details </h5>"));
            $("#codeReviewViewAll").hide();
        }
    });
});