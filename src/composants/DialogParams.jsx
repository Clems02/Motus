import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { utils } from '../service/utils';

const DialogParams = ({
  rows,
  setRows,
  wordLengthOK,
  setWordLengthOK,
  setOpen,
  open,
}) => {
  const [nbrRows, setNbrRows] = useState(rows);
  const [lengthWord, setLengthWord] = useState(wordLengthOK);

  useEffect(() => {}, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setRows(nbrRows);
    setWordLengthOK(lengthWord);
    setOpen(false);
  };

  const handleChangeRow = (event) => {
    setNbrRows(event.target.value);
  };

  const handleChangeLength = (event) => {
    const {
      target: { value },
    } = event;

    if (value.length === 0) return;

    setLengthWord(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle
        sx={{ textDecoration: 'underline 3px', textAlign: 'center' }}
      >
        Paramètres
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <DialogContentText>1. Nombre de tentatives:</DialogContentText>
          <FormControl size='small'>
            <Select id='selectRows' value={nbrRows} onChange={handleChangeRow}>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <DialogContentText textAlign={'center'}>
            2. Inclure des mots de X caractères:
          </DialogContentText>
          <FormControl size='small'>
            <Select
              id='selectLengthWord'
              value={lengthWord}
              onChange={handleChangeLength}
              multiple
              renderValue={(selected) => selected.join(', ')}
            >
              {utils.minMaxLengthWord().map((nbr) => (
                <MenuItem key={nbr} value={nbr}>
                  <Checkbox checked={lengthWord.indexOf(nbr) > -1} />
                  <ListItemText primary={nbr} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleSave}>
          Sauvegarder
        </Button>
        <Button variant='contained' onClick={handleClose}>
          Quitter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogParams;
