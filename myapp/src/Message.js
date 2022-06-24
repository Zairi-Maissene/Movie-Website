import FlashMessage from "react-flash-message";
import { useState, useEffect } from "react";

const Message = (props) => {
  const [showFlash, setShowFlash] = useState(true);
  return showFlash ? (
    <FlashMessage duration={20000}>
      <div className={`flash-message fade-in ${props.className}`}>
        {props.message}
        <button onClick={() => setShowFlash(false)}>X</button>
      </div>
    </FlashMessage>
  ) : null;
};
export default Message;
