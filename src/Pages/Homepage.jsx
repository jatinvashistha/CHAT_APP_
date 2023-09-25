import React, { useEffect } from 'react'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import { useHistory } from 'react-router-dom';
 

const Homepage = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {


      history.push("/chats")
      // console.log(user)
    }
  },[history])

  return (
    <Container maxW={'xl'} centerContent pt={4} gap={4}>
      <Box
        display="flex"
        justifyContent={"center"}
        p={3}
        bg={"yellow.200"}
        w="100%"
        m={"40px 0 15 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        boxShadow={"2xl"}
      >
        <Text
        fontSize={"4xl"}
        fontFamily={"work sans"}
        color={ "black"}
        >
         WhatsApp-Messenger
        </Text>
      </Box>
      <Box
      bg={"white"}
      w={"100%"}
      p={4}
      borderRadius={"lg"}
        borderWidth={"1px"}
        boxShadow={"2xl"}
        color={"black"}
      >
         <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Box>


    </Container>
  )
}

export default Homepage