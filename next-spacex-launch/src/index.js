import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import NextLaunch from './NextLaunch';
import UpcomingLaunches from './UpcomingLaunches';

class App extends Component {
	render() {
		return(
			<div>
				<NextLaunch />
				<UpcomingLaunches />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
