'use strict';

var gauge = {
    height: '300px',
    margin: '0 auto'
};

var NPSChart = React.createClass({
    displayName: 'NPSChart',

    componentWillMount: function componentWillMount() {
        console.log("NPSChart:componentWillMount:");
        this.prepareComponentState(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        console.log("NPSChart:componentWillReceiveProps:");
        this.prepareComponentState(nextProps);
    },
    prepareComponentState: function prepareComponentState(props) {
        console.log("NPSChart:prepareComponentState:");
        if (props.nps != null) {
            this.loadChart(props.nps);
        }
    },
    loadChart: function loadChart(nps) {
        if (nps != null) {
            $("#circularGaugeContainer").dxCircularGauge({
                scale: {
                    startValue: -100,
                    endValue: 100,
                    tickInterval: 50,
                    label: {
                        format: 'decimal'
                    }
                },
                rangeContainer: {
                    ranges: [{ startValue: -100, endValue: -50, color: '#FF4D15' }, { startValue: -50, endValue: 0, color: '#FCE94C' }, { startValue: 0, endValue: 50, color: '#40ADE0' }, { startValue: 50, endValue: 100, color: '#57B055' }]
                },
                "export": {
                    enabled: false
                },
                value: nps
            });
        }
    },
    render: function render() {
        return React.createElement('div', { id: 'circularGaugeContainer', style: gauge });
    }
});