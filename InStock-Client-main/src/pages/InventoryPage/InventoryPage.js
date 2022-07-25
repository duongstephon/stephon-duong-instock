import './InventoryPage.scss';
import axios from 'axios';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import InventoryItemDetails from '../../components/InventoryItemDetails/InventoryItemDetails';
import InventoryList from '../../components/InventoryList/InventoryList';
import AddInventory from '../../components/AddInventory/AddInventory';
import EditInventoryItem from '../../components/EditInventoryItem/EditInventoryItem';
import DeleteInventory from '../../components/DeleteInventory/DeleteInventory';

import { API_URL } from '../../App';

class InventoryPage extends Component {
    state = {
        inventory: [],
        warehouseInventory: [],
        inventoryItem: null,
		showInventoryDeleteModal: false
    };

    getInventory = (id) => {
        axios.get(`${API_URL}/inventories/${id}`)
            .then((response) => {
                //console.log(response.data)
                this.setState({
                    inventoryItem: response.data
                });
            });
    }

    // set up axios
    componentDidMount() {
        const inventoryId = this.props.match.params.inventoryId;
        //console.log(inventoryId);
        axios.get(`${API_URL}/inventories`)
            .then(response => {
                //console.log(inventoryId);
                this.setState({
                    inventory: response.data
                });
                if (inventoryId) {
                    //console.log(inventoryId)
                    this.getInventory(inventoryId);
                }
            })
    }

	// Delete Inventory Functions //
	showDeleteInventory = (selectedId) => {
		this.setState({ showInventoryDeleteModal: true });
		this.setState({ inventoryItem: selectedId });
	}

	hideDeleteInventory = () => {
		this.setState({ showInventoryDeleteModal: false });
		this.setState({ inventoryItem: null });
	}

	handleDeleteInventory = (e) => {
		// axios delete call 
		axios.delete(`${API_URL}/inventories/${this.state.inventoryItem}`)
			.then(result => {
				console.log(`Inventory with id of ${this.state.inventoryItem} successfully deleted`);
				return axios.get(`${API_URL}/inventories`)
			})		
			.then(result => {
				this.setState({ inventory: result.data });
				this.setState({ showInventoryDeleteModal: false });
			})
			.catch(err => {
				console.log(`There was an error deleting inventory with id : ${this.state.inventoryItem}, with err ${err}`);
			});
	}

	getInventoryName = (id) => {
		return this.state.inventory.find( inventory => inventory.id === id).itemName;
	}

    // axios for page did update
    componentDidUpdate(prevProps) {
        const previousId = prevProps.match.params.inventoryId;
        const currentId = this.props.match.params.inventoryId;

        if (prevProps.location.pathname === "/inventory/add") {
            axios.get(`${API_URL}/inventories`)
                .then(response => {
                    this.setState({
                        inventory: response.data
                    });
                })
        }

        if (previousId !== currentId) {
            this.getInventory(currentId)
        }
    }

    render() {
        if (!this.state.inventory) {
            return (
                <p>Loading...</p>
            )
        }
        return (
          <>
            <Switch>
              <Route path='/inventory' exact component={(routerProps) => {
                return (
                  <InventoryList
                    inventory={this.state.inventory}
                    handleInventory={this.getInventory}
                    showDeleteInventory={this.showDeleteInventory}
                    {...routerProps}
                  />
                )
              }} />
              <Route path='/inventory/add' exact component={AddInventory} />
              <Route path='/inventory/:inventoryId' component={(routerProps) => {
                return (this.state.inventoryItem !== null ? (
                  <InventoryItemDetails
                    inventoryItem={this.state.inventoryItem}
                    {...routerProps}
                  />
                ) : <h1>loading</h1>)
              }} />
              {/* <Route path='/inventory/:inventoryId/edit' component={InventoryPage} />*/}
            </Switch >
            {this.state.showInventoryDeleteModal && 
              <DeleteInventory 
                inventoryName={this.getInventoryName(this.state.inventoryItem)}
                hideDeleteInventory={this.hideDeleteInventory} 
                handleDeleteInventory={(e) => {
                  this.handleDeleteInventory(e);
                }}
              />
            }	
          </>
        )
    }
}

export default InventoryPage;
