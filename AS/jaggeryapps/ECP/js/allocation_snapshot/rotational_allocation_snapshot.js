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
// When document is ready call getAllocationSnapshot() and getRotationalSnapshot()and draw the allocation and rotation snapshots dynamically within a given period
$(document).ready(function(e) {
    var workEmail = getCookie("MAIL_ID");
    //  period to display in each snapshot is 6 months
    var nofMonthsForPeriod = 6;
    // call date-manipulations.js -> getMonday() and set "currentWeekMonday" as the Monday of the current week
    var currentWeekMonday = getMonday(new Date());
    // pass date 6 months before the current week's Monday as {@param periodStartDate} and
    // pass current week's Monday as {@param periodEndDate} to get last 6 month rotational shapshot and  allocation snapshot
    getRotationalSnapshot(workEmail, getDateMonthsBefore(new Date(currentWeekMonday), nofMonthsForPeriod), currentWeekMonday, "lastRotational_snapshotWrap", "lastRotationPeriodPara");
    getAllocationSnapshot(workEmail, getDateMonthsBefore(new Date(currentWeekMonday), nofMonthsForPeriod), currentWeekMonday, "lastAllocation_snapshotWrap");
    // pass date 6 months after the current week's Monday as {@param periodEndDate} and
    // pass current week's Monday as {@param periodStartDate} to get next 6 month rotational shapshot and allocation snapshot
    getRotationalSnapshot(workEmail, currentWeekMonday, getDateMonthsAfter(new Date(currentWeekMonday), nofMonthsForPeriod), "nextRotational_snapshotWrap", "nextRotationPeriodPara");
    getAllocationSnapshot(workEmail, currentWeekMonday, getDateMonthsAfter(new Date(currentWeekMonday), nofMonthsForPeriod), "nextAllocation_snapshotWrap");
});
/**
 * get rotational data via ajax GET for the period passed by {@param periodStartDate} and {@param periodEndDate} and
 * draw the snapshot in respective HTML Div
 * @param {String} workEmail Email of the profile owner to get rotations for string
 * @param {Date} periodStartDate Start date of period to get rotational data for
 * @param {Date} periodEndDate End date of period  to get rotational data for
 * @param {String} wrapDivId Id of DOM element to draw snapshot
 * @param {String} datePeriodDivId Id of DOM element to show the rotational period 
 */
function getRotationalSnapshot(workEmail, periodStartDate, periodEndDate, wrapDivId, datePeriodDivId) {
    // period start date and end date are passed after converting in to string format of YYYY-MM-DD
    $.ajax({
        url: "jag/allocation_snapshot/rotational_allocation_snapshot.jag?action=getRotation",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail,
            "periodStartDate": convertInToDateString(periodStartDate),
            "periodEndDate": convertInToDateString(periodEndDate)
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            drawRotationalSnapshot(wrapDivId, datePeriodDivId, data, periodStartDate, periodEndDate);
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#" + wrapDivId).append($("<h5> Error while getting rotation details </h5>"));
        }
    });
}
/**
 * get allocation data via ajax GET for the period passed by {@param periodStartDate} and {@param periodEndDate} and
 * draw the snapshot in respective HTML Div
 * @param {String} workEmail Email of the profile owner to get allocations for string
 * @param {Date} periodStartDate Start date of period to get allocation data for
 * @param {Date} periodEndDate End date of period  to get allocation data for
 * @param {String} wrapDivId Id of DOM element to draw snapshot
 */
function getAllocationSnapshot(workEmail, periodStartDate, periodEndDate, wrapDivId) {
    // period start date and end date are passed after converting in to string format of YYYY-MM-DD
    $.ajax({
        url: "jag/allocation_snapshot/rotational_allocation_snapshot.jag?action=getAllocation",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": workEmail,
            "periodStartDate": convertInToDateString(periodStartDate),
            "periodEndDate": convertInToDateString(periodEndDate)
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            drawAllocationSnapshot(wrapDivId, data, periodStartDate, periodEndDate);
        },
        error: function(xhr, textStatus, errorThrown) {
            $("#" + wrapDivId).append($("<h5> Error while getting allocation details </h5>"));
        }
    });
}
/**
 * draw the Rotational snapshot in the HTML for the period passed with the data returned from ajax call
 * @param {String} wrapDivId Id of DOM element to draw snapshot
 * @param {String} datePeriodDivId Id of DOM element to show the rotational period
 * @param {String} data Data returned from response of ajax call
 * @param {Date} periodStartDate Start date of period to get rotational data for
 * @param {Date} periodEndDate End date of period  to get rotational data for
 */
