import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerComp from "../components/spinnerComp";
import GameContent from "../components/Game/gameContent";
import GameHeader from "../components/Game/gameHeader";
import GameWinner from "../components/Game/gameWinner";
import {
  SetGameBoard,
  SetSeq,
  SetTeam,
  SetWinner,
} from "../redux/slices/appSlice";

import { toast } from "react-toastify";
import GameProgress from "../components/Game/gameProgress";

function RoomPage() {
  const [count, setCount] = useState(0);
  const { socket, winner, seq } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const invite = location.state;

  useEffect(() => {
    if (!invite) {
      toast.info("Invalid invite code");
      navigate("/", { replace: true });
    }

    socket.emit("count", { room: invite });

    socket.on("count", ({ count }) => {
      dispatch(SetWinner(""));
      setCount(count);
    });

    socket.on("status", ({ success, winner }) => {
      if (success) {
        dispatch(SetWinner(winner));
      }
    });

    socket.on("restart", ({ success }) => {
      if (success) {
        dispatch(SetWinner(""));
        socket.emit("info", invite);
        toast.info("Game restarted");
      }
    });

    socket.on("info", ({ team, seq, gameBoard }) => {
      dispatch(SetTeam(team));
      dispatch(SetSeq(seq));
      dispatch(SetGameBoard(gameBoard));
    });

    socket.on("click", ({ success, gameBoard }) => {
      if (success) {
        dispatch(SetGameBoard(gameBoard));
      }
    });

    return () => {
      socket.off("count");
      socket.off("status");
      socket.off("restart");
      socket.off("info");
      socket.off("click");
    };
  }, []);

  if (count !== 2) {
    return <SpinnerComp invite={invite} />;
  } else {
    return (
      <>
        {winner.length > 0 && <GameWinner />}
        <div className="m-auto w-11/12 sm:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-7/12">
          <div
            className={`flex flex-col w-full border-gray-600 border rounded-lg ${
              seq ? "rounded-b-none" : null
            }`}
          >
            <GameHeader />
            <div className="p-5">
              <GameContent />
            </div>
          </div>
          <GameProgress />
        </div>
      </>
    );
  }
}

export default RoomPage;
