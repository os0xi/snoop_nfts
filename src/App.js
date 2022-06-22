import React from 'react';
import axios from 'axios';
import { uid } from 'react-uid';
import { useEffect, useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import nftData from './nft_data';
function App() {
  const nfts = [
    {
      event_timestamp: '2022-06-16T23:44:59',
      asset: {
        image_preview_url:
          'https://lh3.googleusercontent.com/EBSJ44LijtZrfUc3BHkB0avHC6nTTd5x3yoVHgq6Wwz0nqB5beGLz3Ehm0qLmNUB6fluEr6Eel40I1Y1LebqRaBnK-wKsRDVfYX5=s250',
        collection: {
          name: 'LIT Project Three - Squiggle Game',
        },
        token_id: '1319',
      },
      total_price: '85000000000000000',
    },
    {
      event_timestamp: '2022-06-16T23:44:59',
      asset: {
        image_preview_url:
          'https://lh3.googleusercontent.com/EBSJ44LijtZrfUc3BHkB0avHC6nTTd5x3yoVHgq6Wwz0nqB5beGLz3Ehm0qLmNUB6fluEr6Eel40I1Y1LebqRaBnK-wKsRDVfYX5=s250',
        collection: {
          name: 'LIT Project Three - Squiggle Game',
        },
        token_id: '1319',
      },
      total_price: '85000000000000000',
    },
    {
      event_timestamp: '2022-06-16T23:44:59',
      asset: {
        image_preview_url:
          'https://lh3.googleusercontent.com/EBSJ44LijtZrfUc3BHkB0avHC6nTTd5x3yoVHgq6Wwz0nqB5beGLz3Ehm0qLmNUB6fluEr6Eel40I1Y1LebqRaBnK-wKsRDVfYX5=s250',
        collection: {
          name: 'LIT Project Three - Squiggle Game',
        },
        token_id: '1319',
      },
      total_price: '85000000000000000',
    },
    {
      event_timestamp: '2022-06-16T23:44:59',
      asset: {
        image_preview_url:
          'https://lh3.googleusercontent.com/EBSJ44LijtZrfUc3BHkB0avHC6nTTd5x3yoVHgq6Wwz0nqB5beGLz3Ehm0qLmNUB6fluEr6Eel40I1Y1LebqRaBnK-wKsRDVfYX5=s250',
        collection: {
          name: 'LIT Project Three - Squiggle Game',
        },
        token_id: '1319',
      },
      total_price: '85000000000000000',
    },
  ];
  const [transactions, setTransactions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getNftData = async (contract, id) => {};
  const getNFTs = async () => {
    const options = {
      method: 'GET',
      url: 'https://opensea13.p.rapidapi.com/events',
      params: {
        only_opensea: 'false',
        account_address: '0xCe90a7949bb78892F159F428D0dC23a8E3584d75',
        event_type: 'successful',
      },
      headers: {
        'X-RapidAPI-Key': 'b4027c1201mshccf348b888d8b68p1c7765jsn337dcddf9965',
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
  };

  useEffect(() => {
    getNFTs();
    // setLoaded(true);
  }, [setTransactions]);
  return (
    <>
      {loaded && (
        <>
          <Box
            w={'100vw'}
            h={'100vh'}
            mb={20}
            p={5}
            display="flex"
            alignItems={'center'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            gap={20}
          >
            {console.log(transactions)}
            {transactions.map(transaction => {
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
        </>
      )}
    </>
  );
}

export default App;
