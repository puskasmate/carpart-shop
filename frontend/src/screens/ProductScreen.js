import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
}, [dispatch, match])



  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
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
                <ListGroup.Item>
                  <Row>
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0 }>
                    Kosárba tesz
                  </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        )}
        </>
    )
}

export default ProductScreen
