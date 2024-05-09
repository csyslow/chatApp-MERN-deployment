import React, { useEffect, useState } from 'react'
import useConversation from '../store/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    
    useEffect(() => {

        const sendGetMessagesReq = () => {
            setLoading(true);
            axios({
                method: 'GET',
                url: `http://localhost:5001/api/message/${selectedConversation._id}`,
                withCredentials: true
            })
            .then((res) => {
                const messagesData = res.data;
                setMessages(messagesData);
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
            .finally(() => {
                setLoading(false)
            })
        };
        if (selectedConversation?._id) sendGetMessagesReq();

        
    }, [selectedConversation?._id, setMessages]);

    return {loading, messages}
}

export default useGetMessages