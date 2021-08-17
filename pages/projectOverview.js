import { connect } from 'react-redux';
import Router from 'next/router';
import { ActivityList, FileList, Header, ModalPopUp, TaskList } from '../components';
import { getActivityByProjectId } from '../redux/actions/activity/activityAction';
import { getMemberByProjectId } from '../redux/actions/member/memberAction';
import { getProjectById } from '../redux/actions/project/projectAction';
import { getTaskByProjectId, getTaskTypes } from '../redux/actions/task/taskAction';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            Id: null,
            elementId: null,
            projectId: this.props.query.projectId,
            filteredTasks: [],
            searchText: []
        }
        this.handlechange = this.handlechange.bind(this)
    }

    static getInitialProps({ query }) {
        return { query }
    }

    UNSAFE_componentWillMount = () => {
        this.props.getTaskTypes();
        this.props.getProjectById(this.props.query.projectId);
        this.props.getTaskByProjectId(this.props.query.projectId);
        this.props.getMemberByProjectId(this.props.query.projectId);
    }

    handleShow = () => {
        this.setState({
            show: true,
            elementId: document.getElementById('add Task').id
        });
    }

    getActivity = () => {
        this.props.getActivityByProjectId(this.props.query.projectId);
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredTasks: this.props.tasks.filter(task => (task.name.toLowerCase()).includes(searchText.toLowerCase())) })
        } else {
            this.setState({ filteredTasks: [] })
        }
    }

    render() {
        const { show, filteredTasks, searchText } = this.state;
        const { project, tasks } = this.props;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                        <div className="page-header ">
                            <h1>{project.name}</h1>
                            <p className="lead">{project.description}</p>
                            <Header id="projectOverview" />
                            <div>
                                {project.task_percentage !== null ?
                                    (project.task_percentage > 0 && project.task_percentage <= 35) ?
                                        <div className="progress">
                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        : (project.task_percentage > 36 && project.task_percentage <= 70) ?
                                            <div className="progress">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            :
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                    : ''}
                                <div className="d-flex justify-content-between text-small">
                                    <div className="d-flex align-items-center">
                                        {project.total_task > 0 ?
                                            <>
                                                <i className="material-icons mr-1">playlist_add_check</i>
                                                <span className="text-small">{project.total_done_task > 0 ? project.total_done_task : 0} / {project.total_task > 0 ? project.total_task : 0} </span>
                                            </>
                                            : ''}

                                    </div>
                                    <span className="text-small" data-filter-by="text">
                                        {project.due_day ?
                                            project.due_day > 0 ?
                                                project.due_day > 1 ?
                                                    <span className="badge badge-success">Due in {project.due_day} days</span>
                                                    :
                                                    <span className="badge badge-warning">1 day before Due Date</span>
                                                : project.due_day < -15 ?
                                                    <span className="badge badge-danger">Expired</span> :
                                                    <>
                                                        <span className="badge badge-success">{Math.abs(project.due_day)} Days</span>
                                                        <span className="badge badge-danger"> Past Due </span>
                                                        <span className="badge badge-success">Date</span>
                                                    </>
                                            : <span className="badge badge-success">Done</span>}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul className="nav nav-tabs nav-fill mt-3" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tasks" role="tab" aria-controls="tasks" aria-selected="true">Tasks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">Files</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false" onClick={this.getActivity}>Activity</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="tasks" role="tabpanel">
                                <div className="row content-list-head">
                                    <div className="col-auto">
                                        <h3>Tasks</h3>
                                        <button className="btn btn-round" id="add Task" onClick={this.handleShow}>
                                            <i className="material-icons">add</i>
                                        </button>
                                        <button className="btn btn-outline-primary btn-md-6 ml-2" onClick={() => {
                                            Router.push({ pathname: '/kanbanBoard', query: { projectId: this.props.query.projectId } })
                                        }}>
                                            Kanban Board
                                        </button>
                                    </div>
                                    <form className="col-md-auto">
                                        <div className="input-group input-group-round">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="material-icons">filter_list</i>
                                                </span>
                                            </div>
                                            <input type="search" className="form-control" placeholder="Filter tasks" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                                        </div>
                                    </form>
                                </div>
                                <ModalPopUp
                                    show={show}
                                    Id={this.state.elementId}
                                    Heading={'Add Task'}
                                    Text={'Task'}
                                    buttonText={'Add'}
                                    closeCallBack={() => {
                                        this.setState({ show: !show })
                                    }}
                                    projectId={this.state.projectId} />
                                <TaskList data={this.props.query.projectId} tasks={searchText.length > 0 ? (filteredTasks.length > 0 ? filteredTasks : filteredTasks) : tasks} />
                            </div>
                            <FileList projectId={this.props.query.projectId} />
                            <ActivityList />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.task.tasks,
    project: state.project.project,
    members: state.member.member
});

export default connect(
    mapStateToProps,
    {
        getTaskByProjectId,
        getProjectById,
        getActivityByProjectId,
        getMemberByProjectId,
        getTaskTypes
    }
)(Task);
