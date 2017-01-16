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
// When document is ready load all general details from PEOPLE_HR, google plus profile picture and commitership role from LDAP
$(document).ready(function(e) {
    //hide commitership select element in dashboard. New <p> element is added to show the read only commitership
    $("#commitership").hide();
    var workEmail = getCookie("MAIL_ID");
    $.ajax({
        url: "jag/general_details/general_details.jag?action=getPeopleHRDetails",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail
        },
        cache: false,
        async: false,
        success: function(data) {
            var jsonData = JSON.parse(data);
            var employee = jsonData.data.generalDetails.Employee[0];
            var fullName = employee.FirstName + " " + employee.LastName;
            var workEmail = employee.WorkEmail;
            var jobRole = employee.JobRole;
            var joined = employee.StartDate;
            var dept = employee.Department;
            var team = employee.Team;
            var empId = employee.EmployeeId;
            var country = getCountryCodeForWSO2Company(employee.Company);
            $("#empName").text(fullName);
            $("#empWorkEmail").text(workEmail);
            $("#empJobRole").text(jobRole);
            $("#empNameToolTip").attr("data-original-title", fullName);
            $("#empJoinedDate").text(joined);
            $("#empDepartment").text(dept);
            $("#empTeam").text(team);
            $("#empID").text(empId + "  ");
            $("#empWorkEmail").text(workEmail);
            // if country code is defined for the company display the flag with the employee id
            if (country != null) {
                $("#empID").append($("<img class='flag flag-" + country + "'/>"));
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#peopleHRGeneralDetails").html($("<h5> Error while getting people HR details </h5>"));
        }
    });
    $.ajax({
        url: "jag/general_details/general_details.jag?action=getCommitershipRole",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail
        },
        cache: false,
        success: function(data) {
            var commitership = $("<p class='form-control-static'></p>").text(data);
            $("#commitershipDiv").append(commitership);
            //append commitership <p> element with Yes or No 
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#commitershipDiv").html($("<h5> Error while getting commitership role </h5>"));
        }
    });
    $.ajax({
        url: "jag/general_details/general_details.jag?action=getProfilePic",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail
        },
        cache: false,
        success: function(data) {
            // by default the profile picture url comes with 64*64 size. We changed that into 200*200 by replacing the URL
            var photo = data.replace("/s64-c/", "/s200-c/");
            $("#profilePicImg").attr("src", photo);
            // set the profile icon with the same photo 34 * 34
           // $("#profile-icon").attr("src", photo);
           // $("#profile-icon").attr("height", 34);
           // $("#profile-icon").attr("width", 34);
        }
    });
});
/** Get lower cased country code for {@param company}
 * @param {String} company
 * @return {String} countryCode[@param company] Matching country code (in lower case) for the company if unmatched return null
 */
function getCountryCodeForWSO2Company(company) {
    var countryCode = {
        'WSO2 - BRAZIL': 'br',
        'WSO2 - CANADA': 'ca',
        'WSO2 - SRI LANKA': 'lk',
        'WSO2 - US': 'us',
        'WSO2 - UK': 'uk',
        'WSO2 - SPAIN': 'es',
    }
    if (countryCode.hasOwnProperty(company)) {
        return countryCode[company];
    } else {
        return null;
    }
}
