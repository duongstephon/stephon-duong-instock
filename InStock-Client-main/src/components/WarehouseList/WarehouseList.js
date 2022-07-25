import './WarehouseList.scss';
import { Link } from 'react-router-dom';
import WarehouseItem from '../WarehouseItem/WarehouseItem';
import WarehouseItemTablet from '../WarehouseItemTablet/WarehouseItemTablet';
import sortIcon from '../../assets/icons/sort-24px.svg';
import { v4 as uuid } from 'uuid';

const WarehouseList = ({ warehouses, showDeleteWarehouse }) => {
    const columnTitles = ['WAREHOUSE', 'ADDRESS', 'CONTACT NAME', 'CONTACT INFORMATION'];

    return (
        <>
            <div className='warehouse-list__head'>
                <h1 className='warehouse-list__head-title'>Warehouses</h1>
                <div className='warehouse-list__head--top-right'>
                    <input type='text' placeholder='Search...' className='warehouse-list__head-search'></input>
                    <Link to="/warehouses/add" className='warehouse-list__head-cta'>+ Add New Warehouse</Link>

                </div>
            </div>
            <div className='warehouse-list__column-titles'>
                {
                    columnTitles.map(title => (
                        <h4 className='warehouse-list__column-title' key={uuid()}>
                            {title}
                            <img src={sortIcon} alt='up and down arrows' className='warehouse-list__column-title-icon'></img>
                        </h4>
                    ))
                }
                <h4 className='warehouse-list__column-title warehouse-list__column-title--last'>ACTIONS</h4>

            </div>
            <div className='warehouse-list__warehouses'>
                {
                    warehouses.map(warehouse =>
                        <WarehouseItem key={warehouse.id} warehouse={warehouse} showDeleteWarehouse={showDeleteWarehouse}/>
                    )
                }
                {
                    warehouses.map(warehouse =>
                        <WarehouseItemTablet key={warehouse.id} warehouse={warehouse} showDeleteWarehouse={showDeleteWarehouse}/>
                    )
                }
            </div>
        </>
    )
};

export default WarehouseList;
