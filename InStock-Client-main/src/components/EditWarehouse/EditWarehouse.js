import './EditWarehouse.scss';
import React from 'react';
import BackArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../App';
class EditWarehouse extends React.Component {
    state = {
        name: "",
        address: "",
        city: "",
        country: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
        id: "",
        invalidInput: false,
    };

    getWarehouseInfo = (id) => {
        axios.get(`${API_URL}/warehouses/${id}`)
            .then((response) => {
                //console.log(response)
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    address: response.data.address,
                    city: response.data.city,
                    country: response.data.country,
                    contactName: response.data.contact.name,
                    contactPosition: response.data.contact.position,
                    contactPhone: response.data.contact.phone,
                    contactEmail: response.data.contact.email
                })
            })
    }

    editWarehouse = (event) => {
        event.preventDefault();
        //console.log(event);

        if (!this.state.name || !this.state.address || !this.state.city || !this.state.country || !this.state.contactName || !this.state.contactPosition || !this.state.contactPhone || !this.state.contactEmail) {
            this.setState({
                invalidInput: true,
            })
            return;
        }
        axios
            .patch(`${API_URL}/warehouses/${this.state.id}`, {
                id: this.state.id,
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

    componentDidMount() {
        const warehouseId = this.props.match.params.warehouseId;
        if (warehouseId) {
            this.getWarehouseInfo(warehouseId);
        }
    }

    // axios for page did update
    componentDidUpdate(prevProps) {
        const previousWarehouseId = prevProps.match.params.warehouseId;
        const currentWarehouseId = this.props.match.params.warehouseId;

        if (previousWarehouseId !== currentWarehouseId) {
            this.getWarehouseInfo(currentWarehouseId);
        }
    }

    render() {

        return (
            <div className="edit-warehouse" >
                <div className="edit-warehouse__title" >
                    <img onClick={() => {this.props.history.push('/')}} className="edit-warehouse__arrow" src={BackArrow} alt="arrow-back"></img>
                    <h1>Edit Warehouse</h1>
                </div>
                <form onSubmit={this.editWarehouse}>
                    <div className="edit-warehouse__form" >
                        <div className="edit-warehouse__warehouse--detail" >
                            <h2 className="edit-warehouse__subtitle" >Warehouse Details</h2>
                            <h3 className="edit-warehouse__labels" >Warehouse Name</h3>
                            <textarea className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.name} onChange={this.handleChangeWarehouse} name="name">
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >Street Address</h3>
                            <textarea className={
                                (this.state.address.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.address} onChange={this.handleChangeWarehouse} name="address" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >City</h3>
                            <textarea className={
                                (this.state.city.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.city} onChange={this.handleChangeWarehouse} name="city" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >Country</h3>
                            <textarea className={
                                (this.state.country.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.country} onChange={this.handleChangeWarehouse} name="country" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                        </div>
                        <div className="edit-warehouse__contact--detail" >
                            <h2 className="edit-warehouse__subtitle" >Contact Details</h2>
                            <h3 className="edit-warehouse__labels" >Contact Name</h3>
                            <textarea className={
                                (this.state.contactName.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.contactName} onChange={this.handleChangeWarehouse} name="contactName" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >Position</h3>
                            <textarea className={
                                (this.state.contactPosition.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="text" defaultValue={this.state.contactPosition} onChange={this.handleChangeWarehouse} name="contactPosition" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >Phone Number</h3>
                            <textarea className={
                                (this.state.contactPhone.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" defaultValue={this.state.contactPhone} onChange={this.handleChangeWarehouse} name="contactPhone" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                            <h3 className="edit-warehouse__labels" >Email</h3>
                            <textarea className={
                                (this.state.contactEmail.length === 0 && this.state.invalidInput) ? "edit-warehouse__error" : ""} type="email" defaultValue={this.state.contactEmail} onChange={this.handleChangeWarehouse} name="contactEmail" >
                            </textarea>
                            <span className={
                                (this.state.name.length === 0 && this.state.invalidInput) ? "edit-warehouse__warning" : "edit-warehouse__warning--hide"}>
                                This field is required</span>
                        </div>
                    </div>
                    <div className="edit-warehouse__submit" >
                        <Link className="edit-warehouse__submit--cancel" to="/">Cancel</Link>
                        <button className="edit-warehouse__submit--save" type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditWarehouse;
