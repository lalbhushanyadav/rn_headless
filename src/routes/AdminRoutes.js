import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../app/backend/pages/Dashboard';
// import User from '../../apps/backend/pages/User';
// import AdminLogin from '../../apps/backend/pages/AdminLogin';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

const AdminRoutes = () => {
	const { userType } = useSelector((state) => state.user);
	const isAdmin = userType === 'admin';

	if (userType === 'guest') {
		// Optional: You can show loading or splash screen while checking auth
		return <ActivityIndicator size="large" style={{ flex: 1 }} />;
	}

	return (
		<Stack.Navigator>
			{isAdmin ? (
				<>
					<Stack.Screen name="/admin" component={Dashboard} />
					{/* <Stack.Screen name="AdminUsers" component={User} /> */}
				</>
			) : (
				<>
					{/* <Stack.Screen
						name="AdminLogin"
						component={AdminLogin}
						options={{ headerShown: false }}
					/> */}
				</>
			)}
		</Stack.Navigator>
	);
};

export default AdminRoutes;
