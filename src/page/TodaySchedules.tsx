import React, {useEffect, useState} from 'react'
import {Box, Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material'
import {useAtom} from 'jotai'
import {vacationRecordAtom} from '../atoms/vacation.atom'
import {workRecordAtom} from '../atoms/work.atom'
import {mealRecordAtom} from '../atoms/meal.atom'
import {calculateTotalWorkedMinutes, calculateWeeklyMinutes} from '../logic/work.logic'
import {saveTodayMealCost} from '../logic/meal.logic'
import {getToday} from '../utils/date.utils'
import {getFileIdByName, uploadJsonToDrive} from '../api/drive.file'
import dayjs from 'dayjs'

const FILE_NAME = '2025-04.json'
const absenceOptions = ['미입력', '오전 반반차', '오전 반차', '오후 반반차', '오후 반차', '휴가']

const TodaySchedule: React.FC = () => {
    const [selectedAbsence, setSelectedAbsence] = useState('미입력')
    const [mealPrice, setMealPrice] = useState('')
    const [now, setNow] = useState(new Date())

    const [workMap, setWorkMap] = useAtom(workRecordAtom)
    const [vacationMap] = useAtom(vacationRecordAtom)
    const [mealMap] = useAtom(mealRecordAtom)

    const todayKey = getToday()
    const isVacationToday = vacationMap[todayKey] != null
    const todayRecords = workMap[todayKey] || []
    const lastEntry = todayRecords.at(-1)

    const canCheckIn = !isVacationToday && (!lastEntry || lastEntry.checkOut)
    const canCheckOut = !isVacationToday && lastEntry && !lastEntry.checkOut

    const totalMinutes = calculateTotalWorkedMinutes(todayRecords)
    const totalWeekMinutes = calculateWeeklyMinutes(workMap)

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const handleAbsenceChange = (event: SelectChangeEvent) => {
        setSelectedAbsence(event.target.value)
    }

    const handleSave = async () => {
        const price = parseInt(mealPrice)
        if (isNaN(price)) {
            alert('금액을 숫자로 입력해주세요.')
            return
        }
        await saveTodayMealCost(price)
        alert(`✅ 식대 ₩${price.toLocaleString()} 저장 완료!`)
    }

    const handleCheckIn = async () => {
        const now = dayjs().format('HH:mm')
        const todayRecords = workMap[todayKey] || []
        const last = todayRecords.at(-1)
        if (last && !last.checkOut) return
        const newEntry = {checkIn: now}
        const updated = {...workMap, [todayKey]: [...todayRecords, newEntry]}
        setWorkMap(updated)
        const fileId = await getFileIdByName(FILE_NAME)
        if (fileId) await uploadJsonToDrive(fileId, updated)
    }

    const handleCheckOut = async () => {
        const now = dayjs().format('HH:mm')
        const todayRecords = [...(workMap[todayKey] || [])]
        const last = todayRecords.at(-1)
        if (!last || last.checkOut) return
        last.checkOut = now
        const updated = {...workMap, [todayKey]: todayRecords}
        setWorkMap(updated)
        const fileId = await getFileIdByName(FILE_NAME)
        if (fileId) await uploadJsonToDrive(fileId, updated)
    }

    return (
        <Box sx={{backgroundColor: '#121212', minHeight: '100vh', padding: '8px 16px', color: '#fff'}}>
            <Box textAlign='right' mb={2}>
                <Typography variant='caption' sx={{color: '#9e9e9e'}}>
                    {now.toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </Typography>
            </Box>

            <Box sx={{
                backgroundColor: '#1E1E1E',
                borderRadius: 3,
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
                <Typography sx={{fontSize: 14, color: '#bbb', mb: 2}}>오늘의 출퇴근</Typography>

                <Box display='flex' gap={2} mb={3}>
                    <Button fullWidth sx={{backgroundColor: '#1E88E5', color: '#fff', fontWeight: 600}}
                            onClick={handleCheckIn} disabled={!canCheckIn}>
                        출근
                    </Button>
                    <Button fullWidth sx={{backgroundColor: '#8E24AA', color: '#fff', fontWeight: 600}}
                            onClick={handleCheckOut} disabled={!canCheckOut}>
                        퇴근
                    </Button>
                </Box>

                <Select
                    value={selectedAbsence}
                    onChange={handleAbsenceChange}
                    fullWidth
                    size='small'
                    sx={{
                        backgroundColor: '#2a2a2a',
                        borderRadius: 2,
                        color: '#fff',
                        '& .MuiSelect-icon': {color: '#aaa'},
                        mb: 2
                    }}
                >
                    {absenceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

                <Divider sx={{borderColor: '#333', my: 2}}/>

                <Box>
                    <Typography variant='body2' color='#bbb'>출근 시간</Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>{todayRecords[0]?.checkIn || '-'}</Typography>

                    <Typography variant='body2' color='#bbb'>퇴근 시간</Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>{todayRecords[0]?.checkOut || '-'}</Typography>

                    <Typography variant='body2' color='#bbb'>근무 시간</Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>{totalMinutes}분</Typography>

                    <Typography variant='body2' color='#bbb'>이번주 총 근무</Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>{totalWeekMinutes}분</Typography>
                </Box>
            </Box>

            <Box sx={{
                backgroundColor: '#1E1E1E',
                borderRadius: 3,
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                marginTop: '12px'
            }}>
                <Box display='flex' gap={2} alignItems='center'>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        value={mealPrice}
                        onChange={(e) => setMealPrice(e.target.value)}
                        placeholder='오늘 식대 입력 (₩)'
                        sx={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: 2,
                            color: '#fff',
                            input: {color: '#fff'},
                            '& .MuiOutlinedInput-notchedOutline': {borderColor: '#444'},
                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#666'},
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#00B8FF'}
                        }}
                    />
                    <Button onClick={handleSave} sx={{
                        backgroundColor: '#00B8FF',
                        color: '#121212',
                        fontWeight: 700,
                        borderRadius: 2,
                        height: 42
                    }}>
                        저장
                    </Button>
                </Box>

                <Box mt={2}>
                    <Typography variant='body2' sx={{color: '#aaa'}}>
                        이번달 식대 사용: ₩{Object.values(mealMap).reduce((acc, val) => acc + val, 0).toLocaleString()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default TodaySchedule