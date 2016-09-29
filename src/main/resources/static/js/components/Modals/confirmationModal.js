var ConfirmationModal = React.createClass({
    render(){
        var image1;
        if (this.props.username1=='') {
            image1 = <img id="confirmationAvatar1"  src="../images/120px-blank.png" className="contact-img img-circle" />
        }else if (this.props.username1 == 'default' && this.props.initials1 != '') {
            image1 = <div id="confirmationAvatar1" className="avatar-circle initials-confirmation-circle"><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials1}</span></div>;
        } else {
            image1 = <img id="confirmationAvatar1" src={'/api/remoteFiles/view/' + this.props.username1} className="contact-img img-circle" />;
        }
        var image2;
        if (this.props.username2=='') {
            image2 = <img id="confirmationAvatar2"  src="../images/120px-blank.png" className="contact-img img-circle" />
        }else if (this.props.username2 == 'default' && this.props.initials2 != '') {
            image2 = <div id="confirmationAvatar2" className="avatar-circle initials-confirmation-circle"><img className="hidden" id={this.props.id} /><span className="initials">{this.props.initials2}</span></div>;
        } else {
            image2 = <img id="confirmationAvatar2" src={'/api/remoteFiles/view/' + this.props.username2} className="contact-img img-circle" />;
        }
        var arrow1 = "";
        if (this.props.type == 'Introduction') {
            arrow1 = <span id="arrow" aria-hidden="true"><i className="fa fa-arrow-left"></i></span>;
        }
        var profession = "";
        if (this.props.profession != '') {
            image1 = "";
            profession = <h4>{this.props.profession}</h4>;
        }
        return (
            <div id="confirmationModal" className="modal fade" role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleHideModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                {image1}
                                {profession}
                                {arrow1}
                                <span id="arrow" aria-hidden="true"><i className="fa fa-envelope"></i></span>
                                <span id="arrow" aria-hidden="true"><i className="fa fa-arrow-right"></i></span>
                                {image2}
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