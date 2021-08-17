import React from 'react';
import { Wordpress } from 'better-react-spinkit'

class OuterSpinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wordpress size={40}  duration = {'1s'} color='#6c757d' style={{position: "fixed",top:"50%",left: "50%"}}/>
        )
    }
}

export default OuterSpinner;