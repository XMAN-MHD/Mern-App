import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import Styles from '../index.module.css'

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const { email, password } = formData
    
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
                <h1 className={Styles.PageTitleIcon} ><FaSignInAlt className={Styles.FaSignInIcon} />Login</h1>
                <p>Login and start creating tasks</p>
            </section>
            <section className={Styles.Form}>
                <form onSubmit={onSubmit}>  
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

export default Login
