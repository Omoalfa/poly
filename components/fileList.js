import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { connect } from 'react-redux';
import { Spinner, RecordNotFound } from '../components';
import { uploadFileByProject, getFileDataByProjectId, getFileDataBytaskId, uploadFileByTask } from '../redux/actions/task/taskAction';
import dynamic from 'next/dynamic';
const File = dynamic(() => import('./file'), { ssr: false })

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredfiles: [],
            searchText: []
        }
        this.handlechange = this.handlechange.bind(this)
    }

    UNSAFE_componentWillMount = () => {
        if (this.props.projectId !== undefined) {
            this.props.getFileDataByProjectId(this.props.projectId);
        }
        else {
            this.props.getFileDataBytaskId(this.props.taskId);
        }
    }


    handleSubmit = (files) => {
        let file = files.map(f => f.file);
        if (this.props.projectId !== undefined) {
            this.props.uploadFileByProject(this.props.projectId, file[0]);
        } else {
            this.props.uploadFileByTask(this.props.taskId, file[0]);
        }
    }

    handlechange = (event) => {
        let searchText = event.target.value;
        this.setState({ searchText: searchText });
        if (searchText.length > 0) {
            this.setState({ filteredfiles: this.props.files.filter(file => (file.name.toLowerCase()).includes(searchText.toLowerCase())) })
        } else {
            this.setState({ filteredfiles: [] })
        }
    }

    render() {
        const { isLoading, files } = this.props;
        const { searchText, filteredfiles } = this.state;
        return (
            <div className="tab-pane fade" id="files" role="tabpanel">
                <div className="content-list">
                    <div className="row content-list-head">
                        <div className="col-auto">
                            <h3>Files</h3>
                        </div>
                        <form className="col-md-auto">
                            <div className="input-group input-group-round">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="material-icons">filter_list</i>
                                    </span>
                                </div>
                                <input type="search" className="form-control" placeholder="Filter files" onChange={(event) => { this.handlechange(event) }} autoComplete="off" />
                            </div>
                        </form>
                    </div>
                    {isLoading ? <Spinner /> : <div className="content-list-body row">
                        <div className="col">
                            <Dropzone
                                onSubmit={this.handleSubmit}
                            />
                            <ul className="list-group list-group-activity dropzone-previews flex-column-reverse">
                                {
                                    searchText.length > 0 ?
                                        filteredfiles.length > 0 ?
                                            filteredfiles.map((file, index) => <File file={file} index={index} projectId={this.props.projectId} taskId={this.props.taskId} />
                                            ) : <RecordNotFound />
                                        :
                                        files.length > 0 ? files.map((file, index) => <File file={file} index={index} projectId={this.props.projectId} taskId={this.props.taskId} />
                                        ) : <RecordNotFound />
                                }
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    files: state.task.files,
    isLoading: state.task.isFileLoading
});

export default connect(
    mapStateToProps,
    {
        uploadFileByProject,
        getFileDataByProjectId,
        getFileDataBytaskId,
        uploadFileByTask
    }
)(FileList);
