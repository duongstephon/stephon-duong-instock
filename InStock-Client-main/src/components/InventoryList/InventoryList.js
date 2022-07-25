import './InventoryList.scss';
import { Link } from 'react-router-dom';
import sortIcon from '../../assets/icons/sort-24px.svg';
import InventoryItemMobile from '../../components/InventoryItemMobile/InventoryItemMobile';
import InventoryItemTablet from '../../components/InventoryItemTablet/InventoryItemTablet';
import { v4 as uuid } from 'uuid';

const InventoryList = ({ inventory, showDeleteInventory }) => {
    const columnTitles = ['INVENTORY ITEM', 'CATEGORY', 'STATUS', 'QTY', 'WAREHOUSE'];

    return (
        <>
            <div className='inventory-list__head'>
                <h1 className='inventory-list__head-title'>Inventory</h1>
                <div className='inventory-list__head--top-right'>
                    <input type='text' placeholder='Search...' className='inventory-list__head-search'></input>
                    <Link to="/inventory/add" className='inventory-list__head-cta'>+ Add New Item</Link>

                </div>
            </div>
            <div className='inventory-list__column-titles'>
                {
                    columnTitles.map(title => (
                        <h4 className='inventory-list__column-title' key={uuid()}>
                            {title}
                            <img src={sortIcon} alt='up and down arrows' className='inventory-list__column-title-icon'></img>
                        </h4>
                    ))
                }
                <h4 className='inventory-list__column-title inventory-list__column-title--last'>ACTIONS</h4>

            </div>
            <div className='inventory-list__items'>
                {
                    inventory.map(item =>
                        <InventoryItemMobile key={item.id} item={item} showDeleteInventory={showDeleteInventory} />
                    )
                }
                {
                    inventory.map(item =>
                        <InventoryItemTablet key={item.id} item={item} showDeleteInventory={showDeleteInventory} />
                    )
                }
            </div>
        </>
    )
};

export default InventoryList;
