import React, {useState} from 'react'
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material'
import {useAtomValue} from 'jotai'
import {vacationRecordAtom} from '../atoms/vacation.atom'
import {calculateRemainingVacation, calculateUsedVacation} from '../logic/vacatyion.logic';

const Vacation: React.FC = () => {
    const [year, setYear] = useState('2025')
    const vacationMap = useAtomValue(vacationRecordAtom)
    
    const filtered = Object.entries(vacationMap).filter(([date]) => date.startsWith(year))
    const used = calculateUsedVacation(Object.fromEntries(filtered))
    const remaining = calculateRemainingVacation(Object.fromEntries(filtered))

    return (
        <Box sx={{backgroundColor: '#121212', minHeight: '100vh', color: 'white'}}>
            <Container sx={{pb: 1}}>
                <Box height={48}/>

                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel sx={{color: '#bbb'}}>연도</InputLabel>
                        <Select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            sx={{backgroundColor: '#2a2a2a', borderRadius: '8px', color: '#ccc'}}
                        >
                            <MenuItem value='2025'>2025</MenuItem>
                            <MenuItem value='2024'>2024</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{backgroundColor: '#1E1E1E', borderRadius: 2, display: 'flex', overflow: 'hidden', mb: 2}}>
                    <Box flex={1} p={2} textAlign='center'>
                        <Typography>사용 휴가</Typography>
                        <Typography variant='h6' fontWeight='bold'>{used.toFixed(2)}일</Typography>
                    </Box>
                    <Box width={1} bgcolor='#333'/>
                    <Box flex={1} p={2} textAlign='center'>
                        <Typography>잔여 휴가</Typography>
                        <Typography variant='h6' fontWeight='bold'>{remaining.toFixed(2)}일</Typography>
                    </Box>
                </Box>

                <Box maxHeight='40vh' overflow='auto'>
                    {filtered.map(([date, type]) => (
                        <Box key={date} sx={{
                            backgroundColor: '#2F2F2F',
                            borderRadius: 2,
                            p: 2,
                            mb: 1,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography fontWeight={600}>{date}</Typography>
                            <Typography>{type}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box mt={2} pb={2}>
                    <Button fullWidth variant='contained'
                            sx={{backgroundColor: '#00B8FF', color: '#fff', borderRadius: 2}}>
                        휴가 추가하기
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Vacation