'use client'

import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

type Product = {
  id: number
  title: string
  price: number
}

export default function UpdateProduct(product: Product) {
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [isMutating, setisMutating] = useState(false)

  const router = useRouter()
  

  function handleChange() {
    setModal(!modal)
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault() // Sayfa yenilenmesin diye

    try {
      if (product.title === '' || product.price === null) return

      setisMutating(true)

      await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          price: price,
        }),
      })

      setisMutating(false)

      //Sayfayı yenile. Şu şekilde olmalı import { useRouter } from "next/navigation"
      router.refresh()
      setModal(false) // Formu Kapat
    } catch (error) {
      throw new Error('Ürün güncellenemedi.')
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => handleChange()}
        className='w-20 mr-2 text-white capitalize rounded-lg bg-lime-600 btn-sm btn'
      >
        Güncelle
      </button>
      <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Güncellenen Ürün {`"${product.title}"`}</h3>
          <form onSubmit={(e) => handleUpdate(e)}>
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
                onChange={(e) => setPrice(Number(e.target.value))}
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
                  Güncelle
                </button>
              ) : (
                <button type='button' className='btn loading'>
                  Güncelleniyor ...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
