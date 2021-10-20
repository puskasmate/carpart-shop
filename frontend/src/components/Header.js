import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to = '/'>
                        <Navbar.Brand >CarPartShop</Navbar.Brand>    
                    </LinkContainer>
    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to ='/cart'>
                                <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id ='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Kijelentkezés</NavDropdown.Item>
                                </NavDropdown>
                            ) : <LinkContainer to='login'>
                            <Nav.Link href="/login"><i className="fas fa-sign-in-alt"></i> Sign in</Nav.Link>
                        </LinkContainer> }
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id ='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Felhasználók</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Termékek</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Rendelések</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                        )}
                            
        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
