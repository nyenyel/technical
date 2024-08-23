// Card.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { UpdatePopup } from './Popup';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Card({ data }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Form Modal"
            >
                <h1 className='font-bold'>Updating a Book</h1>
                <UpdatePopup data={data} closeModal={closeModal} />
            </Modal>
            <div
                onClick={openModal}
                className='mb-2 text-gray-900 bg-white border-2 border-gray-900 flex-1 mr-2 rounded-md max-w-52 min-w-52 max-h-96 hover:scale-105 cursor-pointer'
            >
                <img
                    src={require('../resource/hehe.png')}
                    alt='img'
                    className='w-40 h-auto mt-2'
                />
                <div className='p-3'>
                    <div className='h-0.5 bg-gray-500 w-auto'></div>
                    <div className='font-bold text-xl'>
                        {data.title} ({data.genre.desc})
                    </div>
                    <div className='font-regular text-sm'>{data.author}</div>
                    <div className='font-regular text-sm'>{data.date_publish}</div>
                    <div className='mt-2 font-regular text-sm'>ISBN:</div>
                    <div className='text-center text-xl font-bold'>{data.isbn}</div>
                    <div className='font-regular text-sm'></div>
                </div>
            </div>
        </>
    );
}
