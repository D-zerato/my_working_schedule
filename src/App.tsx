import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import Layout from './layout/Layout'
import LoginPage from './page/LoginPage';
import TodaySchedule from './page/TodaySchedules'
import Vacation from './page/Vacation';
import WorkingSchedule from './page/WorkingSchedule';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="today" element={<TodaySchedule/>}/>
                    <Route path="workingSchedule" element={<WorkingSchedule/>}/>
                    <Route path="vacation" element={<Vacation/>}/>
                    <Route path="*" element={<Navigate to="/today"/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App


