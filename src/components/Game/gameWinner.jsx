import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  FaceBlankIcon,
  FaceSadIcon,
  FaceSmileIcon,
  Spinner,
} from "../../assets/icons";

function GameWinner() {
  const [ready, setReady] = useState(false);
  const { winner, team, socket } = useSelector((state) => state.app);
  const location = useLocation();
  const invite = location.state;

  useEffect(() => {
    setReady(false);
  }, []);

  const fncReady = () => {
    setReady(true);
    socket.emit("ready", invite);
  };
  return (
    <div className="fixed inset-0 bg-[#11182799] z-50">
      <div className="flex w-full h-full justify-center items-center">
        <div className="m-auto">
          <div className="flex flex-col shadow rounded-lg bg-gray-700 text-center w-96 p-14">
            <div className="m-auto text-gray-200">
              {winner === team ? (
                <FaceSmileIcon className="w-16 h-16" />
              ) : winner === "scoreless" ? (
                <FaceBlankIcon className="w-16 h-16" />
              ) : (
                <FaceSadIcon className="w-16 h-16" />
              )}
            </div>
            <div className="mt-5">
              <p className="text-gray-400 text-center">
                {winner === team
                  ? "Congratulations you won the game"
                  : winner === "scoreless"
                  ? "Game ended in a draw"
                  : "Sorry you lost"}
              </p>
            </div>
            <button
              onClick={fncReady}
              type="submit"
              className={`w-full mt-5 ${
                ready
                  ? "bg-gray-800 hover:bg-gray-700 focus:ring-gray-800 text-gray-400 border-gray-600 hover:text-white"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800  text-white"
              } border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
            >
              {ready ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                  <p>Player waiting</p>
                </div>
              ) : (
                "Be Ready"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameWinner;
