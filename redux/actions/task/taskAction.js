import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMemberByProjectId, getMemberByTaskId } from '../member/memberAction';
import { getProjectById } from '../project/projectAction';

toast.configure({
    autoClose: 1000,
    draggable: false
})

export const getTaskTypes = () => dispatch => {
    axios
        .get(`/v1/task/taskType`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASK_TYPES,
                    payload: response.data.data
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        })
}


export const getTaskByProjectId = (id) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/task/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASKS,
                    payload: response.data.data,
                    isLoading: false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        })
}

export const getTaskById = (id) => dispatch => {
    dispatch({
        type: types.GET_TASK,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/task/task/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASK,
                    payload: response.data.data[0],
                    isLoading: false
                })
                dispatch(getMemberByProjectId(response.data.data[0].project_id));
                dispatch(getMemberByTaskId(id))
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_TASK,
                    payload: [],
                    isLoading: true
                })
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch({
                type: types.GET_TASK,
                payload: [],
                isLoading: true
            })
        })
}

export const createTask = (
    task
) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .post("/v1/task/create", task)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Task created successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectById(task.projectId));
                dispatch(getTaskByProjectId(task.projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectById(task.projectId));
                dispatch(getTaskByProjectId(task.projectId));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getProjectById(task.projectId));
            dispatch(getTaskByProjectId(task.projectId));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        });
};


export const updateTask = (
    id,
    task
) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/task/update/${id}`, task)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Task updated successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectById(task.projectId));
                dispatch(getTaskByProjectId(task.projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectById(task.projectId));
                dispatch(getTaskByProjectId(task.projectId));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getProjectById(task.projectId));
            dispatch(getTaskByProjectId(task.projectId));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        });
};

export const updateTaskStatus = (
    id,
    task
) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/task/updateStatus/${id}`, task)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Task status change successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(task.projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(task.projectId));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getTaskByProjectId(task.projectId));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        });
};

export const completeTaskStatus = (id) => dispatch => {
    axios
        .put(`/v1/task/updateStatus/${id}`, { status: 'Done' })
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Task status change successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskById(id));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskById(id));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getTaskById(id));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        });
};

export const archiveTask = (
    id,
    projectId,
    data
) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/task/archiveTask/${id}`, data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('updated successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskTypes());
                dispatch(getTaskByProjectId(projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskTypes());
                dispatch(getTaskByProjectId(projectId));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getTaskTypes());
            dispatch(getTaskByProjectId(projectId));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        });
};

export const deleteTask = (id, projectId) => dispatch => {
    dispatch({
        type: types.GET_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .delete(`/v1/task/delete/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Task deleted successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(projectId));
                dispatch(getProjectById(projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(projectId));
                dispatch({
                    type: types.GET_TASKS,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getTaskByProjectId(projectId));
            dispatch({
                type: types.GET_TASKS,
                payload: [],
                isLoading: false
            })
        })
}

export const uploadFileByProject = (
    projectId,
    file
) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    let Data = new FormData();
    Data.append('File', file);
    axios
        .post(`/v1/file/project/${projectId}`, Data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('File uploaded successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataByProjectId(projectId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataByProjectId(projectId));
                dispatch({
                    type: types.GET_FILES,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getFileDataByProjectId(projectId));
            dispatch({
                type: types.GET_FILES,
                payload: [],
                isLoading: false
            })
        });
};

export const uploadFileByTask = (
    taskId,
    file
) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    let Data = new FormData();
    Data.append('File', file);
    axios
        .post(`/v1/file/task/${taskId}`, Data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('File uploaded successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataBytaskId(taskId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataBytaskId(taskId));
                dispatch({
                    type: types.GET_FILES,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getFileDataBytaskId(taskId));
            dispatch({
                type: types.GET_FILES,
                payload: [],
                isLoading: false
            })
        });
};


export const getFileDataByProjectId = (id) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/file/project/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_FILES,
                    payload: response.data.data,
                    isLoading: false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_FILES,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch({
                type: types.GET_FILES,
                payload: [],
                isLoading: false
            })
        })
}

export const getFileDataBytaskId = (id) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/file/task/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_FILES,
                    payload: response.data.data,
                    isLoading: false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_FILES,
                    payload: [],
                    isLoading: false
                })
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch({
                type: types.GET_FILES,
                payload: [],
                isLoading: false
            })
        })
}

export const deleteFileByProject = (
    id,
    projectId
) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    axios
        .delete(`/v1/file/delete/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('File deleted successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataByProjectId(projectId));
            } else {
                dispatch(getFileDataByProjectId(projectId));
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            dispatch(getFileDataByProjectId(projectId));
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        })
}


export const deleteFileByTask = (
    id,
    taskId
) => dispatch => {
    dispatch({
        type: types.GET_FILES,
        payload: [],
        isLoading: true
    })
    axios
        .delete(`/v1/file/delete/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('File deleted successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getFileDataBytaskId(taskId));
            } else {
                dispatch(getFileDataBytaskId(taskId));
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            dispatch(getFileDataBytaskId(taskId));
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        })
}

export const getFileById = (id) => dispatch => {
    axios
        .get(`/v1/file/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                window.open(response.data.data);
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            console.log(error);
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        })
}

export const validateAccess = () => dispatch => {
    axios
        .get(`/v1/auth/validateAccess`)
        .then(response => {
            dispatch({
                type: types.SET_USER,
                payload: response.data.user
            })
        })
        .catch(error => {
            console.log(error)
        })
}