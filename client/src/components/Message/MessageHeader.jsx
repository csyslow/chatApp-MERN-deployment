import React from 'react';
import useConversation from '../../store/useConversation';

const MessageHeader = () => {
    const {selectedConversation} = useConversation();
    const {username} = selectedConversation;
    return (
        <div className='bg-slate-500 px-4 py-2 mb-2 rounded-tr-2xl'>
            <span className='text-gray-300 font-bold'>{username}</span>
        </div>
    );
};

export default MessageHeader;