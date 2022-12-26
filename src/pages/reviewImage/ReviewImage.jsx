import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removeUserSelectedImage } from "../../redux/modalsAndDataSlice";
import "./reviewImage.scss";
function ReviewImage({ imageSrc }) {
  const dispatch = useDispatch();
  return (
    <div className="reviewImage_wrapper">
      <div className="reviewImage">
        <img src={imageSrc} />
        <div
          className="crossIcon_wrapper"
          onClick={() => dispatch(removeUserSelectedImage())}
        >
          <ImCross className="crossIcon" />
        </div>
      </div>
    </div>
  );
}

export default ReviewImage;
