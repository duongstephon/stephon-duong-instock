import './InventoryItemTablet.scss';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import rightArrow from '../../assets/icons/chevron_right-24px.svg';
import { Link } from 'react-router-dom';

const InventoryItemTablet = ( { item, showDeleteInventory } ) => {
    //console.log(item.status)
    return (
        <div className='inventory-item-tablet'>
            {/* to link to warehouse inventory */}
            <Link to={'/inventory/' + item.id} className='inventory-item-tablet__link'>{item.itemName} 
                <img src={rightArrow} alt='right pointing arrow' className='inventory-item-tablet__direct' />
            </Link>
            <p className='inventory-item-tablet__details inventory-item-tablet__category'>{item.category}</p>
            <p className={item.status.toLowerCase() === "in stock" ? 'inventory-item-tablet__in-stock' : 'inventory-item-tablet__out-of-stock'}>{item.status}</p>
            <p className='inventory-item-tablet__details  inventory-item-tablet__quantity'>{item.quantity}</p>
            <p className='inventory-item-tablet__details  inventory-item-tablet__warehouse'>{item.warehouseName}</p>
            <div className='inventory-item-tablet__manage'>
            <img src={deleteIcon} onClick={(e) =>  {showDeleteInventory(item.id);}} alt='trash can outline' className='inventory-item-tablet__manage-icon'></img>
			    	<Link to={`/inventory/${item.id}/edit`}>
            	<img src={editIcon} alt='pen edit outline' className='inventory-item-tablet__manage-icon'></img>
		    		</Link>

            </div>
        </div>
    )
}

export default InventoryItemTablet
