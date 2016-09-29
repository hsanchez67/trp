'use strict';

var ScoreChartSearch = React.createClass({
    displayName: 'ScoreChartSearch',

    getInitialState: function getInitialState() {
        return {
            data: [],
            options: {},
            score: this.props.score,
            avatar: this.props.avatar
        };
    },
    componentDidMount: function componentDidMount() {
        if (this.isMounted()) {
            var options = {
                showTooltips: false,
                responsive: false,
                animation: true,
                percentageInnerCutout: 70,
                segmentShowStroke: true
            };
            var scoreColor = '#3F9F3F';
            if (this.state.score < 2.5) scoreColor = '#FF4D15';
            if (this.state.score >= 2.5 && this.state.score < 5) scoreColor = '#FCE94C';
            if (this.state.score >= 5 && this.state.score < 7.5) scoreColor = '#40ADE0';
            var data = [{ value: this.state.score, color: scoreColor, label: "Score" }, { value: 10 - this.state.score, color: '#003F5D', label: "Missing" }];
            var scoreDisplay = this.state.score;
            if (scoreDisplay.length > 3) {
                scoreDisplay = scoreDisplay.substring(0, scoreDisplay.length - 1);
            }
            if (this.state.score == "10.00") scoreDisplay = "10";
            var chartCtx = $("#canvas-" + this.props.count).get(0).getContext("2d");
            var chart = new Chart(chartCtx).Doughnut(data, options);
            var textCtx = $("#text-" + this.props.count).get(0).getContext("2d");
            textCtx.textAlign = "center";
            textCtx.textBaseline = "middle";
            textCtx.font = "18px sans-serif";
            textCtx.beginPath();
            textCtx.arc(30, 30, 21, 0, 2 * Math.PI);
            textCtx.fillStyle = '#fff';
            textCtx.fill();
            /* Inner circle border */
            /* textCtx.lineWidth = 5;
             textCtx.strokeStyle = '#003F5D';
             textCtx.stroke(); */
            textCtx.fillStyle = "#003F5D";
            textCtx.fillText(scoreDisplay, 30, 30);
        }
    },
    render: function render() {
        return React.createElement(
            'span',
            null,
            React.createElement('canvas', { className: 'canvas-score-doughnut', id: "text-" + this.props.count, height: '60', width: '60' }),
            React.createElement('canvas', { className: 'canvas-score-text', id: "canvas-" + this.props.count, height: '60', width: '60' })
        );
    }
});