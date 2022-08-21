import { ChangeEvent, FocusEvent, useCallback, useState } from "react"

interface useInputParams {
    (initialValue?: string): any
}

const validationText = {
    'email': 'Введите корректный email адрес, пример: test@test.ru',
    'password': 'Пароль должен содержать цифры, большие и маленькие буквы, длина пароля от 8 до 32 символов',
    'comparePasswordFalse': 'Пароли не совпадают',
    'comparePasswordTrue': 'Пароли совпадают'
}

const classesTypes = {
    SUCCESS: 'success',
    ERROR: 'error'
}

const namesType = {
    EMAIL: 'email',
    PASSWORD: 'password',
    COMPARE_PASSWORD: 'compare-passowrd',
    PASS: 'pass'
}

const useInput: useInputParams = (initialValue) => {
    const [value, setValue] = useState(initialValue || '')
    const [msg, setMsg] = useState('')
    const [classes, setClasses] = useState('')
    const [isValid, setValid] = useState(false)
    const [name, setName] = useState('')


    function successInput(msgValue: string): void {
        setMsg(msgValue)
        setClasses(classesTypes.SUCCESS)
        setValid(true)
    }
    function errorInput(msgValue: string): void {
        setMsg(msgValue)
        setClasses(classesTypes.ERROR)
        setValid(false)
    }


    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>, secondPassword?: string | number) => {
        const name: string = event.target.name;
        const evtValue = event.target.value
        setName(name)
        setClasses('')
        if (name === namesType.EMAIL) {
            const emailValidation = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(evtValue)
            if (emailValidation) successInput('')
            else errorInput(validationText.email)
        }

        if(namesType.PASSWORD === name) {
            const passwordValidation = (/^(?![A-Z]+$)(?![a-z]+$)(?![a-zA-Z]+$)(?![0-9a-z]+$)(?![0-9A-Z]+$)[a-zA-Z0-9]+$/g).test(evtValue) && evtValue.length >= 8 && evtValue.length <= 32

            if (passwordValidation) successInput('')
            else errorInput(validationText.password)
        }

        if(namesType.COMPARE_PASSWORD === name) {
            const passwordValidation = evtValue === secondPassword;

            if (passwordValidation) successInput('')
            else errorInput(validationText.comparePasswordFalse)
        }

        if(namesType.PASS === name) {
            const passwordValidation = evtValue.length >= 8;

            if (passwordValidation) successInput('')
            else errorInput('Длина пароля должна быть от 8 до 32 символов')
        }

        setValue(evtValue)

    }, [])

    const onBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        const name: string = event.target.name
        setName(name)

    }, [])

    

    const clearInput = useCallback((event: any) => {
        setMsg('')
        setClasses('')
        setValid(false)
        setValue('')
    }, [])


    return {
        value, setValue,
        msg, setMsg,
        classes, setClasses,
        isValid, setValid,
        onChange, onBlur,
        clearInput, 
    }
}

export default useInput
