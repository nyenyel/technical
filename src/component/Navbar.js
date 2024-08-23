import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../api';

export default function Navbar({onSearch}) {
  return (
    <>
    <div className='p-3 px-5 flex '>
      <div className=' flex-none p-4 mr-2 rounded-md font-bold text-white bg-gray-600'>TA</div>
      <div className=' flex flex-col  text-lg font-bold text-[#212121]'>
        <div className=' flex-none  '>
          Technical 
        </div>
        <div className=' flex-none '>
          Assesment  
        </div>
      </div>
      <div className='flex-1'></div>
      <input 
          className='flex-1 border border-gray-500 rounded-full pl-4 p-2' 
          placeholder='Search by Title or Author'
          onChange={(e) => onSearch(e.target.value)}/>
    </div>
    </>
  )
}


export function SideBar({ onFilter }) {
  const [data, setData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    axios.get(baseURL + "genre").then(res => {
      setData(res.data.data);
    });
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedGenres;

    if (checked) {
      updatedGenres = [...selectedGenres, value];
    } else {
      updatedGenres = selectedGenres.filter(genre => genre !== value);
    }

    setSelectedGenres(updatedGenres);
    onFilter(updatedGenres); // Pass the selected genres to the parent component
  };

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <label>
            <input
              className='mr-2'
              type='checkbox'
              name='genre'
              value={item.id}
              onChange={handleCheckboxChange}
            />
            {item.desc}
          </label>
        </div>
      ))}
    </>
  );
}