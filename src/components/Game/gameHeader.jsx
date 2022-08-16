import { useSelector } from "react-redux";
import { OIcon, XIcon } from "../../assets/icons";

function GameHeader() {
  const { team } = useSelector((state) => state.app);
  return (
    <div className="flex flex-row justify-between bg-gray-700">
      <div className="flex justify-center items-center rounded-full border-gray-600 border m-3 p-2 bg-gray-800 text-gray-400 text-center text-xs">
        {team === "x" ? (
          <XIcon className="mr-2 w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
        ) : (
          <OIcon className="mr-2 w-4 h-4 2xl:w-5 2xl:h-5" />
        )}
        <a className="select-none 2xl:text-lg">Me</a>
      </div>
      <div className="flex justify-center items-center rounded-full border-gray-600 border m-3 p-2 bg-gray-800 text-gray-400  text-center text-xs">
        {team === "x" ? (
          <OIcon className="mr-2 w-4 h-4 2xl:w-5 2xl:h-5" />
        ) : (
          <XIcon className="mr-2 w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
        )}
        <a className="select-none 2xl:text-lg">Player</a>
      </div>
    </div>
  );
}
export default GameHeader;
