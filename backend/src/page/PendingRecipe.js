import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function PendingRecipe() {

    const [recipes, setRecipes] = useState([]);
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
        const getRecipes = async () => {
            const response = await axios.get('http://localhost:7000/recipes/get/pending',{
                withCredentials: true
            });
            setRecipes(response.data);
        }
        getRecipes();
    },[history,recipes]);

    const updateHandler = (id) => {
        history.push(`/updaterecipe/${id}`)
    }

    const status = {
        status:"active"
    }

    const approveHandler = async (id) => {
        await axios.put(`http://localhost:7000/recipes/approve/${id}`,status)
            .then(() => {
                setSuccess('recipe approved');
                setError('')
            }).catch((err) => {
                setError('recipe could not be approved');
                setSuccess('');
                console.log(err);
            });
    }

    return (
        <div class="container">
            <table>
                <thead>
                    <tr class="table_head_row">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr class="table_row">
                            <td>{recipe.title}</td>
                            <td>{recipe.description.slice(0,50)}</td>
                            <td>
                                <button class="btn btn_warning" onClick={ () => updateHandler(recipe._id) }>update</button>
                                <button class="btn btn_primary" onClick={() => approveHandler(recipe._id)}>approve</button>
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

export default PendingRecipe;