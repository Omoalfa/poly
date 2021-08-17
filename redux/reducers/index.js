import { combineReducers } from 'redux';
import { projectReducer } from './projectReducer';
import { memberReducer } from './memberReducer';
import { taskReducer } from './taskReducer';
import { activityReducer } from './activityReducer';
import { teamReducer } from './teamReducer';
import { subTaskReducer } from './subTaskReducer'
import { taskNotesReducer } from './taskNotesReducer';
import { taskStatusReducer } from './taskStatusTypeReducer';

const rootReducer = combineReducers({
    project: projectReducer,
    member:memberReducer,
    task:taskReducer,
    activity:activityReducer,
    team:teamReducer,
    subTask:subTaskReducer,
    taskNotes:taskNotesReducer,
    taskStatus:taskStatusReducer
});

export default rootReducer;