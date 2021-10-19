import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link,useHistory } from 'react-router-dom';

function User() {

    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
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
            const response = await axios.get('http://localhost:7000/users',{
                withCredentials: true
            });
            setUsers(response.data);
            console.log(response.data);
        };
        getUser();
        return null;
    }, [history]);

    async function handleDelete(id) {
        await axios.delete(`http://localhost:7000/users/${id}`,{
            withCredentials: true
        })
            .then(() => {
                const refreash = async () => {
                    const response = await axios.get('http://localhost:7000/users', {
                        withCredentials: true
                    });
                    setUsers(response.data);
                }
                refreash();
                setSuccess('user deleted successfully');
                setError('');
            })
            .catch((err) => {
                setError('user deleted failed');
                setSuccess('');
            })
    }

    const updateHandler = (id) => {
        history.push(`/updateuser/${id}`);
        console.log('app is clicked');
    }
    
    return (
        <div className="container">
            <table>
                <thead>
                    <tr className="table_head_row">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                    {
                        return (
                            <tr className="table_row" key={Math.random() + Math.random()}>
                                <td>{ user.name }</td>
                                <td>{ user.email }</td>
                                <td><img src={user.avatar} alt=""/></td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn_danger">delete</button>
                                    <button onClick={() => updateHandler(user._id)} className="btn btn_primary">update</button>
                                    
                                </td>
                            </tr>
                        )
                        }
                    )}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button className="btn btn_warning add">
                            <Link to="/adduser">add user</Link>
                        </button></td>
                    </tr>
                </tbody>
                {error ? <div className="error">{error}</div> : null}
                {success ? <div className="success">{ success }</div> : null}
            </table>
        </div>
    );
}

export default User;