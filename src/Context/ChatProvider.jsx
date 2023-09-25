//   sendToken(res, user, "Registered Successfully", 201);
 

 import { useHistory } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
 
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);

    const [chats, setChats] = useState();

  const history = useHistory();

  // console.log(history)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)
    setUser(userInfo);

    if (!userInfo) {
      history.push('/');
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{
      user, setUser
      , selectedChat, setSelectedChat
      , notification, setNotification
      , chats, setChats
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
 
export default ChatProvider;
