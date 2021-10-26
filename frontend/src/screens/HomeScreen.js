import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import { listProducts } from '../actions/productActions.js'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword 

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    
    return (
        <>
        {!keyword && <ProductCarousel /> }
            <h1>Legfrissebb termékek</h1>
            {loading ? ( <Loader/> ) : error ? ( <Message variant='danger'>{error}</Message> ) : (
            <>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} lg={6} xl={3}>
                        <Product product={product} />
                    </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>)}
        </>
    )
}

export default HomeScreen
