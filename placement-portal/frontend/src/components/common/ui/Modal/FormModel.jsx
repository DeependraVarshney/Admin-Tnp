import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
  } from '@mui/material';
  import { Close } from '@mui/icons-material';
  
  export const FormModal = ({
    open,
    onClose,
    onSubmit,
    title,
    children,
    submitText = 'Submit',
    maxWidth = 'sm'
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth
      >
        <DialogTitle>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent dividers>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {submitText}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };