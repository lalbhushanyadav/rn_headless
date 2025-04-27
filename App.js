import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import GlobalProvider from './src/shared/GlobalProvider';
import ThemeProvider from './src/shared/ThemeProvider';
import FrontendRoutes from './src/routes/FrontendRoutes';  // Handle routes for non-admin users
import AdminRoutes from './src/routes/AdminRoutes';      // Handle routes for admin users
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UiMessages from './src/shared/uiMessages';
export default function App() {
	const [isFrontendUser, setIsFrontendUser] = useState(false);
	useEffect(() => {
		const loadUserType = async () => {
			try {
				const storedData = await AsyncStorage.getItem('session_data');
				if (storedData) {
					const sessionData = JSON.parse(storedData);
					if (sessionData.isAuthenticated && sessionData.isUserType == UiMessages.User.frontendUser) {
						setIsFrontendUser(true);
					}
				}
			} catch (error) {
				console.error('Error loading user data from AsyncStorage:', error);
			}
		};

		loadUserType();
	}, []);

	return (
		<SafeAreaProvider>
			{/* Wrap your app with the necessary providers */}
			<ReduxProvider store={store}>
				<ThemeProvider>
					<GlobalProvider>
						{/* Navigation container wraps the routes */}
						<NavigationContainer>
							{isFrontendUser ? <FrontendRoutes /> : <FrontendRoutes />}
						</NavigationContainer>
					</GlobalProvider>
				</ThemeProvider>
			</ReduxProvider>
		</SafeAreaProvider>
	);
}
