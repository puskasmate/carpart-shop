import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !email || !password || !confirmPassword) {
            setMessage('Hiba a regisztráció során! Minden mező kitöltése kötelező!')
        } else {
            if(password !== confirmPassword) {
                setMessage('A jelszavak nem egyeznek!')
            }else {
                dispatch(register(name, email, password))
            }
        }
        
    }

    return (
        <FormContainer>
            <h1>Regisztráció</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Név</Form.Label>
                    <Form.Control type='name' placeholder='Írja be a nevét' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Cím</Form.Label>
                    <Form.Control type='email' placeholder='pelda@example.com' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type='password' placeholder='Írja be a jelszavát' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Jelszó megerősítése</Form.Label>
                    <Form.Control type='password' placeholder='Erősítse meg a jelszavát' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Row><p></p></Row>
                <Button type='submit' variant='primary'>Regisztráció</Button>
            </Form>
            
            <Row className='py-3'>
                <Col>
                Már jár itt? {' '}<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Jelentkezzen be!
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
