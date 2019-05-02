import React, { Component } from 'react';
import format from 'date-fns/format';
import Loading from './Loading';

class UpcomingLaunches extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      upcomingLaunches: [],
    }
  };

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/launches/upcoming')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          isLoaded: true,
          upcomingLaunches: data
        });
      });
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h2>Upcoming Launches</h2>
          <Loading />
        </div>
      )
    } else {
      return (
        <div>
          <h2>Upcoming Launches</h2>
          <div className="upcoming-launches">
            <ul className="launches">
              {this.state.upcomingLaunches.slice(0, 5).map(function (mission, index) {
                if (index === 0) {
                  return false
                } else {
                  return <li key={index}>
                    <div className="launch-datetime">
                      <h3 className="launch-date">
                        {format(mission.launch_date_local, 'MMMM DD, YYYY')}
                      </h3>
                      <p className="launch-time">
                        {format(mission.launch_date_local, 'h:mm a')} (local time)
                      </p>
                    </div>
                    <div className="launch-details">
                      <ul className="launch-detail">
                        <li><span className="detail-title">Mission</span> {mission.mission_name}</li>
                        <li><span className="detail-title">Flight Number</span> {mission.flight_number}</li>
                        <li><span className="detail-title">Rocket</span> {mission.rocket.rocket_name}</li>
                        <li><span className="detail-title">Launch Site</span> {mission.launch_site.site_name_long}</li>
                      </ul>
                    </div>
                  </li>;
                }
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default UpcomingLaunches;
