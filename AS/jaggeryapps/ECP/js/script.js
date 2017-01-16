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
    // table on hover
    $('.popper').popover({
        container: 'body',
        html: true,
        trigger: 'hover',
        content: function() {
            return $(this).next('.popper-content').html();
        }
    });
    // Equal height for 4colmuns 
    var maxHeight = 0;
    $(".divEq").each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    $(".divEq").height(maxHeight);
});
// notes editor 
$('#enableEdit').on('click', function(e) {
    e.preventDefault();
    $('#saveEdit').show();
    $('#cancelEdit').show();
    $(this).hide();
    initEditor();
});
$('#saveEdit').on('click', function(e) {
    e.preventDefault();
    $('#enableEdit').show();
    $('#cancelEdit').hide();
    $(this).hide();
    tinymce.remove("#fr1");
});
$('#enableEdit2').on('click', function(e) {
    e.preventDefault();
    $('#saveEdit2').show();
    $('#cancelEdit2').show();
    $(this).hide();
    initEditor2();
});
$('#saveEdit2').on('click', function(e) {
    e.preventDefault();
    $('#enableEdit2').show();
    $('#cancelEdit2').hide();
    $(this).hide();
    tinymce.remove("#fr2");
});
$('#cancelEdit').on('click', function(e) {
    e.preventDefault();
    $('#enableEdit').show();
    $('#cancelEdit').hide();
    $('#saveEdit').hide();
    $(this).hide();
    tinymce.remove("#fr1");
});
$('#cancelEdit2').on('click', function(e) {
    e.preventDefault();
    $('#enableEdit2').show();
    $('#cancelEdit2').hide();
    $('#saveEdit2').hide();
    $(this).hide();
    tinymce.remove("#fr2");
});

function initEditor() {
    tinymce.init({
        selector: "#fr1",
        plugins: ["advlist autolink link lists charmap print preview hr anchor ", "save table template paste textcolor"],
        toolbar: 'styleselect | bold italic | bullist numlist link ',
        content_css: "css/editor.css",
        skin: "charcoal",
        inline: true,
        menubar: false,
        min_height: 300,
        min_width: 320,
        fixed_toolbar_container: "#actionBar",
        autofocus: true,
        init_instance_callback: function() {
            tinymce.activeEditor.focus();
        },
    });
}

function initEditor2() {
    tinymce.init({
        selector: "#fr2",
        plugins: ["advlist autolink link lists charmap print preview hr anchor ", "save table template paste textcolor"],
        toolbar: 'styleselect | bold italic | bullist numlist link ',
        content_css: "css/editor.css",
        skin: "charcoal",
        inline: true,
        menubar: false,
        min_height: 300,
        min_width: 320,
        fixed_toolbar_container: "#actionBar2",
        autofocus: true,
        init_instance_callback: function() {
            tinymce.activeEditor.focus();
        },
    });
}

function updateSidebarOptions() {
    $(".btn-notes a").removeClass('active').attr('aria-expanded', 'false');
}