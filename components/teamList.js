import { connect } from 'react-redux';
import Link from 'next/link';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getTeamById, deleteTeam } from '../redux/actions/team/teamAction';
import { ModalPopUp, ImageList, Spinner, OuterSpinner, RecordNotFound } from '.';


class TeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            Id: null,
            elementId: null
        }
    }

    editTeam = (id) => {
        this.props.getTeamById(id);
        this.setState({
            show: true,
            Id: id,
            elementId: document.getElementById('edit Team').id
        });
    }

    deleteTeam = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete?',
            buttons: [
                {
                    label: 'Confirm',
                    onClick: () => this.props.deleteTeam(id)
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    }

    render() {
        const { show } = this.state;
        const { isLoading } = this.props;
        return (
            <>
                <div className="content-list-body row" style={{ minHeight: "200px" }}>
                    {isLoading ? <Spinner /> :
                        this.props.teams.length > 0 ? this.props.teams.map((team, index) => {
                            return (
                                <div className="col-md-6" key={index}>
                                    <div className="card card-team">

                                        <div className="card-body">
                                            <div className="dropdown card-options">
                                                <button className="btn-options" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="material-icons">more_vert</i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <Link href={{ pathname: '/project', query: { teamId: team.id } }}>
                                                        <a className="dropdown-item" href="//#endregion">Overview</a>
                                                    </Link>
                                                    <button className="dropdown-item" id={'edit Team'} onClick={() => { this.editTeam(team.id) }}>Manage</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="dropdown-item text-danger" onClick={() => { this.deleteTeam(team.id) }}>Delete</button>
                                                </div>
                                            </div>
                                            <div className="card-title">
                                                <Link href={{ pathname: '/project', query: { teamId: team.id } }}>
                                                    <h5 data-filter-by="text" style={{ cursor: "pointer" }}>{team.name}</h5>
                                                </Link>
                                                <span>{team.total_project} Projects, {team.total_member} Members</span>
                                            </div>
                                            <ImageList Data={team.memberData} />
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                            <RecordNotFound />
                        }
                </div>
                {this.props.teamLoading ? <OuterSpinner /> :
                    <ModalPopUp
                        show={show}
                        Id={this.state.elementId}
                        Heading={'Edit Team'}
                        Text={'Team'}
                        buttonText={'Save'}
                        closeCallBack={() => {
                            this.setState({ show: !show })
                        }}
                        teamID={this.state.Id}
                    />}
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.team.isLoading,
    teamLoading: state.team.teamLoading
});

export default connect(mapStateToProps,
    {
        getTeamById,
        deleteTeam
    }
)(TeamList);