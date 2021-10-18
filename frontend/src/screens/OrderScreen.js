import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }
    
    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, order, orderId]) 

    
    return (
        loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <>
            <h1>Rendelés {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Szállítás</h2>
                            <p><strong>Név: </strong> {order.user.name}</p>
                            <p><strong>Email cím: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>
                                    Cím:{' '}
                                </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}, {order.shippingAddress.postalCode},{' '} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Szállítva: {order.deliveredAt} </Message> : <Message variant='info'>A rendelés kiszállítás alatt áll!</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Fizetés{' '}</h2>
                            <p>
                                <strong>Fizetés módja: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Fizetve: {order.paidAt} </Message> : <Message variant='danger'>Nincs kifizetve!</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Rendelni kívánt termékek</h2>
                            {order.orderItems.length === 0 ? <Message>Üres rendelés!</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} HUF = {item.qty * item.price} HUF
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Rendelés összegzése</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Termékek</Col>
                                    <Col>{order.itemsPrice} HUF</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Szállítás</Col>
                                    <Col>{order.shippingPrice} HUF</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Összesen</Col>
                                    <Col>{order.totalPrice} HUF</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default OrderScreen
