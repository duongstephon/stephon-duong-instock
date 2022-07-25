import { v4 as uuid } from 'uuid';
import './EditInventoryItem.scss';
import React from 'react';
import BackArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { API_URL } from '../../App';
import { Link } from 'react-router-dom';


class EditInventoryItem extends React.Component {
    state = {
        itemName: "",
        description: "",
        status: "In Stock",
        quantity: "",
        warehouses: [],
        invalidInput: false,
		warehouseName: "",
		warehouseID: null,
		category: null,
		uniqueWarehouseList: [],
		uniqueCategoryList: []
    }

    componentDidMount() {
		const { inventoryId } = this.props.match.params;
        axios
            .get(`${API_URL}/warehouses/`)
            .then((response) => {
                this.setState({
                    warehouses: response.data
                });
				return axios.get(`${API_URL}/inventories/`)
            })
			.then((result) => {
				const inventories = result.data;
				const uniqueCategories = [];
				inventories.forEach(inventory => {
					!uniqueCategories.includes(inventory.category) && uniqueCategories.push(inventory.category);
				});
				this.setState({ uniqueCategoryList: uniqueCategories });
				
				const inventory = inventories.find( inventory => inventory.id === inventoryId );
				
				const { itemName, description, status, quantity, warehouseName, warehouseID, category } = inventory
				this.setState({
					itemName: itemName,
					description: description,
					status: status,
					quantity: quantity,
					warehouseName: warehouseName,
					warehouseID: warehouseID,
					category: category
				});
			})
            .catch((error) => {
                console.log('Failed request. Please try again', error);
            });
    }

    editInventory = (event) => {
        event.preventDefault();

        if (event.target.categoryName.value === "") {
            event.target.categoryName.classList.add("edit-inventory__error");
        } 
		else {
            event.target.categoryName.classList.remove("edit-inventory__error");
        }

        if (event.target.warehouseName.value === "") {
            event.target.warehouseName.classList.add("edit-inventory__error");
        } 
		else {
            event.target.warehouseName.classList.remove("edit-inventory__error");
        }

        if (!this.state.itemName || !this.state.description || !this.state.status) {
			console.log(this.state.itemName);
			console.log(this.state.description);
			console.log(this.state.status);
			console.log(this.state.quantity);
            this.setState({
                invalidInput: true,
            })
            return;
        }

        if (isNaN(parseInt(this.state.quantity)) && this.state.quantity !== "") {
            this.setState({
                invalidInput: true,
            })
            return;
        }

        let newQuantity = this.state.quantity === "" ? 0 : (Number(this.state.quantity));

        axios
            .patch(`${API_URL}/inventories/${this.props.match.params.inventoryId}`, {
				id: this.props.match.params.inventoryId,
                warehouseID: event.target.warehouseID.value,
                itemName: this.state.itemName,
                description: this.state.description,
                category: event.target.categoryName.value,
                status: this.state.status,
                quantity: newQuantity,
                warehouseName: event.target.warehouseName.value
            })
            .then((response) => {
                this.props.history.push('/inventory');
            })
            .catch((error) => {
                console.log('Error', error);
            })
    };

