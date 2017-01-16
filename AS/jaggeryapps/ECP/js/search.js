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
//The following is a sample data consisting name and email addresses
//var MAIL_ID="";
var engData = [];
$(document).ready(function(e) {
    $.ajax({
        url: "jag/engineer.jag?action=getAllEngineeringMembers",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {},
        cache: false,
        success: function(response) {
            engData = JSON.parse(response).data.employees.employee;
            $.fn.select2.amd.require(['select2/selection/search'], function(Search) {
                $(".engineers").select2({
                    data: engData,
                    multiple: false,
                    allowClear: false,
                    templateResult: memberResult,
                    placeholder: 'Search name or e-mail address',
                    escapeMarkup: function(m) {
                        return m;
                    },
                })
            });
        },
        error: function(xhr, textStatus, errorThrown) {}
    });
});

//Custom function for select 2 templating
function memberResult(result) {
    if (result.loading != undefined && result.loading) {
        return result.text;
    }
    var fname = '';
    var lname = '';
    if (result.fname != undefined && result.lname != undefined) {
        fname = result.fname;
        lname = result.lname;
    }
    return '<div class="result-container"><div class="pull-left engineer-detail"><h4>' + result.text + '</h4><p>' + fname + " " + lname + '</p></div><div class="clearfix"></div></div>'
}

function SearchForEng() {
    if($( "#engineers" ).val()!="") {
        document.cookie = "MAIL_ID=" + $("#engineers").val();
        var full_name="";
        for(var i = 0; i < engData.length; i++)
        {
            if(engData[i].id == $("#engineers").val())
            {
                full_name=engData[i].fname+" "+engData[i].lname;
                break;
            }
        }
        document.cookie = "FULL_NAME=" + full_name;
        window.location.replace("dashboard.jag");
    }
    else {
        window.location.replace("index.jag");
    }
    return false;
}
