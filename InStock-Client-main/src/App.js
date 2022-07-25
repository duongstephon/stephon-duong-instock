import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import EditInventoryItem from './components/EditInventoryItem/EditInventoryItem';
import InventoryPage from './pages/InventoryPage/InventoryPage';

export const API_URL = 'http://localhost:8080';

function App() {
    return (
        <Router>
            <Header />
            <div className="app__bodywrap">
                <div className="app__card" >
                   <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/warehouses/add' component={HomePage} />
                        <Route path='/warehouses/:warehouseId' exact component={HomePage} />
                        <Route path='/warehouses/:warehouseId/edit' component={HomePage} />
                        <Route path='/inventory' exact component={InventoryPage} />
                        <Route path='/inventory/:inventoryId' exact component={InventoryPage} />
						<Route path='/inventory/:inventoryId/edit' component={EditInventoryItem} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default App;
