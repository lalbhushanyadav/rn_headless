// src/shared/uiMessages.js

const UiMessages = {
	defaultUserType: "guest",
	Auth: {
		loginSuccess: "Login successful!",
		logoutSuccess: "You have been logged out.",
		registrationSuccess: "Account created successfully!",
		registrationError: "Failed to create account. Please try again.",
		invalidCredentials: "Invalid email or password.",
		passwordMandatoryError: "Password is required",
		passwordLimitError: "Password needs to be minimum 8 characters.",
		emailMandatoryError: "Email is required",
		emailValidError: "Please enter valid email address.",
		firstNameMandatoryError: "First Name is required",
		lastNameMandatoryError: "Last Name is required",
		loginError: "Invalid credentials.",
		MyAccountAccessError: "Please login to access the My Account Page."
	},
	User: {
		normalUser: "guest",
		frontendUser: "frontend",
		adminUser: "admin"
	},
	Menu: {
		Home: "Home",
		Login: "Login",
		Register: "Register",
		Logout: "Logout",
		MyAccount: "My Account",
	},


	Validation: {
		required: "This field is required.",
		invalidEmail: "Please enter a valid email address.",
		passwordShort: "Password must be at least 6 characters.",
	},

	Errors: {
		network: "Network error. Please check your connection.",
		unknown: "Something went wrong. Please try again later.",
	},

	Cart: {
		itemAdded: "Item added to cart.",
		itemRemoved: "Item removed from cart.",
		itemCountError: "ItemQuantity needs to be minimum 1.",
	},
	Checkout: {
		customerNotLoggedIn: "Customer needs to login to place an order.",
		orderSuccess: "Order has been placed successfully.",
		checkoutError: "Checkout error. PLease contact administrator.",
	},
};

export default UiMessages;
