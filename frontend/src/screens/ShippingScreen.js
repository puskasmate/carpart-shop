import React, { useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ( { history }) => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>Szállítás</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Cím</Form.Label>
                    <Form.Control type='text' placeholder='Utca, házszám (emelet, ajtó...)' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Város</Form.Label>
                    <Form.Control type='text' placeholder='Írja be a város nevét' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Írányítószám</Form.Label>
                    <Form.Control type='text' placeholder='Írja be az irányítószámát' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Ország</Form.Label>
                    <Form.Control type='text' placeholder='Írja be az ország nevét' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Row><p></p></Row>
                <Button type='submit' variant='primary'>
                    Tovább
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
