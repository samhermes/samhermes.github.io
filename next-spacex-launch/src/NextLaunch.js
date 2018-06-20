import React, { Component } from 'react';
import Moment from 'react-moment';

class NextLaunch extends Component {
  constructor() {
    super();
    this.state = {
      nextLaunch: '',
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/next')
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({nextLaunch: data})
    });
  }

  render() {
    return(
      <div className="next-launch">
        <h2 className="next-launch-date">
          <Moment format="MMMM DD, YYYY">{this.state.nextLaunch.launch_date_local}</Moment>
        </h2>
        <p className="next-launch-time">
          <Moment format="H:mm a">{this.state.nextLaunch.launch_date_local}</Moment>
        </p>
        <ul className="launch-detail">
          <li><span className="detail-title">Mission</span> {this.state.nextLaunch.mission_name}</li>
          <li><span className="detail-title">Flight Number</span> {this.state.nextLaunch.flight_number}</li>
        </ul>
      </div>
    )
  }
}

export default NextLaunch;
