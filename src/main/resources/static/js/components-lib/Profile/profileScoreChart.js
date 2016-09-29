'use strict';

$(document).ready(function () {
    var score = 0;

    var data = [{ value: score, color: '#3F9F3F', label: "Your Score" }, { value: 10 - score, color: '#003F5D', label: "" }];

    var options = {
        showTooltips: false,
        responsive: false,
        animation: true,
        percentageInnerCutout: 70,
        segmentShowStroke: true
    };

    /* Sum all all parts */
    /* for (i = 0; i < data.length; i++) {
     total = total + data[i].value;
     } */
    var total = data[0].value;

    var chartCtx = $("#canvas-2").get(0).getContext("2d");
    var chart = new Chart(chartCtx).Doughnut(data, options);

    var textCtx = $("#text-2").get(0).getContext("2d");
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.font = "36px sans-serif";
    textCtx.beginPath();
    textCtx.arc(60, 60, 42, 0, 2 * Math.PI);
    textCtx.fillStyle = '#fff';
    textCtx.fill();
    /* Inner circle border */
    /* textCtx.lineWidth = 5;
     textCtx.strokeStyle = '#003F5D';
     textCtx.stroke(); */
    textCtx.fillStyle = "#003F5D";
    textCtx.fillText(total, 60, 60);
});