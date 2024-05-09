import UserSidebar from '../../components/UserSidebar';
import MessageContainer from '../../components/MessageContainer';

const Home = () => {
    return (
        <div className='flex sm:h-[450px] md:h-[600px] bg-opacity-10 bg-gray-400
        shadow-md rounded-3xl backdrop-blur-lg'>
            <UserSidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;
