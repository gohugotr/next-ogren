'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Product = {
  id: number
  title: string
  price: number
}

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false)

  const [isMutating, setisMutating] = useState(false)

  const router = useRouter()

  function handleChange() {
    setModal(!modal)
  }

  async function handleDelete(productId:number) {
    try {
      setisMutating(true)

      await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
      })

      setisMutating(false)

      // Formu Temizle
      
      //Sayfayı yenile. Şu şekilde olmalı import { useRouter } from "next/navigation"
      router.refresh()
      setModal(false) // Formu Kapat
    } catch (error) {
      throw new Error('Ürün slinemedi.')
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => handleChange()}
        className='w-20 text-white capitalize btn-error btn-sm btn'
      >
        Sil
      </button>
      <input type='checkbox' checked={modal} onChange={handleChange} className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>
            {`"${product.title}"`} ürününü silmek istediğinize emin misiniz?
          </h3>
          <div className='modal-action'>
            <button
              type='button'
              onClick={() => handleChange()}
              className='text-white capitalize btn bg-zinc-500'
            >
              Kapat
            </button>
            {!isMutating ? (
              <button
                type='button'
                onClick={() => handleDelete(product.id)}
                className='text-white capitalize btn btn-error'
              >
                Sil
              </button>
            ) : (
              <button type='button' className='btn loading'>
                Siliniyor ...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
