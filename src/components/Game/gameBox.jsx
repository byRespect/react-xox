import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { OIcon, XIcon } from "../../assets/icons";
import { toast } from "react-toastify";

function GameBox({ item, row, index }) {
  const location = useLocation();
  const invite = location.state;
  const { team, socket, gameBoard } = useSelector((state) => state.app);
  const [over, setOver] = useState(false);
  const fncMouseOver = () => {
    setOver(true);
  };
  const fncMouseLeave = () => {
    setOver(false);
  };
  const fncOnClick = () => {
    if (gameBoard[row][index] === "") {
      socket.emit("click", { room: invite, team, row, index });
    } else {
      toast.info("Currenlty selected");
    }
  };
  return (
    <div
      className="flex justify-center w-16 h-16 lg:w-24 lg:h-24 2xl:w-40 2xl:h-40"
      onClick={fncOnClick}
      onMouseOver={fncMouseOver}
      onMouseLeave={fncMouseLeave}
    >
      <div className="m-auto">
        {item === "o" ? (
          <OIcon className="text-white w-12 h-12 lg:w-20 lg:h-20 2xl:w-36 2xl:h-36" />
        ) : item === "x" ? (
          <XIcon className="text-white w-12 h-12 lg:w-20 lg:h-20 2xl:w-36 2xl:h-36" />
        ) : null}
        {item === "" && over ? (
          team === "o" ? (
            <OIcon className="text-gray-600 w-12 h-12 lg:w-20 lg:h-20 2xl:w-36 2xl:h-36" />
          ) : (
            <XIcon className="text-gray-600 w-12 h-12 lg:w-20 lg:h-20 2xl:w-36 2xl:h-36" />
          )
        ) : null}
      </div>
    </div>
  );
}

export default GameBox;
