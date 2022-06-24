import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

function TransactionBox({ transaction }) {
  return (
    <Box
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
      <Image h="250px" w="250px" src={transaction.asset.image_preview_url} />
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
            (transaction.payment_token.usd_price * transaction.total_price) /
            1000000000000000000
          ).toFixed(0)}
        </Text>
      </Box>
      <Box position="absolute" top={0} right={0} bgColor="black" p={1}>
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
}

export default TransactionBox;
