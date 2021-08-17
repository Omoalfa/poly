import React from 'react';

class RecordNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span style={{ paddingLeft: "50%", marginTop: "70px", marginLeft: "-60px", color: "black" }}>
                No Record Found
            </span>
        )
    }
}

export default RecordNotFound;