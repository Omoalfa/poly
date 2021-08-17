import Link from 'next/link';
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { ImageList } from '.';
import { ModalPopUp, OuterSpinner, Spinner } from '../components';
import { archiveTask, deleteTask, getTaskById, updateTask } from '../redux/actions/task/taskAction';
import Router from 'next/router'
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            Id: null,
            elementId: null,
            innerModel: false,
            taskTypeId: null,
            taskTypeName: null,
            errorName: null
        }
    }

    editTask = (id) => {
        this.props.getTaskById(id);
        this.setState({
            show: true,
            Id: id,
            elementId: document.getElementById('edit Task').id
        });
    }

    deleteTask = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.deleteTask(id, this.props.data)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    renameTask = (id) => {
        this.setState({ innerModel: true, taskTypeId: id });
    }

    handleClose = () => {
        this.setState({ innerModel: false, taskTypeName: null });
    }

    renameClick = () => {
        if (this.state.taskTypeName !== null) {
            const data = {
                name: this.state.taskTypeName
            }
            this.setState({ innerModel: false });
            this.props.archiveTask(this.state.taskTypeId, this.props.data, data);
        }
        else {
            this.setState({ errorName: 'please enter the value' })
        }
    }

    archiveTask = (id) => {
        const data = {
            status: 'Archive'
        }
        confirmAlert({
            title: 'Confirm to archive',
            message: 'Are you sure you want to archive?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.archiveTask(id, this.props.data, data)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }


    render() {
        const { show } = this.state;
        const { tasks, isLoading, taskTypes, isTaskLoading } = this.props;
        return (
            isLoading ? <Spinner /> :
                <>
                    {taskTypes.map((taskType, index) => {
                        return (
                            <div className="content-list-body" key={index}>
                                <div className="card-list">
                                    <div className="card-list-head">
                                        <h6>{taskType.name}</h6>
                                        <div className="dropdown">
                                            <button className="btn-options" type="button" id="cardlist-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => { this.renameTask(taskType.id) }}>Rename</button>
                                                <button className="dropdown-item text-danger" onClick={() => { this.archiveTask(taskType.id) }}>Archive</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-list-body">
                                        {tasks.map((task, index) => {
                                            return taskType.id === task.typeID && (
                                                <div className="card card-task" key={index}>
                                                    {task.status == 'Done' ?
                                                        <div className="progress">
                                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        : task.task_percentage !== null ?
                                                            (task.task_percentage > 0 && task.task_percentage <= 35) ?
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                                : (task.task_percentage > 36 && task.task_percentage <= 70) ?
                                                                    <div className="progress">
                                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                    :
                                                                    <div className="progress">
                                                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                            : ''}
                                                    <div className="card-body">
                                                        <div className="card-title" style={{ cursor: "pointer" }} onClick={() => {
                                                            Router.push({ pathname: '/taskOverview', query: { taskId: task.id } })
                                                        }}>
                                                            <h6 data-filter-by="text">{task.name}</h6>

                                                            <span className="text-small" data-filter-by="text">
                                                                {task.status == 'Done' ?
                                                                    <span className="badge badge-success">Done</span>
                                                                    : task.due_day && task.due_day > 0 ?
                                                                        task.due_day > 1 ?
                                                                            <span className="badge badge-success">Due in {task.due_day} days</span>
                                                                            :
                                                                            <span className="badge badge-warning">1 day before Due Date</span>
                                                                        :
                                                                        task.due_day == 0 ?
                                                                            <span className="badge badge-success">Due Today</span>
                                                                            :
                                                                            task.due_day < -15 ?
                                                                                <span className="badge badge-danger">Expired</span> :
                                                                                <>
                                                                                    <span className="badge badge-success">{Math.abs(task.due_day)} Days</span>
                                                                                    <span className="badge badge-danger"> Past Due </span>
                                                                                    <span className="badge badge-success">Date</span>
                                                                                </>
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="card-meta">
                                                            <ImageList Data={task.memberData} />
                                                            <div className="d-flex align-items-center">
                                                                {task.total_task > 0 ?
                                                                    <>
                                                                        <i className="material-icons mr-1">playlist_add_check</i>
                                                                        <span className="text-small">{task.total_done_task > 0 ? task.total_done_task : 0} / {task.total_task > 0 ? task.total_task : 0} </span>
                                                                    </>
                                                                    : ''}
                                                            </div>
                                                            <div className="dropdown card-options">
                                                                <button className="btn-options" type="button" id="task-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="material-icons">more_vert</i>
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" onClick={(event) => {
                                                                        event.preventDefault();
                                                                        Router.push({ pathname: '/taskOverview', query: { taskId: task.id } });
                                                                    }}>Overview</a>
                                                                    {task.task_percentage != '100' &&
                                                                        <button className="dropdown-item" id={'edit Task'} onClick={(event) => {
                                                                            event.preventDefault();
                                                                            this.editTask(task.id)
                                                                        }}>Edit</button>}
                                                                    <div className="dropdown-divider"></div>
                                                                    <button className="dropdown-item text-danger" onClick={(event) => {
                                                                        event.preventDefault();
                                                                        this.deleteTask(task.id)
                                                                    }}>Delete</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    }
                    {
                        isTaskLoading ? <OuterSpinner /> : <ModalPopUp
                            show={show}
                            Id={this.state.elementId}
                            Heading={'Edit Task'}
                            Text={'Task'}
                            closeCallBack={() => {
                                this.setState({ show: !show })
                            }}
                            projectId={this.props.data}
                            buttonText={'Save'}
                            taskID={this.state.Id}
                        />
                    }
                    <Modal show={this.state.innerModel} onHide={this.handleClose}>
                        <div className="modal-header">
                            <ModalTitle>Rename Task Type</ModalTitle>
                            <button type="button" className="close btn btn-round" onClick={this.handleClose}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <ModalBody>
                            <form role="form" method="POST" action="">
                                <div className="form-group row align-items-center">
                                    <label className="col-3">Name<span className="text-danger">*</span> </label>
                                    <input className="form-control col" type="text" placeholder="Task Type name" name="task-name" onChange={(event) => { this.setState({ taskTypeName: event.target.value, errorName: null }) }} autoComplete="off" /> <br />
                                    <span className="text-danger">{this.state.errorName}</span>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button role="button" className="btn btn-primary" type="submit" onClick={this.renameClick}>
                                Save
                            </button>
                        </ModalFooter>
                    </Modal>
                </>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.task.isLoading,
    isTaskLoading: state.task.isTaskLoading,
    taskTypes: state.task.taskType
});

export default connect(
    mapStateToProps,
    {
        getTaskById,
        deleteTask,
        updateTask,
        archiveTask
    })(TaskList);