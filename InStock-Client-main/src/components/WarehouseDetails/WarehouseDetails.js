import './WarehouseDetails.scss'
import backArrow from '../../assets/icons/arrow_back-24px.svg'
import edit from '../../assets/icons/edit-24px.svg'
import WarehouseInventoryItem from '../WarehouseInventoryItem/WarehouseInventoryItem'
import sort from '../../assets/icons/sort-24px.svg';
import { Link } from 'react-router-dom'


const WarehouseDetails = (props) =>{
  const { name, address, city, country, id } = props.warehouse;
  const { position, phone, email } = props.warehouse.contact;
  const { showDeleteInventory } = props;

  return (
    <div className='single-warehouse'>
    <section>
      <header className='single-warehouse__header'>
      <div className='single-warehouse__title-arrow'>
        <Link to='/' className='single-warehouse__arrow'><img src={backArrow} alt='back arrow' /></Link>
        <h1 className='single-warehouse__title'>{name}</h1>     
      </div>
        <Link to={`/warehouses/${id}/edit`} className='single-warehouse__edit'>
          <img className='single-warehouse__edit-image' src={edit} alt='edit icon' />
          <p className='single-warehouse__edit-word'>Edit</p>
        </Link>
      </header>
      <article className='single-warehouse__details'>
        <div className='single-warehouse__address'>
          <h4>warehouse address:</h4>
          <p>{`${address}, ${city}, ${country}`}</p>
        </div>
        <div className='single-warehouse__contact'>
          <div className='single-warehouse__contact-info'>
            <h4>contact name:</h4>
            <p>{props.warehouse.contact.name}</p>
            <p>{position}</p>
          </div>
          <div className='single-warehouse__contact-info'>
            <h4>contact information:</h4>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        </div>
      </article>
      <section className='single-warehouse__tablet-desktop'>
      <div className='single-warehouse__table-headers'>
        <div className='single-warehouse__item-header'>
          <h4>inventory item</h4>
          <img src={sort} alt='sort' />
        </div>
        <div className='single-warehouse__category-header'>
          <h4>category</h4>
          <img src={sort} alt='sort' />
        </div>
        <div className='single-warehouse__status-header'>
          <h4>status</h4>
          <img src={sort} alt='sort' />
        </div>
        <div className='single-warehouse__quantity-header'>
          <h4 className='quantity-tablet'>quantity</h4>
          <h4 className='quantity-desktop'>qty</h4>
          <img src={sort} alt='sort' />
        </div>
        <div className='single-warehouse__action-header'>
          <h4>actions</h4>
        </div>
      </div>
    </section>
      {props.inventory?.map(item => {
        return (
          <WarehouseInventoryItem className='single-warehouse__mobile'
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          category={item.category} 
          status={item.status}
          quantity={item.quantity}
		  showDeleteInventory={showDeleteInventory}
          />
        )
      })}
      </section>
    </div>
  );
}

export default WarehouseDetails;
