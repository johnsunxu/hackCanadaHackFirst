'use client';
import { Box, Stack, Typography, Button, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Modal } from '@mui/material';
// import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AddGoalModal from './addGoalModal';

type Goal = {
    title: string; 
    description: string; 
    status?: string; 
    date?: string;
}

function GoalsPage(){
    // const router = useRouter(); 
    const [goalList, setGoalList] = useState<Goal[]>([]);
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newStatus, setNewStatus] = useState<string>('');
    const [newDate, setNewDate] = useState<string>('');


    async function addGoal(newGoal: Goal) {
        const requestBody = {
            email: "jasontran2134@gmail.com",
            todo_item: "daklsjlf"
        };
        fetch("http://localhost:5000/todo", {
            method: 'POST',
            headers: {
                "Content-Type"  : "application/json"
            },
            body: JSON.stringify(requestBody),
        });
    }

    

    return (
        <Box
            className='m-24'
        >   
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <Typography
                    variant='h2'
                    className=""
                >
                    Goal setting list 
                </Typography>
                <AddGoalModal 
                    title={newTitle}
                    description={newDescription}
                    setTitle={setNewTitle}
                    setDescription={setNewDescription}
                    setDate={setNewDate}
                    setStatus={setNewStatus}
                />

            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Goal</TableCell>
                    <TableCell align='right'>Description</TableCell>
                    <TableCell align='right'>Due Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {goalList.map((goal) => (
                    <TableRow
                        key={goal.title}
                    >
                        <TableCell component='th' scope='row'>{goal.description}</TableCell>
                        <TableCell align='right'>{goal.date}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default GoalsPage;
