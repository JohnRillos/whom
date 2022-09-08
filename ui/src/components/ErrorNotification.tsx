import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ErrorNotification(): JSX.Element | null {
  const { errorMessage, dismissError } = useContext(AppContext);
  if (!errorMessage) {
    return null;
  }
  return (
    <div className='fixed bottom-2 left-2 z-20'>
      Error: {errorMessage}
    </div>
  );
}
