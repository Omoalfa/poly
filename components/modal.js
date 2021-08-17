import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Checkbox, DatePicker, ImageList } from '../components/'
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { createProject, updateProject } from '../redux/actions/project/projectAction';
import { createTeam, updateTeam } from '../redux/actions/team/teamAction';
import { createTask, updateTask } from '../redux/actions/task/taskAction';



class ModalPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            options: [],
            name: null,
            description: null,
            startDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            endDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            visibility: 'Just me',
            status: 'BackLog',
            errorName: null,
            errorDescription: null,
            member: [],
            teamMember: [],
            taskMember: [],
            taskTypeId: '1',
            filteredMembers: [],
            searchText: []
        }
        this.handleMemberchange = this.handleMemberchange.bind(this)
    }

    UNSAFE_componentWillReceiveProps = (nextprops) => {
        this.setState({ show: nextprops.show });
        if (nextprops.member.length != this.props.member.length) {
            this.setState({ member: nextprops.member })
        }
        if (nextprops.teamMember.length != this.props.teamMember.length) {
            this.setState({ teamMember: nextprops.teamMember })
        }
        if (nextprops.taskMember.length != this.props.taskMember.length && nextprops.Id == 'edit Task' && this.props.taskID != undefined) {
            this.setState({ taskMember: nextprops.taskMember })
        }

        if (this.props.projectID != undefined) {
            this.setState({
                name: nextprops.project.name,
                description: nextprops.project.description,
                startDate: moment(nextprops.project.start_date)._d,
                endDate: moment(nextprops.project.end_date)._d,
                visibility: nextprops.project.visibility
            })
        }
        if (this.props.teamID > 0) {
            this.setState({
                name: nextprops.team.name,
                description: nextprops.team.description
            })
        }
        if (nextprops.Id == 'edit Task') {
            this.setState({
                name: nextprops.task.name,
                description: nextprops.task.description,
                startDate: moment(nextprops.task.start_date)._d,
                endDate: moment(nextprops.task.end_date)._d,
                projectId: nextprops.task.project_id,
                taskTypeId: nextprops.task.typeID
            })
        }
    }

    handlechange = (event) => {
        const options = this.state.options
        let index;
        if (event.target.checked) {
            options.push(+event.target.value)
        } else {
            index = options.indexOf(+event.target.value)
            options.splice(index, 1)
        }
        this.setState({ options: options })
    }

    handleClose = () => {
        this.setState({
            options: [],
            id: null,
            show: false,
            name: null,
            description: null,
            startDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            endDate: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            taskTypeId: null,
            visibility: 'Just me',
            member: [],
            teamMember: [],
            taskMember: [],
            taskTypeId: '1',
            filteredMembers: [],
            searchText: []
        });
        this.props.closeCallBack();
    }

    handlechangedropdown = (taskTypeId) => {
        this.setState({ taskTypeId: taskTypeId })
    }

    getChecked = (member) => {
        let checkstatus = -1;
        if (this.state.teamMember.length > 0 && this.props.teamID !== undefined) {
            checkstatus = this.state.teamMember.findIndex(m => m.member_id === member.id);
        } else if (this.state.taskMember.length > 0 && this.props.taskID !== undefined) {
            checkstatus = this.state.taskMember.findIndex(m => m.member_id === member.id);
        } else if (this.state.member.length > 0 && this.props.projectID !== undefined) {
            checkstatus = this.state.member.findIndex(m => m.id === member.id);
        }
        return checkstatus > -1
    }

    handleClick = () => {
        if (this.state.name != null) {
            if (this.state.description != null) {
                let status = null;
                if (this.props.status != null) {
                    status = this.props.status
                }
                else {
                    status = 'Backlog'
                }

                let data = {
                    name: this.state.name,
                    description: this.state.description,
                    member: this.state.options,
                    startDate: moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss'),
                    endDate: moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss'),
                    teamId: this.props.teamId,
                    status: this.state.status,
                    projectId: this.props.projectId,
                    taskId: this.props.taskID,
                    taskTypeId: this.state.taskTypeId,
                    status: status
                }

                if (this.props.projectID != undefined) {
                    let members = [];
                    if (this.state.visibility == 'Members') {
                        if (this.state.options.length > 0) {
                            this.state.options.map((option) => {
                                members.push(option);
                            })
                        }
                        else {
                            this.state.teamMember.map((member) => {
                                members.push(member.id);
                            })
                        }
                    } else {
                        if (this.state.options.length > 0) {
                            this.state.options.map((option) => {
                                members.push(option);
                            })
                        }
                    }
                    let data = {
                        name: this.state.name,
                        description: this.state.description,
                        member: members,
                        startDate: moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss'),
                        endDate: moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss'),
                        visibility: this.state.visibility,
                        teamId: this.props.teamId,
                        projectId: this.props.projectId
                    }
                    this.props.updateProject(this.props.projectID, data);
                    this.setState({ member: [] });
                } else if (this.props.teamID != undefined) {
                    this.props.updateTeam(this.props.teamID, data);
                    this.setState({ teamMember: [] });
                } else if (this.props.taskID != undefined) {
                    this.props.updateTask(this.props.taskID, data);
                    this.setState({ taskMember: [] });
                } else if (this.props.Id == 'add Team') {
                    this.props.createTeam(data);
                } else if (this.props.Id == 'add Project') {
                    let members = [];
                    if (this.state.visibility == 'Members') {
                        if (this.state.options.length > 0) {
                            this.state.options.map((option) => {
                                members.push(option);
                            })
                        }
                        else {
                            this.state.teamMember.map((member) => {
                                members.push(member.id);
                            })
                        }
                    }
                    else {
                        if (this.state.options.length > 0) {
                            this.state.options.map((option) => {
                                members.push(option);
                            })
                        }
                    }
                    let data = {
                        name: this.state.name,
                        description: this.state.description,
                        member: members,
                        startDate: moment(this.state.startDate).format('YYYY-MM-DD hh:mm:ss'),
                        endDate: moment(this.state.endDate).format('YYYY-MM-DD hh:mm:ss'),
                        visibility: this.state.visibility,
                        teamId: this.props.teamId,
                        projectId: this.props.projectId
                    }
                    this.props.createProject(data);
                } else if (this.props.Id == 'add Task') {
                    this.props.createTask(data);
                }

                this.setState({
                    options: [],
                    id: null,
                    show: false,
                    name: null,
                    description: null,
                    startDate: moment().toDate(),
                    endDate: moment().toDate(),
                    taskTypeId: null,
                    visibility: 'Just me',
                    member: [],
                    teamMember: [],
                    taskMember: [],
                    taskTypeId: '1',
                    filteredMembers: [],
                    searchText: []
                });
                this.props.closeCallBack();
            }
            else {
                this.setState({ errorDescription: 'Please enter description' });
            }
        }
        else {
            this.setState({ errorName: 'Please enter name' });
        }
    }

    handleMemberchange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            if (this.props.Id == 'add Project' || this.props.Id == 'edit Project') {
                this.setState({ filteredMembers: this.props.teamMember.filter(member => (member.display_name.toLowerCase()).includes(searchText.toLowerCase())) })
            } else if (this.props.Id == 'add Task' || this.props.Id == 'edit Task') {
                this.setState({ filteredMembers: this.props.member.filter(m => (m.display_name.toLowerCase()).includes(searchText.toLowerCase())) })
            } else {
                this.setState({ filteredMembers: this.props.members.filter(member => (member.display_name.toLowerCase()).includes(searchText.toLowerCase())) })
            }

        } else {
            this.setState({ filteredMembers: [] })
        }
    }

    render() {
        const { show, searchText, filteredMembers, startDate, endDate } = this.state;
        const { Heading, members, Text, teamMember, member, taskTypes, buttonText, project } = this.props;
        return (
            <Modal show={show} onHide={this.handleClose}>
                <div className="modal-header">
                    <ModalTitle>{Heading}</ModalTitle>
                    <button type="button" className="close btn btn-round" onClick={this.handleClose}>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <ul className="nav nav-tabs nav-fill" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="add-details-tab" data-toggle="tab" href="#add-details" role="tab" aria-controls="team-add-details" aria-selected="true">Details</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="add-members-tab" data-toggle="tab" href="#add-members" role="tab" aria-controls="team-add-members" aria-selected="false">Members</a>
                    </li>
                </ul>
                <ModalBody>
                    <form role="form" method="POST" action="">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="add-details" role="tabpanel">
                                {this.props.Id == 'add Project' || this.props.Id == 'edit Project' || this.props.Id == 'add Task' || this.props.Id == 'edit Task' ?
                                    <h6>General Details</h6> : ''}
                                <div className="form-group row align-items-center">
                                    <label className="col-3">Name <span className="text-danger">*</span> </label>
                                    <input className="form-control col" type="text" placeholder={Text + ' ' + "name"} name="project-name" value={this.state.name !== null ? this.state.name : ''} onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" /> <br />
                                    <span className="text-danger">{this.state.errorName}</span>
                                </div>
                                <div className="form-group row">
                                    <label className="col-3">Description <span className="text-danger">*</span>  </label>
                                    <textarea className="form-control col" rows="3" placeholder={Text + ' ' + "description"} name="project-description" value={this.state.description !== null ? this.state.description : ''} onChange={(event) => { this.setState({ description: event.target.value, errorDescription: null }) }} autoComplete="off" ></textarea><br />
                                    <span className="text-danger">{this.state.errorDescription}</span>
                                </div>
                                <hr />
                                {this.props.Id == 'add Project' || this.props.Id == 'edit Project' || this.props.Id == 'add Task' || this.props.Id == 'edit Task' ?
                                    <>
                                        <h6>Timeline</h6>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Start Date</label>
                                            <DatePicker
                                                startDate={startDate}
                                                minDate={startDate}
                                                onChange={(date) => this.setState({ startDate: date[0], endDate: date[0] })}
                                            />
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Due Date</label>
                                            {project.end_date ?
                                                <DatePicker
                                                    endDate={moment(endDate).format('YYYY-MM-DD hh:mm:ss')}
                                                    minDate={startDate}
                                                    maxDate={this.props.Id == 'add Task' || this.props.Id == 'edit Task'? moment(project.end_date).format('YYYY-MM-DD hh:mm:ss'):''}
                                                    onChange={(date) => this.setState({ endDate: date[0] })}
                                                /> :
                                                <DatePicker
                                                    endDate={endDate}
                                                    minDate={startDate}
                                                    onChange={(date) => this.setState({ endDate: date[0] })}
                                                />
                                            }
                                        </div>
                                        <div className="alert alert-warning text-small" role="alert">
                                            <span>You can change due dates at any time.</span>
                                        </div>
                                        <hr />
                                    </> : ''}
                                {this.props.Id == 'add Project' || this.props.Id == 'edit Project' ?
                                    <>
                                        <h6>Visibility</h6>
                                        <div className="row">
                                            {/* <div className="col">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="visibility-edit-everyone" name="visibility" className="custom-control-input" value='Everyone' checked={this.state.visibility === 'Everyone'} onChange={(event) => { this.setState({ visibility: event.target.value }) }} />
                                                    <label className="custom-control-label" htmlFor="visibility-edit-everyone">Everyone</label>
                                                </div>
                                            </div> */}
                                            <div className="col">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="visibility-edit-members" name="visibility" className="custom-control-input" value='Members' checked={this.state.visibility === 'Members'} onChange={(event) => { this.setState({ visibility: event.target.value }) }} />
                                                    <label className="custom-control-label" htmlFor="visibility-edit-members">Members</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="visibility-edit-me" name="visibility" className="custom-control-input" value='Just me' checked={this.state.visibility === 'Just me'} onChange={(event) => { this.setState({ visibility: event.target.value }) }} />
                                                    <label className="custom-control-label" htmlFor="visibility-edit-me">Just me</label>
                                                </div>
                                            </div>
                                        </div>
                                    </> : ''}
                                {this.props.Id == 'add Task' || this.props.Id == 'edit Task' ?
                                    <div className="form-group row align-items-center">
                                        <label className="col-3"> Task Type <span className="text-danger">*</span></label>
                                        <select
                                            name="taskType"
                                            value={this.state.taskTypeId}
                                            onChange={(event) => { this.handlechangedropdown(event.target.value) }}
                                            className='form-control col'>
                                            {(taskTypes !== undefined) ? taskTypes.map(taskType => (
                                                <option
                                                    key={taskType.id}
                                                    value={taskType.id}
                                                >
                                                    {taskType.name}
                                                </option>
                                            ))
                                                : ''}
                                        </select>
                                    </div>
                                    : ''}
                            </div>

                            <div className="tab-pane fade" id="add-members" role="tabpanel">
                                <div className="users-manage">
                                    <div className="mb-3">
                                        {this.props.Id == 'add Project' || this.props.Id == 'edit Project' ?
                                            <ImageList Data={teamMember} Id={'modalheader'} />
                                            : this.props.Id == 'add Task' || this.props.Id == 'edit Task' ?
                                                <ImageList Data={member} Id={'modalheader'} />
                                                :
                                                <ImageList Data={members} Id={'modalheader'} />}
                                    </div>
                                    <div className="input-group input-group-round">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="material-icons">filter_list</i>
                                            </span>
                                        </div>
                                        <input type="search" className="form-control" placeholder="Filter members" onChange={(event) => { this.handleMemberchange(event) }} autoComplete="off" />
                                    </div>
                                    <div className="form-group-users">
                                        {this.props.Id == 'add Project' || this.props.Id == 'edit Project' ?
                                            searchText.length > 0 ?
                                                filteredMembers.map((member, index) =>
                                                    <Checkbox
                                                        key={index}
                                                        member={member}
                                                        index={index}
                                                        defaultChecked={this.props.projectID ? this.getChecked(member) : false}
                                                        onChange={(event) => { this.handlechange(event) }} />
                                                )
                                                : teamMember.map((member, index) =>
                                                    <Checkbox
                                                        key={index}
                                                        member={member}
                                                        index={index}
                                                        defaultChecked={this.props.projectID ? this.getChecked(member) : false}
                                                        onChange={(event) => { this.handlechange(event) }} />
                                                ) :
                                            this.props.Id == 'add Task' || this.props.Id == 'edit Task' ?
                                                searchText.length > 0 ?
                                                    filteredMembers.map((member, index) =>
                                                        <Checkbox
                                                            key={index}
                                                            member={member}
                                                            index={index}
                                                            defaultChecked={this.props.taskID ? this.getChecked(member) : false}
                                                            onChange={(event) => { this.handlechange(event) }} />
                                                    ) : member.map((member, index) =>
                                                        <Checkbox
                                                            key={index}
                                                            member={member}
                                                            index={index}
                                                            defaultChecked={this.props.taskID ? this.getChecked(member) : false}
                                                            onChange={(event) => { this.handlechange(event) }} />
                                                    ) :
                                                searchText.length > 0 ?
                                                    filteredMembers.map((member, index) =>
                                                        <Checkbox
                                                            key={index}
                                                            member={member}
                                                            index={index}
                                                            defaultChecked={this.props.teamID ? this.getChecked(member) : false}
                                                            onChange={(event) => { this.handlechange(event) }} />
                                                    )
                                                    :
                                                    members.map((member, index) =>
                                                        <Checkbox
                                                            key={index}
                                                            member={member}
                                                            index={index}
                                                            defaultChecked={this.props.teamID ? this.getChecked(member) : false}
                                                            onChange={(event) => { this.handlechange(event) }} />
                                                    )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                        {buttonText}
                    </button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    members: state.member.members,
    project: state.project.project,
    member: state.member.member,
    team: state.team.team,
    teamMember: state.member.teamMember,
    taskTypes: state.task.taskType,
    taskMember: state.member.taskMember,
    task: state.task.task
});

export default connect(
    mapStateToProps,
    {
        createProject,
        updateProject,
        createTeam,
        updateTeam,
        createTask,
        updateTask
    },
)(ModalPopUp);