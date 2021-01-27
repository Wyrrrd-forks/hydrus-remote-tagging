var current = location.href.split('/')[4].replace(/\?.*$/, '');
var next = parseInt(current) + 1
var prev = parseInt(current) - 1
var thres = 150
// Keybinds
if ($('h1').hasClass('nm-text')) {
    window.location = next
} else {
    $("a#a-d-button").click(function() {
        var hAction = this.getAttribute("value");
        $.post(current, { action: hAction }, function() {
            window.location = next
        });
    });
    if ((localStorage.getItem('keybinds') == "true") || (localStorage.getItem('keybinds') == null)) {
        $(document).keydown(function(e) {
            switch (e.which) {
                case 65: // a
                    $.post(current, { action: "archive" }, function() {
                        window.location = next
                    });
                    break;

                case 68: // d
                    $.post(current, { action: "delete" }, function() {
                        window.location = next
                    });
                    break;

                case 83: // s
                    window.location = next
                    break;

                case 90: // z
                    window.location = prev
                    break;

                default:
                    return;
            }
            e.preventDefault();
        });
    }
}
// Swiping
if ((localStorage.getItem('swiping') == "true") || (localStorage.getItem('swiping') == null)) {
    $(function() {
        $("main").swipe({
            swipeStatus: function(event, phase, direction, distance, duration) {
                if (direction == 'right') {
                    $(this).css("transform", "translate("+distance+"px,0)");
                    if (distance >= thres) {
                            $('body').css("background", "#20ffc9")
                        if (phase == "end") {
    	                    $.post(current, { action: "archive" }, function() {
    	                        window.location = next
    	                    });
                        }
                	}
                } else if (direction == 'left') {
                    $(this).css("transform", "translate(-"+distance+"px,0)");
                    if (distance >= thres) {
                        $('body').css("background", "#ff2056")
                        if (phase == "end") {
    	                    $.post(current, { action: "delete" }, function() {
    	                        window.location = next
    	                    });
                        }
                	}
                } else if (direction == 'up') {
                    $(this).css("transform", "translate(0,-"+distance+"px)");
                    if (distance >= thres) {
                        $('body').css("background", "#20c6ff")
                        if (phase == "end") {
                    	   window.location = next
                        }
                    }
                }
                if ((phase == "cancel") && (distance < thres)) {
                    $(this).css("transform", "translate(0,0)");
                }
                if ((distance < thres) && ($('body').css("backgroundColor") != "rgb(25, 25, 27)")) {
                    $('body').css("backgroundColor", "#19191b")
                }
            },
            fingers: 1,
            threshold: thres,
            cancelThreshold: 20,
            allowPageScroll: true
        });
    });
}