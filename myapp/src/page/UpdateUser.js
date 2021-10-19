import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

function AddUser() {

    const { id } = useParams();

    const [file, setFile] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    useEffect(() => {
        const isLogin = async () => {
            await axios.get('http://localhost:7000/users/check/isLogin', {
                withCredentials: true
            })
                .then(() => {
                    return 'app is rendered'
                })
                .catch(() => {
                    history.push('/get/login')
                })
        }
        isLogin();
        const getUser = async () => {
            const response = await axios.get(`http://localhost:7000/users/${id}`,{
                withCredentials: true
            });
            const user = response.data;
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setPassword(user.password)
        }
        getUser();
    },[id,history])

    const formHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('phone', phone);
        data.append('password', password);
        data.append('file', file);
        await axios.put(`http://localhost:7000/users/${id}`, data,{
            withCredentials: true
        })
            .then(() => {
                setSuccess('user successfully updated !!');
                setError('');
            }).catch((err) => {
                setError('user updated failed !!');
                setSuccess('')
            });
    }

    const fileHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    return (
        <div className="container">
            <form className="form" onSubmit={formHandler}>
                <h1>Update User</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="file" name="avatar" id="file" onChange={ fileHandler }/>
                <button type="submit" className="btn btn_warning">update user</button>
                {error ? <div className="error">{error}</div> : null}
                {success ? <div className="success">{ success }</div> : null}
            </form>
        </div>
    );
}

export default AddUser;