import React from 'react';
import axios from 'axios';
import { uid } from 'react-uid';
import { useEffect, useState } from 'react';
import { Box, IconButton, Button, Icon } from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import SnoopAvatar from './components/avatars/SnoopAvatar/SnoopAvatar';
import GaryVeeVatar from './components/avatars/GaryVeeAvatar/GaryVeeAvatar';
//import nftData from './nft_data';
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [players, setPlayers] = useState(new Map());
  const [currentPlayer, setCurrentPlayer] = useState();
  const initPlayers = () => {
    let playersList = new Map();

    playersList
      .set('Gary Vee', '0x8f7cEeFaa1ff5DfD125106FF9e219efF360d57AA')
      .set('Snoop Dogg', '0xCe90a7949bb78892F159F428D0dC23a8E3584d75');
    setPlayers(playersList);
  };
  const getNFTs = async () => {
    if (currentPlayer) {
      const options = {
        method: 'GET',
        url: 'https://opensea13.p.rapidapi.com/events',
        params: {
          only_opensea: 'false',
          account_address: players.get(currentPlayer),
          event_type: 'successful',
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

  useEffect(() => {
    getNFTs();
    initPlayers();
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
        {/*HERE MODAL */}
        <Modal isOpen={isOpen} onClose={onClose} bgColor={'transparent'}>
          <ModalOverlay />
          <ModalContent bgColor={'transparent'} boxShadow="none">
            <Box
              display={'flex'}
              flexDirection={{ base: 'column', md: 'row' }}
              mt={0}
              mb="auto"
              ml="auto"
              mr="auto"
              gap={{ base: 4, lg: 10 }}
              h="100vh"
              left={0}
              alignItems="center"
              justifyContent={'center'}
            >
              <Button onClick={onClose}>Back</Button>

              <Box
                order={currentPlayer === 'Snoop Dogg' ? 2 : 1}
                mt={currentPlayer === 'Snoop Dogg' ? { base: 20 } : 0}
                display={currentPlayer != 'Snoop Dogg' ? 'flex' : 'none'}
                flexDirection="column"
                justifyContent="center"
                alignItems={'center'}
                w={
                  currentPlayer
                    ? currentPlayer != 'Snoop Dogg'
                      ? '95%'
                      : '20%'
                    : '80%'
                }
                onClick={() => {
                  setCurrentPlayer('Snoop Dogg');
                  setLoaded(false);
                  setLoading(true);
                  onClose();
                }}
              >
                <SnoopAvatar />
                {/* {currentPlayer === 'Snoop Dogg' ? (
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
              >
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="extrabold"
                >
                  Snoop Dogg
                </Text>
              </Box>
            ) : (
              <></>
            )} */}
              </Box>

              <Box
                order={currentPlayer === 'Gary Vee' ? 2 : 1}
                flexDirection="column"
                justifyContent="center"
                alignItems={'center'}
                display={currentPlayer != 'Gary Vee' ? 'flex' : 'none'}
                w={
                  currentPlayer
                    ? currentPlayer != 'Gary Vee'
                      ? '80%'
                      : '20%'
                    : '70%'
                }
                onClick={() => {
                  setCurrentPlayer('Gary Vee');
                  onClose();
                  setLoaded(false);
                  setLoading(true);
                }}
              >
                <GaryVeeVatar />
                {/* {currentPlayer === 'Gary' ? (
              <Box w={'100%'} display={'flex'} justifyContent="center">
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="extrabold"
                >
                  Gary Vee
                </Text>
              </Box>
            ) : (
              <></>
            )} */}
              </Box>
            </Box>
          </ModalContent>
        </Modal>

        <Box
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
          <Button
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
            icon={<ViewOffIcon />}
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
        <IconButton
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
        {!currentPlayer && (
          <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            mt={!currentPlayer ? 'auto' : '100px'}
            mb="auto"
            ml="auto"
            mr="auto"
            gap={{ base: 4, lg: 10 }}
            h={!currentPlayer ? '100vh ' : '100%'}
            alignItems="center"
            justifyContent={'center'}
          >
            <Box
              order={currentPlayer === 'Snoop Dogg' ? 2 : 1}
              mt={currentPlayer === 'Snoop Dogg' ? { base: 20 } : 0}
              display={'flex'}
              flexDirection="column"
              justifyContent="center"
              alignItems={'center'}
              w={
                currentPlayer
                  ? currentPlayer === 'Snoop Dogg'
                    ? '95%'
                    : '20%'
                  : '80%'
              }
              onClick={() => {
                setCurrentPlayer('Snoop Dogg');

                setLoaded(false);
                setLoading(true);
              }}
            >
              <SnoopAvatar />
              {/* {currentPlayer === 'Snoop Dogg' ? (
              <Box
                w={'100%'}
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
              >
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="extrabold"
                >
                  Snoop Dogg
                </Text>
              </Box>
            ) : (
              <></>
            )} */}
            </Box>
            <Box
              order={currentPlayer === 'Gary Vee' ? 2 : 1}
              display={'flex'}
              flexDirection="column"
              justifyContent="center"
              alignItems={'center'}
              w={
                currentPlayer
                  ? currentPlayer === 'Gary Vee'
                    ? '80%'
                    : '20%'
                  : '70%'
              }
              onClick={() => {
                setCurrentPlayer('Gary Vee');
                setLoaded(false);
                setLoading(true);
              }}
            >
              <GaryVeeVatar />
              {/* {currentPlayer === 'Gary' ? (
              <Box w={'100%'} display={'flex'} justifyContent="center">
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="extrabold"
                >
                  Gary Vee
                </Text>
              </Box>
            ) : (
              <></>
            )} */}
            </Box>
          </Box>
        )}
      </Box>
      {loading && !loaded && (
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
                <Box
                  key={uid(transaction)}
                  boxShadow="dark-lg"
                  h="250px"
                  w="250px"
                  display={'flex'}
                  justifyContent="center"
                  alignItems={'center'}
                  position="relative"
                >
                  <Box
                    position="absolute"
                    bottom={-6}
                    left={0}
                    bgColor="black"
                    w="100%"
                    p={0}
                  >
                    <Text
                      fontWeight={'bold'}
                      bgGradient="linear(to-l, #7928CA,#FF0080)"
                      bgClip="text"
                      fontSize={'14px'}
                      p={1}
                    >
                      {transaction.asset.collection.name}
                    </Text>
                  </Box>
                  <Image
                    h="250px"
                    w="250px"
                    src={transaction.asset.image_preview_url}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    bgColor="black"
                    p={1}
                    w={'100%'}
                  >
                    <Text
                      fontWeight={'bold'}
                      bgGradient="linear(to-l, #7928CA,#FF0080)"
                      bgClip="text"
                      fontSize={'14px'}
                    >
                      {transaction.total_price / 1000000000000000000}
                      {' ETH // $'}
                      {(
                        (transaction.payment_token.usd_price *
                          transaction.total_price) /
                        1000000000000000000
                      ).toFixed(0)}
                    </Text>
                  </Box>
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bgColor="black"
                    p={1}
                  >
                    <Text
                      fontWeight={'bold'}
                      bgGradient="linear(to-l, #7928CA,#FF0080)"
                      bgClip="text"
                      fontSize={'14px'}
                    >
                      {transaction.event_timestamp.slice(0, 10)}
                    </Text>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </>
  );
}

export default App;
