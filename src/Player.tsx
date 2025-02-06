import { Dispatch, SetStateAction } from "react"
import { FaPlay, FaPause,FaForward, FaBackward } from "react-icons/fa"
export function Player({handleRangeChange,duration,currentTime,
  photo,clock,progress,songName,singer,playAndPause,isPlaying,nextSong,previousSong,setShowPlayer}
  :{handleRangeChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,duration:number,currentTime:number,photo:string,clock:string
    ,progress:number,songName:string,singer:string,playAndPause:()=>void,isPlaying:boolean,nextSong:()=>void,previousSong:()=>void
    ,setShowPlayer:Dispatch<SetStateAction<boolean>>
  }):JSX.Element{
    function resetPlayer():void{
      setShowPlayer(false);
    }
 return(
  <section className="
  flex flex-col w-full min-h-screen
  justify-center items-center "
  onDoubleClick={resetPlayer}>
<div>
 <img src={photo} alt="song cover"
 className=" h-[250px] sm:h-[450px] rounded-4xl"/>
 <h1 className="text-[#eec0c8] text-center mt-2 font-extrabold font-serif">
  {songName}</h1>
  <div className="w-full flex justify-center gap-x-[60%] sm:gap-x-[70%] text-[#eec0c8]
  font-mono">
    <h1 className="text-left">{clock}</h1>
    <h1 className="text-right font-serif">{singer}</h1>
  </div>
<input type="range"
min={0}
max={duration}
onChange={handleRangeChange}
value={currentTime}
className={`accent-[#eec0c8] w-[95%] cursor-pointer`}
style={{background:`linear-gradient(to right, #eec0c8 ${progress}%,gray ${progress}%)`}}/>

<div className={` w-full flex justify-evenly items-center text-[#eec0c8]`}>
<FaBackward onClick={previousSong}/>
{isPlaying?<FaPause onClick={playAndPause}/>:<FaPlay onClick={playAndPause}/>}
<FaForward onClick={nextSong}/>
</div> 
</div>
  </section>
 )
}