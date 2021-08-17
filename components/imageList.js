import React from 'react';

class ImageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Id = this.props.Id;
        const { Data } = this.props;
        return (
            <ul className={Id == 'modalheader' ? 'avatars text-center' : 'avatars'}>
                {Data == undefined ? <img src={'https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif'} width="30px" height="30px" alt="loading..." />
                    :
                    Data.slice(0, 5).map((member, index) => {
                        
                        return (
                            member.guid != null ? <li key={index}>
                                <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                    <img alt={member.display_name} className="avatar" src={member.guid} />
                                </a>
                            </li> : <li key={index}>
                                <a href="#" data-toggle="tooltip" data-placement="top" title={member.display_name}>
                                    <img alt={member.display_name} className="avatar" src='assets/img/user.svg' />
                                </a>
                            </li> 
                        )
                    })}
            </ul>
        )
    }
}

export default ImageList;
