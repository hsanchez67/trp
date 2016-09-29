$( document ).ready(function() {
        var lineChartData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Ju"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [9.5, 9.2, 9.8, 9.6, 9.3, 9.4, 9.7]
                },
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [9.2, 9.1, 9.5, 9.6, 9.4,9.0, 9.5]
                }
            ]

        };
        new Chart(document.getElementById("line-sample").getContext("2d")).Line(lineChartData);
});