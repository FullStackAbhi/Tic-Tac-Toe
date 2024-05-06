import style from "./button.module.css";
import PropTypes from "prop-types";

export default function Buttons({ onButtonClick, move, winningSquare }) {
  const winningSquareStyle = {
    backgroundColor: "#ccc",
  };
  return (
    <button
      className={style.Btn}
      style={winningSquare ? winningSquareStyle : null}
      onClick={() => onButtonClick(move)}
    >
      {move == 0 ? "Go To GameStart" : `Go to move # ${move}`}
    </button>
  );
}

Buttons.propTypes = {
  onButtonClick: PropTypes.func,
  clickedindex: PropTypes.number,
  move: PropTypes.number,
  winningSquare: PropTypes.bool,
};
