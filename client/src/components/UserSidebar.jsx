import SearchInput from './Sidebar/SearchInput';
import ConversationList from './Sidebar/ConversationList';
import LogoutBtn from './Sidebar/LogoutBtn';

const UserSidebar = () => {
    return (
        <div className= 'border-r border-slate-500 p-4 flex flex-col'>
            <SearchInput />
            <div className='divider px-3'></div>
            <ConversationList />
            <LogoutBtn />
        </div>
    );
};

export default UserSidebar;