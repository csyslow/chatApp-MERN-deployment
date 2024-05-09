import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {loading, sendLoginReq} = useLogin();

    const usernameChangeHandler = e => {
        setUsername(e.target.value);
    }

    const passwordChangeHandler = e => {
        setPassword(e.target.value);
    }

    const loginHandler = (e) => {
        e.preventDefault();
        sendLoginReq({password, username});
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter 
            backdrop-blur-lg bg-opacity-10 rounded-3xl'>
                <h1 className='text-center text-3xl text-gray-300 font-semibold h-full w-full bg-brown-300 rounded-md bg-clip-padding'>
                    <span className='text-pink-400 mr-2'>ChatApp</span>
                    <span>Login</span>
                </h1>

                <form onSubmit={loginHandler} className='text-gray-300'>
                    <div className='text-gray-300'>
                        <label htmlFor="username" className='label p-2'>
                            <span className='text-base'>Username</span>
                        </label>
                        <input onChange={usernameChangeHandler} value={username} type="text" placeholder='Enter your username' className='w-full input input-bordered h-10 opacity-50 text-black' />
                    </div>
                    <div className='text-gray-300'>
                        <label htmlFor="password" className='label p-2'>
                            <span className='text-base'>Password</span>
                        </label>
                        <input onChange={passwordChangeHandler} value={password} type="password" placeholder='Enter your password' className='w-full input input-bordered h-10 opacity-50 text-black' />
                    </div>
                    <div className='pt-4'>
                        <span className='mr-2'>{"Don't"} have an account yet?</span>

                        <Link to={'/signup'} className='hover:text-blue-700'>Sign Up Here</Link>
                    </div>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;