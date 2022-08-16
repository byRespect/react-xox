import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetSeq, SetTeam } from "../../redux/slices/appSlice";
import { toast } from "react-toastify";

function RoomJoinComp() {
  const [invite, setInvite] = useState("");
  const { socket } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinRoom = () => {
    socket.emit("join", invite);
  };

  useEffect(() => {
    socket.on("join", (result) => {
      if (result.success) {
        dispatch(SetTeam(result.team));
        dispatch(SetSeq(result.seq));
        navigate(`/${result.invite}`, {
          state: result.invite,
        });
      } else {
        toast.error(result.response);
      }
    });

    return () => {
      socket.off("join");
    };
  }, []);
  return (
    <>
      <div className="flex flex-col w-full">
        <label className="text-gray-300 font-medium text-sm" htmlFor={"invite"}>
          Invite Code
        </label>
        <input
          onChange={(e) => setInvite(e.target.value)}
          type="text"
          id="invite"
          className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter invite code"
          required
        />
      </div>
      <button
        onClick={joinRoom}
        type="button"
        className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3 mt-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Join in Room
      </button>
    </>
  );
}

export default RoomJoinComp;
