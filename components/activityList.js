import { connect } from 'react-redux';
import { Spinner, RecordNotFound } from '.';
import moment from 'moment';

class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredActivity: [],
            searchText: []
        }
        this.handlechange = this.handlechange.bind(this)
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredActivity: this.props.activities.filter(activity => (activity.activity_name.toLowerCase().includes(searchText.toLowerCase()) || activity.name.toLowerCase().includes(searchText.toLowerCase()) || activity.sub_activity.toLowerCase().includes(searchText.toLowerCase()))) })
        } else {
            this.setState({ filteredActivity: [] })
        }
    }

    getDifferenceString = (time) => {
        if (moment().diff(time, 'minutes') === 0) {
            return 'Just Now'
        }
        if (moment().diff(time, 'hours') === 0) {
            const minDiff = moment().diff(time, 'minutes');
            return `${minDiff} minutes ago`
        }
        if (moment().diff(time, 'days') === 0) {
            const minDiff = moment().diff(time, 'hours');
            return `${minDiff} hours ago`
        }
        if (moment().diff(time, 'months') === 0) {
            const minDiff = moment().diff(time, 'days');
            return `${minDiff} days ago`
        }
        if (moment().diff(time, 'years') === 0) {
            const minDiff = moment().diff(time, 'months');
            return `${minDiff} months ago`
        }

        if (moment().diff(time, 'years') > 0) {
            const minDiff = moment().diff(time, 'years');
            return `${minDiff} years ago`
        }
    }

    render() {
        const { activities, isLoading } = this.props;
        const { searchText, filteredActivity } = this.state;
        return (
            <div className="tab-pane fade" id="activity" role="tabpanel">
                <div className="content-list">
                    <div className="row content-list-head">
                        <div className="col-auto">
                            <h3>Activity</h3>
                        </div>
                        <form className="col-md-auto">
                            <div className="input-group input-group-round">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="material-icons">filter_list</i>
                                    </span>
                                </div>
                                <input type="search" className="form-control" placeholder="Filter activity" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                            </div>
                        </form>
                    </div>
                    <div className="content-list-body">
                        <ol className="list-group list-group-activity">
                            {isLoading ? <Spinner /> :
                                searchText.length > 0 ?
                                    filteredActivity.length > 0 ? filteredActivity.map((activity, index) => {
                                        return (<li className="list-group-item" key={index}>
                                            <div className="media align-items-center">
                                                <ul className="avatars">
                                                    <li>
                                                        <div className="avatar bg-primary">
                                                            <i className="material-icons">playlist_add_check</i>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        {activity.profile_photo != null ?
                                                            <img alt={activity.name} src={activity.profile_photo} className="avatar" />
                                                            :
                                                            <img alt={activity.name} src='assets/img/user.svg' className="avatar" />
                                                        }
                                                    </li>
                                                </ul>
                                                <div className="media-body">
                                                    <div>
                                                        <span className="h6">{activity.name} </span>
                                                        <span>{activity.activity_name}</span><a href="#">{activity.sub_activity}</a>
                                                    </div>
                                                    <span className="text-small">{this.getDifferenceString(activity.created_at)}</span>
                                                </div>
                                            </div>
                                        </li>)

                                    }) : <RecordNotFound />
                                    :
                                    activities.length > 0 ? activities.map((activity, index) => {
                                        return (<li className="list-group-item" key={index}>
                                            <div className="media align-items-center">
                                                <ul className="avatars">
                                                    <li>
                                                        <div className="avatar bg-primary">
                                                            <i className="material-icons">playlist_add_check</i>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        {activity.profile_photo != null ?
                                                            <img alt={activity.name} src={activity.profile_photo} className="avatar" />
                                                            :
                                                            <img alt={activity.name} src='assets/img/user.svg' className="avatar" />
                                                        }
                                                    </li>
                                                </ul>
                                                <div className="media-body">
                                                    <div>
                                                        <span className="h6">{activity.name} </span>
                                                        <span>{activity.activity_name}</span><a href="#">{activity.sub_activity}</a>
                                                    </div>
                                                    <span className="text-small">{this.getDifferenceString(activity.created_at)}</span>
                                                </div>
                                            </div>
                                        </li>)

                                    }) : <RecordNotFound />}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    activities: state.activity.activities,
    isLoading: state.activity.isLoading
});

export default connect(mapStateToProps,
    {

    }
)(ActivityList);
