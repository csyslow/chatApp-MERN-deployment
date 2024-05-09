import React from 'react';
import useConversation from '../../store/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({friend: conversation, isLast}) => {
    const {username, profilePicUrl} = conversation;
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div className={`flex gap-2 items-cente duration-100 rounded p-2 py-1 cursor-pointer
            ${isSelected ? 'bg-sky-500' : ''} hover:bg-sky-700 rounded-2xl`}
            onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-e-full'>
                        <img src={profilePicUrl} alt="user Profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-semibold text-gray-200'>{username}</p>
                        <span className='text-xl'>😄</span>
                    </div>
                </div>

            </div>
            {/* last entry won't have a divider */}
            {!isLast && <div className='divider my-0 py-0 h-1'></div>} 

        </>
    );
};

export default Conversation;