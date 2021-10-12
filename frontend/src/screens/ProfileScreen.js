import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('A jelszavak nem egyeznek!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
        
    }

    return <Row>
        <Col md={3}>
        <h2>Felhasználói profil</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Az adatok frissítése sikeres volt!</Message>}
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
                <Button type='submit' variant='primary'>Frissítés</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>Rendeléseim</h2>
        </Col>
    </Row>
}

export default ProfileScreen
