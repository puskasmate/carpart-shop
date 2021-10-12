import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Bejelentkezés</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled>Bejelentkezés</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Szállítás</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled>Szállítás</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Fizetés</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled>Fizetés</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Rendelés befejezése</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled>Rendelés bejefezése</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
