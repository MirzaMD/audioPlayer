import { Dispatch,SetStateAction } from "react";
interface SearchBarProps {
    searched: string;
    setSearched: Dispatch<SetStateAction<string>>;
  }
export function SearchBar({searched,setSearched}:SearchBarProps):JSX.Element{
   function handleChange(e:React.ChangeEvent<HTMLInputElement>):void{
    setSearched(e.target.value)
   }
    return (
        <input type="text" 
        value={searched}
        onChange={handleChange}
        className={` w-[80%] h-6 border-2 border-[#eec0c8] text-[#eec0c8]
            rounded-md mt-4`}
        placeholder="search for the song" />
    )
}