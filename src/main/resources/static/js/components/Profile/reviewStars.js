var ReviewStars = React.createClass ({
    render () {
        var starPercentage = {
            width: (this.props.rating * 100) / 5 + '%'
        };
        var starFontSize = {
            fontSize: this.props.fontSize,
            width: '100%'
        };
        return(
            <div className="latch-star-ratings-css" style={starFontSize}>
                <div className="latch-star-ratings-css-top" style={starPercentage}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="latch-star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            </div>
        );
    }
});