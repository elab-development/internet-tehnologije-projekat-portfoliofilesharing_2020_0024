import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Navigacija = () => {

    const token = window.sessionStorage.getItem('token');
    const user = token !== null ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const isAdmin = user !== null && user.role === 'admin';

    const logout = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Portfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Pocetna</Nav.Link>
                            <Nav.Link href="/onama">O nama</Nav.Link>

                            {
                                token === null ? (
                                    <>
                                        <Nav.Link href="/login">Prijava</Nav.Link>                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href="/projekti">Moji projekti</Nav.Link>
                                        <Nav.Link href="/podeljeno">Podeljeno sa mnom</Nav.Link>
                                        {
                                            isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>
                                        }
                                        <Nav.Link href="#" onClick={logout}>Odjava</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;