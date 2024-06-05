import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme, Divider, CircularProgress, MenuItem, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import { useNavigate } from 'react-router-dom';

// API HOOKS & CUSTOM HOOKS
import {
  useLazyListChatMessagesQuery,
  useBlockUserMutation,
  useClearChatMutation,
  useCreateRoomMutation,
} from 'services/private/chat';
import propTypes from 'prop-types';
// STYLES
import {
  chatTitleStyles,
  MessagesWrapperStyles,
  // messageListMenuStyles,
  messageListMenuItemStyles,
  postion,
} from 'styles/mui/containers/chat-box-styles';
import { useSnackbar } from 'notistack';

// COMMON COMPONENTS

// UTILITIES
import { formatName } from 'utilities/helpers';
import { useSelector } from 'react-redux';
import { webSocketUrl } from 'utilities/sockets-urls';
import useGetGlobalAppContext from './custom-hooks/useGetGlobalAppContext';

// Hooks
import useConnectWebSocket from './hooks/useConnectWebSocket';

// COMPONENTS
import MessageItem from './MessageItem';
import useGetChatContext from './hooks/useGetChatContext';
import ChatMessageForm from './ChatMessageForm';
import DisputeMessage from './DisputeMessage';

function MessageList({ setClearChat, disputeUser }) {
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const parrot = colors.parrot.main;
  const grey = colors.grey.main;

  const { users: chatUsers } = useGetGlobalAppContext();
  const { pendingMessages, setPendingMessages, selectedUser, handleGetLatestRoom, chatRoomId } =
    useGetChatContext();
  const { userInfo } = useSelector(state => state.auth);

  const socket = useConnectWebSocket(webSocketUrl(chatRoomId), chatRoomId);
  // API HOOK
  const [listChatMessages, { isLoading: chatMessagesLoading }] = useLazyListChatMessagesQuery();

  // STATE HOOKS
  const [isScrolling, setScrolling] = useState(false);
  const [isBlocked, setisBlocked] = useState(null);
  const [blockBy, setBlockBy] = useState(null);

  const [chatMessages, _setChatMessages] = useState([]);
  const [queryParams, _setQueryParams] = useState({});
  const [blockUser] = useBlockUserMutation();
  const [clearChat] = useClearChatMutation();

  const [createRoom] = useCreateRoomMutation();

  // Ref
  const newMsgRef = useRef(null);
  const chatMessagesStateRef = useRef(chatMessages);
  const msgContainerRef = useRef(null);
  const queryPramsStateRef = useRef(queryParams);
  const totalMessageCountRef = useRef(null);

  // HANDLER FUNCTIONS

  const setQueryParams = url => {
    const query = new URLSearchParams(url?.split('chat/')[2]);

    const data = {
      limit: +query.get('limit'),
      offset: +query.get('offset'),
      id: chatRoomId,
    };

    queryPramsStateRef.current = data;
    _setQueryParams(data);
  };

  // CUSTOM STATE SETTER
  const setChatMessages = data => {
    chatMessagesStateRef.current = data;
    _setChatMessages(data);
  };
  const getRoom = () => {
    createRoom({ owner: userInfo?.id, partner: selectedUser?.userId }).then(room => {
      room?.data?.blocked_by?.map(user => setBlockBy(user));
      setisBlocked(room.data.is_blocked);
    });
  };

  const handleBlockUser = () => {
    blockUser(chatRoomId).then(res => {
      if (res) {
        getRoom();
      }
    });
    if (!isBlocked) {
      enqueueSnackbar('Chat is Blocked', { variant: 'success' });
    } else {
      enqueueSnackbar('Chat is Unblocked', { variant: 'success' });
    }
  };
  const getPrevMessages = async () => {
    const msgsResp = await listChatMessages(queryPramsStateRef.current);

    totalMessageCountRef.current = msgsResp?.data?.count;
    const recentViewedMsgId = chatMessagesStateRef.current?.at(-1);
    const getRecentViewedMsg = document.getElementById(`message-${recentViewedMsgId.id}`);
    getRecentViewedMsg?.scrollIntoView();

    const data = [...chatMessagesStateRef.current, ...msgsResp.data.results];

    const filteredData = data.filter(
      (item, idx, array) => array.findIndex(value => value.id === item.id) === idx
    );

    setChatMessages(filteredData);
    setQueryParams(msgsResp.data?.next);
  };
  // WEB-SOCKET
  useEffect(() => {
    if (socket) {
      getRoom();
      socket.onmessage = e => {
        const data = JSON.parse(e.data);

        setPendingMessages(prevState => {
          if (prevState?.length > 0) prevState?.shift();

          return prevState;
        });

        setChatMessages([data, ...chatMessagesStateRef.current]);

        handleGetLatestRoom();
      };
    }
  }, [socket]);

  useEffect(() => {
    const chatParams = { id: chatRoomId, limit: 15, offset: 0 };
    _setQueryParams(chatParams);
    if (chatParams.id) {
      listChatMessages(chatParams).then(res => {
        setChatMessages(res?.data);
        totalMessageCountRef.current = res?.data?.count;
        setQueryParams(res.data?.next);
      });
    }
  }, [chatRoomId]);

  useEffect(() => {
    if (!isScrolling) newMsgRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [chatMessages, isScrolling, pendingMessages]);

  useEffect(() => {
    msgContainerRef.current?.addEventListener('scroll', () => {
      const container = msgContainerRef.current;
      if (container?.scrollTop === 0 && chatMessagesStateRef.current?.length < totalMessageCountRef.current) {
        setScrolling(true);
        getPrevMessages();
      }
      if (container && container.scrollHeight - container.scrollTop === container.clientHeight) {
        setScrolling(false);
      }
    });

    return () => {
      msgContainerRef.current?.removeEventListener('scroll', () => {});
    };
  }, [msgContainerRef.current]);

  // CONSTANTS
  const isChatSelected = Boolean(chatRoomId);
  // HANDLER FUNCTIONS
  const handleGetChatMessages = () => {
    const chatParams = { id: chatRoomId, limit: 15, offset: 0 };
    listChatMessages(chatParams).then(res => {
      setChatMessages(res?.data);
      totalMessageCountRef.current = res?.data?.count;
      setQueryParams(res.data?.next);
    });
  };
  // const handleProfileRedirect = () => {
  //   navigate(`/profile/${selectedUser?.selectedUserFirstName}-${selectedUser?.selectedUserLastName}`, {
  //     state: {
  //       id: selectedUser?.userId,
  //     },
  //   });
  // };
  const isUserOnline = chatUsers?.find(item => item.profile === selectedUser?.userId)?.online_status;
  const handleClearChat = () => {
    clearChat(chatRoomId).then(res => {
      if (res) {
        handleGetChatMessages();
        setClearChat(chatRoomId);
        enqueueSnackbar('Chat is Cleard', { variant: 'success' });
      }
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box sx={chatTitleStyles}>
        <Box className="d-flex align-items-center p-3">
          <Box className="flex-grow-1 d-flex justify-content-center">
            {isChatSelected && (
              <Box>
                <Box className="d-flex justify-content-center gap-1">
                  <Typography variant="h6" color={darkPurple} sx={{ lineHeight: 1 }}>
                    {formatName(
                      selectedUser?.selectedUserFirstName,
                      selectedUser?.selectedUserLastName,
                      selectedUser?.selectedUserName
                    )}
                  </Typography>

                  <Box className="d-flex flex-column justify-content-center">
                    <FiberManualRecordIcon sx={{ fontSize: '12px', color: isUserOnline ? parrot : grey }} />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Box className="pointer dropdown">
            <div>
              <MoreHorizIcon
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}

              />
              <Menu
                sx={postion}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

              >
                {/* <MenuItem
                  sx={messageListMenuItemStyles}
                  onClick={handleProfileRedirect}
                >Profile
                </MenuItem> */}
                <MenuItem
                  onClick={handleClearChat}
                  sx={messageListMenuItemStyles}
                > Clear Chat
                </MenuItem>
                {(blockBy === null || blockBy === userInfo?.id) && (
                <MenuItem
                  sx={messageListMenuItemStyles}
                  onClick={handleBlockUser}
                > {!isBlocked ? 'Block' : 'Unblock'}
                </MenuItem>
                )}
              </Menu>
            </div>
            {/* <MoreHorizIcon className="dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" />
            <Box className="dropdown-menu" aria-labelledby="dropdownMenuLink" sx={messageListMenuStyles}>
              <Typography
                variant="body1"
                className="py-1 px-3"
                sx={messageListMenuItemStyles}
                onClick={handleProfileRedirect}
              >
                View Profile
              </Typography>
              <Typography
                variant="body1"
                className="py-1 px-3"
                onClick={handleClearChat}
                sx={messageListMenuItemStyles}
              >
                Clear Chat
              </Typography>
              {(blockBy === null || blockBy === userInfo?.id) && (
                <Typography
                  variant="body1"
                  className="py-1 px-3"
                  sx={messageListMenuItemStyles}
                  onClick={handleBlockUser}
                >
                  {!isBlocked ? 'Block' : 'Unblock'}
                </Typography>
              )}
            </Box> */}
          </Box>
        </Box>
      </Box>

      {isChatSelected ? (
        <Box>
          <Box sx={MessagesWrapperStyles} ref={msgContainerRef} id="cont">
            {chatMessagesLoading ? (
              <Box className="d-flex justify-content-center align-items-center h-100">
                <CircularProgress size={80} color="yellow" />
              </Box>
            ) : (
              <Box sx={{ height: 'auto' }} className="d-flex flex-column-reverse justify-content-end p-3">
                <Box className="d-flex flex-column justify-content-end">
                  {pendingMessages?.map(item => (
                    <MessageItem
                      key={item?.id}
                      msgItem={item}
                      handleGetMessages={handleGetChatMessages}
                      isPending
                    />
                  ))}
                </Box>

                <Box className="d-flex flex-column-reverse justify-content-end">
                  {chatMessages?.map(item => (
                    <MessageItem key={item?.id} msgItem={item} handleGetMessages={handleGetChatMessages} />
                  ))}
                  {disputeUser?.dispute ? <DisputeMessage key="dispute" dispute={disputeUser?.dispute} /> : null}
                </Box>
              </Box>
            )}

            <Box sx={{ height: '5px' }} ref={newMsgRef} />
          </Box>

          <Divider light />

          <ChatMessageForm socket={socket} disabled={!isBlocked} />
        </Box>
      ) : (
        <Box className="d-flex justify-content-center align-items-center m-0" sx={{ height: '60vh' }}>
          <Typography variant="h6" color={darkPurple} sx={{ lineHeight: 1 }}>
            No Chat Selected Yet
          </Typography>
        </Box>
      )}
    </Box>
  );
}
MessageList.propTypes = {
  setClearChat: propTypes.func.isRequired,
  disputeUser: propTypes.any,
};
MessageList.defaultProps = {
  disputeUser: null,
};
export default MessageList;
