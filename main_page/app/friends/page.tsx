"use client";
import { Box, Typography, Table, TableBody, TableContainer, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

type Friend = {
  email: string;
  distance_scrolled: number;
  time_spent_on_social_media_today: number;
}

export default function FriendsPage() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendIds, setFriendIds] = useState<String[]>([]);

    useEffect(() => {
      const getFriendIds = async () => {
        const tempEmail = 'jasontran2134@gmail.com';
        const res = await fetch(`http://localhost:5000/get_user_info?email=${tempEmail}`);
        const data = await res.json();
        console.log(data);
        setFriendIds(data.friends);
      };
      getFriendIds();
    }, []);

    useEffect(()=>{
      const getFriendObject = async () => {
        
        const tempFriendList : any[] = [];
        for (const id of friendIds) {
          console.log(id);
          const res = await fetch(`http://localhost:5000/get_user_info?email=${id}`);
          const data = await res.json();
          tempFriendList.push(data);
        }
        setFriends(tempFriendList);
      };
      getFriendObject();
    }, [friendIds]);

    return (
      <Box 
        className='m-24'
      >
        <Typography
          variant='h2'
        >
          Doomscrolling Leaderboard
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Friend</TableCell>
              <TableCell align='right'>Distance Scrolled (inches)</TableCell>
              <TableCell align='right'>Time Spent Today</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friends.map((friend) => (
              <TableRow
                key={friend.email}
              >
                <TableCell component='th' scope='row'>{friend.email}</TableCell>
                <TableCell align='right'>{friend.distance_scrolled}</TableCell>
                <TableCell align='right'>{friend.time_spent_on_social_media_today}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    )
  }