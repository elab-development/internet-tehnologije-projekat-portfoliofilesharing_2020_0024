import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigacija from "./komponente/Navigacija";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pocetna from "./stranice/Pocetna";
import ONama from "./stranice/ONama";
import Login from "./stranice/Login";
import Projekti from "./stranice/Projekti";
import Podeljeno from "./stranice/Podeljeno";
import Admin from "./stranice/Admin";

function App() {
  return (
    <>
        <Navigacija />

        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Pocetna />} />
                    <Route path="/onama" element={<ONama />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/projekti" element={<Projekti />} />
                    <Route path="/podeljeno" element={<Podeljeno />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Container>

    </>
  );
}

export default App;