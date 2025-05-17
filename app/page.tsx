"use client"
import Image from "next/image";
import data from "@/data/products.json";
import Icon from "@/public/svg/svgicons";

export default function Home() {

  const result = data.find(item => item.productId.toLowerCase().includes("p0001"))

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Image src="/images/hero-image.jpg" alt="hero-image" width={1000} height={1000} className="w-full h-screen"/>
    

      <p>{result?.productName}</p>
      <p>{data.reduce((sum, item) => sum + item.productPrice , 0).toLocaleString()}</p>



      <h1 className="text-4xl font-bold">Welcome to ElectroBay</h1>
      <Icon name="heart" onClick={() => {}}/>
      <Icon name="user"/>
      <Icon name="cart"/>

      <p className="mt-4 text-lg">
        Your Bay for Breakthrough Tech
      </p>
      <Image
        src="/logo/electrobay-light.png"
        alt="ElectroBay Logo"
        width={300}
        height={300}
        className="mt-8"
      />

      <div className="flex flex-wrap gap-6">
        {data.map((product) =>
          <div key={product.productId} className="flex flex-col gap-4">
            <Image src={product.productImage} alt={product.productName} width={100} height={100}/>
            <p>{product.productName}</p>
          </div>
        )}
      </div>

      <ul>
        <li>laptops</li>
        <li>smart phones</li>
        <li>smart watches</li>
        <li>tvs</li>
        <li>gaming</li>
        <li>headphones</li>
        <li>computer accessories</li>
        <li>cameras</li>
      </ul>
    </main>
  );
}
