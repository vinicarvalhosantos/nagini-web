import React, {useState} from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import moment from "moment";
import {AccountCircle, AccountBalanceWallet, ExitToApp} from '@material-ui/icons'

function MyNavbar() {

    const [state] = useState({
        Username: window.sessionStorage.getItem("username") !== null ? window.sessionStorage.getItem("username") : "",
    });

    const isLogged = () => {
        const expirationTime = window.sessionStorage.getItem("expirationTime");
        if (expirationTime === null) {
            return false;
        }

        const tokenDate = moment(expirationTime);
        const nowDate = moment();
        const expiredToken = tokenDate.isBefore(nowDate);

        if (expiredToken) {
            handleLogout()
        }

        return !expiredToken;
    }

    const handleLogout = () => {
        window.sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">vShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/shop"><Button variant="dark" size="sm">Shop</Button></Nav.Link>
                        {!isLogged() ?
                            <>
                                <Nav.Link href="/login"><Button variant="dark"
                                                                size="sm">Login</Button></Nav.Link><Nav.Link
                                href="/register"><Button variant="outline-light"
                                                         size="sm">Register</Button></Nav.Link>
                            </>
                            :
                            <>
                                <Button variant="dark"
                                        size="sm">
                                    <NavDropdown title={state.Username}>
                                        <NavDropdown.Item><small><AccountCircle/> Perfil</small></NavDropdown.Item>
                                        <NavDropdown.Item><small><AccountBalanceWallet/> Wallet</small></NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item
                                            onClick={handleLogout}><small><ExitToApp/> Logout</small></NavDropdown.Item>
                                    </NavDropdown>
                                </Button>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
