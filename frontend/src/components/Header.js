import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import Styles from '../index.module.css'
import { Link } from 'react-router-dom'

function Header() {
    const list = [
        <Link to='/login'>
            <FaSignInAlt /> 
            Login
        </Link>
        ,
        <Link to='/register'>
            <FaUser />  
            Register
        </Link>
    ]
    console.log(list);
    return (
        <header className={Styles.Header}>
            <div className={Styles.Logo}>
                <Link to='/'>Task Creator</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> 
                        Login
                    </Link>
                </li>
                <li>
                <Link to='/register'>
                    <FaUser />  
                    Register
                </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header




