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
 * return country name for a given country (if country code is not in isoCountries object return countryCode)
 * @param {String} office
 * @returns {json} json
 */
function getLocation(office) {
    var address = {
        'Palm Grove': {
            'lat': 6.909831,
            'lng': 79.852463
        },
        'Trace': {
            'lat': 6.930264,
            'lng': 79.861722
        },
        'Jaffna': {
            'lat': 9.668051,
            'lng': 80.015628
        },
        'US_MV': {
            'lat': 37.387382,
            'lng': -122.082455
        },
        'US MV': {
            'lat': 37.387382,
            'lng': -122.082455
        },
        'UK': {
            'lat': 51.480435,
            'lng': -0.109580
        },
        'default': {
            'lat': 0,
            'lng': 0
        }
    };
    if (address.hasOwnProperty(office)) {
        return address[office];
    } else {
        return address["default"];
    }
}