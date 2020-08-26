<template>
	<aside class="section">
		<h3 class="title">Sign in Anonymously</h3>
		<button @click="auth.signInAnonymously()" class="button">Sign In</button>

		<div v-if="newUser">
			<h3 class="title">Sign Up for a New Account</h3>
			<a href="#" class="is-link" @click="newUser = false">Returning User?</a>
		</div>
		<div v-else>
			<h3 class="title">Sign In with Email</h3>
			<a href="#" class="is-link" @click="newUser = true">Create New Account</a>
		</div>

		<div class="field">
			<label class="label">Email</label>
			<div class="control">
				<input
					v-model="email"
					class="input"
					type="email"
					placeholder="Enter email"
				/>
			</div>
		</div>

		<div class="field">
			<label class="label">Password</label>
			<div class="control">
				<input
					v-model="password"
					class="input"
					type="password"
					placeholder="Enter password"
				/>
			</div>
		</div>

		<div class="control">
			<button
				class="button is-primary"
				:class="{ 'is-loading': loading }"
				@click="signInOrCreateUser()"
			>
				{{ newUser ? 'Sign Up' : 'Login' }}
			</button>
		</div>

		<p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
	</aside>
</template>

<script>
import { auth } from '../firebase';

export default {
	data() {
		return {
			auth,
			newUser: false,
			email: '',
			password: '',
			loading: false,
			errorMessage: ''
		};
	},
	methods: {
		async signInOrCreateUser() {
			this.loading = true;
			this.errorMessage = '';
			try {
				if (this.newUser) {
					await auth.createUserWithEmailAndPassword(this.email, this.password);
				} else {
					await auth.signInWithEmailAndPassword(this.email, this.password);
				}
			} catch (error) {
				this.errorMessage = error.message;
			}
			this.loading = false;
		}
	}
};
</script>
