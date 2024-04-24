import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const DialogResult = ({ gameStatus, newGame, targetWord }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!open);
  }, [gameStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ zIndex: 0 }}>
      <DialogTitle
        sx={{ textAlign: 'center', textDecoration: 'underline 3px' }}
      >
        Fin de partie
      </DialogTitle>
      <DialogContent>
        {gameStatus === 'WIN' && (
          <>
            <DialogContentText textAlign={'center'} color={'green'}>
              Félicitation ! Tu as trouvé le bon mot ! <br />
              N'hésite pas à refaire une partie pour découvrir d'autres mots !
            </DialogContentText>
            <Box
              sx={{
                position: 'absolute',
                top: '-100%',
                left: '50%',
              }}
            >
              <ConfettiExplosion
                zIndex={1000}
                height={'220vh'}
                duration={3000}
                particleCount={300}
              />
            </Box>
          </>
        )}
        {gameStatus === 'LOSED' && (
          <>
            <DialogContentText textAlign={'center'} color={'#ef5350'}>
              Malheureusement tu as perdu... <br /> Le mot a trouver était:
              <span style={{ marginLeft: '15px' }}>{targetWord}</span>
            </DialogContentText>
            <DialogContentText textAlign={'center'} paddingTop={2}>
              Relance une partie afin de retenter ta chance !
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={newGame}>
          Rejouer
        </Button>
        <Button variant='contained' onClick={handleClose}>
          Quitter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogResult;
