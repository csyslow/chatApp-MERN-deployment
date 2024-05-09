import React from 'react';
import { useAuthContext } from '../../context/authContext';
import useConversation from '../../store/useConversation';

const Message = ({ msg }) => {

    //check msg is from us or other users
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const myMsg = msg.senderId === authUser._id;
    const chatClassName = myMsg ? 'chat-end' : 'chat-start';
    const profilePicUrl = myMsg ? authUser.profilePicUrl : selectedConversation.profilePicUrl;
    const username = myMsg ? authUser.username : selectedConversation.username;
    const bubbleColor = myMsg ? 'bg-blue-400' : '';
    const createTime = new Date(msg.createdAt);
    const hr = createTime.getHours().toString().padStart(2, "0");
    const min = createTime.getMinutes().toString().padStart(2, "0");
    return (
        <div className={`chat ${chatClassName}`} >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={profilePicUrl} />
                </div>
            </div>
            <div className="chat-header">
                {username}
            </div>
            <div className={`chat-bubble ${bubbleColor}`}>{msg.content}</div>
            <div className="chat-footer opacity-50">
                <time className="text-xs">{`${hr}:${min}`}</time>
            </div>
        </div>

    );
};

export default Message;