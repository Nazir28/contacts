import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ModalAddContacts from '../features/modal-add-contacts'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useInput from '../hooks/useInput'
import { fetchContacts } from '../store/actions/contactActions'
import { userLogout } from '../store/reducers/userReducer'
import { path } from '../utils/consts'
import { Contact } from '../utils/models'

function Contacts() {
    const { contacts, contacstLoading } = useAppSelector(state => state.contact)
    const { user } = useAppSelector(state => state.user)
    const [filteredContacts, setFilteredConteacts] = useState<Contact[]>([])

    const dispatch = useAppDispatch()



    const inputSearch = useInput()

    useEffect(() => {
        setFilteredConteacts(contacts)
    }, [contacts])



    useEffect(() => {

        setFilteredConteacts(contacts.filter(el => el.name.toLowerCase().includes(inputSearch.value.toLowerCase())))
    }, [inputSearch.value])

    useEffect(() => {
        dispatch(fetchContacts())
    }, [])
    return (
        <>
            <div className='container mt-5 pt-5 contacts'>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className='card'>
                            <h2>Данные пользователя</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Имя пользователя:</strong> {user.name}</p>
                            <button className='btn btn-danger' onClick={() => dispatch(userLogout())}>Выйти</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='card'>
                            <div>
                                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#modal-add-contacts">Создать новый контакт</button>
                            </div>
                            <div className='mt-4'>
                                <input type="text" value={inputSearch.value} onChange={inputSearch.onChange} className='form-control' placeholder='поиск по имени' />
                            </div>
                            {
                                contacstLoading ?
                                    <div className='d-flex justify-content-center mt-5'>
                                        <div className="spinner-grow" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <ul className='mt-4'>
                                        {
                                            filteredContacts.map((el: Contact, idx) => <li key={el.id}>
                                                <Link to={path.CONTACT + '/' + el.id}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                                        </svg>
                                                    </span>
                                                    <div>
                                                        <span>{el.name}</span>
                                                        <div className=''>
                                                            {
                                                                el.phones.map((phone, index) => <small key={index}>{phone}</small>)
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                            )
                                        }

                                    </ul>
                            }

                        </div>
                    </div>

                </div>
            </div>

            <ModalAddContacts />
        </>
    )
}

export default Contacts