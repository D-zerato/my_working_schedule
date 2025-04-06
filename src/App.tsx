import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './page/login/LoginPage';
import Layout from './shared/components/Layout';
import TodaySchedule from './page/todaySchedule/TodaySchedule';
import WorkingSchedule from './page/workingSchedule/WorkingSchedule';
import Vacation from './page/vacation/Vacation';

const App = () => {
    //
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to='/login' replace/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route element={<Layout/>}>
                        <Route path="today" element={<TodaySchedule/>}/>
                        <Route path="workingSchedule" element={<WorkingSchedule/>}/>
                        <Route path="vacation" element={<Vacation/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
