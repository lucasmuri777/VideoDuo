import { RoomContext } from "@/contexts/RoomContext"
import {useContext, useEffect} from 'react'
import { Form } from "./Form"
import { collection, where, query, onSnapshot } from "firebase/firestore"
import { db } from "@/app/api/services/firebaseConection"
import {useState} from 'react'
import { RoomPriv } from "./RoomPriv"

type Room = {
    docRef: string;
    id: number;
    urlVideo: string;
    videoStatus: string;
}
export const Room = () =>{
    const [room, setRoom] = useState<Room | null>(null)
    const roomCtx = useContext(RoomContext)
    useEffect(()=>{
        console.log(roomCtx)
        const local = localStorage.getItem('room')
        const id = localStorage.getItem('id')
        if(local && id){
            roomCtx?.setDocRef(local)
            roomCtx?.setId(Number(id))
        }else{
            localStorage.setItem('room', String(roomCtx?.docRef))
            localStorage.setItem('id', String(roomCtx?.id))
        }

        const roomBusca = collection(db, 'rooms')
        const q = query(
            roomBusca,
            where('id', '==', roomCtx?.id)
        )
        onSnapshot(q, (snapshot) =>{
            let lista: Room[] = []
            snapshot.forEach((doc) =>{
                lista.push({
                    docRef: doc.id,
                    id: doc.data().id,
                    urlVideo: doc.data().urlVideo,
                    videoStatus: doc.data().videoStatus
                })
            })
            setRoom(lista[0])
        })
        
    },[roomCtx])

    useEffect(()=>{
        if(room === undefined){
            localStorage.removeItem('room')
            roomCtx?.setId(0)
            return
        }           
    },[room])

    
    if(roomCtx?.id == 0){
        return(
            <Form/>
        )
    }

    
    return(
        <div>
            <RoomPriv/>
        </div>

    )
} 