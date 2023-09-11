'use client'
import {Room} from '@/components/Room'
import { RoomProvider } from '@/contexts/RoomContext'
import Image from 'next/image'

export default function Home() {
  return (
   <div className='w-full h-screen mx-auto flex items-center justify-center'>
       <Room/>
   </div>
  )
}
