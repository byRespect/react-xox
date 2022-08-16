import RoomCreateComp from "../components/roomForm/roomCreate";
import RoomJoinComp from "../components/roomForm/roomJoin";

function RoomForm() {
  return (
    <div className="m-auto border border-gray-600 rounded-lg w-11/12 lg:w-6/12 xl:w-5/12">
      <div className="bg-gray-700 p-2">
        <div className="flex justify-center">
          <div className="m-auto">
            <a className="text-gray-50 font-bold text-2xl">Online XOX Game</a>
          </div>
        </div>
      </div>
      <div className="p-10 mb-3 w-full">
        <RoomJoinComp />
        <div className="flex items-center">
          <hr className="w-full border-gray-400" />
          <a className="mr-3 ml-3 text-sm text-gray-400">OR</a>
          <hr className="w-full border-gray-400" />
        </div>
        <RoomCreateComp />
      </div>
    </div>
  );
}

export default RoomForm;
