import styled from 'styled-components';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActionsMaterial from '@material-ui/core/DialogActions';
import DialogContentMaterial from '@material-ui/core/DialogContent';
import DialogTitleMaterial from '@material-ui/core/DialogTitle';

export const PersolinalizedDialog = styled(DialogMaterial)`
    & .MuiPaper-root {
        background-color: ${({theme}) => theme.primary};
        color: ${({theme}) => theme.black};
    }
`;