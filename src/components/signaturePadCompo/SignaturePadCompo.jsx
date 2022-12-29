import React, { useEffect, useState } from "react";
import "./signaturePadCompo.scss";
import SignaturePad from "react-signature-pad-wrapper";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";

function SignaturePadCompo({ signaturePad, confirmSignatureFunc }) {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const dispatch = useDispatch();

  function resizeInnerHeight() {
    setInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", resizeInnerHeight);
    return () => window.removeEventListener("resize", resizeInnerHeight);
  });

  return (
    <div className="signaturePad_wrapper">
      <div className="signaturePad">
        <div className="signaturePad_inside">
          <SignaturePad
            options={{ penColor: "black", backgroundColor: "white" }}
            redrawOnResize={true}
            height={innerHeight - 60}
            ref={signaturePad}
          />
        </div>
        <div className="signaturePad_buttonsWrapper">
          <button
            className="signaturePad_closeBtn"
            onClick={() => dispatch(closeModal())}
          >
            Close
          </button>
          <button
            className="signaturePad_clearBtn"
            onClick={() => signaturePad.current.clear()}
          >
            Clear
          </button>
          <button
            className="signaturePad_confirmBtn"
            onClick={() => {
              confirmSignatureFunc(
                signaturePad.current.toDataURL("image/jpeg")
              );
              dispatch(closeModal());
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignaturePadCompo;
