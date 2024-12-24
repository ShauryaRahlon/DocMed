import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://docmed-server.onrender.com");

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [remoteEmailId, setRemoteEmailId] = useState("");

  useEffect(() => {
    // Event: Joined Room
    socket.on("joined-room", ({ roomId }) => {
      console.log("Joined room:", roomId);
    });

    // Event: Incoming Call
    socket.on("incoming-call", async ({ from, offer }) => {
      console.log("Incoming call from:", from);
      const pc = createPeerConnection(from);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("call-accepted", { emailId: from, answer });
    });

    // Event: Call Accepted
    socket.on("call-accepted", async ({ answer }) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    // Event: ICE Candidate
    socket.on("ice-candidate", ({ candidate }) => {
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("joined-room");
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("ice-candidate");
    };
  }, [peerConnection]);

  const createPeerConnection = (remoteEmailId) => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          emailId: remoteEmailId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    setPeerConnection(pc);
    return pc;
  };

  const handleJoinRoom = () => {
    if (!emailId || !roomId) {
      alert("Please enter email and room ID");
      return;
    }
    socket.emit("join-room", { emailId, roomId });
  };

  const startCall = async () => {
    if (!remoteEmailId) {
      alert("Please enter the email of the person you want to call");
      return;
    }
    const pc = createPeerConnection(remoteEmailId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("call-user", { emailId: remoteEmailId, offer });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  }, []);

  return (
    <div>
      <div>
        <input
          type="email"
          placeholder="Your Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        <input
          type="email"
          placeholder="Email to Call"
          value={remoteEmailId}
          onChange={(e) => setRemoteEmailId(e.target.value)}
        />
        <button onClick={startCall}>Start Call</button>
      </div>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: "45%" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "45%" }} />
      </div>
    </div>
  );
}

export default App;
