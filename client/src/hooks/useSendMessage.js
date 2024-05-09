import React, { useState } from 'react'
import useConversation from '../store/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessagesReq = (message) => {
        setLoading(true);
        axios({
            method: 'POST',
            url: `http://localhost:5001/api/message/send/${selectedConversation._id}`,
            data: { content: message },
            withCredentials: true
        })
            .then((res) => {
                const newMsg = res.data;
                console.log('newMsg', newMsg);
                setMessages([...messages, newMsg]);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return { loading, sendMessagesReq };
}

export default useSendMessage