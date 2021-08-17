import React from 'react';
import { connect } from 'react-redux';
import { RecordNotFound } from '.';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredMembers: [],
            searchText: []
        }
        this.handlechange = this.handlechange.bind(this)
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredMembers: this.props.members.filter(member => (member.display_name.toLowerCase()).includes(searchText.toLowerCase())) })
        } else {
            this.setState({ filteredMembers: [] })
        }
    }

    render() {
        const { isLoading, members } = this.props;
        const { searchText, filteredMembers } = this.state;
        return (
            <div className="tab-pane fade" id="members" role="tabpanel">
                <div className="content-list">
                    <div className="row content-list-head">
                        <div className="col-auto">
                            <h3>Members</h3>
                            {/* <button className="btn btn-round" data-toggle="modal" data-target="#user-invite-modal">
                                <i className="material-icons">add</i>
                            </button> */}
                        </div>
                        <form className="col-md-auto">
                            <div className="input-group input-group-round">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="material-icons">filter_list</i>
                                    </span>
                                </div>
                                <input type="search" className="form-control" placeholder="Filter members" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                            </div>
                        </form>
                    </div>
                    <div className="content-list-body row">
                        {isLoading ? <img src={'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'} width="30px" height="30px" alt="loading..." /> :
                            searchText.length > 0 ?
                                filteredMembers.length > 0 ? filteredMembers.map((member, index) => {
                                    return (
                                        <div className="col-6" key={index}>
                                            <a className="media media-member" href="#">
                                                {member.guid != null ?
                                                    <img alt={member.name} src={member.guid} className="avatar avatar-lg" /> :
                                                    <img alt={member.name} src='assets/img/user.svg' className="avatar avatar-lg" />}
                                                <div className="media-body">
                                                    <h6 className="mb-0" data-filter-by="text">{member.display_name}</h6>
                                                    <span data-filter-by="text" className="text-body">{member.designation}</span>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                }) : <RecordNotFound />
                                :
                                members.length > 0 ? members.map((member, index) => {
                                    return (<div className="col-6" key={index}>
                                        <a className="media media-member" href="#">
                                            {member.guid != null ?
                                                <img alt={member.name} src={member.guid} className="avatar avatar-lg" /> :
                                                <img alt={member.name} src='assets/img/user.svg' className="avatar avatar-lg" />}
                                            <div className="media-body">
                                                <h6 className="mb-0" data-filter-by="text">{member.display_name}</h6>
                                                <span data-filter-by="text" className="text-body">{member.designation}</span>
                                            </div>
                                        </a>
                                    </div>
                                    )
                                }) : <RecordNotFound />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    members: state.member.teamMember,
    isLoading: state.member.isLoading
});

export default connect(
    mapStateToProps,
    {
    },
)(MemberList);