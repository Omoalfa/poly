import { getFileById, deleteFileByProject, deleteFileByTask } from '../redux/actions/task/taskAction';
import { useDispatch } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const File = ({ file, index, projectId, taskId }) => {
    const dispatch = useDispatch();

    const deleteFile = (id) => {
        if (projectId !== undefined) {
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete?',
                buttons: [
                    {
                        label: 'Confirm',
                        onClick: () => dispatch(deleteFileByProject(id, projectId))
                    },
                    {
                        label: 'Cancel',
                    }
                ]
            });

        } else {
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure you want to delete?',
                buttons: [
                    {
                        label: 'Confirm',
                        onClick: () => dispatch(deleteFileByTask(id, taskId))
                    },
                    {
                        label: 'Cancel',
                    }
                ]
            });
        }
    }

    const downloadFile = (id) => {
        dispatch(getFileById(id));
    }

    return (
        <li className="list-group-item" key={index}>
            <div className="media align-items-center">
                <ul className="avatars">
                    <li>
                        <div className="avatar bg-primary">
                            <i className="material-icons">insert_drive_file</i>
                        </div>
                    </li>
                    <li>
                        {file.guid != null ?
                            <img alt={file.display_name} src={file.guid} className="avatar" data-title={file.display_name} data-toggle="tooltip" />
                            :
                            <img alt={file.display_name} src='assets/img/user.svg' className="avatar" data-title={file.display_name} data-toggle="tooltip" />}

                    </li>
                </ul>
                <div className="media-body d-flex justify-content-between align-items-center">
                    <div>
                        <a href="#" data-filter-by="text">{file.name}</a>
                        <br />
                        <span className="text-small" data-filter-by="text">{file.size} kb {file.type}</span>
                    </div>
                    <div className="dropdown">
                        <button className="btn-options" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="material-icons">more_vert</i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" >
                                <a href={`/v1/file/${file.id}`}>Download</a>
                            </button>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item text-danger" onClick={() => { deleteFile(file.id) }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default File;