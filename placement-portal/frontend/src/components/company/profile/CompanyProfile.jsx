import {
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    Avatar,
    Box
  } from '@mui/material';
  import { Edit } from '@mui/icons-material';
  
  export const CompanyProfile = ({ profile, onEdit }) => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={profile.logo}
                sx={{ width: 80, height: 80 }}
              />
              <div>
                <Typography variant="h5">
                  {profile.name}
                </Typography>
                <Typography color="textSecondary">
                  {profile.type}
                </Typography>
              </div>
            </Box>
            <Button
              startIcon={<Edit />}
              onClick={onEdit}
            >
              Edit Profile
            </Button>
          </Box>
  
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Website
              </Typography>
              <Typography>
                {profile.website}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Industry
              </Typography>
              <Typography>
                {profile.industry}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                About
              </Typography>
              <Typography>
                {profile.about}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  