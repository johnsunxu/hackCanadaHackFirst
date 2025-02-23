import {
    Modal,
    Box,
    TextField,
} from '@mui/material';

function addGoalModal({props}) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = setOpen(true); 
    const handleClose = setOpen(false); 


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
                
            </Box>
        </Modal>
    );
}

export default addGoalModal;