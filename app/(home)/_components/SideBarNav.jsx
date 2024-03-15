"use client"

import { Search, Mail, Layers3, Shield} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

function SideBarNav() {
  const pathName=usePathname();
  console.log(pathName);
    const menuList =[
        {
          id:1,
          name:'Browze',
          icon:Search,
          path:'/browse',
        },
        {
          id:2,
          name:'Dashboard',
          icon:Layers3,
          path:'/dashboard',
        },
        {
          id:3,
          name:'Upgrade',
          icon:Shield,
          path:'/upgrade',
        },
        {
          id:4,
          name:'Newsletter',
          icon:Mail,
          path:'/newsletter',
        },
      ]
      const [activeIndex,setActiveIndex]=useState(0);
  return (
    <div className='h-full bg-white border-r flex flex-col overflow-y-auto shadow-md'>
        <div className='p-5 border-b'>
        <Image src='/logo.svg'
        alt='logo'
        width={170}
        height={100}
        />
        </div>
        <div className='flex flex-col'>
            {menuList.map((item,index)=>(
                <div className={`flex gap-2 item-center p-4 px-6 text-gray-500 hover:bg-gray-200 cursor-pointer
                ${pathName==item.path?'bg-purple-100 text-purple-800':null}`}
                onClick={()=>setActiveIndex(index)}>
                    <item.icon/>
                  <h2>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>

  )
}

export default SideBarNav;