'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, SVGProps } from 'react';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Hide on homepage
  if (pathname === '/') return null;

  const pathArray = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    const name = decodeURIComponent(seg).replace(/-/g, ' ').replace(/:/g, '');
    return { name: name, href };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-[#b4b6be]" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-black dark:hover:text-white flex items-center gap-1">
        <HomeSvg/>
        <span>Home</span>
      </Link>
      {pathArray.map((segment, i) => (
        <span key={i} className="flex items-center gap-2">
          <span><RightArrow/></span>
          {i === pathArray.length - 1 ? (
            <span className="text-gray-950 dark:text-gray-50">{segment.name}</span>
          ) : (
            <Link href={segment.href} className="hover:text-black dark:hover:text-white transition-all duration-200 ease-in-out">
              {segment.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

function HomeSvg(){
  return (
    <main className="">
      <svg
        className="fill-[#17181C] dark:fill-[#F4F9FD]"
        xmlns="http://www.w3.org/2000/svg"
        width="15px"
        height="15px"
        viewBox="0 0 52 52"
        enableBackground="new 0 0 52 52"
        xmlSpace="preserve"
      >
        <g>
          <path d="M49,27h-5v22c0,0.6-0.4,1-1,1H33c-0.6,0-1-0.4-1-1V32H20v17c0,0.6-0.4,1-1,1H9c-0.6,0-1-0.4-1-1V27H3 c-0.4,0-0.8-0.2-0.9-0.6C1.9,26,2,25.6,2.3,25.3l23-23c0.4-0.4,1.1-0.4,1.4,0l23,23c0.3,0.3,0.3,0.7,0.2,1.1S49.4,27,49,27z" />
        </g>
      </svg>
    </main>
  )
}

const RightArrow = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="15px"
    height="13px"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-[#000000] dark:stroke-[#cfd0d6]"
    {...props}
  >
    <path d="M5 14L12 7.5L5 1" strokeLinecap="square" />
  </svg>
);

