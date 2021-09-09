import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {
  const product = products.find(p => p._id === match.params.id)
  
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
        </>
    )
}

export default ProductScreen
