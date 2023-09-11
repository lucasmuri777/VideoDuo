import { db } from '@/app/api/services/firebaseConection'
import { RoomContext } from '@/contexts/RoomContext'
import {doc, setDoc, addDoc, collection, onSnapshot} from 'firebase/firestore'
import { useState, useContext} from 'react'
export const Form = () =>{
    const roomCtx = useContext(RoomContext)
    const [rooms, setRooms] = useState<any[]>([])

    const [entrarId, setEntrarId] = useState('')

    const getRoomsIds = async() =>{
        const rooms = collection(db, 'rooms')
        onSnapshot(rooms, (snapshot) =>{
            let lista: any[] = []
            snapshot.forEach((doc) =>{
                lista.push(doc.id)
            })
            setRooms(lista)
        })
    }
    const handleCreateRoom = async() =>{
        try{
            await addDoc(collection(db, 'rooms'), {
                id: rooms.length + 1,
                urlVideo: '',
                videoStatus: 'stop',
            })
            roomCtx?.setId(rooms.length + 1)
            getRoomsIds()
            console.log(roomCtx)
        }catch(err){
            console.log(err)
        }
        
    }

    const handleSearchRoom = async() =>{
        try{
            const room = await doc(db, 'rooms', entrarId)
            onSnapshot(room, (snapshot) =>{
               if(snapshot.data()){
                   roomCtx?.setDocRef(snapshot.id)
                   roomCtx?.setId(snapshot.data()?.id)
                   roomCtx?.setUrlVideo(snapshot.data()?.urlVideo)
                   roomCtx?.setVideoStatus(snapshot.data()?.videoStatus)
               }else{
                alert('Video não achado')
                setEntrarId('')
               }
            })
            
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="flex flex-col gap-2 justify-center">
            <label>Digite o id da sala:</label>
            <input 
            type="text" 
            placeholder="Digite o id" 
            value={entrarId}
            onChange={(e) => setEntrarId(e.target.value)}
            className="bg-transparent border rounded-md px-2 border-white"/>
            <button onClick={handleSearchRoom} className="text-black font-bold bg-white border rounded-md px-2 border-white">Entrar</button>
            <label>ou crie sua sala</label>
            <button onClick={handleCreateRoom} className="text-black font-bold bg-white border rounded-md px-2 border-white">Crie sua sala</button>
        </div>
    )
}