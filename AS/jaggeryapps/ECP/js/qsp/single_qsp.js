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
    var indata = parent.window.location.href.split("?")[1].split(",");
    var role = encodeURIComponent(decodeURIComponent(indata[0]));
    var period = encodeURIComponent(decodeURIComponent(indata[1]));
    var client = encodeURIComponent(decodeURIComponent(indata[2]));
    var name = encodeURIComponent(decodeURIComponent(indata[3]));
    $.ajax({
        url: "jag/qsp/single_qsp.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: {
            "role": role,
            "period": period,
            "client": client,
            "name": name
        },
        success: function(data) {
            var jsonData = JSON.parse(data);
            $("#period").text(jsonData.data.qsp_details.timePeriod);
            $("#client").text(jsonData.data.qsp_details.client);
            $("#role").text(jsonData.data.qsp_details.role);
            $("#lead").text(jsonData.data.qsp_details.lead);
            $("#member").text(jsonData.data.qsp_details.member);
            $("#sampleq").text(jsonData.data.qsp_details.sampleQuestion);
            var x = document.getElementById("select");
            for (i = 0; i < jsonData.data.qsp_details.feedbacks.length; i++) {
                var option = document.createElement("option");
                option.text = jsonData.data.qsp_details.feedbacks[i].feedback.feedbackby;
                option.value = i;
                x.add(option);
            }
            SetQspDetails($('#select').val(), jsonData);
            $('#select').change(function() {
                SetQspDetails(this.value, jsonData);
            });
        }
    });
});

function SetQspDetails(id, jsonData) {
    var dataList = document.getElementById('recommendations').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.recommendations[i];
    }
    var dataList = document.getElementById('communication').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.communication[i];
    }
    var dataList = document.getElementById('teamw').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.teamWork[i];
    }
    var dataList = document.getElementById('workIndependently').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.abilityToworkIndependently[i];
    }
    var dataList = document.getElementById('techSkils').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.techSkillsOnQSPNeeds[i];
    }
    var dataList = document.getElementById('capabilityToDesignSolutions').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.capabilityToDesignSolutions[i];
    }
    var dataList = document.getElementById('customerManagement').getElementsByTagName("p");
    for (i = 0; i < dataList.length; i++) {
        dataList[i].innerHTML = jsonData.data.qsp_details.feedbacks[id].feedback.customerManagement[i];
    }
}