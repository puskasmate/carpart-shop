import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <>
        <Form inline className='ms-5'>
            <Form.Control type='text' name='s' onChange={(e) => setKeyword(e.target.value)} placeholder='Termék keresése...' ></Form.Control>
        </Form>
        <Button type='submit' className='p-1 ms-2' onClick={submitHandler} >Keresés</Button>
        
        </>
    )
}

export default SearchBox
