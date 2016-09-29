"use strict";

var selectResponsive = {
    width: '95%'
};

var GeneralSearch = React.createClass({
    displayName: "GeneralSearch",

    render: function render() {
        return React.createElement(
            "span",
            null,
            React.createElement("select", { id: "selectGeneralSearch", style: selectResponsive })
        );
    }

});