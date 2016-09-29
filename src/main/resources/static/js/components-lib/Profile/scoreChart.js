"use strict";

var ScoreChart = React.createClass({
    displayName: "ScoreChart",

    getInitialState: function getInitialState() {
        return {
            id: '',
            score: 0
        };
    },
    componentWillMount: function componentWillMount() {
        console.log("ScoreChart:componentWillMount:");
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("ScoreChart:componentWillReceiveProps:");
        console.log(nextProps);
        console.log(this.props);
        if (this.props.id != nextProps.id) {
            this.prepareComponentState(nextProps);
        }
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("ScoreChart:prepareComponentState:");
        if (props.id != null) {
            this.setState({
                id: props.id
            });
            this.loadChart(props.id);
        }
    },
    loadChart: function loadChart(id) {
        if (id != null) {
            var source = '/api/users/' + id;
            console.log("In scoreChart: " + source);
            $.get(source, (function (result) {
                console.log("ScoreChart:componentWillMount:data");
                console.log(result);
                var data = result;
                if (this.isMounted()) {
                    this.setState({
                        score: data.score == null ? 0 : data.score
                    });
                    var options = {
                        showTooltips: false,
                        responsive: false,
                        animation: true,
                        percentageInnerCutout: 70,
                        segmentShowStroke: true
                    };
                    var scoreColor = '#3F9F3F';
                    if (data.score < 2.5) scoreColor = '#FF4D15';
                    if (data.score >= 2.5 && data.score < 5) scoreColor = '#FCE94C';
                    if (data.score >= 5 && data.score < 7.5) scoreColor = '#40ADE0';
                    var data2 = [{ value: data.score, color: scoreColor, label: "Score" }, { value: 10 - data.score, color: '#003F5D', label: "Missing" }];
                    var chartCtx = $("#canvas-profile-panel").get(0).getContext("2d");
                    var chart = new Chart(chartCtx).Doughnut(data2, options);
                    var textCtx = $("#text-profile-panel").get(0).getContext("2d");
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
                    textCtx.fillText(this.state.score, 60, 60);
                }
            }).bind(this));
        }
    },
    render: function render() {
        return React.createElement(
            "span",
            null,
            React.createElement("canvas", { className: "canvas-score-doughnut", id: "text-profile-panel", height: "120", width: "120" }),
            React.createElement("canvas", { className: "canvas-score-text", id: "canvas-profile-panel", height: "120", width: "120" })
        );
    }
});