import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, setLoginUsername } = useAuthContext();

    const sendLoginReq = ({ username, password }) => {
        console.log('send!', username, password);
        const success = checkLoginInputs({username, password});
        if(!success) return;
        
        setLoading(true);
        axios({
            method: 'POST',
            url: 'http://localhost:5001/api/auth/login',
            data: {
                username,
                password
            },
            withCredentials:true
        })
            .then((res) => {
                const loginUser = res.data;
                localStorage.setItem('loginUser', JSON.stringify(loginUser)); //localstorage储存对象先要转换为JSON
                localStorage.setItem('loginUsername', username);
                console.log('login user:', loginUser);
                setAuthUser((loginUser));
            })
            .catch((err) => {
                toast.error(err.response.data.error); //get error info from backend controller
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return { loading, sendLoginReq };
}

export default useLogin;

const checkLoginInputs = ({username, password}) => {
    if (!username || !password) {
        toast.error('Please fill in all fields');
        return false;
    }
    if (password.length < 6) {
        toast.error('Please input a valid password (at least 6 characters)');
        return false;
    }

    return true;
}