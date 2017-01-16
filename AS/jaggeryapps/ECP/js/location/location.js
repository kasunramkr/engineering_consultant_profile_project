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
    var email=getCookie("MAIL_ID");
    $.ajax({
        url: "jag/location/location.jag",
        contentType: 'application/x-www-form-urlencoded',
        type: 'GET',
        data: {
            "workEmail": email
        },
        cache: false,
        timeout: 5000,
        success: function(data) {
            var jsonData = JSON.parse(data);
            var entry = jsonData.Entry;
            //check reult is empty
            if (!jQuery.isEmptyObject(entry)) {
                //if acctstoptime not null person has "Last Seen Location"
                if (entry.acctstoptime != null) {
                    var accessDate=entry.acctstoptime.split("T")[0];
                    var accessTime=entry.acctstoptime.split("T")[1].split(".")[0];
                    var dateTime = accessDate + " at " + accessTime;
                    $("#currentLocationString").text("Last Seen Location is " + entry.office + ", " + entry.floor + ", " + entry.area + " on " + dateTime);
                } else {
                    //if acctstoptime null person is online therefore he has "Current Location"
                    $("#currentLocationString").text("Current Location is " + entry.office + ", " + entry.floor + ", " + entry.area);
                }
                var location = getLocation(entry.office)
                var uluru = {
                    lat: location.lat,
                    lng: location.lng
                };
                //set google map position
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: uluru
                });
                //set marker position
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }
        },
        error: function(xhr, textStatus, errorThrown) {
             $("#locationDiv").html($("<h5> Current Location<br/><br/><br/> Error while getting current location </h5>"));
        }
    });
});
