import React from 'react';

import { uid } from 'react-uid/dist/es5/uid';
import { Box, Button } from '@chakra-ui/react';
import PlayerAvatar from '../PlayerAvatar/PlayerAvatar';
import playersList from '../PlayersList/PlayersList';
function ListPlayerAvatarsSelect({
  currentPlayer,
  setCurrentPlayer,
  setLoaded,
  setLoading,
  onClose,
}) {
  const playerArray = Array.from(playersList, (value, key) => {
    return {
      name: value[0],
      address: value[1].address,
      picture: value[1].picture,
    };
  });

  return (
    <Box
      display={'flex'}
      flexDirection={{ base: 'column', md: 'row' }}
      mt={'100px'}
      mb="auto"
      ml="auto"
      mr="auto"
      gap={{ base: 4, lg: 10 }}
      h="100%"
      alignItems="center"
      justifyContent={'center'}
    >
      {currentPlayer && <Button onClick={() => onClose()}>Back</Button>}
      {playerArray.map(player => {
        return (
          <Box
            key={uid(player)}
            mt={{ base: 20 }}
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems={'center'}
            onClick={() => {
              setCurrentPlayer(player.name);
              setLoaded(false);
              setLoading(true);
              if (currentPlayer) {
                onClose();
              }
            }}
          >
            <PlayerAvatar
              player={player.name}
              currentPlayer={currentPlayer}
              picture={player.picture}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default ListPlayerAvatarsSelect;
