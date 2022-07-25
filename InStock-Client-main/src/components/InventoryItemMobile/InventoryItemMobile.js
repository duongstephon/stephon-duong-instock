import './InventoryItemMobile.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import rightArrow from '../../assets/icons/chevron_right-24px.svg';
import { Link } from 'react-router-dom';

const InventoryItemMobile = ({ item, showDeleteInventory }) => {
    return (
        <div className='inventory-item'>
            <div className='inventory-item--mobile'>
                <div className='inventory-item--mobile-column'>
                    <h4 className='inventory-item__table-header'>INVENTORY ITEM</h4>
                    <Link to={'/inventory/' + item.id} className='inventory-item__link'>{item.itemName} <img src={rightArrow} alt='right pointing arrow' className='inventory-item__direct' /></Link>
                    <h4 className='inventory-item__table-header'>CATEGORY</h4>
                    <p className='inventory-item__details'>{item.category}</p>
                </div>
                <div className='inventory-item--mobile-column'>
                    <h4 className='inventory-item__table-header'>STATUS</h4>
                    <p className={item.status.toLowerCase() === "in stock" ? 'inventory-item__in-stock' : 'inventory-item__out-of-stock'} >{item.status}</p>
                    <h4 className='inventory-item__table-header'>QTY</h4>
                    <p className='inventory-item__details'>{item.quantity}</p>
                    <h4 className='inventory-item__table-header'>WAREHOUSE</h4>
                    <p className='inventory-item__details'>{item.warehouseName}</p>
                </div>
            </div>
            <div className='inventory-item__manage'>
                <img src={deleteIcon} onClick={(e) => {showDeleteInventory(item.id);}} alt='trash can outline' className='inventory-item__manage-icon'></img>
                <Link to={`/inventory/${item.id}/edit`}>
                	<img src={editIcon} alt='pen edit outline' className='inventory-item__manage-icon'></img>
				        </Link>

            </div>
        </div>
    )
}

export default InventoryItemMobile;
