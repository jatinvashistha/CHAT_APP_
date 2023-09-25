import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModal from './miscellaneous/ProfileModal';
import { getSender, getSenderFull } from '../config/ChatLogics';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './style.css';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animation/typing.json";


const ENDPOINT = "https://smn8mm-5000.csb.app"; 
var socket, selectedChatCampare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages, setMessages] = useState([]);
    
  const [loading, setLoading] = useState(false);
  
  const [newMessage, setNewMessage] = useState();

  const [socketConnected, setSocketConnected] = useState(false);
  
  const [typing, setTyping] = useState(false);
  
  const [istyping, setIsTyping] = useState(false);

  
  const toast = useToast();

   const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const fetchMessages = async () => {
    
     if (!selectedChat) return;

    try {
      const config = {
          headers: {  token: user.token, },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://smn8mm-5000.csb.app/api/message/${selectedChat._id}`,
        config
      );
      // console.log(data)
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    
  }
 

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
       socket.emit("stop typing", selectedChat._id);
      try {
         const config = {
          headers: {
            "Content-type": "application/json",
             token: user.token,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://smn8mm-5000.csb.app/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data)
        socket.emit("new message", data);
         setMessages([...messages, data]);
      } catch (error) {
         toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
 
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCampare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);
// console.log(notification,"------------")
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCampare || // if chat is not selected or doesn't match current chat
         selectedChatCampare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

   
  
  
  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
      <>
          {
              selectedChat ? (
                  <>
                      <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center" >

         <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
                          />
                           {
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}

                      </Text>
                      <Box
                       display="flex"
                       flexDirection="column"
                       justifyContent="flex-end"
                       padding={3}
                       bg="#E8E8E8"
                       width="100%"
                       height="100%"
                      borderRadius="lg"
                       overflowY="hidden"
                      >
                       {loading ? (
              <Spinner
                size="xl"
                width={20}
                height={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
                      </Box>
                  </>
              ) : (
                      <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      height={"100%"}

                      >
                          <Text
                          fontSize={"3xl"}
                          pb={3}
                          fontFamily={"Work sans"}
                          >
             Click on a user to start chatting

                          </Text>
                          
                      </Box>
               )
          }
      </>
  )
}

export default SingleChat