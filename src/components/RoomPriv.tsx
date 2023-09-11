import { RoomContext } from "@/contexts/RoomContext"
import {useContext, useEffect} from 'react'
import YouTube from 'react-youtube'
export const RoomPriv = () => {
    const roomCtx = useContext(RoomContext)

    useEffect(()=>{
       let player

        function  onYoutubeIframeAPIReady() {
            console.log('api is loaded')

        }

    },[])
    useEffect(()=>{

    }, [roomCtx])



    return (
        <div>
            <div className="flex flex-col gap-2 justify-center">
                <h1 className="text-center">ID DO VIDEO</h1>
                <input 
                    type="text" 
                    value={roomCtx?.urlVideo} 
                    onChange={(e) => roomCtx?.setUrlVideo(e.target.value)}
                    placeholder="Digite a URL do vídeo"
                    className=" px-2 bg-transparent text-white border rounded-md border-white"
                />
                <button className="bg-white px-2 rounded-md text-black font-bold">Buscar</button>
            </div>
            <div id="player" className="w-full">
                {roomCtx?.urlVideo && (
                    <YouTube className="w-auto" videoId={roomCtx?.urlVideo}/>
                )}
                
            </div>
            <h1 className="fixed top-3 left-3">ID DA SALA: {roomCtx?.docRef}</h1>
        </div>
    )
}