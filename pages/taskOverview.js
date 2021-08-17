import React from 'react';
import { connect } from 'react-redux';
import { ActivityList, FileList, Header, TaskCheckList } from '../components';
import { getActivityByTaskId } from '../redux/actions/activity/activityAction';
import { getMemberByTaskId } from '../redux/actions/member/memberAction';
import { getSubTaskByTaskId } from '../redux/actions/subTask/subTaskAction';
import { completeTaskStatus, getTaskById } from '../redux/actions/task/taskAction';
import { getTaskNoteById } from '../redux/actions/taskNote/taskNoteAction';
import Router from 'next/router';
class TaskOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: this.props.query.taskId
    }
  }

  static getInitialProps({ query }) {
    return { query }
  }

  UNSAFE_componentWillMount = () => {
    this.props.getTaskById(this.state.taskId);
    this.props.getTaskNoteById(this.state.taskId);
    this.props.getSubTaskByTaskId(this.state.taskId);
    this.props.getMemberByTaskId(this.state.taskId);
  }

  handleClick = () => {
    this.props.getActivityByTaskId(this.state.taskId)
  }

  updateTask = () => {
    this.props.completeTaskStatus(this.state.taskId)
  }

  render() {
    const { task } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-xl-10">
            <div className="page-header">
           
              <h1>{task.name}
                {task.status !== 'Done' && <button type="button" class="btn btn-success float-right" onClick={this.updateTask}>
                  Mark as Complete
                </button>}
              </h1>
              <button className="btn btn-primary float-right" onClick={() => {
                Router.back()
              }}>
                Go Back
               </button>
              <p className="lead">{task.description}</p>
             
              <Header id="taskOverview" />
              <div>
                {task.status == 'Done' ?
                  <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  : task.task_percentage !== null ?
                    (task.task_percentage > 0 && task.task_percentage <= 35) ?
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      : (task.task_percentage > 36 && task.task_percentage <= 70) ?
                        <div className="progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        :
                        <div className="progress">
                          <div className="progress-bar bg-success" role="progressbar" style={{ width: `${task.task_percentage}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    : ''}
                <div className="d-flex justify-content-between text-small">
                  <div className="d-flex align-items-center">
                    {task.total_task > 0 ?
                      <>
                        <i className="material-icons mr-1">playlist_add_check</i>
                        <span className="text-small">{task.total_done_task > 0 ? task.total_done_task : 0} / {task.total_task > 0 ? task.total_task : 0} </span>
                      </>
                      : ''}
                  </div>
                  <span className="text-small" data-filter-by="text">
                    {task.status == 'Done' ?
                      <span className="badge badge-success">Done</span>
                      : task.due_day && task.due_day > 0 ?
                        task.due_day > 1 ?
                          <span className="badge badge-success">Due in {task.due_day} days</span>
                          :
                          <span className="badge badge-warning">1 day before Due Date</span>
                        :
                        task.due_day == 0 ?
                          <span className="badge badge-success">Due Today</span>
                          :
                          task.due_day < -15 ?
                            <span className="badge badge-danger">Expired</span> :
                            <>
                              <span className="badge badge-success">{Math.abs(task.due_day)} Days</span>
                              <span className="badge badge-danger"> Past Due </span>
                              <span className="badge badge-success">Date</span>
                            </>
                    }
                  </span>
                </div>
              </div>
            </div>
            <ul className="nav nav-tabs nav-fill" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#task" role="tab" aria-controls="task" aria-selected="true">Task</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">Files</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false" onClick={this.handleClick}>Activity</a>
              </li>
            </ul>
            <div className="tab-content">
              <TaskCheckList id={this.state.taskId} status={task.status} />
              <ActivityList />
              <FileList taskId={this.state.taskId} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  task: state.task.task
});

export default connect(mapStateToProps,
  {
    getMemberByTaskId,
    getTaskById,
    getSubTaskByTaskId,
    getActivityByTaskId,
    getTaskNoteById,
    completeTaskStatus
  }
)(TaskOverview);