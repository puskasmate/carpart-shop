import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } = productReviewCreate

  useEffect(() => {
    if(successProductReview) {
      alert('Vélemény közzétéve!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
}, [dispatch, match, successProductReview])

const addToCartHandler = () => {
  history.push(`/cart/${match.params.id}?qty=${qty}`)
}

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(createProductReview(match.params.id, {
    rating,
    comment
  }))
}

  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Vissza</Link>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
          <>
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                 <h3>
                   {product.name}
                 </h3>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Rating value={product.rating} text={`${product.numReviews} értékelés`}/>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   Ár: {product.price} HUF
                 </ListGroup.Item>
                 <ListGroup.Item>
                   Leírás: {product.description}
                 </ListGroup.Item>
              </ListGroup> 
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Ár:
                    </Col>
                    <Col>
                    <strong>{product.price} HUF</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Elérhetőség:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'elérhető' : 'nem elérhető'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Mennyiség</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}


                <ListGroup.Item>
                  <Row>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0 }>
                    Kosárba tesz
                  </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Vélemények</h2>
            {product.reviews.length === 0 && <Message>Ehhez a termékhez még nem alkottak véleményt.</Message>}
            <ListGroup variant='flush'>
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Alkosson véleményt!</h2>
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Értékelés</Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Értékelje a terméket!</option>
                        <option value='1'>1 - Nagyon gyenge</option>
                        <option value='2'>2 - Gyenge</option>
                        <option value='3'>3 - Közepes</option>
                        <option value='4'>4 - Jó</option>
                        <option value='5'>5 - Kiváló</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Komment</Form.Label>
                      <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <p></p>
                    <Button type='submit' variant='primary'>
                      Vélemény megalkotása
                    </Button>
                  </Form>
                ) : <Message>A véleményalkotáshoz <Link to='/login'>jelentkezzen be!</Link></Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </>
        )}
        </>
    )
}

export default ProductScreen
