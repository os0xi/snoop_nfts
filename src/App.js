import React from 'react';
import axios from 'axios';
import { uid } from 'react-uid';
import { useEffect, useState } from 'react';
import { Box, IconButton, Button, Icon } from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useColorMode, Text, Image } from '@chakra-ui/react';
import SnoopAvatar from './components/avatars/SnoopAvatar/SnoopAvatar';
import GaryVeeVatar from './components/avatars/GaryVeeAvatar/GaryVeeAvatar';
//import nftData from './nft_data';
function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [players, setPlayers] = useState(new Map());
  const [currentPlayer, setCurrentPlayer] = useState();
  const initPlayers = () => {
    console.log('players initialized');
    let playersList = new Map();

    playersList
      .set('Gary', '0x8f7cEeFaa1ff5DfD125106FF9e219efF360d57AA')
      .set('Snoop', '0xCe90a7949bb78892F159F428D0dC23a8E3584d75');
    setPlayers(playersList);
  };
  const getNFTs = async () => {
    if (currentPlayer) {
      console.log('getting data for ', players.get(currentPlayer));

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
          console.log('got data');
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
        w="100%"
        mt={'auto'}
        mb="auto"
        display={'flex'}
        alignItems="flex-start"
        justifyContent={'center'}
      >
        <Box
          display={'flex'}
          flexDirection={{ base: 'column', md: 'row' }}
          mt={!currentPlayer ? 'auto' : 20}
          mb="auto"
          ml="auto"
          mr="auto"
          gap={{ base: 4, lg: 10 }}
          h={!currentPlayer ? '100vh ' : '100%'}
          alignItems={!currentPlayer ? 'center' : 'center'}
          justifyContent={'center'}
        >
          <Box
            w={currentPlayer === 'Snoop' ? '70%' : '30%'}
            onClick={() => {
              console.log('pressed change player to Snoop');
              setCurrentPlayer('Snoop');
              setLoaded(false);
              setLoading(true);
            }}
          >
            <SnoopAvatar />
            {currentPlayer === 'Snoop' ? (
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
            )}
          </Box>
          <Box
            w={currentPlayer === 'Gary' ? '70%' : '30%'}
            onClick={() => {
              console.log('pressed change player to Gary');
              setCurrentPlayer('Gary');
              setLoaded(false);
              setLoading(true);
            }}
          >
            <GaryVeeVatar />
            {currentPlayer === 'Gary' ? (
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
            )}
          </Box>
        </Box>
        <Button
          p={{ base: 2, xl: 20 }}
          position={'absolute'}
          zIndex={344}
          boxShadow="dark-lg"
          onClick={() => {
            setCurrentPlayer();
          }}
          display={currentPlayer ? 'block' : 'none'}
          bgColor="transparent"
          borderRadius={50}
          left={10}
          top={10}
          icon={<ViewOffIcon />}
        >
          Hide NFTs
        </Button>
        <IconButton
          position={'absolute'}
          zIndex={344}
          boxShadow="dark-lg"
          onClick={toggleColorMode}
          bgColor="transparent"
          borderRadius={50}
          right={10}
          top={10}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        ></IconButton>
      </Box>
      {loading && !loaded && (
        <Box>
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
          mt={90}
          mb={20}
          p={5}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          gap={20}
        >
          {console.log(transactions)}
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
