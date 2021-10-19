import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './css/style.css';
import { Link } from 'react-router-dom';
import './../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import image from './../image/logo.svg';
import axios from 'axios';

function Layout({ children }) {

    const [show, setShow] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const history = useHistory();

    const showHandler = () => {
        setShow(!show);
    }

    useEffect(() => {
        const isLogin = async () => {
            await axios.get('http://localhost:7000/users/check/isLogin', {
                withCredentials: true
            })
                .then(() => {
                    setIsUserLoggedIn(true)
                })
                .catch(() => {
                    setIsUserLoggedIn(false);
                })
        }
        isLogin();
    }, [history]);

    const doLogout = async () => {
        await axios.get('http://localhost:7000/users/do/logout',{
            withCredentials: true, credentials: 'include'
        })
            .then(() => {
                history.push('/get/login')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <header className="header">
                <div className="logo_box">
                    <div className="logo">
                        <img src={image} alt="" />
                    </div>
                </div>
                <div className="menu_box">
                    <div className="menu">
                        <i className="fas fa-bars menubar" onClick={showHandler}></i>
                    </div>
                    {show ? (<ul className="navbar">
                        <li>
                            <Link exact to="/recipe">Recipes</Link>
                        </li>
                        <li>
                            <Link exact to="/pendingrecipe">Pending recipes</Link>
                        </li>
                        <li>
                            <Link exact to="/">User</Link>
                        </li>
                        {isUserLoggedIn ? (<li>
                            <Link to="/get/login" onClick={doLogout}>Logout</Link>
                        </li>) : null}
                    </ul>) : null}
                </div>
            </header>
            {/* section */}
            <section>{ children }</section>
            {/* <footer className="footer">
                <p>Copyright © 2021 Mahadia. All rights reserved.</p>
            </footer> */}
        </>
    );
}

export default Layout;