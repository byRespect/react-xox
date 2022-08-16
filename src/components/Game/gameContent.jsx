import { useSelector } from "react-redux";
import GameBox from "./gameBox";

function GameContent() {
  const { gameBoard } = useSelector((state) => state.app);
  return (
    <>
      <div className="flex justify-around mb-5">
        {gameBoard[0].map((item, index) => (
          <div className="border border-gray-600 rounded-lg p-2" key={index}>
            <GameBox row={0} item={item} key={index} index={index} />
          </div>
        ))}
      </div>
      <div className="flex justify-around mb-5">
        {gameBoard[1].map((item, index) => (
          <div className="border border-gray-600 rounded-lg p-2" key={index}>
            <GameBox row={1} item={item} key={index} index={index} />
          </div>
        ))}
      </div>
      <div className="flex justify-around mb-5">
        {gameBoard[2].map((item, index) => (
          <div className="border border-gray-600 rounded-lg p-2" key={index}>
            <GameBox row={2} item={item} key={index} index={index} />
          </div>
        ))}
      </div>
    </>
  );
}

export default GameContent;
