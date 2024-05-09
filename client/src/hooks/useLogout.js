import { useContext, useState } from "react";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const sendLogoutReq = () => {
        setLoading(true);
        axios({
            method: 'POST',
            url: 'http://localhost:5001/api/auth/logout'
        })
            .then((res) => {
                console.log(res.data);
                //clear localstorage
                localStorage.removeItem('loginUser');
                localStorage.removeItem('loginUsername');
                //reset authUser state
                setAuthUser(null);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { loading, sendLogoutReq };
}

export default useLogout;