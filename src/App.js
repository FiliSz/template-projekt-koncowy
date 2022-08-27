import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Menu from "./components/Menu/Menu";
import InputMaps from "./components/Input/Input";
import ButtonFind from "./components/ButtonFind/ButtonFind";
import Columns from "./components/Columns/Columns";
import InfoDivs from "./components/InfoDivs/InfoDivs";
import MapsDivs from "./components/MapsDiv/MapsDivs";

function App() {
  return (
      <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
      >
          <Menu/>
          <InputMaps/>
          <InfoDivs/>
          <ButtonFind/>
          <MapsDivs/>
      </ThemeProvider>
  );
}

export default App;
