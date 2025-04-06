import React, {useState} from 'react';
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material';

const mockVacations = [
    {date: '2025-01-15', type: '연차'},
    {date: '2025-03-04', type: '오전 반차'},
    {date: '2025-04-12', type: '오후 반차'},
    {date: '2025-06-01', type: '연차'},
    {date: '2025-09-22', type: '병가'}
];

const Vacation: React.FC = () => {
    const [year, setYear] = useState('2025');

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#121212',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'white'
                }}
            >
                <Container sx={{flex: '0 0 auto', pb: 1}}>
                    <Box className="top-banner-space"/>

                    {/* 연도 선택 */}
                    <Box mb={2}>
                        <FormControl fullWidth className="select-box">
                            <InputLabel id="year-label" sx={{color: '#bbb'}}>연도</InputLabel>
                            <Select
                                labelId="year-label"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                label="연도"
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
                                            color: '#ccc'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="2025">2025</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* 요약 카드 */}
                    <Box className="vacation-summary-box">
                        <Box className="summary-box left">
                            <Typography>사용 휴가</Typography>
                            <Typography variant="h6" fontWeight="bold">4일</Typography>
                        </Box>
                        <Box className="summary-divider"/>
                        <Box className="summary-box right">
                            <Typography>잔여 휴가</Typography>
                            <Typography variant="h6" fontWeight="bold">6일</Typography>
                        </Box>
                    </Box>

                    {/* 휴가 리스트 스크롤 */}
                    <Box sx={{maxHeight: '40vh', overflowY: 'auto', mt: 2}}>
                        {mockVacations.map((item, index) => (
                            <Box key={index} className="vacation-item">
                                <Box>
                                    <Typography variant="body2" fontWeight={600}
                                                sx={{color: '#fff'}}>{item.date}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{color: '#ccc'}}>{item.type}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* 하단 버튼 */}
                    <Box sx={{mt: 2, pb: 2, pt: 1}}>
                        <Button fullWidth variant="contained" className="add-vacation-button">
                            휴가 추가하기
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Vacation;
