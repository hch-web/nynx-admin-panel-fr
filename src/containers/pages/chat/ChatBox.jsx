import React, { useState, useLayoutEffect, useEffect, useRef, useMemo } from 'react';
import { Grid, Box, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

// SERVICES
import { useLazyListAllRoomUsersQuery } from 'services/private/chat';
import { useSnackbar } from 'notistack';

// STYLES
import { MessagesWrapperStyles, userListContainerStyles } from 'styles/mui/containers/chat-box-styles';

// HOOK

import { getDateSorting, transformOptions } from 'utilities/helpers';

// COMPONENTS
import { useLocation } from 'react-router';
import { ALL_ROOM_SOCKET_URL } from 'utilities/sockets-urls';
import SearchBar from './SearchBar';
import useConnectWebSocket from './custom-hooks/useConnectWebSocket';
import useWindowDimensions from './custom-hooks/useWindowDimensions';

import User from './User';
import MessageList from './MessageList';

// CONSTANTS
import { ChatContext } from './contexts/ChatContext';

function ChatBox() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const { state } = useLocation();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const { userInfo } = useSelector(states => states.auth);

  const allRoomsSocket = useConnectWebSocket(ALL_ROOM_SOCKET_URL);

  const [listAllRoomUsers, { isFetching: usersFetching }] = useLazyListAllRoomUsersQuery();
  const { width } = useWindowDimensions();

  // states
  const [chatRoomId, setChatRoomId] = useState(null);
  const [roomsUserList, setRoomsUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, _setSearchText] = useState('');
  const [pendingMessages, setPendingMessages] = useState([]);
  const [disputeUser, setDisputeUser] = useState(null);
  // refs
  const searchTextRef = useRef(searchText);

  const setSearchText = data => {
    searchTextRef.current = data;
    _setSearchText(data);
  };
  const getlistAllRoomUsers = () => {
    listAllRoomUsers().then(({ data = [] }) => {
      const sortedUsersList = [...transformOptions(data)].sort(getDateSorting('desc', 'last_message_time'));
      setRoomsUserList(sortedUsersList);

      if (sortedUsersList?.length > 0) {
        const users = state?.data
          ? sortedUsersList.filter(item => item.room_id === state?.data?.id)
          : sortedUsersList[0];
        const user = state?.data ? users[0] : users;
        const isOwner = userInfo?.id === user?.owner_id;
        const userId = isOwner ? user?.partner_id : user?.owner_id;
        const selectedUserFirstName = isOwner ? user?.partner_first_name : user?.owner_first_name;
        const selectedUserLastName = isOwner ? user?.partner_last_name : user?.owner_last_name;
        const selectedUserName = isOwner ? user?.response?.partner_username : user?.owner_username;
        setChatRoomId(user?.room_id);
        setDisputeUser(user);
        setSelectedUser({ userId, selectedUserFirstName, selectedUserLastName, selectedUserName });
      }
    });
  };
  useEffect(() => {
    getlistAllRoomUsers();
  }, []);

  useLayoutEffect(() => {
    if (width < 990) setShowUserList(false);
    else setShowUserList(true);
  }, [width]);

  // WEB-SOCKET
  useEffect(() => {
    if (allRoomsSocket) {
      allRoomsSocket.onmessage = e => {
        if (e.data) {
          // const data = JSON.parse(e.data);

          // const sortedUsersList = [...transformOptions(data)].sort(getSorting('desc', 'last_message_time'));
          // setRoomsUserList(sortedUsersList);

          setTimeout(() => {
            const body = { search: searchTextRef.current };

            listAllRoomUsers(body).then(({ data = [] }) => {
              const sortedUsersList = [...transformOptions(data)].sort(
                getDateSorting('desc', 'last_message_time')
              );
              setRoomsUserList(sortedUsersList);
            });
          }, [100]);
        }
      };
    }
  }, [allRoomsSocket]);

  const handleHitSocketToGetLatestRoom = () => {
    allRoomsSocket.send(JSON.stringify({}));
  };
  const setClearRoomChat = res => {
    if (res) {
      getlistAllRoomUsers();
      enqueueSnackbar('Chat is Cleard', { variant: 'success' });
    }
  };
  // CONTEXT VALUE
  const chatContextValue = useMemo(
    () => ({
      chatRoomId,
      pendingMessages,
      setPendingMessages,
      selectedUser,
      handleGetLatestRoom: handleHitSocketToGetLatestRoom,
    }),
    [chatRoomId, pendingMessages, selectedUser, allRoomsSocket]
  );

  return (
    <ChatContext.Provider value={chatContextValue}>
      <Grid container>
        <Grid item xl={3} lg={5} md={12} sm={12} sx={userListContainerStyles}>
          <Box>
            {showUserList && (
              <Box>
                <Box className="p-3">
                  <SearchBar
                    placeholder="Search Users"
                    searchApi={listAllRoomUsers}
                    loading={usersFetching}
                    setSearchList={setRoomsUserList}
                    setSearchText={setSearchText}
                    searchText={searchText}
                  />
                </Box>

                <Box sx={MessagesWrapperStyles}>
                  <Box sx={{ height: 'auto' }}>
                    {roomsUserList?.map(user => (
                      <User
                        key={user?.room_id}
                        user={user}
                        setChatRoomId={setChatRoomId}
                        chatRoomId={chatRoomId}
                        setDisputeUser={setDisputeUser}
                        setSelectedUser={setSelectedUser}
                        setShowUserList={setShowUserList}
                        isCleared={user.is_deleted}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {!showUserList && (
              <Box className="p-3">
                <MenuIcon sx={{ color: darkPurple }} onClick={() => setShowUserList(!showUserList)} />

                <Typography variant="title" color={darkPurple}>
                  Chats
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={7} xl={9}>
          <MessageList setClearChat={setClearRoomChat} disputeUser={disputeUser} />
        </Grid>
      </Grid>
    </ChatContext.Provider>
  );
}

export default ChatBox;
