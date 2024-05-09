import React, { useEffect } from 'react';
import MessageHeader from './Message/MessageHeader';
import MessageContent from './Message/MessageContent';
import MessageInput from './Message/MessageInput'
import NoChatPage from './Message/NoChatPage';
import useConversation from '../store/useConversation';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        //clean up func (unmount after logged out)
        //return的函数会在组件卸载时被调用，即清理函数
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]); //setSelectedConversation其实不会变，也就相当空dependency

    return (
        selectedConversation ? (
            <div className='md:min-w-[450px] sm:min-w-[300px] flex flex-col justify-center' >
                <MessageHeader />
                <MessageContent />
                <MessageInput />
            </div >
        ) : (
            <div className='md:min-w-[450px] sm:min-w-[300px] flex flex-col justify-center'>
                <NoChatPage />
            </div>
        )


    );
};

export default MessageContainer;