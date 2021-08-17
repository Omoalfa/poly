import { connect } from 'react-redux';
import { ModalPopUp, Header, ProjectList, MemberList, OuterSpinner } from '../components';
import { getMemberByTeamId } from '../redux/actions/member/memberAction';
import { getProjectsByTeamId } from '../redux/actions/project/projectAction';
import { getTeamById } from '../redux/actions/team/teamAction';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      elementId: null,
      teamId: this.props.query.teamId,
      filteredProjects: [],
      searchText: []
    };
    this.handlechange = this.handlechange.bind(this)
  }

  static getInitialProps({ query }) {
    return { query }
  }

  UNSAFE_componentWillMount = () => {
    this.props.getTeamById(this.state.teamId);
    this.props.getMemberByTeamId(this.state.teamId);
    this.props.getProjectsByTeamId(this.state.teamId);
  }


  handleShow = () => {
    this.setState({
      show: true,
      elementId: document.getElementById('add Project').id
    });
  }

  handlechange = (event) => {
    let searchText = event.target.value;
    this.setState({ searchText: searchText });
    if (searchText.length > 0) {
      this.setState({ filteredProjects: this.props.projects.filter(project => (project.name.toLowerCase()).includes(searchText.toLowerCase())) })
    } else {
      this.setState({ filteredProjects: [] })
    }
  }

  render() {
    const { show, filteredProjects, searchText } = this.state;
    const { team, isLoading, projects } = this.props;
    return (
      isLoading ? <OuterSpinner /> :
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11 col-xl-10 mb-4">
              <div className="page-header ">
                <h1>{team.name}</h1>
                <p className="lead">{team.description}</p>
                <Header id="project" />
                {/* <div>
                  {project.task_percentage !== null ?
                    (project.task_percentage > 0 && project.task_percentage <= 35) ?
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      : (project.task_percentage > 36 && project.task_percentage <= 70) ?
                        <div className="progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        :
                        <div className="progress">
                          <div className="progress-bar bg-success" role="progressbar" style={{ width: `${project.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    : ''}
                  <div className="d-flex justify-content-between text-small">
                    <div className="d-flex align-items-center">
                      {project.total_task > 0 ?
                        <>
                          <i className="material-icons mr-1">playlist_add_check</i>
                          <span className="text-small">{project.total_done_task > 0 ? project.total_done_task : 0} / {project.total_task > 0 ? project.total_task : 0} </span>
                        </>
                        : ''}
                    </div>
                  </div>
                </div> */}
              </div>
              <hr />
              <ul className="nav nav-tabs nav-fill" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#projects" role="tab" aria-controls="projects" aria-selected="true">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#members" role="tab" aria-controls="members" aria-selected="false">Members</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="projects" role="tabpanel">
                  <div id="projects123" className="content-list">
                    <div className="row content-list-head">
                      <div className="col-auto">
                        <h3>Projects</h3>
                        <button className="btn btn-round" id="add Project" onClick={this.handleShow}>
                          <i className="material-icons">add</i>
                        </button>
                        <ModalPopUp
                          show={this.state.show}
                          Id={this.state.elementId}
                          Heading={'Add Project'}
                          Text={'Project'}
                          buttonText={'Add'}
                          closeCallBack={() => {
                            this.setState({ show: !show })
                          }}
                          teamId={this.state.teamId} />
                      </div>
                      <form className="col-md-auto">
                        <div className="input-group input-group-round">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">filter_list</i>
                            </span>
                          </div>
                          <input type="text" className="form-control" placeholder="Filter projects" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                        </div>
                      </form>
                    </div>
                    <ProjectList teamId={this.state.teamId} projects={searchText.length > 0 ? (filteredProjects.length > 0 ? filteredProjects : filteredProjects) : projects} />
                  </div>
                </div>
                <MemberList />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects,
  team: state.team.team,
  isLoading: state.team.teamLoading
});

export default connect(
  mapStateToProps,
  {
    getTeamById,
    getMemberByTeamId,
    getProjectsByTeamId
  },
)(Project);