import PropTypes from "prop-types";
import style from "./block.module.css";

export default function Block({ onBlockClick, blockdata, clickedIndex }) {
  return (
    <>
      <span className={style.block} onClick={() => onBlockClick(clickedIndex)}>
        {blockdata ? blockdata : "_"}
      </span>
    </>
  );
}

Block.propTypes = {
  onBlockClick: PropTypes.func,
  currentPlayer: PropTypes.string,
  clickedIndex: PropTypes.number,
  blockdata: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
