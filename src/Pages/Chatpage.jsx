 import { Box } from "@chakra-ui/react";
 import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";
 

const Chatpage = () => {
   
  const { user } = ChatState();
const [fetchAgain,setFetchAgain]= useState()
  return (
    <div style={{ width: "100%" }}>
    {user && <SideDrawer />}  
    <Box
       justifyContent="space-between"
          p="10px"
        display="flex"
            flexDirection="row"  // Horizontally arrange the children
        alignItems="center"
        width={"100%"}
     >
        {user && (
          <MyChats
          fetchAgain={fetchAgain}
          
          />
         
        )}
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          />
        )}

    </Box>
    </div>
    
  )
}

export default Chatpage