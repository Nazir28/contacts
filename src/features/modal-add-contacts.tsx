import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Modal from '../components/modal'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import useInput from '../hooks/useInput'
import { fetchCreateContact } from '../store/actions/contactActions'
import AddPhones from './add-phones'

function ModalAddContacts() {
    const [phones, setPhones] = useState<string[]>([])
    const { user } = useAppSelector(state => state.user)
    const { createContactLoader } = useAppSelector(state => state.contact)

    const nameInp = useInput()
    const emailInp = useInput()

    const dispatch = useAppDispatch()
    const hideModal = useRef<HTMLButtonElement>(null)


    useEffect(() => {
        hideModal.current?.click()
    }, [createContactLoader])

    function createContat(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = {
            name: nameInp.value,
            email: emailInp.value,
            phones: phones,
            user_id: user.id
        }
        dispatch(fetchCreateContact(data))
    }


    return (
        <Modal title="Создать контакт" id='modal-add-contacts'>
            <form action="" onSubmit={createContat}>
                <div>
                    <label htmlFor="">Имя</label>
                    <input type="text" value={nameInp.value} onChange={nameInp.onChange} required className='form-control' />
                </div>
                <div className='mt-3'>
                    <label htmlFor="">Email</label>
                    <input type="text" value={emailInp.value} onChange={emailInp.onChange} required className='form-control' />
                </div>
                <AddPhones initialPhones={phones} getPhones={data => setPhones(data)} />
                <div className='row'>
                    <div className="col-6">
                        <button className='btn btn-secondary w-100' type='button' data-bs-dismiss="modal">Отмена</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-success w-100'>Создать</button>
                    </div>
                </div>
            </form>
            <button data-bs-dismiss="modal" className='d-none' type='button' ref={hideModal}>dsadass</button>
        </Modal>
    )
}

export default ModalAddContacts