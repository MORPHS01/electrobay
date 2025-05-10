import Link from 'next/link'
import ElectrobayIcon from '@/public/logo/electrobay-icon'

function NotFound() {
  return (
    <main className="text-center py-[20px]">
      <h1 className="text-6xl font-bold flex items-center justify-center">4<ElectrobayIcon className="w-[50px]"/>4</h1>
      <h1 className="text-4xl font-bold text-[#4893D9]">Page Not Found</h1>
      <p className="mt-4 text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 text-[#4893D9] hover:underline">Go back to home</Link>
    </main>
  )
}

export default NotFound