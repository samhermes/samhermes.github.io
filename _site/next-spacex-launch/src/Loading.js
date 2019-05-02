import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return ( <div className="loading-state">
            <p className="screen-reader-text">Loading...</p>
            <svg width={20} height={20}>
                <path
                fill="none"
                stroke="#999"
                strokeMiterlimit={10}
                d="M1 10c0 5 4 9 9 9s9-4 9-9-4-9-9-9"
                />
            </svg>
        </div>
        )
    }
}

export default Loading