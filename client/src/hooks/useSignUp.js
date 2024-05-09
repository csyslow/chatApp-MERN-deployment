import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    //useSignUp hook returns signUp function
    const sendSignUpReq = ({ fullName, username, gender, password, confirmedPassword }) => {
        console.log('sendSignUpReq')
        const success = checkInputs({ fullName, username, gender, password, confirmedPassword });
        if (!success) return;
        //if check success, send request
        setLoading(true);
        axios({
            method: 'POST',
            url: 'http://localhost:5001/api/auth/signup',
            data: {
                fullName,
                username,
                gender,
                password,
                confirmedPassword,
            },
            withCredentials: true
        })
            .then((res) => {
                const loginUser = res.data;
                console.log(loginUser);
                // set user data to local storage
                localStorage.setItem('loginUser', JSON.stringify(loginUser));
                localStorage.setItem('loginUsername', username);
                // update authUser state
                setAuthUser(loginUser);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { sendSignUpReq, loading }
}

export default useSignUp;

const checkInputs = ({ fullName, username, gender, password, confirmedPassword }) => {
    if (!fullName || !username || !gender || !password || !confirmedPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmedPassword) {
        toast.error("Passwords are not matched");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return false
    }

    return true;
}