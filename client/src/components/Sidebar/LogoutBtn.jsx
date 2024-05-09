import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Login from '../../pages/loginPage/Login';
import useLogout from '../../hooks/useLogout';

const LogoutBtn = () => {
    const { sendLogoutReq } = useLogout();
    const logoutBtnHandler = () => {
        sendLogoutReq()
    }
    return (
        <div className='mt-auto text-gray-300'>
            <Link to={'/login'}>
                <TbLogout2 onClick={logoutBtnHandler} className='w-6 h-6 mt-3' />
            </Link>
        </div>
    );
};

export default LogoutBtn;
