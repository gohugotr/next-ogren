"use client"

import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

export default function AddProduct() {
    
    const [modal, setModal] = useState(false)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const router = useRouter()
    
    function handleChange(){
        setModal(!modal)
    }
    
    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault() // Sayfa yenilenmesin diye
        try {
            if(title === '' || price === '') return 
            
            await fetch('http://localhost:5000/products',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    price: price
                })   
            })
            // Formu Temizle
            setTitle('')
            setPrice('')
            //Sayfayı yenile. Şu şekilde olmalı import { useRouter } from "next/navigation"
            router.refresh()
            setModal(false) // Formu Kapat
        } catch (error) {
            throw new Error("Ürün eklenemedi.")
        }
    }

  return (
    <>
    <button type="button" onClick={()=> handleChange()} className="btn">Add New</button>
    <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
    <div className='modal'>
        <div className="modal-box">
            <h3 className="text-lg font-bold">Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="font-bold label">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full input input-bordered" placeholder="Product Name"/>
                </div>               
                <div className="form-control">
                    <label className="font-bold label">Price</label>
                    <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full input input-bordered" placeholder="Price" />
                </div>
                <div className="modal-action">
                    <button type="button" onClick={()=>handleChange()} className="btn">Close</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
