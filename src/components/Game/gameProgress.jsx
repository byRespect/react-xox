import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetSeq } from "../../redux/slices/appSlice";

function GameProgress() {
  const [mytime, setMyTime] = useState(10);
  const progressItem = useRef();
  const dispatch = useDispatch();
  const { seq, socket, winner } = useSelector((state) => state.app);

  useEffect(() => {
    if (
      typeof progressItem.current !== "undefined" &&
      progressItem.current !== null
    ) {
      progressItem.current.style.width = `${mytime * 10}%`;
    }
  }, [mytime]);

  useEffect(() => {
    const hndlTimer = setInterval(() => {
      if (mytime === 0) socket.emit("checkTime", invite);
      else if (winner === "") setMyTime(mytime - 1);
    }, 1000);
    return () => clearInterval(hndlTimer);
  });

  useEffect(() => {
    socket.on("seq", (seq) => {
      dispatch(SetSeq(seq));
      setMyTime(10);
    });

    return () => {
      socket.off("seq");
    };
  }, []);
  return (
    <>
      {seq ? (
        <div className="w-full bg-gray-200 rounded-t-none rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full rounded-t-none"
            ref={progressItem}
          />
        </div>
      ) : null}
    </>
  );
}
export default GameProgress;
