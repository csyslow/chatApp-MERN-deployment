import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        
        const sendGetUsersReq = () => {
            setLoading(true);
            axios({
                method: 'GET',
                url: 'http://localhost:5001/api/user',
                withCredentials: true
            })
                .then((res) => {
                    const users = res.data;
                    setConversations(users);
                })
                .catch((err) => {
                    toast.error(err.response.data.error);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        sendGetUsersReq(); //execute for just one time when refresh
    }, []);

    return {loading, conversations};
};

export default useGetConversation;