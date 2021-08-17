import axios from "axios";
import * as types from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMemberByTeamId } from "../member/memberAction";
toast.configure({
	autoClose: 1000,
	draggable: false
});

export const getTeams = () => (dispatch) => {
	dispatch({
		type: types.GET_TEAMS,
		payload: [],
		isLoading: true
	});
	axios
		.get(`/v1/team`)
		.then((response) => {
			if (response.data && response.data.status == "success") {
				dispatch({
					type: types.GET_TEAMS,
					payload: response.data.data,
					isLoading: false
				});
			} else {
				toast.error("Something Went Wrong. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
				dispatch({
					type: types.GET_TEAMS,
					payload: [],
					isLoading: false
				});
			}
		})
		.catch((error) => {
			toast.error("Something Went Wrong. Please try again.", {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 3000,
				draggable: false
			});
			dispatch({
				type: types.GET_TEAMS,
				payload: [],
				isLoading: false
			});
		});
};

export const getTeamById = (id) => (dispatch) => {
	dispatch({
		type: types.GET_TEAM,
		payload: [],
		isLoading: true
	});
	axios
		.get(`/v1/team/${id}`)
		.then((response) => {
			if (response.data && response.data.status == "success") {
				dispatch({
					type: types.GET_TEAM,
					payload: response.data.data[0],
					isLoading: false
				});
				dispatch(getMemberByTeamId(id));
			} else {
				toast.error("Something Went Wrong. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
				dispatch({
					type: types.GET_TEAMS,
					payload: [],
					isLoading: false
				});
			}
		})
		.catch((error) => {
			toast.error("Something Went Wrong. Please try again.", {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 3000,
				draggable: false
			});
			dispatch({
				type: types.GET_TEAMS,
				payload: [],
				isLoading: false
			});
		});
};

export const createTeam = (team) => (dispatch) => {
	dispatch({
		type: types.GET_TEAMS,
		payload: [],
		isLoading: true
	});
	axios
		.post("/v1/team/create", team)
		.then((response) => {
			if (response.data && response.data.status == "success") {
				toast.success("Team created successfully", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
				dispatch(getTeams());
			} else {
				dispatch(getTeams());
				toast.error("Something Went Wrong. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
			}
		})
		.catch((error) => {
			let errorMsg = "Something Went Wrong. Please try again.";
			if (error.response.data.error) {
				errorMsg = error.response.data.error.message;
			}
			dispatch(getTeams());
			toast.error(errorMsg, {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 3000,
				draggable: false
			});
		});
};

export const updateTeam = (id, team) => (dispatch) => {
	dispatch({
		type: types.GET_TEAMS,
		payload: [],
		isLoading: true
	});
	axios
		.put(`/v1/team/update/${id}`, team)
		.then((response) => {
			if (response.data && response.data.status == "success") {
				toast.success("Team updated successfully", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
				dispatch(getTeams());
			} else {
				dispatch(getTeams());
				toast.error("Something Went Wrong. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
			}
		})
		.catch((error) => {
			let errorMsg = "Something Went Wrong. Please try again.";
			if (error.response.data.error) {
				errorMsg = error.response.data.error.message;
			}
			dispatch(getTeams());
			toast.error(errorMsg, {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 3000,
				draggable: false
			});
		});
};

export const deleteTeam = (id) => (dispatch) => {
	dispatch({
		type: types.GET_TEAMS,
		payload: [],
		isLoading: true
	});
	axios
		.delete(`/v1/team/delete/${id}`)
		.then((response) => {
			if (response.data && response.data.status == "success") {
				toast.success("Team deleted successfully", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
				dispatch(getTeams());
			} else {
				dispatch(getTeams());
				toast.error("Something Went Wrong. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
					autoClose: 3000,
					draggable: false
				});
			}
		})
		.catch((error) => {
			dispatch(getTeams());
			toast.error("Something Went Wrong. Please try again.", {
				position: toast.POSITION.BOTTOM_RIGHT,
				autoClose: 3000,
				draggable: false
			});
		});
};
