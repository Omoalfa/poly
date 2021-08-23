import { connect } from 'react-redux';
import { ModalPopUp, TeamList, OuterSpinner } from '../components';
import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { getMembers } from '../redux/actions/member/memberAction';
import { getTeams } from '../redux/actions/team/teamAction';
import { getProjects, getHomePageDetails, getHomePageDetail, updateDetail } from '../redux/actions/project/projectAction';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            innerModalShow: true,
            detailId: null,
            Id: null,
            title: null,
            description: null,
            elementId: null,
            filteredTeams: [],
            searchText: [],
            email: null
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleModalShow = this.handleModalShow.bind(this)
    }

    UNSAFE_componentWillMount = () => {
        this.setState({ innerModalShow: false });
        this.props.getMembers();
        this.props.getTeams();
        this.props.getHomePageDetails();
    }

    UNSAFE_componentWillReceiveProps = (nextprops) => {
        if (nextprops.projectdetail) {
            this.setState({ title: nextprops.projectdetail.title, description: nextprops.projectdetail.description });
        }
    }

    handleShow = () => {
        this.setState({
            show: true,
            elementId: document.getElementById('add Team').id
        });
    }

    handleModalShow = (id) => {
        this.props.getHomePageDetail(id);
        this.setState({ innerModalShow: true, detailId: id });
    }

    getProject = () => {
        this.props.getProjects();
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredTeams: this.props.teams.filter(team => (team.name.toLowerCase()).includes(searchText.toLowerCase())) })
        } else {
            this.setState({ filteredTeams: [] })
        }
    }

    handleClose = () => {
        this.setState({ innerModalShow: false });
    }

    handleClick = () => {
        let data = {
            title: this.state.title,
            description: this.state.description
        }
        this.props.updateDetail(this.state.detailId, data);
        this.setState({ innerModalShow: false });
    }

    render() {
        const { show, filteredTeams, searchText, innerModalShow, email } = this.state;
        const { teams, homepageDetail, isLoading, user } = this.props;
        return (
            isLoading ? <OuterSpinner /> :
                <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-11 col-xl-10">
                                <div className="page-header mb-4">
                                    <div className="d-flex flex-row bd-highlight mb-3">
                                        <div><h1>{homepageDetail.title}</h1></div>
                                        {user.isAdmin ? <div style={{ marginLeft: "20px", marginTop: "8px" }}>
                                            <button className="btn btn-round" onClick={() => { this.handleModalShow(homepageDetail.id) }}>
                                                <i className="material-icons">edit</i>
                                            </button>
                                        </div> : ''}
                                    </div>
                                    <p className="lead">{homepageDetail.description}</p>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="teams" role="tabpanel">
                                        <div className="row content-list-head">
                                            <div className="col-auto">
                                                <h3>Teams</h3>
                                                <button className="btn btn-round" id='add Team' onClick={this.handleShow}>
                                                    <i className="material-icons">add</i>
                                                </button>
                                                <ModalPopUp
                                                    show={show}
                                                    Id={this.state.elementId}
                                                    Heading={'Add Team'}
                                                    Text={'Team'}
                                                    buttonText={'Add'}
                                                    closeCallBack={() => {
                                                        this.setState({ show: !show })
                                                    }} />
                                            </div>
                                            <form className="col-md-auto">
                                                <div className="input-group input-group-round">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            <i className="material-icons">filter_list</i>
                                                        </span>
                                                    </div>
                                                    <input id="filterTeams" type="search" className="form-control" placeholder="Filter teams" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                                                </div>
                                            </form>
                                        </div>
                                        <TeamList teams={searchText.length > 0 ? (filteredTeams.length > 0 ? filteredTeams : filteredTeams) : teams} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={innerModalShow} onHide={this.handleClose.bind(this)}>
                        <div className="modal-header">
                            <ModalTitle>Edit Detail</ModalTitle>
                            <button type="button" className="close btn btn-round" onClick={this.handleClose.bind(this)}>
                                <i className="material-icons">close</i>
                            </button>
                        </div>
                        <ModalBody>
                            <form role="form" method="POST" action="">
                                <div className="form-group row align-items-center">
                                    <label className="col-3">Title<span className="text-danger">*</span> </label>
                                    <input className="form-control col" type="text" placeholder="title" defaultValue={this.state.title} onChange={(event) => { this.setState({ title: event.target.value }) }} autoComplete="off" /> <br />
                                </div>
                                <div className="form-group row align-items-center">
                                    <label className="col-3">Description<span className="text-danger">*</span> </label>
                                    <textarea className="form-control col" rows="3" placeholder="description" defaultValue={this.state.description} onChange={(event) => { this.setState({ description: event.target.value }) }} autoComplete="off" ></textarea>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button role="button" className="btn btn-primary" type="submit" onClick={this.handleClick}>
                                Save
                            </button>
                        </ModalFooter>
                    </Modal>
                </>
        )
    }
}

const mapStateToProps = state => ({
    teams: state.team.teams,
    members: state.member.members,
    isLoading: state.project.isHomeLoding,
    homepageDetail: state.project.homepageDetail,
    projectdetail: state.project.projectdetail,
    user: state.task.user
});

export default connect(mapStateToProps,
    {
        getMembers,
        getTeams,
        getHomePageDetails,
        getProjects,
        getHomePageDetail,
        updateDetail
    }
)(Team);