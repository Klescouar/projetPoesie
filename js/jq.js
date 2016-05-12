
$(document).ready(function() {
    $('#searchButton').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#result").offset().top - 30
        }, 500);
    });
});
