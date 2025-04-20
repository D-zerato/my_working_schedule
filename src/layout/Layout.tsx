import React, {useEffect} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import {getDefaultStore, useAtomValue} from 'jotai'
import {isLoadingAtom} from '../atoms/shared.store'
import {initData} from '../logic/sync.logic'

const Layout: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const currentTab = location.pathname.split('/')[1] || 'today'
    const isLoading = useAtomValue(isLoadingAtom)

    useEffect(() => {
        initData(getDefaultStore().set)
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        if (currentTab !== newValue) navigate(`/${newValue}`)
    }

    return (
        <>
            <div style={{paddingTop: '24px'}}/>
            {isLoading && <div className='loading-overlay'>
                <div className='spinner'></div>
            </div>}
            <Outlet/>
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#1E1E1E',
                    borderTop: '1px solid #333'
                }}
                elevation={0}
            >
                <BottomNavigation
                    showLabels
                    value={currentTab}
                    onChange={handleChange}
                    sx={{backgroundColor: '#1E1E1E'}}
                >
                    <BottomNavigationAction value='today' icon={<AccessTimeIcon/>}/>
                    <BottomNavigationAction value='workingSchedule' icon={<CalendarMonthIcon/>}/>
                    <BottomNavigationAction value='vacation' icon={<BeachAccessIcon/>}/>
                </BottomNavigation>
            </Paper>
        </>
    )
}

export default Layout