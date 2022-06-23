import React from 'react';
import { Box, Image, Avatar } from '@chakra-ui/react';
import garyPicture from './garyvee1.png';

function GaryVeeVatar() {
  return (
    <Box
      position={'relative'}
      w="100%"
      h="auto"
      display={'flex'}
      alignItems="flex-start"
      justifyContent={'center'}
    >
      {/* <Image src={star} bgColor="transparent" w="100%" /> */}
      <Image src={garyPicture} bgColor={'transparent'} />
    </Box>
  );
}

export default GaryVeeVatar;
