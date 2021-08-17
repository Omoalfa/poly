import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import validator from 'validator';
import { sendUserInvitationEmail } from '../redux/actions/member/memberAction';

class UserInviteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            email: null,
            style: {}
        }
    }

    UNSAFE_componentWillReceiveProps = (nextprops) => {
        this.setState({ show: nextprops.show });
    }

    handleClose = () => {
        this.setState({
            show: false,
            email: null,
            style: {}
        });
        this.props.closeCallBack();
    }

    handleClick = () => {
        if (this.state.email != null && validator.isEmail(this.state.email)) {
            const user = {
                email: this.state.email
            }
            this.props.sendUserInvitationEmail(user);
            this.setState({ show: false, email: null, style: { border: '1px solid green', borderRadius: '9px' } });
        } else {
            this.setState({ style: { border: '1px solid red', borderRadius: '9px' } });
        }
    }

    validateEmail = (event) => {
        const email = event.target.value
        if (validator.isEmail(email)) {
            this.setState({ email: email, style: { border: '1px solid green', borderRadius: '9px' } });
        } else {
            this.setState({ style: { border: '1px solid red', borderRadius: '9px' } });
        }
    }

    render() {
        const { show } = this.state;
        return (
            <Modal show={show} onHide={this.handleClose}>
                <div className="modal-header">
                    <ModalTitle>Invite Users</ModalTitle>
                    <button type="button" className="close btn btn-round" onClick={this.handleClose}>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <ModalBody>
                    <form role="form" method="POST" action="">
                        <p>Send an invite link via email to add members to this team</p>
                        <div>
                            <div className="input-group" style={this.state.style}>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="material-icons">email</i>
                                    </span>
                                </div>
                                <input type="email" className="form-control" placeholder="Recipient email address" aria-label="Recipient email address" onChange={(event) => this.validateEmail(event)} />
                            </div>
                            {/* <div className="text-right text-small mt-2">
                                    <a href="#" role="button">Add another recipient</a>
                                </div> */}
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                        Invite users
                    </button>
                </ModalFooter>
            </Modal>

        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,
    {
        sendUserInvitationEmail
    }
)(UserInviteModal);