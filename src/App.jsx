import { Container, Typography } from '@mui/material';
import Theme from './theme/Theme';
import Square from './composants/Square';
import SquareLine from './composants/SquareLine';
import KeyBoard from './composants/KeyBoard';
import Wordle from './app/Wordle';

function App() {
  return (
    <Theme>
      <Wordle />
    </Theme>
  );
}

export default App;
