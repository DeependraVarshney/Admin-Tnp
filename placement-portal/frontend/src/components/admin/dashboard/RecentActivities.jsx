import { 
    Card, 
    CardHeader, 
    CardContent, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemIcon,
    Typography 
  } from '@mui/material';
  import { 
    NotificationImportant, 
    BusinessCenter, 
    Person 
  } from '@mui/icons-material';
  
  export const RecentActivities = ({ activities }) => {
    const getIcon = (type) => {
      switch(type) {
        case 'jnf':
          return <BusinessCenter color="primary" />;
        case 'company':
          return <Person color="secondary" />;
        default:
          return <NotificationImportant color="error" />;
      }
    };
  
    return (
      <Card>
        <CardHeader title="Recent Activities" />
        <CardContent>
          <List>
            {activities.map((activity, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {getIcon(activity.type)}
                </ListItemIcon>
                <ListItemText
                  primary={activity.title}
                  secondary={activity.timestamp}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };