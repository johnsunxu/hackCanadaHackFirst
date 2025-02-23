import {
    Modal,
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';

type PropType = {
    title: string; 
    description: string;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setDate: Dispatch<SetStateAction<string>>;
    setStatus: Dispatch<SetStateAction<string>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddGoalModal(props : PropType) {
    const [open, setOpen] = useState<boolean>(false);
    const { title, description, setTitle, setDescription, setDate, setStatus } = props;
    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false); 

    async function handleSubmit() {
        const requestBody = {
            email: "jasontran2134@gmail.com",
            todo_item: {
                title: title,
                description: description,
                // date
                status: "incomplete"
            }
        };
        const res = await fetch("http://localhost:5000/todo", {
            method: 'POST',
            headers: {
                "Content-Type"  : "application/json",
                "User-Agent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
            },
            body: JSON.stringify(requestBody),       
        });
    }

    // Dispatch<SetStateAction<string>>

    return (
        <>
            <Button
                onClick={handleOpen}
            >
                Add Goal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={style}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create new goal
                    </Typography>
                    <TextField
                        label='Title'
                        value={title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                        }}
                    />
                    <TextField
                        label='Description'
                        value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value);
                        }}
                    />

                    <Button
                        onClick={() => handleSubmit()}
                    >
                        Create Goal
                    </Button>
                    {/* <TextField
                        label='Date'
                        value=''
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                        }}
                    /> */}
                </Box>
            </Modal>
        </>
    );
}

export default AddGoalModal;