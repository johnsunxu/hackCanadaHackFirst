"use client";
import { Box, Typography, Table, TableBody, TableContainer, TableCell, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

type Friend = {
  userId: string;
  username: string;
  distanceScrolled: number;
  timeSpent: number;
}

export default function FriendsPage() {
    const [friends, setFriends] = useState<Friend[]>([]);
    return (
      <Box>
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
                key={friend.userId}
              >
                <TableCell component='th' scope='row'>{friend.username}</TableCell>
                <TableCell align='right'>{friend.distanceScrolled}</TableCell>
                <TableCell align='right'>{friend.timeSpent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    )
  }