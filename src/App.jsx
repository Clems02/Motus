import { Container, Typography } from '@mui/material';
import Theme from './theme/Theme';
import Square from './composants/Square';
import SquareLine from './composants/SquareLine';

function App() {
  return (
    <Theme>
      <SquareLine />
    </Theme>
  );
}

export default App;
