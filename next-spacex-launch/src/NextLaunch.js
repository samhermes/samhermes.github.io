import React, { Component } from 'react';
import Moment from 'react-moment';

class NextLaunch extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      nextLaunch: [],
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/next')
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        isLoaded: true,
        nextLaunch: data
      });
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div class="loading-state"><p>Loading...</p></div>;
    } else {
      return(
        <div className="next-launch">
          <div className="launch-time">
            <h2 className="next-launch-date">
              <Moment format="MMMM DD, YYYY">{this.state.nextLaunch.launch_date_local}</Moment>
            </h2>
            <p className="next-launch-time">
              <Moment format="h:mm a">{this.state.nextLaunch.launch_date_local}</Moment> (local time)
            </p>
          </div>
          <div className="launch-details">
            <ul className="launch-detail">
              <li><span className="detail-title">Mission</span> {this.state.nextLaunch.mission_name}</li>
              <li><span className="detail-title">Flight Number</span> {this.state.nextLaunch.flight_number}</li>
              <li><span className="detail-title">Rocket</span> {this.state.nextLaunch.rocket.rocket_name}</li>
              <li><span className="detail-title">Launch Site</span> {this.state.nextLaunch.launch_site.site_name_long}</li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default NextLaunch;
