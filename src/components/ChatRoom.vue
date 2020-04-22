<template>
  <div>
    <h2>Welcome to chatRoom {{ chatId }}</h2>

    <User #user="{ user }">
      <ul>
        <li v-for="message of messages" :key="message.id">
          <ChatMessage :message="message" :owner="user.uid === message.sender" />
        </li>
      </ul>
      <input v-model="newMessageText" type="text" />

      <h5>Record audio)</h5>

      <button v-if="!recorder" @click="record()">Record</button>
      <button v-else @click="stop()">Stop</button>

      <audio v-if="newAudio" :src="newAudioUrl" controls></audio>

      <hr />

      <button :disabled="loading" @click="addMessage(user.uid)">Send</button>
    </User>
  </div>
</template>

<script>
import User from "./User";
import ChatMessage from "./ChatMessage";
import { db, storage } from "../firebase";

export default {
  components: {
    User,
    ChatMessage
  },
  data() {
    return {
      messages: [],
      newMessageText: "",
      newAudio: null,
      recorder: null,
      loading: false
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioUrl() {
      return URL.createObjectURL(this.newAudio);
    }
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(10)
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;

      let audioUrl = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);

        audioUrl = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        createdAt: Date.now(),
        sender: uid,
        text: this.newMessageText,
        audioUrl
      });

      this.loading = false;
      this.newMessageText = "";
      this.newAudio = null;
    },
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });

      const options = { mimeType: "audio/webm" };

      const recorderChunks = [];

      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          recorderChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recorderChunks);
        console.log("this.newAudio:", this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    }
  }
};
</script>

<style scoped>
ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 10px;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  border: 1px solid green;
}
li {
  display: flex;
}
button {
  margin-top: 20px;
}
</style>
