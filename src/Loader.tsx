import { FaRecordVinyl } from "react-icons/fa"
export function Loader({updateShowPlayer,isPlaying}:{updateShowPlayer:()=>void,isPlaying:boolean}):JSX.Element{
  const details:React.CSSProperties={
    background:"radial-gradient(red,red,green)",
    boxShadow:"1px 2px 5px red"
  }  
  return(
        <div className="w-full">
      <FaRecordVinyl 
      onClick={updateShowPlayer}
      className={`fixed top-[85%] sm:top-5 ml-2 text-4xl sm:text-6xl text-gray-800 ${isPlaying?`animate-spin`:`animate-none`} rounded-full`}
      style={details}/>
        </div>
    )
}