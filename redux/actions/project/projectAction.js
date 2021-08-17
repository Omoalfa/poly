import axios from 'axios'
import * as types from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getMemberByProjectId } from '../member/memberAction';
toast.configure({
    autoClose: 1000,
    draggable: false
})

export const getProjects = () => dispatch => {
    dispatch({
        type: types.GET_PROJECTS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/project/`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_PROJECTS,
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
                    type: types.GET_PROJECTS,
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
                type: types.GET_PROJECTS,
                payload: [],
                isLoading: false
            })
        })
}

export const getProjectsByTeamId = (Id) => dispatch => {
    dispatch({
        type: types.GET_PROJECTS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/project/${Id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_PROJECTS,
                    payload: response.data.data,
                    isLoading: false
                });
                dispatch({
                    type: types.GET_PROJECT,
                    payload: [],
                    isLoading: false
                })             
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_PROJECTS,
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
                type: types.GET_PROJECTS,
                payload: [],
                isLoading: false
            })
        })
}

export const getProjectById = (id) => dispatch => {
    dispatch({
        type: types.GET_PROJECT,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/project/fetch/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_PROJECT,
                    payload: response.data.data[0],
                    isLoading: false
                })
                dispatch(getMemberByProjectId(id));
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_PROJECTS,
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
            dispatch(getMemberByProjectId(id));
            dispatch({
                type: types.GET_PROJECTS,
                payload: [],
                isLoading: false
            })
        })
}

export const createProject = (
    project
) => dispatch => {
    dispatch({
        type: types.GET_PROJECTS,
        payload: [],
        isLoading: true
    })
    axios
        .post("/v1/project/create", project)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Project created successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectsByTeamId(project.teamId));
            } else {
                dispatch(getProjectsByTeamId(project.teamId));
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            dispatch(getProjectsByTeamId(project.teamId));
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
};

export const updateProject = (
    id,
    project
) => dispatch => {
    dispatch({
        type: types.GET_PROJECTS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/project/update/${id}`, project)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Project updated successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectsByTeamId(project.teamId));
            } else {
                dispatch(getProjectsByTeamId(project.teamId));
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            dispatch(getProjectsByTeamId(project.teamId));
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
};

export const deleteProject = (
    id,
    teamId
) => dispatch => {
    dispatch({
        type: types.GET_PROJECTS,
        payload: [],
        isLoading: true
    })
    axios
        .delete(`/v1/project/delete/${id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('Project deleted successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getProjectsByTeamId(teamId));
            } else {
                dispatch(getProjectsByTeamId(teamId));
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }
        })
        .catch(error => {
            dispatch(getProjectsByTeamId(teamId));
            toast.error('Something Went Wrong. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        })
}

export const getHomePageDetails = () => dispatch => {
    dispatch({
        type: types.GET_HOME_PAGE_DETAILS,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/projectDetail/`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_HOME_PAGE_DETAILS,
                    payload: response.data.data[0],
                    isLoading: false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_HOME_PAGE_DETAILS,
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
                type: types.GET_HOME_PAGE_DETAILS,
                payload: [],
                isLoading: false
            })
        })
}

export const getHomePageDetail = (Id) => dispatch => {
    dispatch({
        type: types.GET_HOME_PAGE_DETAIL,
        payload: [],
        isLoading: true
    })
    axios
        .get(`/v1/projectDetail/${Id}`)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                dispatch({
                    type: types.GET_HOME_PAGE_DETAIL,
                    payload: response.data.data[0],
                    isLoading: false
                })
            } else {
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch({
                    type: types.GET_HOME_PAGE_DETAIL,
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
                type: types.GET_HOME_PAGE_DETAIL,
                payload: [],
                isLoading: false
            })
        })
}

export const updateDetail = (
    id,
    data
) => dispatch => {
    dispatch({
        type: types.GET_HOME_PAGE_DETAILS,
        payload: [],
        isLoading: true
    })
    axios
        .put(`/v1/projectDetail/update/${id}`, data)
        .then(response => {
            if (response.data && response.data.status == 'success') {
                toast.success('updated successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
                dispatch(getHomePageDetails());
            } else {
                dispatch(getHomePageDetail());
                toast.error('Something Went Wrong. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                    draggable: false,
                });
            }

        })
        .catch(error => {
            let errorMsg = 'Something Went Wrong. Please try again.';
            if (error.response.data.error) {
                errorMsg = error.response.data.error.message;
            }
            dispatch(getHomePageDetail(id));
            toast.error(errorMsg, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                draggable: false,
            });
        });
};

