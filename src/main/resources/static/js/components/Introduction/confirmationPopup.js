var ConfirmationModal = React.createClass({
    componentDidMount(){
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    },
    componentWillUnmount(){
        $(this.getDOMNode()).modal('hide');
    },
    render(){
        return (
            <div id="avatarProfile" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Your message has been sent.</h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <ConfirmationPic username={this.refs.avatar1.value} />
                                <span id="arrow" aria-hidden="true">&rarr;</span>
                                <ConfirmationPic username={this.refs.avatar1.value} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.handleHideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});

var SendIntroductionButtons = React.createClass({
    getInitialState(){
        return {view: {showModal: false}}
    },
    handleHideModal(){
        this.setState({view: {showModal: false}})
    },
    handleShowModal(){
        this.setState({view: {showModal: true}})
    },
    ResetIntroForm () {
        $("#selectContact1").select2("val", "");
        $("#selectContact2").select2("val", "");
        $('#avatar1').attr('src', '../images/120px-blank.png');
        $('#avatar2').attr('src', '../images/120px-blank.png');
        $('#includeMessage').val("");
    },
    render: function() {
        return (
                <div>
                    <button type="submit" onClick={this.handleShowModal} className="btn btn-primary btn-space">Send Introduction</button>
                    <button type="button" onClick={this.ResetIntroForm} className="btn btn-default btn-space">Reset</button>
                    {this.state.view.showModal ? <ConfirmationModal username={this.props.username} username2={this.props.username2} handleHideModal={this.handleHideModal}/> : null}
                </div>
        );
    }
});

var ConfirmationPic = React.createClass({
    render: function() {
        return (
            <img src={'/api/remoteFiles/view/' + this.props.username} className="img-circle profile-picture" />
        );
    }
});