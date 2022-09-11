import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Menu from "./components/Menu/Menu";
import InfoDivs from "./components/InfoDivs/InfoDivs";


function App() {
    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >

            <Menu/>
            <InfoDivs/>
            

        </ThemeProvider>
    );
}

export default App;