function drawRotationalSnapshot(wrapDivId, datePeriodDivId, data, periodStartDate, periodEndDate) {
    var rotations;
    data = JSON.parse(data);
    // if the result set is not empty then draw the snapshot
    if (Object.keys(data.data.Entries).length != 0) {
        rotations = data.data.Entries.Rotation;
        // if start date of first rotation is less than the start date of 6 month period then replace the 
        // start date of first rotation with start date of the 6 month period 
        if (new Date(rotations[0].start_date) < periodStartDate) {
            rotations[0].start_date = convertInToDateString(periodStartDate);
        }
        // if end date of last rotation is greater than the periodEndDate then replace the end date of last rotation with periodEndDate
        if (new Date(rotations[rotations.length - 1].end_date) > periodEndDate) {
            rotations[rotations.length - 1].end_date = convertInToDateString(periodEndDate);
        }
        // set text content of last rotation period DOM element 
        $("#" + datePeriodDivId).text(rotations[0].start_date + " to " + rotations[rotations.length - 1].end_date);
        // for each rotation
        for (var i = 0; i < rotations.length; i++) {
            // get no of weeks of the rotation[i] by dividing the total time period by time period of one week
            // one week time  = 7 * 24 * 60 * 60 * 1000 (days*hours*minutes*seconds*milliseconds)
            var nofWeeks = Math.ceil(Math.abs((new Date(rotations[i].start_date).getTime() - new Date(rotations[i].end_date).getTime()) / (7 * 24 * 60 * 60 * 1000)));
            var date = new Date(rotations[i].start_date); // date to display above the week div
            // for each week                  
            for (var j = 0; j < nofWeeks; j++) {
                var divRotationWeek = $("<div class='week'> <div class='date'>" + date.getDate() + " " + getMonthAbbrv(date.getMonth()) + "</div><div data-toggle='tooltip' data-original-title='" + rotations[i].rotation_name + "' class='cat' style='background-color:" + rotations[i].rotation_color + ";'>" + rotations[i].rotation_name.substring(0, 4).toUpperCase() + "</div></div>");
                $("#" + wrapDivId).append(divRotationWeek);
                // increase date by 1 week and set to the Monday of that week
                date.setDate(date.getDate() + 7);
                date = getMonday(date);
            }
        }
        $('.cat').tooltip(); // recall the tooltip and change the contents
    } else {
        $("#" + wrapDivId).append($("<h5>No rotations assigned for the period</h5>"));
    }
}
/**
 * draw the Rotational snapshot in the HTML for the period passed with the data returned from ajax call
 * @param {String} wrapDivId Id of DOM element to draw snapshot
 * @param {String} data Data returned from response of ajax call
 * @param {Date} periodStartDate Start date of period to get allocation data for
 * @param {Date} periodEndDate End date of period  to get allocation data for
 */
function drawAllocationSnapshot(wrapDivId, data, periodStartDate, periodEndDate) {
    var allocations;
    data = JSON.parse(data);
    // if the result set is not empty then draw the snapshot
    if (Object.keys(data.data.Entries).length != 0) {
        allocations = data.data.Entries.Allocation;
        // if start date of first allocation is less than the start date of 6 month period then replace the 
        // start date of first allocation with start date of the 6 month period 
        if (new Date(allocations[0].start_date) < periodStartDate) {
            allocations[0].start_date = convertInToDateString(periodStartDate);
        }
        // if end date of last allocation is greater than the periodEndDate then replace the end date of last allocation with periodEndDate
        if (new Date(allocations[allocations.length - 1].end_date) > periodEndDate) {
            allocations[allocations.length - 1].end_date = convertInToDateString(periodEndDate);
        }
        // for each allocation
        for (var i = 0; i < allocations.length; i++) {
            // get no of weeks of the allocation[i] by dividing the total time period by time period of one week
            // one week time  = 7 * 24 * 60 * 60 * 1000 (days*hours*minutes*seconds*milliseconds)
            var nofWeeks = Math.ceil(Math.abs((new Date(allocations[i].start_date).getTime() - new Date(allocations[i].end_date).getTime()) / (7 * 24 * 60 * 60 * 1000)));
            var date = new Date(allocations[i].start_date); // date to display above the week div
            // for each week                  
            for (var j = 0; j < nofWeeks; j++) {
                var divAllocationWeek = "<div class='week'> <div data-toggle='tooltip' data-original-title='" + allocations[i].allocation_type + "' class='cat'  style='background-color:" + allocations[i].allocation_color + ";'>" + allocations[i].allocation_type.substring(0, 4).toUpperCase() + "</div> </div> ";
                $("#" + wrapDivId).append(divAllocationWeek);
                // increase date by 1 week and set to the Monday of that week
                date.setDate(date.getDate() + 7);
                date = getMonday(date);
            }
        }
        $('.cat').tooltip(); // recall the tooltip and change the contents
    } else {
        $("#" + wrapDivId).append($("<h5>No allocations assigned for the period</h5>"));
    }
}