import { SearchBar } from "./SearchBar";
import { Songs } from "./Songs";
import { useEffect,useRef,useState } from "react";
import { Howl } from "howler";
import "./main.css"
import { Player } from "./Player";
import { Loader } from "./Loader";
export function Home():JSX.Element{
    const [Music,setMusic]=useState(Songs)
    const songRef=useRef<Howl|null>(null)
    const intervalRef=useRef<number | null>(null)
    const[currentIndex,setCurrentIndex]=useState<number>(0)
    const[songSrc,setSongSrc]=useState<string>(Music[currentIndex].song);
    const[duration,setDuration]=useState<number>(0)
    const[secs,setSecs]=useState<number>(0)
    const[mins,setMins]=useState<number>(0)
    const[currentTime,setCurrentTime]=useState<number>(0)
    const[progress,setProgress]=useState<number>(0)
    const[clock,setClock]=useState<string>("0:00")
    const[photo,setPhoto]=useState<string>(Music[currentIndex].cover)
    const[songName,setSongName]=useState<string>(Music[currentIndex].title)
    const[singer,setSinger]=useState<string>(Music[currentIndex].artist)
    const[isplaying,setisPlaying]=useState<boolean>(false)
    const[showPlayer,setShowPlayer]=useState<boolean>(false)
    const[ searched,setSearched]=useState<string>("")
    const[prevIndex,setPrevIndex]=useState<number>(0);


function updateSrc(index: number): void {
    const musicToPlay = Music[index]; 
    if (songRef.current?.playing() && index === prevIndex) return; 
    setSongSrc(musicToPlay.song);
    songRef.current?.play();
    setPhoto(musicToPlay.cover);
    setSongName(musicToPlay.title);
    setSinger(musicToPlay.artist);
    setisPlaying(true);
    setCurrentIndex(index);
    setPrevIndex(index);
}
 

useEffect(()=>{
if(songRef.current){
    songRef.current.stop()
    songRef.current.unload()
}
const newSong=Music[currentIndex]
songRef.current=new Howl({
    src:[newSong.song],
    html5:true,
    preload:true,
    volume:1,
    onload:()=>{
        songRef.current?.play()
        setDuration(songRef.current?.duration() || 0)
    },
    onplay:()=>{
        intervalRef.current=window.setInterval(()=>{
            const seekTime=songRef.current?.seek() || 0
            setCurrentTime(seekTime)
            setProgress(seekTime/(songRef.current?.duration() || 1)*100)
            const minutes=Math.floor(seekTime/60)
            setMins(minutes)
            const seconds=Math.floor(seekTime%60)
            setSecs(seconds);
        })
    },
    onend:()=>{
        nextSong()
    }
})
setSongSrc(newSong.song)
setPhoto(newSong.cover)
setSongName(newSong.title)
setSinger(newSong.artist)
},[currentIndex])  
function handleRangeChange(e:React.ChangeEvent<HTMLInputElement>):void{
    const seekTime=Number(e.target.value)
    setCurrentTime(seekTime)
    if(songRef.current){
        songRef.current.seek(seekTime)
    }
}
useEffect(()=>{
    setClock(`${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`)
    filteringSongs()
},[mins,secs,searched])
function playAndPause():void{
    if(songRef.current?.playing()){
        setisPlaying(false)
        songRef.current.pause();
}
else{
    setisPlaying(true)
    songRef.current?.play()
}
}
function nextSong():void{
    setCurrentIndex((cur)=>(cur+1)%Music.length)
    console.log("next")
}
function previousSong():void{
        setCurrentIndex((cur)=>{
            if(cur==0)
                cur=Music.length-1;
            else
               cur=cur-1
            return cur
        })
        console.log("previous")
}
function updateShowPlayer():void{
    setShowPlayer(true)
}
function filteringSongs():void{
    if(searched.trim()===""){
        setMusic(Songs)
    }
    const searchedSongs=Music.filter(mus=> mus.title.toLowerCase().trim().includes(searched.toLowerCase().trim()))
    if(searchedSongs.length>0){
        setMusic(searchedSongs);
    }
    else{
        setMusic(Songs)
    }
}
return(<section 
className={`h-full w-full flex flex-col 
justify-center items-center
gap-y-4`}>
    {!showPlayer?
    <>
    <Loader updateShowPlayer={updateShowPlayer}
     isPlaying={isplaying}/>
     <SearchBar searched={searched} setSearched={setSearched}/>
   <section className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4`}>
  {Music.map((item,index)=>(
 <div key={index}
  className={`
  flex flex-col gap-y-1 justify-center items-center`}
  onClick={()=>updateSrc(index)}>
   <img src={item.cover} 
   alt="cover"
   className={`w-[100px] sm:w-[300px] rounded-3xl`}/>
   <h1 className={`text-[#eec0c8] font-mono font-extrabold
     text-[0.5rem] sm:text-lg`}>{item.title}</h1>
 </div>
  ))}
  </section>  
  </>
    : <Player 
    handleRangeChange={handleRangeChange} 
    duration={duration} 
    currentTime={currentTime} 
    photo={photo}
    clock={clock}
    progress={progress}
    songName={songName}
    singer={singer}
    playAndPause={playAndPause}
    isPlaying={isplaying}
    nextSong={nextSong}
    previousSong={previousSong}
    setShowPlayer={setShowPlayer}/>}
</section>) 
}