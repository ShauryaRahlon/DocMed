import React, { useCallback, useEffect, useMemo, useState } from 'react'

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {

    const [remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            {
                urls: ["stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",]
        }]
    }), [])

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer);
    }


    const sendStream = async (stream) => {
        if (!stream) {
            throw new Error('No media stream provided');
        }
        
        const tracks = stream.getTracks();
        const senders = peer.getSenders();
        
        for (const track of tracks) {
            if (!senders.find(sender => sender.track === track)) {
                peer.addTrack(track, stream);
            }
        }
    };

    const handleTrackEvent = useCallback((event) => {
        const streams = event.streams;
            setRemoteStream(streams[0]);
        }, [])
        

    
    useEffect(() => {
        peer.addEventListener('track',handleTrackEvent)

        return () => {
            peer.removeEventListener('track',handleTrackEvent)
            
        }
    }, [peer, handleTrackEvent])
            

    return (

        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
            {props.children}
        </PeerContext.Provider>
    )
}