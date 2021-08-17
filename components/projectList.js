import Link from 'next/link';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { ImageList, ModalPopUp, OuterSpinner, RecordNotFound, Spinner } from '.';
import { deleteProject, getProjectById } from '../redux/actions/project/projectAction';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: null
        };
    }

    editProject = (id) => {
        this.props.getProjectById(id);
        this.setState({
            show: true,
            Id: id,
            elementId: document.getElementById('edit Project').id
        });
    }

    deleteProject = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.deleteProject(id, this.props.teamId)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    render() {
        const { show } = this.state;
        const { projects, isLoading, id } = this.props;
        return (
            <>
                <div className="list content-list-body row" style={{ minHeight: "200px" }}>
                    {isLoading ?
                        <Spinner /> :
                        projects.length > 0 ? projects.map((project, index) => {
                            return (
                                <div className="col-lg-6" key={index}>
                                    <div className="card card-project">
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
                                        <div className="card-body">
                                            {id == undefined ?
                                                <div className="dropdown card-options">
                                                    <button className="btn-options" type="button" id="project-dropdown-button-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="material-icons">more_vert</i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <Link href={{ pathname: '/projectOverview', query: { projectId: project.id } }}>
                                                            <a className="dropdown-item">Overview</a>
                                                        </Link>
                                                        <button className="dropdown-item" id="edit Project" onClick={() => { this.editProject(project.id) }}>Edit</button>
                                                        <div className="dropdown-divider"></div>
                                                        <button className="dropdown-item text-danger" onClick={() => { this.deleteProject(project.id) }}>Delete</button>
                                                    </div>
                                                </div>
                                                : ''}
                                            <div className="card-title">
                                                <Link href={{ pathname: '/projectOverview', query: { projectId: project.id } }}>
                                                    <h5 className="H5-filter-by-text" data-filter-by={"text"} style={{ cursor: "pointer" }}>{project.name}</h5>
                                                </Link>
                                            </div>
                                            <ImageList Data={project.memberData} />
                                            <div className="card-meta d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    {project.total_task > 0 ?
                                                        <>
                                                            <i className="material-icons mr-1">playlist_add_check</i>
                                                            <span className="text-small">{project.total_done_task > 0 ? project.total_done_task : 0} / {project.total_task > 0 ? project.total_task : 0} </span>
                                                        </>
                                                        : ''}
                                                </div>
                                                <span className="text-small" data-filter-by="text">
                                                    {project.task_percentage == 100 ?
                                                        <span className="badge badge-success">Done</span>
                                                        : project.due_day && project.due_day > 0 ?
                                                            project.due_day > 1 ?
                                                                <span className="badge badge-success">Due in {project.due_day} days</span>
                                                                :
                                                                <span className="badge badge-warning">1 day before Due Date</span>
                                                            :
                                                            project.due_day == 0 ?
                                                                <span className="badge badge-success">Due Today</span>
                                                                :
                                                                project.due_day < -15 ?
                                                                    <span className="badge badge-danger">Expired</span> :
                                                                    <>
                                                                        <span className="badge badge-success">{Math.abs(project.due_day)} Days</span>
                                                                        <span className="badge badge-danger"> Past Due </span>
                                                                        <span className="badge badge-success">Date</span>
                                                                    </>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <RecordNotFound />
                    }
                </div >
                {this.props.projectLoading ? <OuterSpinner /> :
                    <ModalPopUp
                        show={this.state.show}
                        Id={this.state.elementId}
                        Heading={'Edit Project'}
                        Text={'Project'}
                        buttonText={'Save'}
                        closeCallBack={() => {
                            this.setState({ show: !show })
                        }}
                        projectID={this.state.Id}
                        teamId={this.props.teamId}
                    />}
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.project.isLoading,
    projectLoading: state.project.projectLoading
});

export default connect(
    mapStateToProps,
    {
        getProjectById,
        deleteProject
    },
)(ProjectList);