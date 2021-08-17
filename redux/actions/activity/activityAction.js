import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure({
    autoClose: 1000,
    draggable: false
})


export const getActivites = () => dispatch => {
    axios
        .get(`/v1/activity`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_ACTIVITIES,
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

export const getActivityByProjectId = (id) => dispatch => {
    dispatch({
        type: types.GET_ACTIVITIES,
        payload: [],
        isLoading:true
    })
    axios
        .get(`/v1/activity/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_ACTIVITIES,
                    payload: response.data.data,
                    isLoading:false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_ACTIVITIES,
                    payload: [],
                    isLoading:false
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
                type: types.GET_ACTIVITIES,
                payload: [],
                isLoading:false
            })
        })
}

export const getActivityByTaskId = (id) => dispatch => {
    dispatch({
        type: types.GET_ACTIVITIES,
        payload: [],
        isLoading:true
    })
    axios
        .get(`/v1/activity/task/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_ACTIVITIES,
                    payload: response.data.data,
                    isLoading:false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_ACTIVITIES,
                    payload: [],
                    isLoading:false
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
                type: types.GET_ACTIVITIES,
                payload: [],
                isLoading:false
            })
        })
}