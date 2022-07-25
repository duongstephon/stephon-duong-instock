import './DeleteInventory.scss';
import closeButton from '../../assets/icons/close-24px.svg';

const DeleteInventory = ({ inventoryName, hideDeleteInventory, handleDeleteInventory }) => {
	return(
		<div className="delete-inventory">
			<div className="delete-inventory__card">
				<img src={closeButton} onClick={hideDeleteInventory} className="delete-inventory__x-button"></img>
				<h1 className="delete-inventory__title">{`Delete ${inventoryName} inventory item?`}</h1>
				<p className="delete-inventory__text">{`Please confirm that you'd like to delete ${inventoryName} from the inventory list. You won't be able to undo this action.`}</p>
				<div className="delete-inventory__buttons-container">
					<button className="delete-inventory__button-cancel" onClick={hideDeleteInventory}>cancel</button>
					<button className="delete-inventory__button-delete" onClick={handleDeleteInventory}>delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteInventory;
