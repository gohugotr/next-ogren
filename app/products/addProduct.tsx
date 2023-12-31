'use client'

import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

export default function AddProduct() {
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [isMutating, setisMutating] = useState(false)

  const router = useRouter()

  function handleChange() {
    setModal(!modal)
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault() // Sayfa yenilenmesin diye

    try {
      
      if (title === '' || price === '') return
        
      setisMutating(true)
      
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          price: price,
        }),
      })

      setisMutating(false)

      // Formu Temizle
      setTitle('')
      setPrice('')
      //Sayfayı yenile. Şu şekilde olmalı import { useRouter } from "next/navigation"
      router.refresh()
      setModal(false) // Formu Kapat
    } catch (error) {
      throw new Error('Ürün eklenemedi.')
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => handleChange()}
        className='p-2 text-white capitalize rounded-lg w-36 bg-zinc-500 hover:bg-zinc-300 hover:text-zinc-600'
      >
        Yeni Ürün
      </button>
      <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Yeni Ürün Ekle</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='font-bold label'>Ürün Adı</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full input input-bordered'
                placeholder='Ürün Adı'
              />
            </div>
            <div className='form-control'>
              <label className='font-bold label'>Fiyat</label>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='w-full input input-bordered'
                placeholder='Fiyat'
              />
            </div>
            <div className='modal-action'>
              <button type='button' onClick={() => handleChange()} className='btn'>
                Kapat
              </button>
              {!isMutating ? (
                <button type='submit' className='btn btn-primary'>
                  Kaydet
                </button>
              ) : (
                <button type='button' className='btn loading'>
                  Kaydediliyor ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
