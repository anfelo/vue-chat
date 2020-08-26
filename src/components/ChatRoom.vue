<template>
	<main>
		<h3 class="title">Welcome to ChatRoom {{ chatId }}</h3>
		<User #user="{ user }">
			<ul>
				<li v-for="message of messages" :key="message.id">
					<ChatMessage
						:message="message"
						:owner="user.uid === message.sender"
					></ChatMessage>
				</li>
			</ul>

			<div class="field">
				<div class="control">
					<input v-model="newMessageText" class="input" type="text" />
				</div>
			</div>

			<hr />

			<h5>Record Audio</h5>
			<button v-if="!recorder" class="button is-info" @click="record()">
				Record
			</button>
			<button v-else class="button is-danger" @click="stop()">Stop</button>

			<audio v-if="newAudio" :src="newAudioURL" controls></audio>

			<hr />
			<button
				class="button is-success"
				@click="addMessage(user.uid)"
				:disabled="(!newMessageText && !newAudio) || loading"
			>
				Send
			</button>
		</User>
	</main>
</template>

<script>
import User from './User';
import ChatMessage from './ChatMessage';
import { db, storage } from '../firebase';

export default {
	components: {
		User,
		ChatMessage
	},
	data() {
		return {
			newMessageText: '',
			loading: false,
			messages: [],
			newAudio: null,
			recorder: null
		};
	},
	computed: {
		chatId() {
			return this.$route.params.id;
		},
		messagesCollection() {
			return db.doc(`chats/${this.chatId}`).collection('messages');
		},
		newAudioURL() {
			return URL.createObjectURL(this.newAudio);
		}
	},
	firestore() {
		return {
			messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
		};
	},
	methods: {
		async addMessage(uid) {
			this.loading = true;

			let audioURL = null;

			const { id: messageId } = this.messagesCollection.doc();

			if (this.newAudio) {
				const storageRef = storage
					.ref('chats')
					.child(this.chatId)
					.child(`${messageId}.wav`);

				await storageRef.put(this.newAudio);
				audioURL = await storageRef.getDownloadURL();
			}

			await this.messagesCollection.doc(messageId).set({
				text: this.newMessageText,
				sender: uid,
				createdAt: Date.now(),
				audioURL
			});

			this.loading = false;
			this.newMessageText = '';
			this.newAudio = null;
		},
		async record() {
			this.newAudio = null;

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			});

			const options = { mimetype: 'audio/webm' };
			const recordedChunks = [];

			this.recorder = new MediaRecorder(stream, options);

			this.recorder.addEventListener('dataavailable', e => {
				if (e.data.size > 0) {
					recordedChunks.push(e.data);
				}
			});

			this.recorder.addEventListener('stop', () => {
				this.newAudio = new Blob(recordedChunks);
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
	list-style-type: none;
	margin: 0 0 10px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	min-width: 500px;
	background-color: #efefef;
}
li {
	display: flex;
}
</style>
