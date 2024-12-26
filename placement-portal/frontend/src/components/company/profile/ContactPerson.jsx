import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Button,
    Box
  } from '@mui/material';
  import { Add, Edit, Delete } from '@mui/icons-material';
  
  export const ContactPersons = ({ contacts, onAdd, onEdit, onDelete }) => {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Contact Persons
            </Typography>
            <Button
              startIcon={<Add />}
              onClick={onAdd}
            >
              Add Contact
            </Button>
          </Box>
  
          <List>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                secondaryAction={
                  <Box>
                    <IconButton onClick={() => onEdit(contact)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(contact.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar>{contact.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {contact.designation}
                      </Typography>
                      <br />
                      {contact.email} | {contact.phone}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };