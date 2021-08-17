import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
    autoClose: 1000,
    draggable: false
})


export const getMembers = () => dispatch => {
    dispatch({
        type: types.GET_MEMBERS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/member`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_MEMBERS,
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
                    type: types.GET_MEMBERS,
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
                type: types.GET_MEMBERS,
                payload: [],
                isLoading: false
            })
        })
}

export const getMemberByProjectId = (id) => dispatch => {
    dispatch({
        type: types.GET_PROJECT_MEMBER,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/member/project/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_PROJECT_MEMBER,
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
                    type: types.GET_PROJECT_MEMBER,
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
                type: types.GET_PROJECT_MEMBER,
                payload: [],
                isLoading: false
            })
        })
}

export const getMemberByTaskId = (id) => dispatch => {
    dispatch({
        type: types.GET_TASK_MEMBER,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/member/task/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TASK_MEMBER,
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
                    type: types.GET_TASK_MEMBER,
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
                type: types.GET_TASK_MEMBER,
                payload: [],
                isLoading: false
            })
        })
}

export const getMemberByTeamId = (id) => dispatch => {
    dispatch({
        type: types.GET_TEAM_MEMBER,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/member/team/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_TEAM_MEMBER,
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
                    type: types.GET_TEAM_MEMBER,
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
                type: types.GET_TEAM_MEMBER,
                payload: [],
                isLoading: false
            })
        })
}

export const sendUserInvitationEmail = (user) => dispatch => {
    axios
        .post("/v1/mail/send", user)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Mail sent successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            let errorMsg = '';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
}