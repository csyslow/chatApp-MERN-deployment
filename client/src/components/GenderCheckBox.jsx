import React from 'react';

const GenderCheckBox = ({ currentGender, onGenderChange }) => {
    return (
        <div className='flex p-1 mt-3'>
            <div className='form-control'>
                <label htmlFor="male-check" className='label gap-2 cursor-pointer'>
                    <span>Male</span>
                    <input type="checkbox" name=""
                        onChange={()=> {onGenderChange('male')}}
                        checked={currentGender === 'male'}
                        id="male-check" className='checkbox border-gray-300' />
                </label>
            </div>
            <div>
                <label htmlFor="female-check" className='label gap-2 cursor-pointer'>
                    <span>Female</span>
                    <input type="checkbox" name=""
                        onChange={() => {onGenderChange('female')}}
                        checked={currentGender === 'female'}
                        id="female-check" className='checkbox border-gray-300' />
                </label>
            </div>
        </div>
    );
};

export default GenderCheckBox;