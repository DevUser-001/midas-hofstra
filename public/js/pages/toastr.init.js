!function (p) {
    "use strict";
    function t() {}t.prototype.send = function (t, i, o, e, n, a, s, r) {
        var c = {
            heading: t,
            text: i,
            position: o,
            loaderBg: e,
            icon: n,
            hideAfter: a = a || 3e3,
            stack: s = s || 1
        };
        r && (c.showHideTransition = r),
        console.log(c),
        p.toast().reset("all"),
        p.toast(c)
    },
    p.NotificationApp = new t,
    p.NotificationApp.Constructor = t
}(window.jQuery),
function (i) {
    "use strict";
    i("#toastr-succcess").on("click", function (t) {
        i.NotificationApp.send("Well Done!", "You successfully read this important alert message", "top-right", "#5ba035", "success")
    }),
    i("#toastr-four").on("click", function (t) {
        i.NotificationApp.send("Oh snap!", "Change a few things up and try submitting again.", "top-right", "#bf441d", "error")
    })
}(window.jQuery);
