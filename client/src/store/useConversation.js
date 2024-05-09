import { create } from 'zustand';


//for settng conversations and messages
const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
}));

export default useConversation;