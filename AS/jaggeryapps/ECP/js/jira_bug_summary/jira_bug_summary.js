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
/*
 * When document is ready getJiraAssignReportBugSummary and getJiraResolvedBugSummary
 * methods are called and ajax POST request are send to relevent jag files.
 * Based on the response getting each chart is drawn using VizGrammar charting lib inside each success function
 */
$(document).ready(function(e) {
    //profile owner email
    var workEmail = getCookie("MAIL_ID");
    //no of months to display jira recently reported  bug summary for
    var nofMonthsToDisplay = 3;
    //array of bug statuses to display jira bug summary for
    var bugStatuses = ["Assigned", "Open", "In Progress", "Reported"];
    getJiraAssignReportBugSummary(bugStatuses, workEmail);
    getJiraResolvedBugSummary(nofMonthsToDisplay, workEmail);
});
/*
 * Do an ajax POST call and get bug summary response for each bug status in an array.
 * If success, create bar chart meta-data and data objects and draw each chart. If not, indicate the occurence of an error in the html.
 * @param {String[]} bugStatuses  The defined bug statues to get jira bug count for
 * @param {String} workEmail Email address of the profile owner to get jira bug summary for
 */
function getJiraAssignReportBugSummary(bugStatuses, workEmail) {
    // ajax POST call to get bug Summary. workEmail is URI encoded before sending.
    // @param {bugStatuses[]} is coverted to string before sending.
    $.ajax({
        url: "jag/jira_bug_summary/jiraBugSummary.jag?action=getJiraAssignReportBugSummary",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": encodeURIComponent(workEmail),
            "bugStatuses": JSON.stringify(bugStatuses)
        },
        cache: false,
        success: function(data) {
            // get the bugSummary array from the json response.
            // The response is in the format of " {"data" : {"wrapper" : {"bugSummary" : [{"bugStatus" : "", "bugCount" : ""},]}}, "xhr" : {}} "
            var bugSummary = JSON.parse(data).data.wrapper.bugSummary;
            var dataObjects = [];
            //for each defined bug status
            for (var i = 0; i < bugStatuses.length; i++) {
                //find and get the object from bugSummary array where bug status of the object is same as the bugStatus of bugStatuses[i]
                var summary = $.grep(bugSummary, function(e) {
                    return e.bugStatus === bugStatuses[i];
                });
                //push the status and its bug count as a object to dataObjects array. summary[0] is the first result of previous grep.
                dataObjects.push([bugStatuses[i], parseInt(summary[0].bugCount)]);
            }
            //call the function to draw the bar chart
            drawBarChart("jChart", "Type", "BugCount", dataObjects);
            $("#jiraAssignedURL").attr("href", "https://wso2.org/jira/issues/?jql=issuetype = Bug AND assignee in ('" + encodeURIComponent(workEmail) + "') ORDER BY priority DESC, updated DESC");
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#jChart").append($("<h5> Error while getting Jira bug summary </h5>"));
        }
    });
}
/*
 * Construct an array of start dates of recent months.Do an ajax POST call and get resolved bug summary response for a no of recent months.
 * If success, create bar chart meta-data and data objects and draw each chart. If not, indicate the occurence of an error in the html.
 * @param {Number} nofMonthsToDisplay  The defined no of recent months to display jira bug count for
 * @param {String} workEmail Email address of the profile owner to get jira bug summary for
 */
function getJiraResolvedBugSummary(nofMonthsToDisplay, workEmail) {
    var monthStartDateArray = [];
    var today = new Date();
    // for each month to display
    for (var i = 0; i < nofMonthsToDisplay; i++) {
        //add beginning date of each month to start of month array
        monthStartDateArray.unshift(convertInToDateString(new Date(today.getFullYear(), today.getMonth() - i, 1)));
    }
    // ajax POST call to get resolved bug Summary. workEmail is URI encoded before sending.
    // monthStartDateArray[] is coverted to string before sending.
    $.ajax({
        url: "jag/jira_bug_summary/jiraBugSummary.jag?action=getJiraResolvedBugSummary",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": encodeURIComponent(workEmail),
            "months": JSON.stringify(monthStartDateArray)
        },
        cache: false,
        // get the bugSummary array from the json response.
        // The response is in the format of " {"data" : {"wrapper" : {"monthlyBugSummary" : [{"monthIndex" : "", "bugCount" : ""},]}}, "xhr" : {}} "
        success: function(data) {
            var monthlyBugSummary = JSON.parse(data).data.wrapper.monthlyBugSummary;
            var dataObjects = [];
            //sort monthlyBugSummary array in the asec order of month Index
            monthlyBugSummary.sort(function(a, b) {
                return parseInt(a.monthIndex) - parseInt(b.monthIndex);
            });
            //for each monthly bug summary
            for (var i = 0; i < monthlyBugSummary.length; i++) {
                dataObjects.push([getMonthAbbrv(parseInt(monthlyBugSummary[i].monthIndex)), parseInt(monthlyBugSummary[i].bugCount)]);
            }
            //call the function to draw the bar chart
            drawBarChart("resolvedBug_jChart", "Month", "BugCount", dataObjects);
            $("#jiraResolvedURL").attr("href", "https://wso2.org/jira/issues/?jql=issuetype = Bug AND status = Resolved AND  assignee in ('" + encodeURIComponent(workEmail) + "') ORDER BY priority DESC, updated DESC");
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#resolvedBug_jChart").append($("<h5> Error while getting Jira bug summary </h5>"));
        }
    });
}
/*
 * Draw the vizGrammar bar chart according to the @param
 * @param {String} divId HTML DOM id of the div of the chart
 * @param {String} x The name of X axis of the chart
 * @param {String} y The name of Y axis of the chart
 * @param {String,Number[][,]} dataObjects Data section of arrays of data rows of the chart's data table.
 */
function drawBarChart(divId, x, y, dataObjects) {
    var obj = {};
    var chartData;
    var config;
    // array consists of column names/fields of the  data table
    obj["metadata"] = {
        "names": [x, y],
        "types": ["ordinal", "linear"]
    };
    // array of data roes of the data table
    obj["data"] = dataObjects;
    // construct array of metadata and data objects
    chartData = JSON.stringify([obj]);
    // add additional configuration parameters to the gadget using config object
    config = {
            type: "bar",
            x: x,
            highlight: "multi",
            selectionColor: "#33ccff",
            charts: [{
                type: "bar",
                y: y
            }],
            maxLength: 6,
            width: document.getElementById(divId).offsetWidth * (115 / 100),
            height: 180
        }
        // VizGrammar accepts the id attribute of a div element  where chart will be renedered on formatted as "#divId"
    new vizg(JSON.parse(chartData), config).draw("#" + divId);
}