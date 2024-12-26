import {
    Card,
    CardContent,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    TextField,
    IconButton,
    Box,
    Divider,
    Badge
  } from '@mui/material';
  import {
    Send,
    AttachFile,
    MoreVert,
    Search
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  export const MessageCenter = ({ conversations, currentUser, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [selectedConversation, setSelectedConversation] = useState(null);
  
    return (
      <Card sx={{ height: '80vh' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Conversations List */}
          <Grid item xs={4} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Box p={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                InputProps={{
                  startAdornment: <Search color="action" />
                }}
              />
            </Box>
            <Divider />
            <List sx={{ overflow: 'auto', maxHeight: 'calc(80vh - 70px)' }}>
              {conversations.map((conv) => (
                <ListItem
                  key={conv.id}
                  button
                  selected={selectedConversation?.id === conv.id}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <ListItemAvatar>
                    <Badge
                      color="primary"
                      variant="dot"
                      invisible={!conv.unread}
                    >
                      <Avatar>{conv.name[0]}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conv.name}
                    secondary={conv.lastMessage}
                    secondaryTypographyProps={{
                      noWrap: true
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
  
          {/* Message Area */}
          <Grid item xs={8}>
            {selectedConversation ? (
              <Box display="flex" flexDirection="column" height="100%">
                {/* Header */}
                <Box p={2} display="flex" alignItems="center">
                  <Avatar sx={{ mr: 1 }}>{selectedConversation.name[0]}</Avatar>
                  <Typography variant="h6">{selectedConversation.name}</Typography>
                  <IconButton sx={{ ml: 'auto' }}>
                    <MoreVert />
                  </IconButton>
                </Box>
                <Divider />
  
                {/* Messages */}
                <Box
                  p={2}
                  sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {selectedConversation.messages.map((msg) => (
                    <Box
                      key={msg.id}
                      alignSelf={msg.sender === currentUser.id ? 'flex-end' : 'flex-start'}
                      sx={{
                        maxWidth: '70%',
                        mb: 1,
                        p: 1,
                        bgcolor: msg.sender === currentUser.id ? 'primary.light' : 'grey.100',
                        borderRadius: 1
                      }}
                    >
                      <Typography>{msg.content}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  ))}
                </Box>
  
                {/* Input Area */}
                <Box p={2} display="flex" alignItems="center">
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mx: 1 }}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => {
                      onSendMessage(selectedConversation.id, message);
                      setMessage('');
                    }}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Typography color="textSecondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    );
  };