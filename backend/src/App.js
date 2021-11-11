import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './page/Layout';
import User from './page/User';
import Recipe from './page/Recipe';
import PendingRecipe from './page/PendingRecipe';
import AddUser from './page/AddUser';
import UpdateUser from './page/UpdateUser';
import Modify from './page/Modify';
import Login from './page/Login';

function App() {

    return (
        <div>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={ User } />
                        <Route exact path='/recipe' component={Recipe} />
                        <Route exact path="/pendingrecipe" component={PendingRecipe} />
                        <Route exact path="/adduser" component={AddUser} />
                        <Route exact path="/updateuser/:id" component={UpdateUser} />
                        <Route exact path="/updaterecipe/:id" component={Modify} />
                        <Route exact path="/get/login" component={Login} />
                    </Switch>                
                </Layout>
            </Router>
        </div>
    );
}

export default App;