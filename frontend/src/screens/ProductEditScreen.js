import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate
    

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setSubcategory(product.subcategory)
                setModel(product.model)
                setYear(product.year)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
            
        }
    }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            subcategory,
            model,
            year,
            description,
            countInStock
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Vissza
            </Link>
            <FormContainer>
            <h1>Termék módosítása</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Név</Form.Label>
                    <Form.Control type='name' placeholder='Írja be a termék nevét' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Ár</Form.Label>
                    <Form.Control type='number' placeholder='Adja meg a termék árát' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Kép</Form.Label>
                    <Form.Control type='text' placeholder='Adja meg a kép forrását' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                    <Form.File id='image-file' label='Tallózás...' custom onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Márka</Form.Label>
                    <Form.Control type='text' placeholder='Adja meg a termék márkáját' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control type='text' placeholder='Adja meg milyen kategóriához tartozik a termék' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='subcategory'>
                    <Form.Label>Alkategória</Form.Label>
                    <Form.Control type='text' placeholder='Adja meg milyen alkategóriahoz tartozik a termék' value={subcategory} onChange={(e) => setSubcategory(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='model'>
                    <Form.Label>Ár</Form.Label>
                    <Form.Control type='text' placeholder='Adja meg a modell nevét' value={model} onChange={(e) => setModel(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Leírás</Form.Label>
                    <Form.Control type='text' placeholder='Írja le röviden a termék tulajdonságait' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='year'>
                    <Form.Label>Év</Form.Label>
                    <Form.Control type='number' placeholder='Adja meg a termék gyártásának évét' value={year} onChange={(e) => setYear(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Darabszám</Form.Label>
                    <Form.Control type='number' placeholder='Adja meg a termék darabszámát' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>

                <Row><p></p></Row>

                <Button type='submit' variant='primary'>Módosítás</Button>
            </Form>
            )}
            
            
            
        </FormContainer>
        </>
        
    )
}

export default ProductEditScreen
