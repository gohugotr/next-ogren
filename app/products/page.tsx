import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"

type Product = {
    id: number,
    title: string,
    price: number,
}

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
    <div className='p-10'>
      <div className='py-2'>
        <AddProduct />
      </div>
      <table className='table w-full text-base'>
        <thead className='text-base'>
          <tr>
            <td>ID</td>
            <td>Ürün</td>
            <td>Fiyat</td>
            <td className='pl-16'>İşlemler</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <div className='flex'>
                  <UpdateProduct {...product} />
                  <DeleteProduct {...product} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
