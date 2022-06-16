import FlashMessage from "react-flash-message";
import { useState, useEffect } from "react";

const Message = (props) => {
  return (
    <FlashMessage duration={100000}>
      <div className={`flash-message fade-in ${props.className}`}>
        {props.message}
      </div>
    </FlashMessage>
  );
};
export default Message;
