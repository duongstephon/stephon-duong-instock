import React from 'react';
import edit from '../../assets/icons/edit-24px.svg';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import './InventoryItemDetails.scss';
import { useHistory, Link } from 'react-router-dom';

const InventoryItemDetails = (props) => {
  const { itemName, warehouseName, description, category, status, quantity, id } = props.inventoryItem
  const history = useHistory()

  return (
    <div className='inventory-item-details'>
      <header className='inventory-item-details__header'>
        <div className='inventory-item-details__title-arrow'>
          <img onClick={() => history.goBack()} src={backArrow} alt='back arrow' />
          <h1 className='inventory-item-details__title'>{itemName}</h1>
        </div>
	  	<Link to={`/inventory/${id}/edit`} className='inventory-item-details__edit'>
          	<img className='inventory-item-details__edit-image' src={edit} alt='edit' />
          	<p className='inventory-item-details__edit-word'>Edit</p>
	  	</Link>
      </header>
      <section className='inventory-item-details__info'>
        <article className='inventory-item-details__left-section'>
          <div className='inventory-item-details__description'>
            <h4>item description:</h4>
            <p>{description}</p>
          </div>
          <div>
            <h4>category:</h4>
            <p>{category}</p>
          </div>
        </article>
        <article className='inventory-item-details__right-section'>
          <div className='inventory-item-details__status-quantity'>
            <div>
              <h4>status:</h4>
              <p className={status === "In Stock" ? 'inventory-item-details__status-in-stock' : 'inventory-item-details__status-out-of-stock'}>{status}</p>
            </div>
            <div>
              <h4>quantity:</h4>
              <p>{quantity}</p>
            </div>
          </div>
          <div>
            <h4>warehouse:</h4>
            <p>{warehouseName}</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default InventoryItemDetails;
