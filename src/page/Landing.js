import React, { useEffect, useState } from 'react';
import Navbar, { SideBar } from '../component/Navbar';
import axios from 'axios';
import { baseURL } from '../api';
import Card from '../component/Card';
import Modal from 'react-modal';
import Popup from '../component/Popup';

export default function Landing() {
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState('');
  const [genre, setGenre] = useState([]);
  const [sort, setSort] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);



  const handleSearch = (searchTerm) => {
    setTerm(searchTerm);
  }
  const handleGenre = (selectedGenre) => {
    setGenre(selectedGenre);
  }
  const handleSort = (event) => {
    const {value, checked} = event.target;
    if(checked){
      setSort(value);
    } else{
      setSort('');
    }
  }


  useEffect(() => {
    let temp = "";
    const delayDebounceFn = setTimeout(() => {
      if(genre.length >= 0){
        genre.map((item) => (
          temp = temp + "&genre_id[]=" + item
        ))
      }
      const basicURL = baseURL + "book?term=" + term + "&sort="+sort + temp;
      axios.get(basicURL).then(res => {
        setBooks(res.data.data);
      });
      console.log(basicURL);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [term, genre,sort]);


  
  console.log(books)
  return (
    <>
    <div className=''>
      <Modal         
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form Modal">
          <h1 className=' font-bold'>Adding a New Book</h1>
          <Popup />
      </Modal>
      <Navbar onSearch={handleSearch}/>
      <div className='px-5 py-3 flex'>
        <div className=' flex-none mr-4 '>
          <div onClick={openModal} 
            className=' bg-gray-600 text-white text-center max-w-28 px-3 py-2 rounded-md mb-2 cursor-pointer select-none'>new book</div>
          <div className='h-0.5  bg-gray-400 max-w-40 mb-4'></div>
          <SideBar onFilter={handleGenre}/>
        </div>
        <div className=' bg-white rounded-md p-3 drop-shadow-sm flex-1'>
          <div className=' flex'>
            <div className=' flex-1'></div>
            <label className="inline-flex items-center cursor-pointer flex-none">
              <span className="ms-3 text-sm font-medium mr-3 text-gray-900 dark:text-gray-900 select-none">Sort by Date Published</span>
              <input type="checkbox" 
                    value="asc" 
                    className="sr-only peer" 
                    onChange={handleSort}/>
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex flex-wrap mt-2 justify-center">
            {books.map((item, index) => (
              <Card key={item.id} data={item}/>
            ))}
          </div>
        </div>
        <div className=' bg-white rounded-md ml-2 drop-shadow-sm flex-none'>

        </div>
      </div>
    </div>
    </>
  )
}
