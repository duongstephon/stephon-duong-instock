import './AddWarehouse.scss';
import React from 'react';
import BackArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { API_URL } from '../../App';
import { Link } from 'react-router-dom';

class AddWarehouse extends React.Component {
    state = {
        name: "",
        address: "",
        city: "",
        country: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
        invalidInput: false,
    };

    addWarehouse = (event) => {
        event.preventDefault();
        console.log(event);

        if (!this.state.name || !this.state.address || !this.state.city || !this.state.country || !this.state.contactName || !this.state.contactPosition || !this.state.contactPhone || !this.state.contactEmail) {
            this.setState({
                invalidInput: true,
            })
            return;
        }
        axios
            .post(`${API_URL}/warehouses`, {
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                country: this.state.country,
                contact: {
                    name: this.state.contactName,
                    position: this.state.contactPosition,
                    phone: this.state.contactPhone,
                    email: this.state.contactEmail,
                }
            })
            .then((response) => {
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log('Error', error);
            })
    };

    handleChangeWarehouse = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        return (
            <div className="add-warehouse" >
                <div className="add-warehouse__title" >
                    <Link className="add-warehouse__arrow" to="/">
                        <img src={BackArrow} alt="arrow-back"></img></Link>
                    <h1>Add New Warehouse</h1>
                </div>
                <form onSubmit={this.addWarehouse}>
                    <div className="add-warehouse__form" >
                        <div className="add-warehouse__warehouse--detail" >
                            <h2 className="add-warehouse__subtitle" >Warehouse Details</h2>
                            <h3 className="add-warehouse__labels" >Warehouse Name</h3>
                            <textarea className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="Warehouse Name" value={this.state.name} onChange={this.handleChangeWarehouse} name="name">
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >Street Address</h3>
                            <textarea className={
                                (this.state.address.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="Street Address" value={this.state.address} onChange={this.handleChangeWarehouse} name="address" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >City</h3>
                            <textarea className={
                                (this.state.city.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="City" value={this.state.city} onChange={this.handleChangeWarehouse} name="city" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >Country</h3>
                            <textarea className={
                                (this.state.country.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="Country" value={this.state.country} onChange={this.handleChangeWarehouse} name="country" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                        </div>
                        <div className="add-warehouse__contact--detail" >
                            <h2 className="add-warehouse__subtitle" >Contact Details</h2>
                            <h3 className="add-warehouse__labels" >Contact Name</h3>
                            <textarea className={
                                (this.state.contactName.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="Contact Name" value={this.state.contactName} onChange={this.handleChangeWarehouse} name="contactName" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >Position</h3>
                            <textarea className={
                                (this.state.contactPosition.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="text" placeholder="Position" value={this.state.contactPosition} onChange={this.handleChangeWarehouse} name="contactPosition" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >Phone Number</h3>
                            <textarea className={
                                (this.state.contactPhone.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="tel" placeholder="Phone Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" value={this.state.contactPhone} onChange={this.handleChangeWarehouse} name="contactPhone" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="add-warehouse__labels" >Email</h3>
                            <textarea className={
                                (this.state.contactEmail.length === 0 && this.state.invalidInput) ? "add-warehouse__error" : ""} type="email" placeholder="Email" value={this.state.contactEmail} onChange={this.handleChangeWarehouse} name="contactEmail" ></textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "add-warehouse__warning" : "add-warehouse__warning--hide"}>
                                This field is required</span>
                        </div>
                    </div>
                    <div className="add-warehouse__submit" >
                        <Link className="add-warehouse__submit--cancel" to="/">Cancel</Link>
                        <button className="add-warehouse__submit--add" type="submit">+ Add Warehouse</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddWarehouse;