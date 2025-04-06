import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';

const absenceOptions = [
    '미입력',
    '오전 반반차',
    '오전 반차',
    '오후 반반차',
    '오후 반차',
    '휴가'
];

const TodaySchedule: React.FC = () => {
    const [selectedAbsence, setSelectedAbsence] = useState('미입력');
    const [mealPrice, setMealPrice] = useState('');
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAbsenceChange = (event: SelectChangeEvent) => {
        setSelectedAbsence(event.target.value);
    };

    const handleSave = () => {
        alert(`저장되었습니다. 식대: ${mealPrice}, 결근 사유: ${selectedAbsence}`);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#121212',
                minHeight: '100vh',
                padding: '8px 16px', // 상단 여백 줄임
                color: '#fff'
            }}
        >
            {/* 상단 시간 */}
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

            {/* 카드 */}
            <Box
                sx={{
                    backgroundColor: '#1E1E1E',
                    borderRadius: 3,
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
            >
                <Typography sx={{fontSize: 14, color: '#bbb', mb: 2}}>
                    오늘의 출퇴근
                </Typography>

                {/* 출퇴근 버튼 */}
                <Box display='flex' gap={2} mb={3}>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: '#1E88E5',
                            color: '#fff',
                            fontWeight: 600
                        }}
                    >
                        출근
                    </Button>
                    <Button
                        fullWidth
                        sx={{
                            backgroundColor: '#8E24AA',
                            color: '#fff',
                            fontWeight: 600
                        }}
                    >
                        퇴근
                    </Button>
                </Box>

                {/* 결근/휴가 셀렉트 */}
                <Select
                    value={selectedAbsence}
                    onChange={handleAbsenceChange}
                    fullWidth
                    size='small'
                    variant='outlined'
                    sx={{
                        backgroundColor: '#2a2a2a',
                        borderRadius: 2,
                        color: '#fff',
                        '& .MuiSelect-icon': {color: '#aaa'},
                        mb: 2
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
                    {absenceOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

                <Divider sx={{borderColor: '#333', my: 2}}/>

                {/* 근무 정보 */}
                <Box>
                    <Typography variant='body2' color='#bbb'>
                        출근 시간
                    </Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>
                        09:00
                    </Typography>

                    <Typography variant='body2' color='#bbb'>
                        퇴근 시간
                    </Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>
                        18:00
                    </Typography>

                    <Typography variant='body2' color='#bbb'>
                        근무 시간
                    </Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>
                        8시간 0분
                    </Typography>

                    <Typography variant='body2' color='#bbb'>
                        이번주 총 근무
                    </Typography>
                    <Typography variant='body1' fontWeight={600} mb={1}>
                        20시간
                    </Typography>
                </Box>
            </Box>

            {/* 오늘 식대 입력과 저장 버튼을 위한 두 번째 패널 */}
            <Box
                sx={{
                    backgroundColor: '#1E1E1E',
                    borderRadius: 3,
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    marginTop: '12px',
                }}
            >
                {/* 오늘 식대 입력과 저장 버튼 */}
                <Box display="flex" gap={2} alignItems="center">
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
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#00B8FF'
                            }
                        }}
                    />
                    <Button
                        className="save-inline-btn"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: '#00B8FF',
                            color: '#121212',
                            fontWeight: 700,
                            borderRadius: 2,
                            height: 42,
                            '&:hover': {
                                backgroundColor: '#00A5E5'
                            }
                        }}
                    >
                        저장
                    </Button>
                </Box>

                {/* 이번달 식대 사용 */}
                <Box mt={2}>
                    <Typography variant="body2" sx={{color: '#aaa'}}>
                        이번달 식대 사용: ₩52,000
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TodaySchedule;
