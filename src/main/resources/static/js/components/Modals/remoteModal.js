var RemoteModal = React.createClass({
    componentDidMount(){
        console.log("Inside RemoteModal");
        var modalSize = this.props.size;
        $('#modalDiv').addClass(modalSize);
        var options = {
            "backdrop" : "true",
            "show" : "true"
        };
        $(ReactDOM.findDOMNode(this)).modal(options);
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
   //     $(ReactDOM.findDOMNode(this)).on('shown.bs.modal', function () { $(ReactDOM.findDOMNode(this)).find('.modal-body').load('https://www.facebook.com/i-did-it-143881716081'); });

    },
    render(){
        return (
            <div className="modal fade">
                <div id="modalDiv" className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                                <h5 className="modal-title"><strong>{this.props.title}</strong></h5>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button id="closeButton" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});
