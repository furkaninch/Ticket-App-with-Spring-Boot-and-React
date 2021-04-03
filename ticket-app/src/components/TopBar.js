import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../redux/authActions';
import logo from '../assets/topbar-logo.png'
const TopBar = () => {
    const {name,isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        name: store.name
    }));

    const menuArea = useRef(null);

    const [menuVisible , setMenuVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click',menuClickTracker);
        return () => {
            document.removeEventListener('click',menuClickTracker);
        }
    },[isLoggedIn])

    const menuClickTracker = event => {
        if(menuArea.current === null || 
            !menuArea.current.contains(event.target)){
                setMenuVisible(false);
            }
    }

    const dispatch = useDispatch();

    const onLogOutSuccess = () => {
        dispatch(logoutSuccess());
    };

    let links = (
        <ul className = "navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to='/login'>
                    Login
                </Link>
            </li>
            <li>
                <Link className="nav-link" to='/register'>
                    Register
                </Link>
            </li>
        </ul>
        
    );

    if(isLoggedIn){
        let dropDownClass = "dropdown-menu p-0 shadow";

        if(menuVisible){
            dropDownClass = "dropdown-menu show p-0 shadow";
        }
    links = (
        <ul className="navbar-nav ml-auto" ref={menuArea}>
            <li className="nav-item dropdown">
                <div style={{cursor: "pointer"}} className="d-flex" onClick={() => {
                    setMenuVisible(true);
                }}>
                    <span className="nav-link dropdown-toggle">{name}</span>
                </div>

                <div className={dropDownClass}>
                    <Link className="dropdown-item d-flex p-2" to="/mytickets"
                    onClick={() => {
                        setMenuVisible(false);
                    }}>
                        <span className="material-icons mr-2">
                            library_books
                        </span>
                        My Tickets
                    </Link>

                    <Link className="dropdown-item d-flex p-2" to="/createticket"
                    onClick={() => {
                        setMenuVisible(false);
                    }}>
                        
                        <span className="material-icons mr-2">
                            create
                        </span>
                        Create Ticket
                    </Link>

                    
                    <span>
                        <Link className="dropdown-item d-flex p-2" to="/" onClick={onLogOutSuccess}>
                        <span className="material-icons text-danger mr-2">
                                    power_settings_new
                                </span>
                                    Log Out
                        </Link>
                    </span>
                </div>
            </li>
        </ul> 
    )
    }
    return (
        <div>
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="80" alt="ticket logo" style={{marginRight:20}}/> 
                    Support Ticket
                </Link>
                {links}
            </nav>
        </div>
    );
};

export default TopBar;