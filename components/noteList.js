import { Markup } from 'interweave';
import moment from 'moment';
import dynamic from 'next/dynamic';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { OuterSpinner } from '.';
import { createTaskNote, deleteTaskNote, getTaskNoteByNoteId, updateTaskNote } from '../redux/actions/taskNote/taskNoteAction';
import RecordNotFound from './RecordNotFound';
const JoditEditor = dynamic(
    () => import('jodit-react'),
    { ssr: false }
);

class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: null,
            description: null,
            errorName: null,
            errorDescription: null,
            elementId: null,
            id: null,
            filteredNotes: [],
            searchText: []
        }
        this.editor = React.createRef();
        this.handlechange = this.handlechange.bind(this);
    }

    UNSAFE_componentWillReceiveProps = (nextprops) => {
        if (this.state.elementId == 'edit-note') {
            this.setState({
                name: nextprops.note.name,
                description: nextprops.note.description
            })
        }
    }

    handleShow = (obj) => {
        this.setState({ show: true });
    }

    handleClose = (obj) => {
        this.setState({ show: false, elementId: null });
    }

    handleClick = () => {
        if (this.state.name !== null) {
            const data = {
                name: this.state.name,
                description: this.state.description,
                taskId: this.props.id
            }
            if (this.state.elementId == 'edit-note') {
                this.props.updateTaskNote(this.state.id, data);
            } else {
                this.props.createTaskNote(data);
            }
            this.setState({ show: false, elementId: null, name: null, description: null, errorName: null, errorDescription: null });
        } else {
            this.setState({ errorName: "Please Enter Title" });
        }
    }

    Edit = (obj, id) => {
        this.setState({ show: true, id: obj, elementId: document.getElementById('edit-note').id });
        this.props.getTaskNoteByNoteId(obj);
    }

    Delete = (obj, id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.deleteTaskNote(obj, this.props.id)
                },
                {
                    label: 'Cancel',
                }
            ]
        });

    }

    setContent = (event) => {
        this.setState({ description: event });
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredNotes: this.props.notes.filter(note => (note.name.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase()))) })
        } else {
            this.setState({ filteredNotes: [] })
        }
    }
    getDifferenceString = (time) => {
        if (moment().diff(time, 'minutes') === 0) {
            return 'Just Now'
        }
        if (moment().diff(time, 'hours') === 0) {
            const minDiff = moment().diff(time, 'minutes');
            return `${minDiff} minutes ago`
        }
        if (moment().diff(time, 'days') === 0) {
            const minDiff = moment().diff(time, 'hours');
            return `${minDiff} hours ago`
        }
        if (moment().diff(time, 'months') === 0) {
            const minDiff = moment().diff(time, 'days');
            return `${minDiff} days ago`
        }
        if (moment().diff(time, 'years') === 0) {
            const minDiff = moment().diff(time, 'months');
            return `${minDiff} months ago`
        }

        if (moment().diff(time, 'years') > 0) {
            const minDiff = moment().diff(time, 'years');
            return `${minDiff} years ago`
        }
    }

    render() {
        const { isLoading, notes, innerLoading } = this.props;
        const { elementId, searchText, filteredNotes } = this.state;
        const config = {
            zIndex: 0,
            readonly: false,
            activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
            toolbarButtonSize: 'middle',
            theme: 'default',
            enableDragAndDropFileToEditor: true,
            saveModeInCookie: false,
            spellcheck: true,
            editorCssClass: false,
            triggerChangeEvent: true,
            height: 120,
            direction: 'ltr',
            language: 'en',
            debugLanguage: false,
            i18n: 'en',
            tabIndex: -1,
            toolbar: true,
            enter: 'P',
            useSplitMode: false,
            colorPickerDefaultTab: 'background',
            imageDefaultWidth: 100,
            removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
            disablePlugins: ['paste', 'stat'],
            events: {},
            textIcons: false,
            uploader: {
                insertImageAsBase64URI: true
            },
            placeholder: 'Body text for note',
            showXPathInStatusbar: false
        };

        return (
            <>
                {isLoading ? <OuterSpinner /> :
                    <div className="content-list">
                        <div className="row content-list-head">
                            <div className="col-auto">
                                <h3>Notes</h3>
                                <button className="btn btn-round" onClick={this.handleShow.bind(this)}>
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
                                    <input type="search" className="form-control" placeholder="Filter notes" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                                </div>
                            </form>
                        </div>
                        {searchText.length > 0 ?
                            filteredNotes.length > 0 ? filteredNotes.map((note, index) => {
                                return (
                                    <div className="content-list-body" key={index}>
                                        <div className="card card-note">
                                            <div className="card-header">
                                                <div className="media align-items-center">
                                                    <img alt={note.display_name} src={note.guid} className="avatar" data-toggle="tooltip" data-title={note.display_name} data-filter-by="alt" />
                                                    <div className="media-body">
                                                        <h6 className="mb-0">{note.name}</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span>{this.getDifferenceString(note.created_at)}</span>
                                                    <div className="ml-1 dropdown card-options">
                                                        <button className="btn-options" type="button" id="note-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="material-icons">more_vert</i>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <button className="dropdown-item" id='edit-note' onClick={this.Edit.bind(this, note.id)}>Edit</button>
                                                            <button className="dropdown-item text-danger" onClick={this.Delete.bind(this, note.id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <Markup content={note.description} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <RecordNotFound /> :
                            notes.length > 0 ? notes.map((note, index) => {
                                return (
                                    <div className="content-list-body" key={index}>
                                        <div className="card card-note">
                                            <div className="card-header">
                                                <div className="media align-items-center">
                                                    {note.guid != null ?
                                                        <img alt={note.display_name} src={note.guid} className="avatar" data-toggle="tooltip" data-title={note.display_name} />
                                                        :
                                                        <img alt={note.display_name} src='assets/img/user.svg' className="avatar" data-toggle="tooltip" data-title={note.display_name} />}
                                                    <div className="media-body">
                                                        <h6 className="mb-0">{note.name}</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span>{this.getDifferenceString(note.created_at)}</span>
                                                    <div className="ml-1 dropdown card-options">
                                                        <button className="btn-options" type="button" id="note-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="material-icons">more_vert</i>
                                                        </button>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <button className="dropdown-item" id='edit-note' onClick={this.Edit.bind(this, note.id)}>Edit</button>
                                                            <button className="dropdown-item text-danger" onClick={this.Delete.bind(this, note.id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <Markup content={note.description} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :
                                <span style={{ paddingLeft: "50%", marginTop: "70px", marginLeft: "-60px", color: "black" }}>
                                    <button type="button" class="btn btn-primary" onClick={this.handleShow.bind(this)}>
                                        Add Notes
                                    </button>
                                </span>
                        }
                    </div>}
                {innerLoading ? <OuterSpinner /> :
                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <div className="modal-header">
                            {elementId == 'edit-note' ?
                                <ModalTitle>Edit Note</ModalTitle> : <ModalTitle>New Note</ModalTitle>}
                            <button type="button" className="close btn btn-round" onClick={this.handleClose.bind(this)}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <ModalBody>
                            <form role="form" method="POST" action="">
                                {elementId == 'edit-note' ?
                                    <>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Title<span className="text-danger">*</span> </label>
                                            <input className="form-control col" type="text" placeholder="Note title" name="task-name" defaultValue={this.state.name} onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" /> <br />
                                            <span className="text-danger">{this.state.errorName}</span>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Text<span className="text-danger">*</span> </label>
                                            <JoditEditor
                                                className="form-control"
                                                ref={this.editor}
                                                value={this.state.description}
                                                config={config}
                                                onBlur={newContent => this.setContent(newContent)}
                                                // onChange={newContent => this.setContent(newContent)}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Title<span className="text-danger">*</span> </label>
                                            <input className="form-control col" type="text" placeholder="Note title" name="task-name" onChange={(event) => { this.setState({ name: event.target.value, errorName: null }) }} autoComplete="off" /> <br />
                                            <span className="text-danger">{this.state.errorName}</span>
                                        </div>
                                        <div className="form-group row align-items-center">
                                            <label className="col-3">Text<span className="text-danger">*</span> </label>
                                            <JoditEditor
                                                className="form-control"
                                                ref={this.editor}
                                                config={config}
                                                onBlur={newContent => this.setContent(newContent)}
                                                onChange={newContent => this.setContent(newContent)}
                                            />
                                        </div>
                                    </>}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                                {elementId == 'edit-note' ? 'Save' : 'Add'}
                            </button>
                        </ModalFooter>
                    </Modal>}
            </>
        )
    }
}


const mapStateToProps = state => ({
    notes: state.taskNotes.notes,
    note: state.taskNotes.note,
    isLoading: state.taskNotes.isLoading,
    innerLoading: state.taskNotes.innerLoading
});

export default connect(mapStateToProps,
    {
        createTaskNote,
        getTaskNoteByNoteId,
        updateTaskNote,
        deleteTaskNote
    }
)(NoteList);
