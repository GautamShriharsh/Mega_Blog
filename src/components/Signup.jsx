import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const {register, handleSubmit } = useForm()
  
  const signup = async (data) => {
    setError('')
    try {
        const response = await authService.createAccount(data)
        if (response) {
            const userData = await authService.getCurrentUser()
        if (userData){
            dispatch(authLogin(userData))
            navigate('/')
        }
      }
    } catch (error) {
        setError(error.message)
    }
  }

    return (
    
  )
}

export default Signup
