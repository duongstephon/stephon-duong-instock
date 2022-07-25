import './AddInventory.scss';
import React from 'react';
import BackArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { API_URL } from '../../App';
import { Link } from 'react-router-dom';


class AddInventory extends React.Component {
    state = {
        itemName: "",
        description: "",
        status: "In Stock",
        quantity: "",
        warehouses: [],
        invalidInput: false,
    }

    componentDidMount() {
        axios
            .get(`${API_URL}/warehouses/`)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    warehouses: response.data
                });
            })
            .catch((error) => {
                console.log('Failed request. Please try again', error);
            });
    }

    addInventory = (event) => {
        event.preventDefault();
        console.log(event);

        if (event.target.categoryName.value === "") {
            event.target.categoryName.classList.add("add-inventory__error");
        } else {
            event.target.categoryName.classList.remove("add-inventory__error");
        }

        if (event.target.warehouseName.value === "") {
            event.target.warehouseName.classList.add("add-inventory__error");
        } else {
            event.target.warehouseName.classList.remove("add-inventory__error");
        }

        if (!this.state.itemName || !this.state.description || !this.state.status || (!this.state.quantity && this.state.status !== "Out of stock") || !event.target.warehouseName.value || !event.target.categoryName.value) {
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

        let newWarehouse = this.state.warehouses.find(warehouse => warehouse.id === event.target.warehouseID.value)

        axios
            .post(`${API_URL}/inventories`, {
                warehouseID: event.target.warehouseID.value,
                itemName: this.state.itemName,
                description: this.state.description,
                category: event.target.categoryName.value,
                status: this.state.status,
                quantity: newQuantity,
                warehouseName: newWarehouse.name,
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
    }

    render() {
        return (
            <div className="add-inventory" >
                <div className="add-inventory__title" >
                    <Link to="/inventory" className="add-inventory__arrow">
                        <img src={BackArrow} alt="arrow-back"></img></Link>
                    <h1>Add New Inventory</h1>
                </div>
                <form onSubmit={this.addInventory}>
                    <div className="add-inventory__form" >
                        <div className="add-inventory__inventory--detail" >
                            <h2 className="add-inventory__subtitle" >Item Details</h2>
                            <h3 className="add-inventory__labels" >Item Name</h3>
                            <textarea className={
                                (this.state.itemName.length === 0 && this.state.invalidInput) ? "add-inventory__error" : ""} type="text" placeholder="Item Name" value={this.state.itemName} onChange={this.handleChangeInventory} name="itemName" ></textarea>
                            <span className={
                                (this.state.itemName.length === 0 && this.state.invalidInput) ? "add-inventory__warning" : "add-inventory__warning--hide"}>This field is required</span>
                            <h3 className="add-inventory__labels" >Description</h3>
                            <textarea className={
                                (this.state.description.length === 0 && this.state.invalidInput) ? "add-inventory__error add-inventory__labels--description " : "add-inventory__labels--description"} type="text" placeholder="Please enter a brief item description..." value={this.state.description} onChange={this.handleChangeInventory} name="description" ></textarea>
                            <span className={
                                (this.state.description.length === 0 && this.state.invalidInput) ? "add-inventory__warning" : "add-inventory__warning--hide"}>This field is required</span>
                            <h3 className="add-inventory__labels" >Category</h3>
                            <select name="categoryName" id="categoryName" className="add-inventory__dropdown">
                                <option value="">Please select</option>
                                <option value="Accessories" >Accessories</option>
                                <option value="Apparel" >Apparel</option>
                                <option value="Electronics" >Electronics</option>
                                <option value="Health" >Health</option>
                                <option value="Gear" >Gear</option>
                            </select>
                            <span className={
                                (this.state.invalidInput) ? "add-inventory__warning" : "add-inventory__warning--hide"}>This field is required</span>
                        </div>
                        <div className="add-inventory__availability--detail" >
                            <h2 className="add-inventory__subtitle" >Item Availability</h2>
                            <h3 className="add-inventory__labels" >Status</h3>
                            <div className="add-inventory__radio-buttons" >
                                <div className="add-inventory__radio-buttons--in" >
                                    <input type="radio" name="status" id="inStock" value="In Stock" defaultChecked onChange={this.handleChangeInventory}></input>
                                    <label htmlFor="in">In Stock</label>
                                </div>
                                <div>
                                    <input type="radio" name="status" id="outOfStock" value="Out of Stock" onChange={this.handleChangeInventory}></input>
                                    <label htmlFor="out">Out of Stock</label>
                                </div>
                            </div>
                            <div className={(this.state.status === "Out of Stock") ? "add-inventory__quantity--hide" : ""} >
                                <h3 className="add-inventory__labels" >Quantity</h3>
                                <textarea className={
                                    (!this.state.quantity && this.state.invalidInput) ? "add-inventory__error" : ""} type="number" name="quantity" placeholder="0" value={this.state.quantity} onChange={this.handleChangeInventory}  ></textarea>
                                <span className={
                                    (this.state.quantity.length === 0 && this.state.invalidInput) ? "add-inventory__warning" : "add-inventory__warning--hide"}>This field is required</span>
                            </div>
                            <h3 className="add-inventory__labels" >Warehouse</h3>
                            <select name="warehouseID" id="warehouseName" className="add-inventory__dropdown">
                                <option value="">Please select</option>
                                {this.state.warehouses.map((eachWarehouse) => (
                                    <option key={eachWarehouse.Id} value={eachWarehouse.id}>{eachWarehouse.name}</option>
                                ))}
                            </select>
                            <span className={
                                (this.state.invalidInput) ? "add-inventory__warning" : "add-inventory__warning--hide"}>This field is required</span>
                        </div>
                    </div>
                    <div className="add-inventory__submit" >
                        <Link className="add-inventory__submit--cancel" to="/inventory">Cancel</Link>
                        <button className="add-inventory__submit--add" type="submit">+ Add Inventory</button>
                    </div>
                </form >
            </div >
        )
    }
}

export default AddInventory;
