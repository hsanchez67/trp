var GroupsModal = React.createClass({
    getInitialState(){
        return {
            groups: []
        }
    },
    componentDidMount: function componentDidMount() {
        console.log("Inside GroupsModal");
        var options = {
            "backdrop": "static",
            "show": "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    },
    render(){
        return (
            <div id="groupsModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h5 className="modal-title"><strong>Select or Create a Group</strong></h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});