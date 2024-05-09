import React, { useState } from 'react';
import GenderCheckBox from '../../components/GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp'

const SignUp = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        gender: 'male',
        password: '',
        confirmedPassword: ''
    });

    const {loading, sendSignUpReq} = useSignUp();


    const fullNameChangeHandler = (e) => {
        setInputs(prev => ({ ...prev, fullName: e.target.value }));
    };

    const usernameChangeHandler = (e) => {
        setInputs(prev => ({ ...prev, username: e.target.value }));
    };

    const passwordChangeHandler = (e) => {
        setInputs(prev => ({ ...prev, password: e.target.value }));
    };
    const confirmedPasswordChangeHandler = (e) => {
        setInputs(prev => ({ ...prev, confirmedPassword: e.target.value }));
    };

    const genderChangeHandler = (gender) => {
        setInputs(prev => ({...prev, gender}));
    };

    const submitSignUpHandler = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendSignUpReq(inputs)
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter 
            backdrop-blur-lg bg-opacity-10 rounded-3xl'>
                <h1 className='text-center text-3xl text-gray-300 font-semibold h-full w-full bg-brown-300 rounded-md bg-clip-padding'>
                    <span className='text-pink-400 mr-2'>ChatApp</span>
                    <span>Sign Up</span>
                </h1>

                <form onSubmit={submitSignUpHandler} className='text-gray-300'>
                    <div className='text-gray-300'>
                        <label htmlFor="fullname" className='label p-2'>
                            <span className='text-base'>Full Name</span>
                        </label>
                        <input onChange={fullNameChangeHandler} value={inputs.fullName}
                            id='fullname' type="text" placeholder='Enter your full name' className='w-full input input-bordered h-10 opacity-50 text-gray-900' />
                    </div>
                    <div className='text-gray-300'>
                        <label htmlFor="username" className='label p-2'>
                            <span className='text-base'>Username</span>
                        </label>
                        <input onChange={usernameChangeHandler} value={inputs.username}
                        id='username' type="text" placeholder='Enter your username' className='w-full input input-bordered h-10 opacity-50 text-gray-900' />
                    </div>

                    {/* Gender checkbok */}
                    <GenderCheckBox currentGender={inputs.gender} onGenderChange={genderChangeHandler}/>

                    <div className='text-gray-300'>
                        <label htmlFor="password" className='label p-2'>
                            <span className='text-base'>Password</span>
                        </label>
                        <input onChange={passwordChangeHandler} value={inputs.password}
                        type="password" placeholder='Enter your password' className='w-full input input-bordered h-10 opacity-50 text-gray-900' />
                    </div>
                    <div className='text-gray-300'>
                        <label htmlFor="password" className='label p-2'>
                            <span className='text-base'>Confirm Password</span>
                        </label>
                        <input onChange={confirmedPasswordChangeHandler} value={inputs.confirmedPassword}
                        type="password" placeholder='Confirm your password' className='w-full input input-bordered h-10 opacity-50 text-gray-900' />
                    </div>
                    <div className='pt-4'>
                        <span className='mr-2'>Already have an account?</span>
                        <Link to={'/login'} className='hover:text-blue-700'>Login Here</Link>
                    </div>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;