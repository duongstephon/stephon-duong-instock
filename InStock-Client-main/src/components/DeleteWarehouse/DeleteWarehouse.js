import './DeleteWarehouse.scss';
import closeButton from '../../assets/icons/close-24px.svg';

const DeleteWarehouse = ({ warehouseName, hideDeleteWarehouse, handleDeleteWarehouse }) => {
	return(
		<div className="delete-warehouse">
			<div className="delete-warehouse__card">
				<img src={closeButton} onClick={hideDeleteWarehouse} className="delete-warehouse__x-button"></img>
				<h1 className="delete-warehouse__title">{`Delete ${warehouseName} warehouse?`}</h1>
				<p className="delete-warehouse__text">{`Please confirm that you'd like to delete the ${warehouseName} from the list of warehouses. You won't be able to undo this action.`}</p>
				<div className="delete-warehouse__buttons-container">
					<button className="delete-warehouse__button-cancel" onClick={hideDeleteWarehouse}>cancel</button>
					<button className="delete-warehouse__button-delete" onClick={handleDeleteWarehouse}>delete</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteWarehouse;
