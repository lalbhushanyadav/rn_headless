import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import UiMessages from '../shared/uiMessages.js';
import { loadUserData } from '../store/userSlice'; // Ensure you are dispatching this action
import { useSnackbar } from "../shared/SnackbarContext.jsx";
// Pages (screens)
import Home from '../app/frontend/pages/Home.jsx';
import MyAccount from '../app/frontend/pages/MyAccount.jsx';
import Login from '../app/frontend/pages/Login.jsx';

const Stack = createNativeStackNavigator();

export default function FrontendRoutes() {
	const dispatch = useDispatch();
	const { showSnackbar } = useSnackbar();
	const { isAuthenticated, isUserType } = useSelector((state) => state.user); // guest / customer / admin
	const navigation = useNavigation();
	const [isUserDataLoaded, setIsUserDataLoaded] = useState(false); // Track when user data is loaded

	// Load user data from AsyncStorage on initial load
	useEffect(() => {
		const loadData = async () => {
			await dispatch(loadUserData()); // Dispatch to load user data from AsyncStorage
			setIsUserDataLoaded(true); // Once the user data is loaded, set the flag
		};
		loadData();
	}, [dispatch]);

	useEffect(() => {
		// Ensure the navigation object is available and navigation.replace is accessible
		if (navigation && navigation.navigate) {
			// Listen for navigation changes
			const unsubscribe = navigation.addListener('state', () => {
				const currentRoute = navigation.getCurrentRoute()?.name;
				console.log(currentRoute, isAuthenticated, isUserType, UiMessages.User.frontendUser);

				// If the user is logged in and is a frontend user
				if (isAuthenticated && isUserType === UiMessages.User.frontendUser) {
					if (currentRoute === 'Login') {
						// Redirect from Login to MyAccount
						navigation.navigate('MyAccount');

					}
				}

				// If the user is not logged in, redirect to Home if they try to access MyAccount
				if (!isAuthenticated && currentRoute === 'MyAccount') {
					navigation.navigate('Login');
					showSnackbar(UiMessages.Auth.MyAccountAccessError, "error");
				}
			});

			// Cleanup the listener on unmount
			return unsubscribe;
		} else {
			// If replace is not available, log a warning
			console.warn("navigation.navigate is not available");
		}
	}, [isAuthenticated, isUserType, navigation]);

	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			{/* Public Screens */}
			<Stack.Screen name="Home" component={Home} />

			{/* Protected Screens */}
			<Stack.Screen name="MyAccount" component={MyAccount} />

			{/* If not logged in, show Login screen */}
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
}
