import React from "react";
import {
  selectHMSMessages,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { selectPeers } from "@100mslive/react-sdk"
export default function Chat() {
  const messages = useHMSStore(selectHMSMessages);
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers)
  const handleSubmit = (e) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(message)
    setMessage('')
  }
  return <div>
    <form name='send-messge' onSubmit={handleSubmit}>
    {messages.map((msg) => (
  <Message key={msg.id} message={msg} />
))}
{peers.map((peer) => (
  <div className='rightBox__participant'>
    {peer.name}
    <p>{peer.roleName}</p>
  </div>
))}

    </form>
    </div>;
}
