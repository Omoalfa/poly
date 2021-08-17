import React from 'react'
import { connect } from 'react-redux';
import { NoteList, Spinner } from '.'
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { createSubTask, updateSubTask } from '../redux/actions/subTask/subTaskAction';
import RecordNotFound from './RecordNotFound';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

class TaskCheckList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: null,
            description: null,
            errorName: null,
            errorDescription: null,
            filteredSubtask: [],
            searchText: [],
            subtasks: [],
            showComplete: false
        }
        this.handlechange = this.handlechange.bind(this)
    }

    handleChangee = (Id, task) => {
        const data = [];
        this.setState({ showComplete: true })
        this.state.subtasks.map(t => {
            let d = {};
            if (Id == t.id) {
                if (task.status == 'Pending') {
                    t.status = 'Done';
                }
                else {
                    t.status = 'Pending';
                }
                data.push(t)
            } else {
                data.push(t)
            }
        })
        this.setState({ subtasks: data })
    }

    updateSubTask = () => {
        const d = [];
        this.state.subtasks.map(task => {
            task.updated_by = this.props.user.userId;
            task.updated_at = Date.now();
            d.push(task)
        })
        this.props.updateSubTask(this.props.id, d);
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleClick = () => {
        if (this.state.name !== null) {
            if (this.state.description !== null) {
                const data = {
                    name: this.state.name,
                    description: this.state.description,
                    taskId: this.props.id
                }
                this.props.createSubTask(data);
                this.setState({ show: false, name: null, description: null, errorName: null, errorDescription: null });
            } else {
                this.setState({ errorDescription: "Please Enter Description" });
            }
        } else {
            this.setState({ errorName: "Please Enter Name" });
        }
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredSubtask: this.props.subtasks.filter(subtask => (subtask.name.toLowerCase()).includes(searchText.toLowerCase())) })
        } else {
            this.setState({ filteredSubtask: [] })
        }
    }

    getList = id => this.state.subtasks;

    onDragEnd = result => {
        this.setState({ showComplete: true })
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(this.getList(source.droppableId), source.index, destination.index);
            const data = [];
            items.map((i, index) => {
                i.list_order = index + 1;
                data.push(i)
            })
            this.setState({ subtasks: data });

        }
    };

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.subtasks) {
            this.setState({ subtasks: nextProps.subtasks })
        }
    }

    componentWillUnmount() {
        this.setState({ subtasks: [] })
    }

    render() {
        const { isLoading, status } = this.props;
        const { subtasks, searchText, filteredSubtask, showComplete } = this.state;
        console.log(subtasks);
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className="tab-pane fade show active" id="task" role="tabpanel">
                        <div className="row content-list-head">
                            <div className="col-auto">
                                <h3>Checklist</h3>
                                <button className="btn btn-round" onClick={this.handleShow}>
                                    <i className="material-icons">add</i>
                                </button>
                            </div>
                            <form className="col-md-auto">
                                <div className="input-group input-group-round">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="material-icons">filter_list</i>
                                        </span>
                                    </div>
                                    <input type="search" className="form-control" placeholder="Filter checklist" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                                </div>
                            </form>
                        </div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId={'checkListID'}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        <div className="content-list-body">


                                            {searchText.length > 0 ?
                                                filteredSubtask.length > 0 ? filteredSubtask.map((task, index) => {
                                                    const id = `checklist-item-${task.id}`;
                                                    return (
                                                        <form className="checklist" key={index}>
                                                            <div className="row">
                                                                <div className="form-group col">
                                                                    <span className="checklist-reorder">
                                                                        <i className="material-icons">reorder</i>
                                                                    </span>
                                                                    <div className="custom-control custom-checkbox col" >
                                                                        {status && status == 'Done' ?
                                                                            <input type="checkbox" className="custom-control-input" id={id} value={task.id} onChange={(event) => { this.handleChangee(event.target.value, task) }} checked disabled />
                                                                            :
                                                                            <input type="checkbox" className="custom-control-input" id={id} value={task.id} onChange={(event) => { this.handleChangee(event.target.value, task) }} defaultChecked={task.status == 'Done'} />
                                                                        }
                                                                        <label className="custom-control-label" htmlFor={id}></label>
                                                                        <div style={{ width: '100%' }}>
                                                                            <input type="text" placeholder="Checklist item" defaultValue={task.name} style={{ width: '100%' }}
                                                                                onChange={(event) => {
                                                                                    const { value } = event.target;
                                                                                    this.state.subtasks[index].name = value;
                                                                                    this.setState({ showComplete: true })
                                                                                }} />
                                                                            <div className="checklist-strikethrough"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )
                                                }) : <RecordNotFound /> :
                                                subtasks.length > 0 ? subtasks.map((task, index) => {
                                                    const id = `checklist-item-${task.id}`;
                                                    return (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={task.id.toString()}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <form className="checklist" key={index} ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}>
                                                                    <div className="row">
                                                                        <div className="form-group col">
                                                                            <span>
                                                                                <i className="material-icons">reorder</i>
                                                                            </span>
                                                                            <div className="custom-control custom-checkbox col" >
                                                                                {status && status == 'Done' ?
                                                                                    <input type="checkbox" className="custom-control-input" id={id} value={task.id} onChange={(event) => { this.handleChangee(event.target.value, task) }} checked disabled />
                                                                                    :
                                                                                    <input type="checkbox" className="custom-control-input" id={id} value={task.id} onChange={(event) => { this.handleChangee(event.target.value, task) }} defaultChecked={task.status == 'Done'} />
                                                                                }

                                                                                <label className="custom-control-label" htmlFor={id}></label>
                                                                                <div style={{ width: '100%' }}>
                                                                                    <input type="text" placeholder="Checklist item" defaultValue={task.name} style={{ width: '100%' }}
                                                                                        onChange={(event) => {
                                                                                            const { value } = event.target;
                                                                                            this.state.subtasks[index].name = value;
                                                                                            this.setState({ showComplete: true })
                                                                                        }} />
                                                                                    <div className="checklist-strikethrough"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </Draggable>
                                                    )
                                                }) :
                                                    <span style={{ paddingLeft: "50%", marginTop: "70px", marginLeft: "-60px", color: "black" }}>
                                                        <button type="button" class="btn btn-primary" onClick={this.handleShow}>
                                                            Add Checklist</button>
                                                    </span>
                                            }
                                            <div className="drop-to-delete">
                                                <div className="drag-to-delete-title">
                                                    <i className="material-icons">delete</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                            {showComplete && (
                                <button type="button" class="btn btn-success" onClick={this.updateSubTask}>
                                    Update List
                                </button>
                            )}
                        </DragDropContext>
                        <NoteList id={this.props.id} />
                    </div>
                }
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <div className="modal-header">
                        <ModalTitle>New Checklist</ModalTitle>
                        <button type="button" className="close btn btn-round" onClick={this.handleClose}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                    <ModalBody>
                        <form role="form" method="POST" action="">
                            <div className="form-group row align-items-center">
                                <label className="col-3">Title<span className="text-danger">*</span> </label>
                                <input className="form-control col" type="text" placeholder="Title" name="task-name" onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" /> <br />
                                <span className="text-danger">{this.state.errorName}</span>
                            </div>
                            <div className="form-group row align-items-center">
                                <label className="col-3">Description<span className="text-danger">*</span> </label>
                                <input className="form-control col" type="text" placeholder="Description" name="description" onChange={(event) => { this.setState({ description: event.target.value, errorDescription: null }) }} autoComplete="off" /> <br />
                                <span className="text-danger">{this.state.errorDescription}</span>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                            Add
                        </button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}


const mapStateToProps = state => ({
    subtasks: state.subTask.subtasks,
    isLoading: state.subTask.isLoading,
    user: state.task.user
});

export default connect(mapStateToProps,
    {
        createSubTask,
        updateSubTask
    }
)(TaskCheckList);
