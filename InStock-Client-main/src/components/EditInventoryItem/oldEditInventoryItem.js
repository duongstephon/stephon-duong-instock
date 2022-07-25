import './EditInventoryItem.scss';
import inventories from '../../data/inventories.json'; 
import warehouses from '../../data/warehouses.json';
import { v4 as uuid } from 'uuid';

function EditInventoryItem() {
	//Selecting a random Item to Display TESTING ONLY
	const selectedItem = inventories[Math.floor(Math.random() * 69)];
	console.log(selectedItem);
	
	//Look thru json and find all unique categories and place in an array named uniqueCategories
	let uniqueCategories = [];
	inventories.forEach(inventory => {
		!uniqueCategories.includes(inventory.category) && uniqueCategories.push(inventory.category);
	});

	const selectedInStock = (selectedItem.status === "In Stock");
	
	return (
		<>
			<header className="edit-item__header">
				<h1 className="edit-item__header-title">edit inventory item</h1>
			</header>
			<section className="item-details__container">

				<h2 className="item-details__title">item details</h2>

				<h3 className="item-details__item-name-title">item name</h3>
				<input className="item-details__item-name-input" type="text" id="name" name="name" defaultValue={selectedItem.itemName}/>

				<h3 className="item-details__description-title">description</h3>
				<textarea className="item-details__description-input" id="description" name="description" defaultValue={selectedItem.description}></textarea>

				<h3 className="item-details__category-title">category</h3>
				<select className="item-details__category-select" id="inventoryCategory" name="inventoryCategory">
					<option value={selectedItem.category}>{selectedItem.category}</option>				
					{
						uniqueCategories.map( category => {
							if (category !== selectedItem.category) {
								return <option key={uuid()} value={category}>{category}</option>;
							}
							return null;
						})
					}
				</select>

			</section>
			<section className="item-avail__container">

				<h2 className="item-avail__title">item availability</h2>

				<h3 className="item-avail__status-title">status</h3>
					<label htmlFor="inStock">
						<input 
							className="item-avail__status-input"
							type="radio" 
							id="inStock" 
							value="In Stock" 
							name="inStock" 
							defaultChecked={selectedInStock}
						/>
						In stock
					</label>

					<label htmlFor="outOfStock">
						<input 
							className="item-avail__status-input"
							type="radio" 
							id="outOfStock" 
							value="Out of Stock" 
							name="outOfStock" 
							defaultChecked={!selectedInStock}
						/>
						Out of stock
					</label>

				<h3>warehouse</h3>
					<select id="warehouseList" name="warehouseList">
						<option value={selectedItem.warehouseName}>{selectedItem.warehouseName}</option>
						{
							warehouses.map( warehouse => {
								if (warehouse.name !== selectedItem.warehouseName) {
									return <option key={uuid()} value={warehouse.name}>{warehouse.name}</option>;
								}
								return null;
							})
						}

					</select>
			</section>
			<div className="edit-item__buttons-container">
				<button className="edit-item__cancel-button" name="cancel" type="reset">cancel</button>
				<button className="edit-item__submit-button" name="save" type="submit">save</button>
			</div> 
		</>
	);
}

export default EditInventoryItem;
