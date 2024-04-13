import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import Styles from '../index.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'

function Register () {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "" })
    const { name, email, password, password2 } = formData;


    
    const onChange = (e) => {
        setFormData((prevState) => (
           {
                ...prevState,
                [e.target.name]: e.target.value
           }
        ));
    }

    const onSubmit = e => {
        e.preventDefault()
    }
    
    return (
        <>
             <section className={Styles.Heading}>
                <h1><FaUser /> Register</h1>
                <p>Please create an account</p>
            </section>
            <section className={Styles.Form}>
                <form onSubmit={onSubmit}>  
                    <div className={Styles.FormGroup}>
                        <input 
                            type="text"
                            id="name" 
                            name="name" 
                            value={name} 
                            placeholder='Enter your name' 
                            onChange={onChange}
                        />
                    </div>
                    <div className={Styles.FormGroup}>
                        <input 
                            type="email"
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange}
                        />
                    </div>
                    <div className={Styles.FormGroup}>
                        <input 
                            type="password"
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder='Enter password' 
                            onChange={onChange}
                        />
                    </div>  
                    <div className={Styles.FormGroup}>
                        <input 
                            type="password"
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            placeholder='Confirm password' 
                            onChange={onChange}
                        />  
                    </div>  
                    <div className={Styles.FormGroup}>
                        <input
                            type="submit"
                            className={`${Styles.Btn} ${Styles.BtnBlock}`}
                            value="Submit"
                        /> 
                    </div>  
                </form>
            </section>
        </>
    )
}
export default Register
