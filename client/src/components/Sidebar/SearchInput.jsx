import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import useConversation from '../../store/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';
const SearchInput = () => {
    const [search, setSearch] = useState('');
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversation();
    
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (!search) return;

        if (search.length < 3) {
            return toast.error('Search term should be at least 3 characters.')
        }
        console.log(conversations)
        const conversation = conversations.find((cvst) => cvst.username.toLowerCase().includes(search.toLowerCase()));
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else return toast.error('No users found');
    };

    return (
        <form className='flex items-center gap-2' onSubmit={searchSubmitHandler}>
            <input 
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            type="text" placeholder='Search user...' className='input input-bordered h-10 border text-sm 
                w-full p-2.5 bg-gray-300 border-gray-200 text-gray-800 rounded-full' />
            <button type='submit' className='btn btn-circle bg-pink-400 text-white '>
                <FiSearch className='w-6 h-6' />
            </button>
        </form>
    );
};

export default SearchInput;