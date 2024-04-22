import { Container, Typography } from '@mui/material';
import Theme from './theme/Theme';
import Square from './composants/Square';
import SquareLine from './composants/SquareLine';
import KeyBoard from './composants/KeyBoard';

function App() {
  return (
    <Theme>
      <SquareLine />
      <KeyBoard />
    </Theme>
  );
}

export default App;
