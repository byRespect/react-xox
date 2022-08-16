import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CopyIcon, Spinner } from "../assets/icons";
import { ClearGameBoard } from "../redux/slices/appSlice";
import { toast } from "react-toastify";

function SpinnerComp({ invite }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearGameBoard());
  }, []);

  const fncCopyInvite = () => {
    navigator.clipboard.writeText(invite);
    toast.info("Invite code copied");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="m-auto flex flex-col items-center">
        <Spinner />
        <p className="text-[#DCD7C9] text-lg mt-5">Waiting Player</p>
        <div className="flex items-center mt-5 bg-gray-700 border border-gray-600 rounded-lg">
          <button
            onClick={fncCopyInvite}
            className="text-gray-400 bg-gray-600 border border-gray-600 w-full h-full p-2 rounded-r-none rounded-lg hover:bg-gray-700"
          >
            <CopyIcon className="w-5 h-5" />
          </button>

          <input
            className="p-2 text-gray-400 bg-transparent text-center"
            type={"text"}
            value={invite}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default SpinnerComp;
