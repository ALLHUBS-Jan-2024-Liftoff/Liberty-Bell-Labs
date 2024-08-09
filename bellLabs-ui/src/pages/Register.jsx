import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {

    let navigate = useNavigate()

    const [user, setUser] =useState({
        username:"",
        password:"",
        verifyPassword:""
    })
    

    const{username, password, verifyPassword} = user

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const onSubmit=async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/register", user)

    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-30 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h1 className='text-center m-4'>Register User</h1>

                <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='Username' className='form-label'>
                        Username
                    </label>
                    <input
                    type={'text'}
                    className='form-control'
                    placeholder='Enter your username'
                    name='username'
                    value={username}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Password' className='form-label'>
                        Password
                    </label>
                    <input
                    type={'password'}
                    className='form-control'
                    placeholder='Enter your password'
                    name='password'
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='Verify Password' className='form-label'>
                        Verify Password
                    </label>
                    <input
                    type={'password'}
                    className='form-control'
                    placeholder='Verify your password'
                    name='verifyPassword'
                    value={verifyPassword}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-success'>
                    Register
                </button>
                </form>
            </div>
        </div>
    </div> 
  )
}
