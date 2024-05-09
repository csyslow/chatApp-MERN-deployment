import React from 'react';
import Conversation from './Conversation';
import useGetConversation from '../../hooks/useGetConversation';

const ConversationList = () => {
    const { conversations } = useGetConversation();
    console.log(conversations)

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {
                conversations.map((friend, idx) => (
                    <Conversation 
                    key={friend._id} 
                    friend={friend} 
                    isLast={idx === conversations.length-1}/>
                ))
            }
        </div>
    );
};

export default ConversationList;