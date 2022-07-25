import './Header.scss';
import { NavLink, Link, useLocation } from 'react-router-dom';
import InStockLogo from '../../assets/logo/InStock-Logo_2x.png';
import React from 'react';

function Header(props) {
    //console.log(props);
    const { pathname } = useLocation();

    return (
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={InStockLogo} alt="main-logo" ></img>
            </Link>

            <div className="header__nav">
                <NavLink
                    to="/" exact
                    className="header__nav--link"
                    activeClassName="header__nav--active"
                    isActive={() => ["/", "/warehouses/add", "/warehouses/:warehouseId", "/warehouses/:warehouseId/edit"].includes(pathname)}
                >Warehouses</NavLink>
                <NavLink
                    to="/inventory"
                    className="header__nav--link"
                    activeClassName="header__nav--active"
                    isActive={() => ["/inventory", "/inventory/add", "/inventory/:inventoryId", "/inventory/:inventoryId/edit"].includes(pathname)}
                >Inventory</NavLink>
            </div>
        </header>
    );


}

export default Header;
