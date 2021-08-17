import React from 'react';
import { Wordpress } from 'better-react-spinkit'

class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wordpress size={40}  duration = {'1s'} color='#6c757d' style={{paddingLeft: "50%",marginTop: "70px",marginLeft: "-20px"}}/>
        )
    }
}

export default Spinner;