import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UiMessages from '../shared/uiMessages';


const defaultUserType = UiMessages.User.normalUser;

const initialState = {
	user: null,
	isAuthenticated: false,
	isUserType: defaultUserType,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData(state, action) {
			state.user = action.payload.user;
			state.isAuthenticated = true;
			state.isUserType = action.payload.isUserType;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.isUserType = defaultUserType;
		},
	},
});

// Action to load data from AsyncStorage and update the store
export const loadUserData = () => async (dispatch) => {
	try {
		const storedData = await AsyncStorage.getItem('session_data');
		console.log(storedData);
		if (storedData) {
			const sessionData = JSON.parse(storedData);
			console.log(sessionData);
			if (sessionData.isAuthenticated) {
				dispatch(setUserData({
					user: sessionData.user,
					isUserType: sessionData.isUserType,
					isAuthenticated: sessionData.isAuthenticated,
				}));
			}
		}
	} catch (error) {
		console.error('Error loading user data from AsyncStorage:', error);
	}
};

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
