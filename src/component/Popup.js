import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { baseURL } from '../api';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Popup() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [libGenre, setLibGenre] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date_publish: '',
    isbn: '',
    genre_id: '' // Ensure this matches the select element's value
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitModal = (e) => {
    e.preventDefault();

    axios.post(baseURL.concat("book"), formData).then(res => {
      // Handle response
      setModalIsOpen(false);
    });
  };

  useEffect(() => {
    const basicURL = baseURL + "genre";
    axios.get(basicURL).then(res => {
      setLibGenre(res.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(formData);

  }, [formData]);

  return (
    <form onSubmit={submitModal}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className='rounded-md border-2 w-full'
        />
      </label><br></br>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className='rounded-md border-2 w-full'
        />
      </label><br></br>
      <label>
        ISBN:
        <input
          type="number"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className='rounded-md border-2 w-full'
        />
      </label><br></br>
      <label>
        Date Publish:
        <input
          type="date"
          name="date_publish"
          value={formData.date_publish}
          onChange={handleChange}
          className='rounded-md border-2 w-full'
        />
      </label><br></br>
      <label>
        Genre:
        <select
          name="genre_id"
          onChange={handleChange}
          className='rounded-md border-2 w-full'
          value={formData.genre_id}
        >
          <option value="">Select a genre</option>
          {libGenre.map((item) => (
            <option 
              value={item.id} 
              key={item.id}
            >
              {item.desc}
            </option>
          ))}
        </select>
      </label><br></br>
      <div className='flex'>
        <div className='flex-1'></div>
        <button className='flex-none mt-5 bg-blue-800 text-white px-5 py-3 rounded-md hover:scale-105' type='submit'>Finish</button>
      </div>
    </form>
  );
}


export function UpdatePopup({ data, closeModal }) {
    const [libGenre, setLibGenre] = useState([]);
    const [formData, setFormData] = useState({
        title: data.title,
        author: data.author,
        date_publish: data.date_publish,
        isbn: data.isbn,
        genre_id: data.genre_id // Assuming `data.genre.id` is the genre ID
    });
    useEffect(() => {
        const basicURL = baseURL + "genre";
        axios.get(basicURL).then(res => {
          setLibGenre(res.data.data);
        });
      }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDelte = (e) => {
        e.preventDefault();
        axios.delete(`${baseURL}book/${data.id}`) // Adjust URL as needed
            .then(res => {
                console.log('Book Deleted:', res.data);
                closeModal();
            })
            .catch(err => {
                console.error('Error updating book:', err);
            });
    };

    const submitModal = (e) => {
        e.preventDefault();
        axios.put(`${baseURL}book/${data.id}`, formData) // Adjust URL as needed
            .then(res => {
                console.log('Book updated:', res.data);
                closeModal();
            })
            .catch(err => {
                console.error('Error updating book:', err);
            });
    };

    return (
        <form onSubmit={submitModal}>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className='rounded-md border-2 w-full'
                />
            </label><br />
            <label>
                Author:
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className='rounded-md border-2 w-full'
                />
            </label><br />
            <label>
                ISBN:
                <input
                    type="number"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className='rounded-md border-2 w-full'
                />
            </label><br />
            <label>
                Date Publish:
                <input
                    type="date"
                    name="date_publish"
                    value={formData.date_publish}
                    onChange={handleChange}
                    className='rounded-md border-2 w-full'
                />
            </label><br />
            <label>
                Genre:
                <select
                    name="genre_id"
                    onChange={handleChange}
                    className='rounded-md border-2 w-full'
                    value={formData.genre_id}
                    defaultValue={formData.genre_id}
                >

                    {libGenre.map((genre) => (
                        <option value={genre.id} key={genre.id}>
                            {genre.desc}
                        </option>
                    ))}
                </select>
            </label><br />
            <div className='flex'>
                <div className='flex-1'></div>
                <button
                    className='flex-none mt-5 mr-3 bg-red-800 text-white px-5 py-3 rounded-md hover:scale-105'
                    onClick={handleDelte}
                >
                    Delete
                </button>
                <button
                    className='flex-none mt-5 bg-blue-800 text-white px-5 py-3 rounded-md hover:scale-105'
                    type='submit'
                >
                    Finish
                </button>


            </div>
        </form>
    );
}