    handleChangeInventory = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
		event.target.name === "status" && event.target.value.toLowerCase() === "out of stock" && this.setState({ quantity: 0 });
		event.target.name === "status" && event.target.value.toLowerCase() === "in stock" && this.state.quantity === 0 && this.setState({ quantity: 1});
    }

    render() {
        return (
            <div className="edit-inventory" >
                <div className="edit-inventory__title" >
                    <Link to="/inventory" className="edit-inventory__arrow">
                        <img src={BackArrow} alt="arrow-back"></img></Link>
                    <h1>Edit Inventory Item</h1>
                </div>
                <form onSubmit={this.editInventory}>
                    <div className="edit-inventory__form" >
                        <div className="edit-inventory__inventory--detail" >
                            <h2 className="edit-inventory__subtitle" >Item Details</h2>
                            <h3 className="edit-inventory__labels" >Item Name</h3>
                            <textarea className={
                                (this.state.itemName.length === 0 && this.state.invalidInput) ? "edit-inventory__error" : ""} type="text" defaultValue={this.state.itemName} onChange={this.handleChangeInventory} name="itemName" ></textarea>
                            <span className={
                                (this.state.itemName.length === 0 && this.state.invalidInput) ? "edit-inventory__warning" : "edit-inventory__warning--hide"}>This field is required</span>
                            <h3 className="edit-inventory__labels" >Description</h3>
                            <textarea className={
                                (this.state.description.length === 0 && this.state.invalidInput) ? "edit-inventory__error edit-inventory__labels--description " : "edit-inventory__labels--description"} type="text" placeholder="Please enter a brief item description..." defaultValue={this.state.description} onChange={this.handleChangeInventory} name="description" ></textarea>
                            <span className={
                                (this.state.description.length === 0 && this.state.invalidInput) ? "edit-inventory__warning" : "edit-inventory__warning--hide"}>This field is required</span>
                            <h3 className="edit-inventory__labels" >Category</h3>
                            <select name="categoryName" id="categoryName" className="edit-inventory__dropdown">
								<option key={uuid()} value={this.state.category}>{this.state.category}</option>				
									{
										this.state.uniqueCategoryList.map( category => {
											if (category !== this.state.category) {
												return <option key={uuid()} value={category}>{category}</option>;
											}
											return null;
										})
									}
                            </select>
                            <span className={
                                (this.state.invalidInput) ? "edit-inventory__warning" : "edit-inventory__warning--hide"}>This field is required</span>
                        </div>
                        <div className="edit-inventory__availability--detail" >
                            <h2 className="edit-inventory__subtitle" >Item Availability</h2>
                            <h3 className="edit-inventory__labels" >Status</h3>
                            <div className="edit-inventory__radio-buttons" >
                                <div className="edit-inventory__radio-buttons--in" >
                                    <input type="radio" name="status" id="inStock" value="In Stock" checked={(this.state.status.toLowerCase() === "in stock")} onChange={this.handleChangeInventory}></input>
                                    <label htmlFor="in">In Stock</label>
                                </div>
                                <div>
                                    <input type="radio" name="status" id="outOfStock" value="Out of Stock" checked={(this.state.status.toLowerCase() === "out of stock")} onChange={this.handleChangeInventory}></input>
                                    <label htmlFor="out">Out of Stock</label>
                                </div>
                            </div>
                            <div className={(this.state.status === "Out of Stock") ? "edit-inventory__quantity--hide" : ""} >
                                <h3 className="edit-inventory__labels" >Quantity</h3>
                                <textarea className={
                                    (!this.state.quantity && this.state.invalidInput) ? "edit-inventory__error" : ""} type="number" name="quantity" placeholder="0" value={this.state.quantity} onChange={this.handleChangeInventory}  ></textarea>
                                <span className={
                                    (this.state.quantity.length === 0 && this.state.invalidInput) ? "edit-inventory__warning" : "edit-inventory__warning--hide"}>This field is required</span>
                            </div>
                            <h3 className="edit-inventory__labels" >Warehouse</h3>
                            <select name="warehouseID" id="warehouseName" className="edit-inventory__dropdown">
								<option value={this.state.warehouseName}>{this.state.warehouseName}</option>
									{
										this.state.warehouses.map( warehouse => {
											if (warehouse.name !== this.state.warehouseName) {
												return <option key={uuid()} value={warehouse.name}>{warehouse.name}</option>;
											}
											return null;
										})
									}
                            </select>
                            <span className={
                                (this.state.invalidInput) ? "edit-inventory__warning" : "edit-inventory__warning--hide"}>This field is required</span>
                        </div>
                    </div>
                    <div className="edit-inventory__submit" >
                        <Link className="edit-inventory__submit--cancel" to="/inventory">Cancel</Link>
                        <button className="edit-inventory__submit--edit" type="submit">Save</button>
                    </div>
                </form >
            </div >
        )
    }
}

export default EditInventoryItem;
