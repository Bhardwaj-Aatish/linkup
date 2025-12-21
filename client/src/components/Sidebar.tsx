import Highlight from "./Highlight";
import Input from "./Input"
import SuggestionBox from "./SuggestionBox"

const SideBar = () => {
    return (
        <div className="hidden md:flex sidebar fixed top-0 right-0 h-screen w-[28%] text-white flex flex-col p-4 gap-5 m-4 overflow-hidden">
            <Input type="text" placeholder="Search the user" classNames="w-full rounded-2xl" />
            <Highlight />
            <SuggestionBox />
        </div>
    )
}

export default SideBar;