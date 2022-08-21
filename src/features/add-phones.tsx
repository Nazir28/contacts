import React, { FC, useEffect, useState } from 'react'
import { DeleteIcon } from '../components/icons'
import useInput from '../hooks/useInput'

interface AddPhonesProps {
    initialPhones: string[],
    getPhones: (data: string[]) => void
}


const AddPhones: FC<AddPhonesProps> = ({ initialPhones, getPhones }) => {
    const [phones, setPhones] = useState(initialPhones)
    const phoneInput = useInput('')

    useEffect(() => {
        setPhones(initialPhones)
    }, [initialPhones])
    
    useEffect(() => {
        if(phones !== undefined) getPhones(phones)
    }, [phones])
    

    return (
        <div className="add-phones">
            <div className='mt-3'>
                <div className="input-group">
                    <div className="form-floating">
                        <input type="number" className="form-control" id="floatingInputGroup1" value={phoneInput.value} onChange={phoneInput.onChange} />
                        <label htmlFor="floatingInputGroup1">Добавить номер</label>
                    </div>
                    <span className="input-group-text" onClick={() => setPhones(prev =>  ([...prev, phoneInput.value]))}>+</span>
                </div>
            </div>
            <div className='mt-3'>
                {
                    phones.map((el, idx) => <div key={idx} className="d-flex justify-content-between">
                        <span>{el}</span>
                        <span className='trash' onClick={() => setPhones(phones.filter(phone => phone !== el))}>
                            <DeleteIcon/>
                        </span>
                    </div>)
                }
            </div>
        </div>
    )
}

export default AddPhones