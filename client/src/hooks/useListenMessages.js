import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../store/useConversation'
import notificationSound from '../assets/sounds/notification.mp3'
//listen for socket messages
const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on('newMessage', (newMsg) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMsg]);
        });

        //clean up 
        return () => socket?.off('newMessage'); //won't listen to this event more than once
    }, [socket, setMessages, messages]);
}

export default useListenMessages