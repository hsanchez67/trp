var HistoryModal = React.createClass({
    getInitialState(){
        return {
            user: [],
            history: [],
            id: this.props.id
        }
    },
    componentDidMount(){
        if(this.state.id != 0) {
            var data = {
                id: this.state.id
            }
            var formData = JSON.stringify(data, null, ' ');
            console.log(formData);
            $.ajax({
                type: "POST",
                url: "/getHistory",
                data: formData,
                success: function success(result) {
                    if ($.isEmptyObject(result)) {
                        console.log("No results");
                        this.setState({
                            user: [],
                            history: []
                        });
                        return null;
                    }
                    this.setState({
                        user: result.user,
                        history: result.history
                    })
                }.bind(this),
                error: function (error) {
                    console.log('Error: '+ error);
                    return false;
                },
                dataType: "json",
                contentType: "application/json"
            });
            $(ReactDOM.findDOMNode(this)).modal('show');
            $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideHistoryModal);
        }
    },
    printHistory: function(id) {
        console.log("Print History for " + id);
    },
    render(){
        var borderClass = classNames({
            'btn btn-primary btn-circle btn-circle-green': this.state.score >= 7.5,
            'btn btn-primary btn-circle btn-circle-blue': this.state.score >= 5 && this.state.score < 7.5,
            'btn btn-primary btn-circle btn-circle-yellow': this.state.score >= 2.5 && this.state.score < 5,
            'btn btn-primary btn-circle btn-circle-red': this.state.score < 2.5
        });
        return (
            <div className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Relationship History with <strong>{this.state.user.firstName}</strong> {this.state.user.lastName}<strong>.</strong></h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    History
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="compliance-button">
                                <a onClick={this.printHistory.bind(this, this.props.id)} data-dismiss="modal" className="btn btx-xs btn-primary pointer">
                                    <span>
                                        <i className="fa fa-print"></i>&nbsp;Print
                                    </span>
                                </a>
                            </div>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideHistoryModal: React.PropTypes.func.isRequired
    }
});