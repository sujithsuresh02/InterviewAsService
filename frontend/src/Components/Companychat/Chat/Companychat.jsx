import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: '400px',
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial, sans-serif',
    zIndex: 9999,
  },
  chatHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    cursor: 'pointer',
  },
  chatIcon: {
    marginRight: theme.spacing(1),
  },
  chatContainer: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  messageInputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: '1px solid #e0e0e0',
  },
  messageInput: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  sendButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const ChatWidget = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChat = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSendMessage = () => {
    if (messageInput) {
      setMessages((prevMessages) => [...prevMessages, messageInput]);
      setMessageInput('');
    }
  };

  return (
    <div className={classes.root}>
      {!isOpen && (
        <div className={classes.chatHeader} onClick={handleToggleChat}>
          <ChatIcon className={classes.chatIcon} />
          <span>Support</span>
        </div>
      )}
      {isOpen && (
        <>
          <div className={classes.chatContainer}>
            <List>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText primary={message} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.messageInputContainer}>
            <TextField
              className={classes.messageInput}
              variant="outlined"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button
              className={classes.sendButton}
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;
