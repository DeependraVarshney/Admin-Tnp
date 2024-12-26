import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    Typography,
    Grid,
    Divider 
  } from '@mui/material';
  
  export const JNFPreview = ({ open, onClose, jnf }) => {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          JNF Preview
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Company Details</Typography>
              <Divider sx={{ my: 1 }} />
              {/* Company details */}
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6">Job Details</Typography>
              <Divider sx={{ my: 1 }} />
              {/* Job details */}
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6">Selection Process</Typography>
              <Divider sx={{ my: 1 }} />
              {/* Selection process details */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" color="primary">
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    );
  };