import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputPassword from '../components/inputs/input-password'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useInput from '../hooks/useInput'
import { fetchCreateUser } from '../store/actions/userActions'
import { path } from '../utils/consts'

const Register = () => {
    const {users} = useAppSelector(state => state.user)
    
    const [message, setMessage] = useState('')
    const [inputs, setInputs] = useState({
        password: {
            value: '',
            isValid: false
        },
        compare_passowrd: {
            value: '',
            isValid: false
        }
    })
    const dispatch = useAppDispatch()

    const emailInput = useInput()
    const nameInput = useInput()

    const navigate = useNavigate()

    useEffect(() => {
    }, [])

    function uuidv4(): string {
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }


    function register(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!inputs.password.isValid || !inputs.compare_passowrd.isValid || !emailInput.isValid) return
        if(users.some(user => user.email === emailInput.value)) {
            setMessage('такой пользователь уже существует')
            return
        }
        setMessage('')
        dispatch(fetchCreateUser({
            email: emailInput.value,
            name: nameInput.value,
            password: inputs.password.value,
            token: uuidv4()
        }))
        navigate(path.LOGIN)
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form className='card' onSubmit={register}>
                        <h1>Регистрация</h1>
                        <div className='mt-4'>
                            <label htmlFor="">Email</label>
                            <input required className='form-control' type="text" value={emailInput.value} onChange={emailInput.onChange} name='email' />
                            {
                                !emailInput.isValid && emailInput.value !== '' && <small>{emailInput.msg}</small>
                            }
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="">Имя пользователя</label>
                            <input value={nameInput.value} onChange={nameInput.onChange} className='form-control' type="text" required />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="">Пароль</label>
                            <InputPassword required getValue={(data) => setInputs(prev => ({ ...prev, password: data }))} name="password" />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="">Повторить пароль</label>
                            <InputPassword required secondValue={inputs?.password.value} getValue={(data) => setInputs(prev => ({ ...prev, compare_passowrd: data }))} name="compare-passowrd" />
                        </div>
                        <div className='mt-5 d-flex justify-content-between align-items-center'>
                            <Link to={path.LOGIN}>Войти</Link>
                            <button className="btn btn-outline-success px-5">
                                Зарегистрироваться
                            </button>
                        </div>
                        {
                            message.length > 1 && <div className='alert alert-danger mt-4'>
                                {message}
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register