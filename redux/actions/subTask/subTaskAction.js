import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getTaskById } from '../task/taskAction';

toast.configure({
    autoClose: 1000,
    draggable: false
})

export const getSubTaskByTaskId = (id) => dispatch => {
    dispatch({
        type: types.GET_SUB_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/subTask/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_SUB_TASKS,
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
                    type: types.GET_SUB_TASKS,
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
                type: types.GET_SUB_TASKS,
                payload: [],
                isLoading: false
            })
        })
}

export const createSubTask = (
    task
) => dispatch => {
    dispatch({
        type: types.GET_SUB_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .post("/v1/subTask/create", task)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Sub Task added successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskById(task.taskId));
                dispatch(getSubTaskByTaskId(task.taskId));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskById(task.taskId));
                dispatch({
                    type: types.GET_SUB_TASKS,
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
            dispatch(getTaskById(task.taskId));
            dispatch(getSubTaskByTaskId(task.taskId));
            dispatch({
                type: types.GET_SUB_TASKS,
                payload: [],
                isLoading: false
            })
        });
};


export const updateSubTask = (
    id,
    task
) => dispatch => {
    dispatch({
        type: types.GET_SUB_TASKS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/subTask/update/${id}`, task)
        .then(response => {
            if (response.data && response.data.status == 'success') {

                toast.success('Task updated', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getTaskById(id));
                dispatch(getSubTaskByTaskId(id));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_SUB_TASKS,
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
            dispatch(getSubTaskByTaskId(id));
            dispatch({
                type: types.GET_SUB_TASKS,
                payload: [],
                isLoading: false
            })
        });
};

