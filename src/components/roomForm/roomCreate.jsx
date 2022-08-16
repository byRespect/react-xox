import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SetSeq, SetTeam } from "../../redux/slices/appSlice";

function RoomCreateComp() {
  const { socket } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("create", (result) => {
      if (result.success) {
        dispatch(SetTeam(result.team));
        dispatch(SetSeq(result.seq));
        toast.success(result.response);
        navigate(`/${result.roomId}`, {
          state: result.roomId,
        });
      }
    });
    return () => {
      socket.off("create");
    };
  }, []);

  const fncCreateRoom = () => {
    socket.emit("create");
  };

  return (
    <button
      onClick={fncCreateRoom}
      type="button"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Create a new room
    </button>
  );
}

export default RoomCreateComp;
