import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getTaskByProjectId } from '../task/taskAction';

toast.configure({
    autoClose: 1000,
    draggable: false
})

export const getTaskStatusType = () => dispatch => {
    dispatch({
        type: types.GET_TASK_STATUS_TYPES,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/taskStatusType/`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASK_STATUS_TYPES,
                    payload: response.data.data,
                    isLoading: false
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

export const getTaskStatusTypeById = (id) => dispatch => {
    dispatch({
        type: types.GET_TASK_STATUS_TYPE,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/taskStatusType/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASK_STATUS_TYPE,
                    payload: response.data.data[0],
                    isLoading: false
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

export const createTaskStatusType = (
    data
) => dispatch => {
    axios
        .post(`/v1/taskStatusType/create`, data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('create successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskStatusType());
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskStatusType());
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            dispatch(getTaskStatusType());
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
};



export const updateTaskStatusType = (
    id,
    data
) => dispatch => {
    axios
        .put(`/v1/taskStatusType/update/${id}`, data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('update successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(data.projectId));
                dispatch(getTaskStatusType());
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskByProjectId(data.projectId));
                dispatch(getTaskStatusType());
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            dispatch(getTaskStatusType());
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
};



