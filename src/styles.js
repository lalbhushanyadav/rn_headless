import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#6200ee', // Purple background
	},
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		margin: 20,
		borderRadius: 20,
		padding: 20,
	},
	centerContent: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#6200ee',
	},
	button: {
		marginVertical: 10,
		width: 140,
		borderRadius: 50,
	},
	counter: {
		fontSize: 64,
		marginVertical: 20,
		color: '#6200ee',
	},
});
