import React from 'react';
import axios from 'axios';
import { uid } from 'react-uid';
import { useEffect, useState } from 'react';
import { Box, IconButton, Button } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import playersList from './components/PlayersList/PlayersList';
import TransactionBox from './components/TransactionBox/TransactionBox';
import ListPlayerAvatarsSelect from './components/ListPlayerAvatarsSelect/ListPlayerAvatarsSelect';
//import nftData from './nft_data';
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    const getNFTs = async player => {
      // put NFTs data inside "transactions", and set loaded to true if successfull
      if (currentPlayer) {
        const options = {
          method: 'GET',
          url: 'https://opensea13.p.rapidapi.com/events',
          params: {
            only_opensea: 'false',
            account_address: playersList.get(player).address,
            event_type: 'successful',
            //successful event means buy event. other event example:bid
          },
          headers: {
            'X-RapidAPI-Key':
              'b4027c1201mshccf348b888d8b68p1c7765jsn337dcddf9965',
            'X-RapidAPI-Host': 'opensea13.p.rapidapi.com',
          },
        };

        axios
          .request(options)
          .then(function (response) {
            setTransactions(response.data.asset_events);
            setLoaded(true);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    };
    getNFTs(currentPlayer);
  }, [currentPlayer]);

  return (
    <>
      <Box
        mt={'auto'}
        mb="auto"
        display={'flex'}
        alignItems="flex-start"
        justifyContent={'center'}
        w="100vw"
      >
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          //Modal player select, closes from child once we select another player or hit the back button
        >
          <ModalOverlay />
          <ModalContent
            boxShadow="none"
            position={'fixed'}
            bgColor={'transparent'}
          >
            <ListPlayerAvatarsSelect
              currentPlayer={currentPlayer}
              setCurrentPlayer={p => {
                setCurrentPlayer(p);
              }}
              setLoaded={p => {
                setLoaded(p);
              }}
              onClose={onClose}
              setLoading={p => {
                setLoading(p);
              }}
            />
          </ModalContent>
        </Modal>

        <Box
          //little menu, shown once we have a currentPlayer, hidden for none (except for theme selection icon)
          display={currentPlayer ? 'flex' : 'none'}
          flexDirection="column"
          alignItems={'center'}
          gap={5}
          p={8}
          borderRadius={20}
          position={'fixed'}
          left={4}
          top={4}
          zIndex={'344'}
          boxShadow="dark-lg"
          bg={colorMode === 'dark' ? 'blackAlpha.800' : 'whiteAlpha.900'}
        >
          <IconButton
            //Theme Change Button
            position={'fixed'}
            zIndex={344}
            boxShadow="dark-lg"
            onClick={toggleColorMode}
            bgColor="transparent"
            borderRadius={50}
            left={'30px'}
            top={'47px'}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          ></IconButton>

          <Button
            //back button, sets currentPlayer to undefined, so player list is shown, and little menu hidden
            colorScheme="blue"
            ml={'auto'}
            px={10}
            onClick={() => {
              setCurrentPlayer();
              setLoaded(false);
              setLoading(false);
            }}
            boxShadow="dark-lg"
            borderRadius={50}
            variant="solid"
          >
            back
          </Button>
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            {currentPlayer}
          </Text>
          <Button onClick={onOpen} cursor="pointer" variant={'outline'}>
            Select another player
          </Button>
        </Box>

        {!currentPlayer && (
          //show player list unless we have a player already selected
          <>
            <ListPlayerAvatarsSelect
              currentPlayer={undefined}
              setCurrentPlayer={p => {
                setCurrentPlayer(p);
              }}
              setLoaded={p => {
                setLoaded(p);
              }}
              setLoading={p => {
                setLoading(p);
              }}
            />
          </>
        )}
      </Box>

      {loading && !loaded && (
        //if we are loading, show loading screen
        <Box mt={20}>
          <Button
            w={'100%'}
            h={'40vh'}
            isLoading
            bgColor={'transparent'}
            variant="solid"
            size={'lg'}
          >
            Loading
          </Button>
        </Box>
      )}

      {loaded && (
        // if we have NFT data, list it
        <Box
          w={'100vw'}
          h={'100vh'}
          mt={'300px'}
          mb={20}
          pt={20}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          gap={20}
        >
          {loaded &&
            transactions.map(transaction => {
              return (
                <TransactionBox
                  transaction={transaction}
                  key={uid(transaction)}
                />
              );
              //a box displaying transaction data
            })}
        </Box>
      )}
    </>
  );
}

export default App;
