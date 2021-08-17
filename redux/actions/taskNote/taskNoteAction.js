import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
    autoClose: 1000,
    draggable: false
})

export const getTaskNoteById = (id) => dispatch => {
    dispatch({
        type: types.GET_NOTES,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/taskNote/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_NOTES,
                    payload: response.data.data,
                    isLoading:false
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
            dispatch({
                type: types.GET_NOTES,
                payload: [],
                isLoading: true
            })
        })
}


export const getTaskNoteByNoteId = (id) => dispatch => {
    dispatch({
        type: types.GET_NOTE,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/taskNote/note/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_NOTE,
                    payload: response.data.data[0],
                    isLoading:false
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
            dispatch({
                type: types.GET_NOTE,
                payload: [],
                isLoading: true
            })
        })
}

export const createTaskNote = (
    task
) => dispatch => {
    dispatch({
        type: types.GET_NOTES,
        payload: [],
        isLoading:true
    })
    const {description} = task
    let encoded = encodeURIComponent(description)
    axios
        .post("/v1/taskNote/create", {...task,description:encoded})
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Note created successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(task.taskId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(task.taskId));
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
            dispatch(getTaskNoteById(task.taskId));
        });
};


export const updateTaskNote = (
    id,
    task
) => dispatch => {
    dispatch({
        type: types.GET_NOTES,
        payload: [],
        isLoading:true
    })
    const {description} = task
    let encoded = encodeURIComponent(description)
    axios
        .put(`/v1/taskNote/update/${id}`, {...task,description:encoded})
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Note updated successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(task.taskId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(task.taskId));
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
            dispatch(getTaskNoteById(task.taskId));
        });
};

export const deleteTaskNote = (id, taskId) => dispatch => {
    dispatch({
        type: types.GET_NOTES,
        payload: [],
        isLoading:true
    })
    axios
        .delete(`/v1/taskNote/delete/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Note deleted successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(taskId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskNoteById(taskId));
            }
        })
        .catch(error => {
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
            dispatch(getTaskNoteById(taskId));
        })
}

