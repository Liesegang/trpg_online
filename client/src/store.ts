import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import { Map } from "yjs";

import { Character } from "./types";

// Create your SyncedStore store
export const store = syncedStore({
  characters: {} as Map<Character>,
  fragment: "xml",
});

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
export const webrtcProvider = new WebsocketProvider("ws://localhost:3000/sync", "roomId", doc);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
