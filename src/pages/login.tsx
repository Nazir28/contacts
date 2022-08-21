import React, { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputPassword from '../components/inputs/input-password'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useInput from '../hooks/useInput'
import { fetchUsers } from '../store/actions/userActions'
import { userLogin, userLoginWithToken } from '../store/reducers/userReducer'
import { path } from '../utils/consts'

const Login = () => {
    const { user, auth } = useAppSelector(state => state.user)
    console.log(user, auth)

    const [password, setPassword] = useState({
        value: '',
        isValid: false,
    })
    const dispatch = useAppDispatch()

    const emailInput = useInput()

    useEffect(() => {
        if (user?.token.length > 1) {
            localStorage.setItem('token', user?.token)
        }
    }, [user.token])


    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!emailInput.isValid || !password.isValid) return
        dispatch(userLogin({
            email: emailInput?.value,
            password: password?.value
        }))
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form className='card' onSubmit={login}>
                        <h1>Вход</h1>
                        <div className='mt-4'>
                            <label htmlFor="">EMail</label>
                            <input className='form-control' type="text" value={emailInput.value} onChange={emailInput.onChange} name='email' />
                            {
                                !emailInput.isValid && emailInput.value !== '' && <small>{emailInput.msg}</small>
                            }
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="">Пароль</label>
                            <InputPassword getValue={(data) => setPassword(data)} name="pass" />
                        </div>

                        <div className='mt-5 d-flex justify-content-between align-items-center'>
                            <Link to={path.REGISTER}>Регистрация</Link>
                            <button className="btn btn-outline-success px-5">
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login