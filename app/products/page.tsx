import AddProduct from "./addProduct"

type Product = {
    id: number,
    title: string,
    price: number,
}
//https://www.youtube.com/watch?v=A4XsMMiNb40 30. dk da kaldım.
async function getProduct() {
    const res = await fetch('http://localhost:5000/products',
        {cache:"no-store"}, // direk yenile
        // {
        //     next:{revalidate: 10} // 10 saniye sonra artımlı yenile
        // }
    )

    return res.json()
}

export default async function ProductList() {
    const products : Product[] = await getProduct()
  return (
    <div className="p-10">
       <div className="py-2"> 
                <AddProduct />
       </div>
                <table className="table w-full text-base">
                    <thead className="text-base">
                        <tr>
                            <td>ID</td>
                            <td>Product</td>
                            <td>Price</td>
                            <td className="pl-16">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                    {  
                      products.map((product, index)=>(
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="flex">
                                    <button className="w-20 p-1 mr-2 text-white rounded-lg bg-lime-600">Ekle</button>
                                    <button className="w-20 p-1 text-white bg-red-600 rounded-lg">Sil</button>
                                    </div> 
                                </td>
                            </tr>
                        )) 
                    }
                    </tbody>
                </table>
    </div>
  )
}
