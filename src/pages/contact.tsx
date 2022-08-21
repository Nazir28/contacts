import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../components/icons'
import AddPhones from '../features/add-phones'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useInput from '../hooks/useInput'
import { fetchContact, fetchDeleteContact, fetchUpdateContact } from '../store/actions/contactActions'
import { path } from '../utils/consts'


function Contact() {

    const { contact, contactLoader } = useAppSelector(state => state.contact)
    const { user } = useAppSelector(state => state.user)


    const [isChange, setChange] = useState(false)
    const [phones, setPhones] = useState<string[]>([])

    const location = useLocation()

    const id = useMemo(() => location.pathname?.split('/')[2], [])

    const dispatch = useAppDispatch()

    const emailInp = useInput()
    const nameInp = useInput()

    const navigate = useNavigate()

    useEffect(() => {
        emailInp.setValue(contact.email)
        nameInp.setValue(contact.name)
    }, [contact])

    useEffect(() => {

        dispatch(fetchContact(id))

    }, [])

    console.log(contact)

    function cancleChange() {
        dispatch(fetchContact(id))
        setChange(false)
    }

    function saveChanges() {
        const data = {
            name: nameInp.value,
            phones: phones,
            email: emailInp.value,
            user_id: user.id,
        }
        dispatch(fetchUpdateContact({
            data,
            id,
        }))
        setChange(false)
    }
    function deleteContact() {
        dispatch(fetchDeleteContact(id))
        navigate(path.CONTACTS)
    }
    return (
        <div className='container mt-5 pt-5 contact'>
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    {
                        contactLoader ?
                            <div className="card justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            <div className="card">
                                <div className='d-flex justify-content-between'>
                                    <h1>{contact.name}</h1>
                                    <div>



                                        {
                                            !isChange ?
                                                <>
                                                    <button className='btn btn-danger me-2' onClick={deleteContact}><DeleteIcon/></button>
                                                    <button className='btn btn-success' onClick={() => setChange(true)}>Изменить</button>
                                                </> :
                                                <>
                                                    <button className='btn btn-danger me-2' onClick={cancleChange}>Отменить</button>
                                                    <button className='btn btn-success me-2' onClick={saveChanges}>Сохранить</button>
                                                </>
                                        }

                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Email</label>
                                    <input type="text" readOnly={!isChange ? true : false} className='form-control' value={emailInp.value} onChange={emailInp.onChange} />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Имя</label>
                                    <input type="text" readOnly={!isChange ? true : false} className='form-control' value={nameInp.value} onChange={nameInp.onChange} />
                                </div>
                                {isChange ?
                                    <AddPhones initialPhones={contact.phones} getPhones={data => setPhones(data)} /> :
                                    <div className='mt-3'>
                                        {
                                            contact?.phones?.map((el, idx) => <p key={idx} className="mb-0">{el}</p>)
                                        }
                                    </div>
                                }

                                <div className='mt-5'>
                                    <Link to={path.CONTACTS}>Вернуться к списку контактов</Link>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Contact