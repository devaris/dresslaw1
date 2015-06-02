$(function() {
    $("#menu_open").click(function() {
        $("#mobile_menu").show().animate({right: "0"}, 500);
    });
    $("#menu_close").click(function() {
        $("#mobile_menu").animate({right: "-400px"}, 500, function() {
            $(this).hide();
        });
    });

    $(".mobile_header_nav ul li a").each(function() {
        var a = $(this);
        a.html(lang[a.attr("class")]);

        var circle = $(this).parent();
        if (window.parent.solvedTests.indexOf(a.attr("class")) > -1)
            circle.addClass("passed");
    });

    $("#mobile_menu_footer nav ul li a").each(function() {
        var a = $(this);
        a.html(lang[a.attr("class")]);

    });

    $(".mobile_header_nav ul li a").click(function(e) {
        if ($(this).parent().hasClass('passed'))
        {
            e.preventDefault();
        }
        else
        {
            var anchor = $(this);
            parent.goToPage('pages/test_start.html?test=' + anchor.html() + "&num_of_questions=" + anchor.attr("id") + "&file=" + anchor.attr("class"), true);
        }

    });
    
});

function getUrlVar(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    var res = result && result[1] || "";
    return decodeURIComponent(res);
}