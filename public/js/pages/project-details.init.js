!function (l) {
    "use strict";
    function t() {
        this.$body = l("body"),
        this.charts = []
    }
    t.prototype.respChart = function (a, e, r, o) {
        var s = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function () {
            s.apply(this, arguments);
            var t = this.chart.chart.ctx,
                a = t.stroke;
            t.stroke = function () {
                t.save(),
                t.shadowColor = "rgba(0,0,0,0.01)",
                t.shadowBlur = 20,
                t.shadowOffsetX = 0,
                t.shadowOffsetY = 5,
                a.apply(this, arguments),
                t.restore()
            }
        },
        Chart.defaults.global.defaultFontColor = "#8391a2",
        Chart.defaults.scale.gridLines.color = "#8391a2";
        var n = a.get(0).getContext("2d"),
            i = l(a).parent();
        return function () {
            var t;
            switch (a.attr("width", l(i).width()), e) {
                case "Line": t = new Chart(n, {
                        type: "line",
                        data: r,
                        options: o
                    });
                    break;
                case "Doughnut": t = new Chart(n, {
                        type: "doughnut",
                        data: r,
                        options: o
                    });
                    break;
                case "Pie": t = new Chart(n, {
                        type: "pie",
                        data: r,
                        options: o
                    });
                    break;
                case "Bar": t = new Chart(n, {
                        type: "bar",
                        data: r,
                        options: o
                    });
                    break;
                case "Radar": t = new Chart(n, {
                        type: "radar",
                        data: r,
                        options: o
                    });
                    break;
                case "PolarArea": t = new Chart(n, {
                        data: r,
                        type: "polarArea",
                        options: o
                    })
            }
            return t
        }()
    },
    t.prototype.initCharts = function () {
        var t = [];
        if (0 < l("#line-chart-example").length) {
            t.push(this.respChart(l("#line-chart-example"), "Line", {
                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                datasets: [
                    {
                        label: "Completed Tasks",
                        backgroundColor: "rgba(74, 129, 212, 0.3)",
                        borderColor: "#4a81d4",
                        data: [
                            32,
                            42,
                            42,
                            62,
                            52,
                            75,
                            62
                        ]
                    }, {
                        label: "Plan Tasks",
                        fill: !0,
                        backgroundColor: "transparent",
                        borderColor: "#f1556c",
                        borderDash: [
                            5, 5
                        ],
                        data: [
                            42,
                            58,
                            66,
                            93,
                            82,
                            105,
                            92
                        ]
                    }
                ]
            }, {
                maintainAspectRatio: !1,
                legend: {
                    display: !1
                },
                tooltips: {
                    intersect: !1
                },
                hover: {
                    intersect: !0
                },
                plugins: {
                    filler: {
                        propagate: !1
                    }
                },
                scales: {
                    xAxes: [
                        {
                            reverse: !0,
                            gridLines: {
                                color: "rgba(0,0,0,0.05)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                stepSize: 20
                            },
                            display: !0,
                            borderDash: [
                                5, 5
                            ],
                            gridLines: {
                                color: "rgba(0,0,0,0)",
                                fontColor: "#fff"
                            }
                        }
                    ]
                }
            }))
        }
        return t
    },
    t.prototype.init = function () {
        var a = this;
        Chart.defaults.global.defaultFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        a.charts = this.initCharts(),
        l(window).on("resize", function (t) {
            l.each(a.charts, function (t, a) {
                try {
                    a.destroy()
                } catch (t) {}
            }),
            a.charts = a.initCharts()
        })
    },
    l.ChartJs = new t,
    l.ChartJs.Constructor = t
}(window.jQuery),
function () {
    "use strict";
    window.jQuery.ChartJs.init()
}();
