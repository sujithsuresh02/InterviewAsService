import React from "react";
import {
  selectHLSState,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
export default function Controls() {
  const hmsActions = useHMSActions();
  const hlsState = useHMSStore(selectHLSState);


  const startHLSStreaming = async () => {
    try {
      await hmsActions.startHLSStreaming()
    } catch (err) {
        alert(`failed to start hls ${err}`)
    }
  }
  
  const stopHLSStreaming = async () => { 
    try {
      await hmsActions.stopHLSStreaming()
    } catch (err) {
        alert(`failed to stop hls ${err}`)
    }
  }
  return <div>Controls</div>;
}
