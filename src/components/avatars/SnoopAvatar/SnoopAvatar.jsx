import React from 'react';
import { Box, Image, Avatar } from '@chakra-ui/react';
import snoopPicture from './snoop4.png';

function SnoopAvatar() {
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
      <Image src={snoopPicture} bgColor={'transparent'} />
    </Box>
  );
}

export default SnoopAvatar;
