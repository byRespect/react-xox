import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  SetGameBoard,
  SetSeq,
  SetTeam,
  SetWinner,
} from "../redux/slices/appSlice";
import GameBox from "./Game2/gameBox";

function Game() {
  const location = useLocation();
  const invite = location.state;
  const { gameBoard, socket } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("status", ({ success, winner }) => {
      if (success) {
        dispatch(SetWinner(winner));
      }
    });

    socket.on("restart", ({ success }) => {
      if (success) {
        dispatch(SetWinner(""));
        socket.emit("info", invite);
      }
    });

    socket.on("info", ({ team, seq, gameBoard }) => {
      dispatch(SetTeam(team));
      dispatch(SetSeq(seq));
      dispatch(SetGameBoard(gameBoard));
    });

    socket.on("seq", (seq) => {
      dispatch(SetSeq(seq));
    });

    socket.on("click", ({ success, gameBoard }) => {
      if (success) {
        dispatch(SetGameBoard(gameBoard));
      }
    });

    return () => {
      socket.off("click");
      socket.off("restart");
      socket.off("seq");
      socket.off("info");
    };
  });

  return (
    <div className="flex flex-col">
      <div className="flex mb-5 gap-24">
        {gameBoard[0].map((item, index) => (
          <GameBox row={0} item={item} key={index} index={index} />
        ))}
      </div>
      <div className="flex mb-5 gap-24">
        {gameBoard[1].map((item, index) => (
          <GameBox row={1} item={item} key={index} index={index} />
        ))}
      </div>
      <div className="flex mb-5 gap-24">
        {gameBoard[2].map((item, index) => (
          <GameBox row={2} item={item} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Game;
