import Link from 'next/link';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { Header, ImageList, ModalPopUp, OuterSpinner } from '../components';
import { getMemberByProjectId } from '../redux/actions/member/memberAction';
import { getProjectById } from '../redux/actions/project/projectAction';
import { createTask, getTaskById, getTaskByProjectId, getTaskTypes, updateTask, updateTaskStatus } from '../redux/actions/task/taskAction';
import { createTaskStatusType, getTaskStatusType, getTaskStatusTypeById, updateTaskStatusType } from '../redux/actions/taskStatusType/taskStatusTypeAction';
import Router from 'next/router';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;

};

const grid = 8;

const getListStyle = isDraggingOver => ({
    padding: grid,
    width: 320
});

class KanbanBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.query.projectId,
            show: false,
            modalShow: false,
            name: null,
            Id: null,
            statusId: null,
            errorName: null,
            elementId: null
        }
    }

    static getInitialProps({ query }) {
        return { query }
    }

    UNSAFE_componentWillMount = () => {
        this.props.getTaskStatusType();
        this.props.getTaskTypes();
        this.props.getTaskByProjectId(this.props.query.projectId);
        this.props.getMemberByProjectId(this.props.query.projectId);
        this.props.getProjectById(this.props.query.projectId);
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.tasks.length > 0 || nextProps.taskStatus.length > 0) {
            const data = [];
            nextProps.taskStatus.map(status => {
                const tasks = nextProps.tasks.filter(task => task.status === status.name)
                data.push({ id: status.name, statusId: status.id, items: tasks })
            })
            this.setState({ data })
        }
    }

    getList = id => this.state.data.filter(d => d.id === id);

    onDragEnd = result => {
        const { source, destination } = result;
        const taskId = result.draggableId;
        const task = {
            status: destination.droppableId,
            projectId: this.state.projectId
        }

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'backlog') {
                this.setState({ backlog: items });
            }
            if (source.droppableId === 'waiting') {
                this.setState({ waiting: items });
            }
            if (source.droppableId === 'doing') {
                this.setState({ doing: items });
            }
            if (source.droppableId === 'inReview') {
                this.setState({ inReview: items });
            }
            if (source.droppableId === 'done') {
                this.setState({ done: items });
            }
        } else {
            const result = move(
                this.getList(source.droppableId)[0].items,
                this.getList(destination.droppableId)[0].items,
                source,
                destination
            );

            const data = this.state.data.map(d => {
                if (d.id === source.droppableId) {
                    d.items = result[d.id]
                    return d
                }
                if (d.id === destination.droppableId) {
                    d.items = result[d.id]
                    return d
                }
                return d
            })
            this.setState({ data: data });
            this.props.updateTaskStatus(taskId, task);
        }
    };

    handleShow = (id) => {
        this.setState({ show: true, statusId: id, elementId: document.getElementById('add Task').id });
    }

    handleClose = (obj) => {
        this.setState({ modalShow: false, show: false, elementId: null, name: null, errorName: null });
    }

    handleClick = () => {
        if (this.state.name !== null) {
            const data = {
                name: this.state.name,
                previousName: this.props.taskStatusData.name,
                projectId: this.props.query.projectId
            }
            if (this.state.elementId == 'edit-title') {
                this.setState({ modalShow: false, elementId: null, name: null, errorName: null });
                this.props.updateTaskStatusType(this.state.id, data);
            } else {
                this.props.createTaskStatusType(data);
            }
            this.setState({ modalShow: false, elementId: null, name: null, errorName: null });
        } else {
            this.setState({ errorName: "Please Enter Title" });
        }
    }

    handleEdit = (id) => {
        this.setState({ modalShow: true, id: id, elementId: document.getElementById('edit-title').id });
        this.props.getTaskStatusTypeById(id);
    }

    handleAdd = () => {
        this.setState({ modalShow: true, name: null, elementId: document.getElementById('add-title').id });
    }

    handleArchive = (id, statusId) => {
        const data = {
            name: 'Archive',
            previousName: id,
            projectId: this.props.query.projectId
        }
        confirmAlert({
            title: 'Confirm to archive',
            message: 'Are you sure you want to archive?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.updateTaskStatusType(statusId, data)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    handleItemArchive = (Id) => {
        const task = {
            status: 'Archive',
            projectId: this.state.projectId
        }
        confirmAlert({
            title: 'Confirm to archive',
            message: 'Are you sure you want to archive?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.updateTaskStatus(Id, task)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }


    handleDoneItem = (Id) => {
        const task = {
            status: 'Done',
            projectId: this.state.projectId
        }
        confirmAlert({
            title: 'Confirm to done',
            message: 'Are you sure you want move to Done?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.updateTaskStatus(Id, task)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }


    editTask = (id, statusId) => {
        this.props.getTaskById(id);
        this.setState({
            show: true,
            Id: id,
            statusId: statusId,
            elementId: document.getElementById('edit Task').id
        });
    }

    render() {
        const { data, elementId, show, modalShow, statusId } = this.state;
        const { isStatusLoading, project, isLoading, taskStatusData, isTaskLoading } = this.props;
        return (
            isTaskLoading ? <OuterSpinner /> :
                <>
                    <div className="main-container" style={{ marginTop: "40px" }}>
                        <div className="container-kanban">
                            <div className="container-fluid d-flex justify-content-between align-items-start">
                                <div>
                                    <h1>{project.name}</h1>
                                    <p className="lead d-none d-md-block">{project.description}</p>
                                </div>
                                <div>
                                    <Header id="kanban" />
                                    <button className="btn btn-primary float-right mt-2" onClick={Router.back}>
                                        Go Back
                               </button>
                                </div>
                            </div>
                            <div className="kanban-board container-fluid mt-lg-3" style={{ overflowY: "hidden" }}>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    {isStatusLoading ? <OuterSpinner /> :
                                        (<>
                                            {data && data.map((t, index) => {
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={index}>
                                                        <Droppable droppableId={t.id}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    style={getListStyle(snapshot.isDraggingOver)}
                                                                >
                                                                    <div className="kanban-col">
                                                                        <div className="card-list">
                                                                            <div className="row card-list-header">
                                                                                <h6 className="col-md-10">{t.id}</h6>
                                                                                <div className="dropdown card-options col-md-2">
                                                                                    <button className="btn-options" type="button" id="cardlist-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                        <i className="material-icons">more_vert</i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                                        <a className="dropdown-item" id="edit-title" onClick={() => this.handleEdit(t.statusId)}>Edit</a>
                                                                                        <a className="dropdown-item text-danger" onClick={() => this.handleArchive(t.id, t.statusId)}>Archive List</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-list-body" style={{ overflowY: "auto", maxHeight: "270px" }}>
                                                                                {isTaskLoading ? <OuterSpinner /> : t.items.map((item, index) => {
                                                                                    return (
                                                                                        <Draggable
                                                                                            key={item.id}
                                                                                            draggableId={item.id.toString()}
                                                                                            index={index}>
                                                                                            {(provided, snapshot) => (
                                                                                                <div className="card card-kanban"
                                                                                                    ref={provided.innerRef}
                                                                                                    {...provided.draggableProps}
                                                                                                    {...provided.dragHandleProps}>
                                                                                                    {item.status == 'Done' ?
                                                                                                        <div className="progress">
                                                                                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                                        </div>
                                                                                                        : item.task_percentage !== null ?
                                                                                                            (item.task_percentage > 0 && item.task_percentage <= 35) ?
                                                                                                                <div className="progress">
                                                                                                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${item.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                                                </div>
                                                                                                                : (item.task_percentage > 36 && item.task_percentage <= 70) ?
                                                                                                                    <div className="progress">
                                                                                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${item.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                                                    </div>
                                                                                                                    :
                                                                                                                    <div className="progress">
                                                                                                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: `${item.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                                                    </div>
                                                                                                            : ''}
                                                                                                    <div className="card-body">
                                                                                                        <div className="dropdown card-options">
                                                                                                            <button className="btn-options" type="button" id="kanban-dropdown-button-13" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="material-icons">more_vert</i>
                                                                                                            </button>
                                                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                                                <a className="dropdown-item" id="edit Task" onClick={() => { this.editTask(item.id, t.id) }}>Edit</a>
                                                                                                                <a className="dropdown-item" id="edit Task" onClick={() => { this.handleDoneItem(item.id, t.id) }}>Done</a>
                                                                                                                <a className="dropdown-item text-danger" onClick={() => { this.handleItemArchive(item.id) }}>Archive Card</a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="card-title">
                                                                                                            <Link href={{ pathname: '/taskOverview', query: { taskId: item.id } }}>
                                                                                                                <h6 data-filter-by="text" style={{ cursor: "pointer" }}>{item.name}</h6>
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                        <ImageList Data={item.memberData} />
                                                                                                        <div className="card-meta d-flex justify-content-between">
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                {item.total_task > 0 ?
                                                                                                                    <>
                                                                                                                        <i className="material-icons mr-1">playlist_add_check</i>
                                                                                                                        <span className="text-small">{item.total_done_task > 0 ? item.total_done_task : 0} / {item.total_task > 0 ? item.total_task : 0} </span>
                                                                                                                    </>
                                                                                                                    : ''}
                                                                                                            </div>
                                                                                                            <span className="text-small" data-filter-by="text">
                                                                                                                {item.status == 'Done' ?
                                                                                                                    <span className="badge badge-success">Done</span>
                                                                                                                    : item.due_day && item.due_day > 0 ?
                                                                                                                        item.due_day > 1 ?
                                                                                                                            <span className="badge badge-success">Due in {item.due_day} days</span>
                                                                                                                            :
                                                                                                                            <span className="badge badge-warning">1 day before Due Date</span>
                                                                                                                        :
                                                                                                                        item.due_day == 0 ?
                                                                                                                            <span className="badge badge-success">Due Today</span>
                                                                                                                            :
                                                                                                                            item.due_day < -15 ?
                                                                                                                                <span className="badge badge-danger">Expired</span> :
                                                                                                                                <>
                                                                                                                                    <span className="badge badge-success">{Math.abs(item.due_day)} Days</span>
                                                                                                                                    <span className="badge badge-danger"> Past Due </span>
                                                                                                                                    <span className="badge badge-success">Date</span>
                                                                                                                                </>
                                                                                                                }
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Draggable>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                            <div className="card-list-footer" style={{ marginTop: "10px" }}>
                                                                                <button className="btn btn-link btn-sm text-small" id="add Task" onClick={() => { this.handleShow(t.id) }}>Add task</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                )
                                            })}
                                            <div className="kanban-col" style={{ marginLeft: "8px", marginTop: "9px" }}>
                                                <div className="card-list">
                                                    <button className="btn btn-link btn-sm text-small" id="add-title" onClick={() => this.handleAdd()}>Add list</button>
                                                </div>
                                            </div>
                                        </>
                                        )
                                    }

                                </DragDropContext>
                            </div>
                        </div>
                    </div>
                    {elementId == 'add Task' ?
                        <ModalPopUp
                            show={show}
                            Id={this.state.elementId}
                            Heading={'Add Task'}
                            Text={'Task'}
                            buttonText={'Add'}
                            closeCallBack={() => {
                                this.setState({ show: !show, elementId: null })
                            }}
                            status={statusId}
                            projectId={this.state.projectId} /> :
                        isTaskLoading ? <OuterSpinner /> :
                            <ModalPopUp
                                show={show}
                                Id={this.state.elementId}
                                Heading={'Edit Task'}
                                Text={'Task'}
                                closeCallBack={() => {
                                    this.setState({ show: !show, elementId: null })
                                }}
                                buttonText={'Save'}
                                projectId={this.state.projectId}
                                taskID={this.state.Id}
                                status={statusId}
                            />}

                    {isLoading ? <OuterSpinner /> : <Modal show={modalShow} onHide={this.handleClose.bind(this)}>
                        <div className="modal-header">
                            {elementId == 'edit-title' ?
                                <ModalTitle>Edit Status Type</ModalTitle> : <ModalTitle>New Status Type</ModalTitle>}
                            <button type="button" className="close btn btn-round" onClick={this.handleClose.bind(this)}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <ModalBody>
                            <form role="form" method="POST" action="">
                                <div className="form-group row align-items-center">
                                    <label className="col-3">Title<span className="text-danger">*</span> </label>
                                    {elementId == 'add-title' ?
                                        <input className="form-control col" type="text" placeholder="Title" name="name" onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" />
                                        :
                                        <input className="form-control col" type="text" placeholder="Title" name="name" defaultValue={taskStatusData.name} onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" />
                                    }
                                    <span className="text-danger">{this.state.errorName}</span>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            {elementId == 'edit-title' ?
                                <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                                    Save
                                </button>
                                :
                                <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                                    Add
                            </button>}
                        </ModalFooter>
                    </Modal>}
                </>
        )
    }
}

const mapStateToProps = state => ({
    isStatusLoading: state.taskStatus.isStatusLoading,
    isTaskLoading: state.task.isTaskLoading,
    isLoading: state.task.isLoading,
    project: state.project.project,
    taskStatus: state.taskStatus.taskStatus,
    taskStatusData: state.taskStatus.taskStatusType,
    tasks: state.task.tasks
});

export default
    connect(mapStateToProps,
        {
            getMemberByProjectId,
            createTask,
            updateTask,
            getTaskByProjectId,
            getTaskStatusType,
            getProjectById,
            updateTaskStatus,
            getTaskStatusTypeById,
            updateTaskStatusType,
            getTaskTypes,
            getTaskById,
            createTaskStatusType
        }
    )(KanbanBoard);