// src/App.js
import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

function CloudRoom() {
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [peers, setPeers] = useState({});
  const myVideoRef = useRef();
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on("open", (id) => setMyId(id));
    setPeer(newPeer);
  }, []);

  useEffect(() => {
    if (!peer) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((s) => {
      setStream(s);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = s;
      }
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
        addVideoStream(call.peer, userVideoStream);
      });
    });
  }, [peer, stream]);

  const createRoom = () => {
    const generatedId = Math.random().toString(36).substring(2, 8);
    setRoomId(generatedId);
    setInRoom(true);
  };

  const joinRoom = () => {
    if (!roomId) return alert("Enter Room ID first!");
    setInRoom(true);
  };

  const callPeer = (peerId) => {
    const call = peer.call(peerId, stream);
    call.on("stream", (userVideoStream) => {
      addVideoStream(peerId, userVideoStream);
    });
  };

  const addVideoStream = (id, stream) => {
    setPeers((prev) => {
      if (prev[id]) return prev; // tránh thêm trùng
      return { ...prev, [id]: stream };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Cloud Room</h1>

      {!inRoom ? (
        <div className="flex flex-col items-center gap-2">
          <p>Your Peer ID: {myId}</p>
          <button
            onClick={createRoom}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Create Room
          </button>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="p-2 rounded text-black"
          />
          <button
            onClick={joinRoom}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Room ID: {roomId}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <video ref={myVideoRef} autoPlay playsInline muted className="rounded-lg border" />
            {Object.entries(peers).map(([id, s]) => (
              <video
                key={id}
                autoPlay
                playsInline
                className="rounded-lg border"
                ref={(ref) => {
                  if (ref) ref.srcObject = s;
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CloudRoom;
