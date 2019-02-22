import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const Calendar = React.lazy(() => import('./components/Calendar'));

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/calendar" component={
                () => (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Calendar/>
                    </React.Suspense>)
            }/>
            <Route path="/leaveForm" component={LeaveForm}/>
        </Switch>
    </Router>
);

const Home = () => {
    return (
        <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/leaveForm">Leaving Form</Link></li>
        </ol>
    );
};

const LeaveForm = () => {
    return (
        <div>Leaving Form</div>
    );
};

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