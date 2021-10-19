import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Recipe() {

    const history = useHistory();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const updateHandler = (id) => {
        history.push(`/updaterecipe/${id}`);
    }

    const deleteHandler = async (id) => {
        await axios.delete(`http://localhost:7000/recipes/${id}`,{
            withCredentials: true
        })
            .then((data) => {
                const getRecipe = async () => {
                    const response = await axios.get('http://localhost:7000/recipes');
                    setRecipes(response.data);
                };
                getRecipe();
                setSuccess('recipe is deleted');
                setError('');
            }).catch((err) => {
                setError('recipe deleted failed !!');
                setSuccess('');
                console.log(err);
            });
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
        const getRecipe = async () => {
            const response = await axios.get('http://localhost:7000/recipes');
            console.log(response);
            setRecipes(response.data);
        }
        getRecipe();
    },[history])

    return (
        <div className="container">
            <table>
                <thead>
                    <tr className="table_head_row">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr className="table_row" key={Math.random() + Math.random()}>
                            <td>{recipe.title}</td>
                            <td>{recipe.description.slice(0,50)}</td>
                            <td><img src={recipe.image} alt="" /></td>
                            <td>
                                <button className="btn btn_danger" onClick={() => deleteHandler(recipe._id)}>delete</button>
                                <button className="btn btn_primary" onClick={() => updateHandler(recipe._id)}>update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {error ? <div className="error">{error}</div> : null}
                {success ? <div className="success">{ success }</div> : null}
            </table>
        </div>
    );
}

export default Recipe;