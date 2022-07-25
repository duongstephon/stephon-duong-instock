import './WarehouseItemTablet.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import rightArrow from '../../assets/icons/chevron_right-24px.svg';
import { Link } from 'react-router-dom';

const WarehouseItemTablet = ( { warehouse, showDeleteWarehouse } ) => {
    return (
        <div className='warehouse-item-tablet'>
            <Link to={`/warehouses/${warehouse.id}`} className='warehouse-item-tablet__link'>{warehouse.name} 
                <img src={rightArrow} alt='right pointing arrow' className='warehouse-item-tablet__direct' />
            </Link>
            <p className='warehouse-item-tablet__details'>{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
            <p className='warehouse-item-tablet__details--name'>{warehouse.contact.name}</p>
            <p className='warehouse-item-tablet__contact-info'>{warehouse.contact.phone}<br></br>{warehouse.contact.email}</p>
            <div className='warehouse-item-tablet__manage'>
				<img src={deleteIcon} onClick={(e) => {showDeleteWarehouse(warehouse.id);}} alt='trash can outline' className='warehouse-item-tablet__manage-icon'></img>
				<Link to={`/warehouses/${warehouse.id}/edit`}><img src={editIcon} alt='pen edit outline' className='inventory-item__manage-icon'></img></Link>
            </div>
        </div>
    )
}

export default WarehouseItemTablet;
