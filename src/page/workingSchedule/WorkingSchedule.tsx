import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const mockData = [
    {
        week: '1주차',
        totalWorked: '32시간',
        remainOrOver: '+8시간',
        days: [
            {date: '4/1 (월)', workTime: '8시간', meal: '8,000원', vacation: null},
            {date: '4/2 (화)', workTime: '8시간', meal: '8,000원', vacation: null},
            {date: '4/3 (수)', workTime: '8시간', meal: '8,000원', vacation: null},
            {date: '4/4 (목)', workTime: '휴가', meal: '0원', vacation: '연차'},
            {date: '4/5 (금)', workTime: '8시간', meal: '8,000원', vacation: null},
        ],
    },
];

const WeeklyWorkAccordion: React.FC = () => {
    const [year, setYear] = useState('2025');
    const [month, setMonth] = useState('04');

    return (
        <Box
            sx={{
                backgroundColor: '#121212',
                minHeight: '100vh',
                color: '#fff',
                padding: '24px 16px', // 여백 통일
            }}
        >
            <Box className="top-banner-space"/>

            <Box display="flex" gap={2} mb={2}>
                <FormControl fullWidth>
                    <InputLabel sx={{color: '#bbb'}}>년도</InputLabel>
                    <Select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: '8px',
                            color: '#ccc',
                            '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'},
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#00B8FF'},
                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#666'},
                            '.MuiSvgIcon-root': {color: '#aaa'}
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#1f1f1f',
                                    color: '#ccc',
                                    '& .MuiMenuItem-root:hover': {
                                        backgroundColor: '#333'
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value="2025">2025</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel sx={{color: '#bbb'}}>월</InputLabel>
                    <Select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#2a2a2a',
                            borderRadius: '8px',
                            color: '#ccc',
                            '.MuiOutlinedInput-notchedOutline': {borderColor: '#444'},
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#00B8FF'},
                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#666'},
                            '.MuiSvgIcon-root': {color: '#aaa'}
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#1f1f1f',
                                    color: '#ccc',
                                    '& .MuiMenuItem-root:hover': {
                                        backgroundColor: '#333'
                                    }
                                }
                            }
                        }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                {i + 1}월
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* 총 식대 상단 배치 */}
            <Box textAlign="right" mb={2}>
                <Typography variant="caption" sx={{color: '#aaa'}}>
                    이번달 총 식대: 96,000원
                </Typography>
            </Box>

            {mockData.map((weekData, index) => (
                <Accordion
                    key={index}
                    defaultExpanded
                    sx={{
                        mb: 2,
                        backgroundColor: '#252525',
                        borderRadius: 2,
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        '& .MuiAccordionSummary-content': {alignItems: 'center'},
                        '& .MuiAccordionSummary-expandIconWrapper': {color: '#bbb'}
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <Typography fontWeight={600}>{weekData.week}</Typography>
                            <Typography color="#bbb">
                                {weekData.totalWorked} / {weekData.remainOrOver}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {weekData.days.map((day, idx) => (
                            <Box key={idx} sx={{mb: 1}}>
                                <Typography fontWeight={500}>{day.date}</Typography>
                                <Typography variant="body2" sx={{color: '#aaa'}}>
                                    근무: {day.workTime} | 식대: {day.meal} {day.vacation && `| 휴가: ${day.vacation}`}
                                </Typography>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default WeeklyWorkAccordion;
