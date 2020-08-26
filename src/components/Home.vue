<template>
	<div>
		<User v-slot:user="{ user }">
			<div v-if="user">
				<UserProfile :user="user"></UserProfile>
				<ChatList :uid="user.uid"></ChatList>
			</div>
			<Login v-else></Login>
		</User>
	</div>
</template>

<script>
import Login from './Login.vue';
import User from './User.vue';
import UserProfile from './UserProfile.vue';
import ChatList from './ChatList.vue';

export default {
	components: {
		Login,
		User,
		UserProfile,
		ChatList
	}
};
</script>
