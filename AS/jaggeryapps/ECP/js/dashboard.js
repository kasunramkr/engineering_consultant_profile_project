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
$(function() {
    // inline editor
    $.fn.editable.defaults.mode = 'inline';
    $('#commitership').editable({
        value: 2,
        showbuttons: false,
        source: [{
            value: 1,
            text: 'Yes'
        }, {
            value: 2,
            text: 'No'
        }, ]
    });
    $('#productCom').editable({
        row: 3,
        inputclass: "form-control",
    });
    $.fn.editableform.buttons = '' + '<button type="submit" class="btn btn-primary editable-submit"><span class="icon fw-stack"><i class="fw fw-check"></i></span></button>' + '<button type="button" class="btn editable-cancel"><span class="icon fw-stack"><i class="fw fw-cancel"></i></span></button>';
});