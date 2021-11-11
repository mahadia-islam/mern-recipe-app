import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router';


function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory('');

    const formData = {
        name,
        password
    }

    useEffect(() => {
        const isLogin = async () => {
            await axios.get('http://localhost:7000/users/check/isLogin', {
                withCredentials: true
            })
                .then(() => {
                    history.push('/')
                })
                .catch(() => {
                    return 'app is rendered';
                })
        }
        isLogin();
    }, [history]);

    const doLogin = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:7000/users/do/login', formData, {
            withCredentials: true, credentials: 'include'
        })
            .then(() => {
                history.push('/');
            })
            .catch(() => {
                setError('login failed !!')
            });
    }

    return (
        <div className="container">
            <form className="form" onSubmit={doLogin}>
                <h1>Login</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn_warning">Login</button>
                {error ? <div className="error">{error}</div> : null}               
            </form>
        </div>
    );
}

export default Login;