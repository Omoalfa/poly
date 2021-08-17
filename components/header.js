import React from 'react';
import { connect } from 'react-redux';
import UserInviteModal from './userInviteModal';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamMember: [],
            taskMember: [],
            projectmember: [],
            show: false,
        }
    }

    UNSAFE_componentWillReceiveProps = (nextprops) => {
        if (nextprops.id == 'project') {
            this.setState({ teamMember: nextprops.members, projectmember: [], taskMember: [] });
        } else if (nextprops.id == 'taskOverview') {
            this.setState({ teamMember: [], projectmember: [], taskMember: nextprops.taskMembers });
        } else {
            this.setState({ teamMember: [], projectmember: nextprops.projectMember, taskMember: [] });
        }
    }

    handlshow = () => {
        this.setState({
            show: true
        });
    }

    render() {
        const { isLoading, isTeamLoading, isTaskLoading } = this.props;
        const { teamMember, projectmember, taskMember, show } = this.state;
        return (
            <div className="d-flex align-items-center">
                <ul className="avatars">
                    {isTeamLoading ? <img src={'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'} width="30px" height="30px" alt="loading..." /> :
                        teamMember.slice(0, 5).map((member, index) => {
                            return (
                                member.guid != null ?
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src={member.guid} />
                                        </a>
                                    </li> :
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src='assets/img/user.svg' />
                                        </a>
                                    </li>
                            )
                        })}

                    {isLoading ? <img src={'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'} width="30px" height="30px" alt="loading..." /> :
                        projectmember.slice(0, 5).map((member, index) => {
                            return (
                                member.guid != null ?
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src={member.guid} />
                                        </a>
                                    </li> :
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src='assets/img/user.svg' />
                                        </a>
                                    </li>
                            )
                        })}

                    {isTaskLoading ? <img src={'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'} width="30px" height="30px" alt="loading..." /> :
                        taskMember.slice(0, 5).map((member, index) => {
                            return (
                                member.guid != null ?
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src={member.guid} />
                                        </a>
                                    </li> :
                                    <li key={index}>
                                        <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                            <img alt={member.display_name} className="avatar" src='assets/img/user.svg' />
                                        </a>
                                    </li>
                            )
                        })}
                </ul>
                {this.props.id == 'project' || this.props.id == 'kanban' ?
                    <>
                        <button className="btn btn-round flex-shrink-0" data-toggle="modal" data-target="#user-invite-modal">
                            <i className="material-icons" onClick={this.handlshow}>add</i>
                        </button>
                        <UserInviteModal show={show}
                            closeCallBack={() => {
                                this.setState({ show: !show })
                            }} />
                    </> : ''}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.member.isLoading,
    isTaskLoading: state.member.isTaskLoading,
    isTeamLoading: state.member.isTeamLoading,
    members: state.member.teamMember,
    projectMember: state.member.member,
    taskMembers: state.member.taskMember
});

export default connect(
    mapStateToProps,
    {
    },
)(Header);