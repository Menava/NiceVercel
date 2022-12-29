import React from "react";
import "./errorComponentImage.scss";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removeErrorImages } from "../../redux/prepareServiceInputSlice";
import { setUserSelectedImage } from "../../redux/modalsAndDataSlice";

function ErrorComponentImage({ errorImage, damageType, deleteErrorImageFunc }) {
  const dispatch = useDispatch();

  function removeErrorImageHandle() {
    if (deleteErrorImageFunc) {
      deleteErrorImageFunc(errorImage);
    } else {
      dispatch(removeErrorImages({ errorImage }));
    }
  }

  return (
    <div className="errorComponentWrapper">
      <div
        className="errorComponent_removeIconWrapper"
        onClick={removeErrorImageHandle}
      >
        <ImCross className="errorComponentRemoveIcon" />
      </div>
      <img
        onClick={(e) => dispatch(setUserSelectedImage({ data: e.target.src }))}
        className="errorComponentImg"
        src={URL.createObjectURL(errorImage)}
        alt="nayeon img"
      ></img>
      <h4>{damageType}</h4>
    </div>
  );
}

export default ErrorComponentImage;
