import React, {useState} from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {useAtomValue} from 'jotai'
import {workRecordAtom} from '../atoms/work.atom'
import {mealRecordAtom} from '../atoms/meal.atom'
import {getDiffMinutes} from '../logic/work.logic'
import dayjs from 'dayjs'
import {getWeekNumber} from '../utils/date.utils'

const WorkingSchedule: React.FC = () => {
    const [year, setYear] = useState('2025')
    const [month, setMonth] = useState('04')
    const workMap = useAtomValue(workRecordAtom)
    const mealMap = useAtomValue(mealRecordAtom)

    const filteredDates = Object.keys(workMap).filter((date) => date.startsWith(`${year}-${month}`))
    const groupedByWeek: Record<string, string[]> = {}

    filteredDates.forEach((dateStr) => {
        const date = dayjs(dateStr).toDate()
        const week = getWeekNumber(date)
        if (!groupedByWeek[week]) groupedByWeek[week] = []
        groupedByWeek[week].push(dateStr)
    })

    return (
        <Box sx={{backgroundColor: '#121212', minHeight: '100vh', color: '#fff', padding: '24px 16px'}}>
            <Box display='flex' gap={2} mb={2}>
                <FormControl fullWidth>
                    <InputLabel sx={{color: '#bbb'}}>년도</InputLabel>
                    <Select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{backgroundColor: '#2a2a2a', borderRadius: 2, color: '#ccc'}}
                    >
                        <MenuItem value='2025'>2025</MenuItem>
                        <MenuItem value='2024'>2024</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel sx={{color: '#bbb'}}>월</InputLabel>
                    <Select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        sx={{backgroundColor: '#2a2a2a', borderRadius: 2, color: '#ccc'}}
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {i + 1}월
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box textAlign='right' mb={2}>
                <Typography variant='caption' sx={{color: '#aaa'}}>
                    이번달 총 식대: ₩{Object.entries(mealMap)
                    .filter(([date]) => date.startsWith(`${year}-${month}`))
                    .reduce((sum, [, cost]) => sum + cost, 0)
                    .toLocaleString()}
                </Typography>
            </Box>

            {Object.entries(groupedByWeek).map(([week, dates]) => (
                <Accordion key={week} defaultExpanded sx={{mb: 2, backgroundColor: '#252525', borderRadius: 2}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <Typography fontWeight={600}>{week}주차</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {dates.map((date) => {
                            const entries = workMap[date] || []
                            const totalMinutes = entries.reduce((sum, e) =>
                                e.checkIn && e.checkOut ? sum + getDiffMinutes(e.checkIn, e.checkOut) : sum, 0
                            )
                            return (
                                <Box key={date} sx={{mb: 1}}>
                                    <Typography fontWeight={500}>{date}</Typography>
                                    <Typography variant='body2' sx={{color: '#aaa'}}>
                                        근무: {totalMinutes > 0 ? `${totalMinutes}분` : '없음'} | 식대:
                                        ₩{mealMap[date]?.toLocaleString() ?? 0}
                                    </Typography>
                                </Box>
                            )
                        })}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}

export default WorkingSchedule