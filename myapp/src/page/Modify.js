import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";

function Modify() {

    const { id } = useParams();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState({});

    const history = useHistory();

    const fileHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

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
            const response = await axios.get(`http://localhost:7000/recipes/${id}`,{
                withCredentials: true
            });
            const recipe = response.data;
            setTitle(recipe.title);
            setDescription(recipe.description);
        }
        getUser();
    }, [id,history]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('file', file);
        await axios.put(`http://localhost:7000/recipes/${id}`,data,{
            withCredentials: true
        })
            .then((data) => {
                setSuccess('recipe updated successfully');
                setError('');
                console.log(data);
            }).catch((err) => {
                setError('recipe could not be deleted !!');
                setSuccess('');
            });
    }

    return (
        <div className="container">
            <form className="form" onSubmit={onSubmitHandler}>
                <h1>Update User</h1>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <input onChange={fileHandler} type="file" name="image" id="file"/>
                <button type="submit" className="btn btn_warning">update recipe</button>
                {error ? <div className="error">{error}</div> : null}
                {success ? <div className="success">{ success }</div> : null}
            </form>
        </div>
    )
}

export default Modify;