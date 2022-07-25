import React from 'react';
import './WarehouseInventoryItem.scss';
import chevron from '../../assets/icons/chevron_right-24px.svg';
import trash from '../../assets/icons/delete_outline-24px.svg';
import edit from '../../assets/icons/edit-24px.svg';
import { Link } from 'react-router-dom'

const WarehouseInventoryItem = (props) => {
  const { showDeleteInventory } = props;

  return (
    //Mobile
    <div>
    <section className='warehouse-inventory'>
    <article className='warehouse-inventory__item-info'>
      <div className='warehouse-inventory__column'>
        <div className='warehouse-inventory__block'>
          <h4 className='warehouse-inventory__header'>inventory item</h4>
            <Link to={'/inventory/' + props.id}className='warehouse-inventory__item'>
              <p className='warehouse-inventory__item-name'>{props.itemName}</p>
              <img src={chevron} alt='chevron right' />
            </Link>
        </div>
        <div className='warehouse-inventory__item-category'>
          <h4 className='warehouse-inventory__header'>category</h4>
          <p>{props.category}</p>
        </div>
      </div>
      <div className='warehouse-inventory__column'>
        <div className='warehouse-inventory__block warehouse-inventory__status-block'>
          <h4 className='warehouse-inventory__header'>status</h4>
          <p className={props.status.toLowerCase() === "in stock" ? 'warehouse-inventory__status-in-stock' : 'warehouse-inventory__status-out-of-stock'}>{props.status}</p>
        </div>
        <div className='warehouse-inventory__item-quantity'>
          <h4 className='warehouse-inventory__header'>qty</h4>
          <p>{props.quantity}</p>
        </div>
      </div>
      </article>
      <div className='warehouse-inventory__actions'>
        <img className='warehouse-inventory__delete' onClick={(e) => {showDeleteInventory(props.id);}} src={trash} alt='delete item'/>
        <Link className="warehouse-inventory__link" to={`/inventory/${props.id}/edit`}></Link>
      </div>
    </section>

    {/*Tablet and Desktop*/}
    </div>
  );
};

export default WarehouseInventoryItem;
