import { useVideo } from "@100mslive/react-sdk";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  const hasVideo = peer.videoTrack !== undefined; // Check if the peer has a video track
  const initials = peer.name.slice(0, 1).toUpperCase();

  return (
    <div className="peer-container">
      {hasVideo ? (
        <video
          ref={videoRef}
          className={`peer-video ${peer.isLocal ? "local" : ""}`}
          autoPlay
          muted
          playsInline
        />
      ) : (
        <div className="peer-initials">{initials}</div>
      )}
      <div className="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
