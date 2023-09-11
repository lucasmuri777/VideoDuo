'use client'
import { db } from '@/app/api/services/firebaseConection';
import { doc, updateDoc } from 'firebase/firestore';
import {createContext, useState, useEffect} from 'react'

type RoomContextType = {
    docRef: string;
    setDocRef: React.Dispatch<React.SetStateAction<string>>;
    id: number;
    setId: React.Dispatch<React.SetStateAction<number>>;
    urlVideo: string;
    setUrlVideo: React.Dispatch<React.SetStateAction<string>>;
    videoStatus: string;
    setVideoStatus: React.Dispatch<React.SetStateAction<'stop' | 'play'>>;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider = ({children}: {children: React.ReactNode}) =>{
    const [id, setId] = useState(0);
    const [urlVideo, setUrlVideo] = useState('');
    const [videoStatus, setVideoStatus] = useState<'stop' | 'play'>('stop');
    const [docRef, setDocRef] = useState('');

    async function attIdVideoYoutube(){
        const roomRef = doc(db, 'rooms', docRef);

        try{
            await updateDoc(roomRef, {
                urlVideo
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        attIdVideoYoutube()
    }, [urlVideo, setUrlVideo])

    return (
        <RoomContext.Provider value={{docRef, setDocRef,id, setId, urlVideo, setUrlVideo, videoStatus, setVideoStatus}}>
            {children}
        </RoomContext.Provider>
    )
}