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
/**
 * get the date of Monday of that week for a given {@param date} 
 * @param {Date} date
 * @returns {Date} Monday of the given date's week
 */
function getMonday(date) {
    var day = date.getDay();
    // get the date difference and adjust whenever the day is sunday
    var diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
/**
 * get the abbrevation for month for a given {@param date}
 * @param {Date} date
 * @returns {String} month name abbrevation
 */
function getMonthAbbrv(monthIndex) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return monthNames[monthIndex];
}
/**
 * convert the given date string in the format of YYYY/MM/DD in to a Date object
 * @param {String} dateString in the format of YYYY/MM/DD
 * @returns {Date} 
 */
function convertInToDateObject(dateString) {
    var dateParts = dateString.split("/");
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // month is 0-based
}
/**
 * convert the date object in to a date string in the format of YYYY-MM-DD 
 * @param {Date} date
 * @returns {String} date string
 */
function convertInToDateString(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day; // YYYY-MM-DD
}
/**
 * get the date before nofMonths for a given {@param date} 
 * @param {Date} date 
 * @param {Number} nofMonths no of months to get date before
 * @returns {Date} date before nofMonths months
 */
function getDateMonthsBefore(date,nofMonths) {
    var thisMonth = date.getMonth();
    // set the month index of the date by subtracting nofMonths from the current month index
    date.setMonth(thisMonth - nofMonths);
    // When trying to add or subtract months from a Javascript Date() Object which is any end date of a month,  
    // JS automatically advances your Date object to next month's first date if the resulting date does not exist in its month. 
    // For example when you add 1 month to October 31, 2008 , it gives Dec 1, 2008 since November 31, 2008 does not exist.
    // if the result of subtraction is negative and add 6 to the index and check if JS has auto advanced the date, 
    // then set the date again to last day of previous month
    // Else check if the result of subtraction is non negative, subtract nofMonths to the index and check the same.
    if ((thisMonth - nofMonths < 0) && (date.getMonth() != (thisMonth + nofMonths))) {
        date.setDate(0);
    } else if ((thisMonth - nofMonths >= 0) && (date.getMonth() != thisMonth - nofMonths)) {
        date.setDate(0);
    }
    return date;
}
/**
 * get the date after nofMonths for a given {@param date} 
 * @param {Date} date 
 * @param {Number} nofMonths no of months to get date after
 * @returns {Date} date after nofMonths 
 */
function getDateMonthsAfter(date,nofMonths) {
    var thisMonth = date.getMonth();
    // set the month index of the date by adding nofMonths to the current month index
    date.setMonth(thisMonth + nofMonths);
    // if the result of addition is greater than 11 and subtract nofMonths from the index and check if JS has auto advanced the date, 
    // then set the date again to last day of previous month
    // Else check if the result of addition is not greater than 11, add nofMonths to the index and check the same.
    if ((thisMonth + nofMonths > 11) && (date.getMonth() != (thisMonth - nofMonths))) {
        date.setDate(0);
    } else if ((thisMonth + nofMonths <= 11) && (date.getMonth() != (thisMonth + nofMonths))) {
        date.setDate(0);
    }
    return date;
}
