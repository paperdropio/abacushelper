import React, { Component, useContext } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './navmenu.css';
import { AppContext } from '../context/app_context';
import UserComponent from '../common/user_component'

const NavMenu = (props) => {

    const {state, dispatch} = useContext(AppContext);
    
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-info border-bottom box-shadow mb-3"    >
                <Container>
                    <NavbarBrand className="text-light" tag={Link} to="/">StudentPortal</NavbarBrand>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
                            </NavItem>
                            {!state.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/Login">Login</NavLink>
                                </NavItem>}
                            {!state.isLoggedIn &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/register">Register</NavLink>
                                </NavItem>
                            }
                        </ul>
                    </Collapse>
                    {state.isLoggedIn &&
                    <UserComponent />}
                </Container>
            </Navbar>
        </header>
    );
}

export default NavMenu;