import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    console.log(qty)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    
    const removeFromCartHander = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        console.log('Fizetés')
    }
    
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>A kosarad üres. <Link to='/'>Vissza</Link></Message>:
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>{item.price} HUF</Col>
                                <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHander(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}    
                </ListGroup>}
            </Col>
            <Col md ={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Összesen {cartItems.reduce((acc, item) => acc + item.qty, 0)} termék </h2>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} HUF
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn btn-secondary w-100' type='button' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Tovább a fizetéshez
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen