import React from 'react';
import { Box, Image } from '@chakra-ui/react';
function PlayerAvatar({ player, currentPlayer, picture }) {
  const imageFolderPath = '../../images/avatars/';
  const pic = require(`../../images/avatars/${picture}`);
  return (
    <Box
      position={'relative'}
      h="auto"
      display={player === currentPlayer ? 'none' : 'flex'}
      alignItems="flex-start"
      justifyContent={'center'}
    >
      <Image src={pic} />
    </Box>
  );
}

export default PlayerAvatar;
