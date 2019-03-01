import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import AbsenceLetter from '../absenceLetter/container';


const Calendar = lazy(() => import('../../components/calendar'));
const DemoUI = lazy(() => import('../../components/demoUI'));


const MainRouter = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/calendar" component={
				() => (
					<Suspense fallback={<div>Loading...</div>}>
						<Calendar/>
					</Suspense>
				)
			}/>
			<Route path="/leaveForm" component={LeaveForm}/>
			<Route path="/demoUI" component={
				() => (
					<Suspense fallback={<div><CircularProgress /></div>}>
						<DemoUIWrapper/>
					</Suspense>
				)
			}/>
		</Switch>
	</Router>
);

const Home = () => {
	return (
		<ol>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/calendar">Calendar</Link></li>
			<li><Link to="/leaveForm">Leaving Form</Link></li>
			<li><Link to="/demoUI">Demo UI</Link></li>
		</ol>
	);
};

const LeaveForm = () => {
	return (
		<div>
			<h1>Leaving Form</h1>
			<AbsenceLetter />
		</div>
	);
};

const DemoUIWrapper = () => {
	return (
		<div>
			<DemoUI/>
		</div>
	)
}

class App extends Component {
  render() {
	return (
		<div className="App">
			<header>
				<div id="logo">
					<span>
						Golden Owl<b> Leaves</b>
					</span>
				</div>
			</header>
			<main>
				<MainRouter />
			</main>
		</div>
	);
  }
}

export default App;