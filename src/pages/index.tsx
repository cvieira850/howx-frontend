import { Button, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useContext } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {
  const { signOut } = useContext(AuthContext)
  return (
    <Flex direction="column" >
      <Flex direction="column" h="100vh" minHeight="100%">
        <Header />
        <Sidebar />
        <h1>Hello World</h1>
      </Flex>
      <Footer/>
    </Flex>
  )
}

export default Home
