// src/api/shopifyClient.js
import axiosInstance from "./axiosInstance";

// Shopify API client
const shopify = axiosInstance.create({
	baseURL: process.env.EXPO_SHOPIFY_STORE_URL,
	headers: {
		'X-Shopify-Storefront-Access-Token': process.env.EXPO_STOREFRONT_ACCESS_TOKEN,
	},
});

// Generic function for GraphQL queries
const callShopify = async (query, variables = {}) => {
	try {
		const response = await shopify.post("", { query, variables });
		console.log(response);
		return response.data.data;
	} catch (error) {
		console.error("Shopify API error:", error.response?.data || error);
		throw error;
	}
};

const shopifyAdmin = axiosInstance.create({
	baseURL: process.env.EXPO_SHOPIFY_ADMIN_STORE_URL,
	headers: {
		'X-Shopify-Access-Token': process.env.EXPO_SHOPIFY_ADMIN_ACCESS_TOKEN,
		'Content-Type': 'application/json',
	},
});

export const callShopifyAdmin = async (query, variables = {}) => {
	try {
		const response = await shopifyAdmin.post('', { query, variables });
		return response.data.data;
	} catch (error) {
		console.error('Shopify Admin API error:', error.response?.data || error);
		throw error;
	}
};

// Shopify API Methods
const shopifyClient = {
	fetchCollections: async () => {
		const query = `
      {
        collections(first: 5) {
          edges {
            node {
              id
              title
              handle
              image {
                url
                altText
              }
            }
          }
        }
      }
    `;
		const data = await callShopify(query);
		return data.collections.edges.map(edge => edge.node);
	},

	fetchProducts: async () => {
		const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }
  `;

		const data = await callShopify(query);

		return data.products.edges.map((edge) => {
			const product = edge.node;
			const variant = product.variants.edges[0]?.node;

			return {
				id: product.id,
				title: product.title,
				handle: product.handle,
				image: product.images.edges[0]?.node.url || "",
				price: variant?.price?.amount || "",
				compareAtPrice: variant?.compareAtPrice?.amount || "",
				quantity: variant?.quantityAvailable ?? "N/A",
			};
		});
	},


	createCustomer: async (firstName, lastName, email, password) => {
		const query = `
      mutation {
        customerCreate(input: {
          firstName: "${firstName}",
          lastName: "${lastName}",
          email: "${email}",
          password: "${password}"
        }) {
          customer {
            id
            firstName
            lastName
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

		try {
			const data = await callShopify(query);

			// Check for any user errors
			if (data.customerCreate.userErrors.length > 0) {
				const errorMessage = data.customerCreate.userErrors.map(
					(error) => `${error.field}: ${error.message}`
				).join(", ");
				throw new Error(`Error creating customer: ${errorMessage}`);
			}

			return data.customerCreate.customer;
		} catch (error) {
			// console.error("Error creating customer:", error);
			return { error: error.message };

		}
	},

	loginUser: async (email, password) => {
		const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

		const variables = {
			input: {
				email: String(email),
				password: String(password),
			},
		};

		try {
			const data = await callShopify(query, variables);
			const result = data.customerAccessTokenCreate;

			if (result.userErrors.length > 0) {
				const errorMessage = result.userErrors
					.map((err) => `${err.field}: ${err.message}`)
					.join(", ");
				throw new Error(`Login failed: ${errorMessage}`);
			}

			return result.customerAccessToken;
		} catch (error) {
			// console.error("Login error:", error);
			throw new Error(error.message || "An error occurred during login.");
		}
	},

	getCustomerDetails: async (accessToken) => {
		const query = `
      query getCustomer($token: String!) {
        customer(customerAccessToken: $token) {
          id
          firstName
          lastName
          email
          phone
        }
      }
    `;

		const variables = { token: accessToken };

		try {
			const data = await callShopify(query, variables);
			return data.customer;
		} catch (error) {
			console.error("Error fetching customer details:", error);
			throw new Error(error.message || "Failed to fetch customer details.");
		}
	},
	fetchProductsByCollectionHandle: async (handle) => {
		const query = `
  {
    collectionByHandle(handle: "${handle}") {
      title
      products(first: 20) {
        edges {
          node {
            id
            title
			handle
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {  
              edges {
                node {
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }
  }
`;


		const data = await callShopify(query);

		return data.collectionByHandle.products.edges.map((edge) => {
			const node = edge.node;
			const variant = node.variants.edges[0]?.node;

			return {
				id: node.id,
				handle: node.handle,
				title: node.title,
				image: node.images.edges[0]?.node.url || "",
				price: variant?.price?.amount || "",
				compareAtPrice: variant?.compareAtPrice?.amount || "",
				quantity: variant?.quantityAvailable ?? "N/A",
			};
		});
	},


	fetchProductByHandle: async (handle) => {
		const query = `
    {
      productByHandle(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              quantityAvailable
            }
          }
        }
        tags
      }
    }
  `;

		const data = await callShopify(query);
		const product = data?.productByHandle;

		if (!product) return null;

		const variant = product.variants.edges[0]?.node;
		const variantId = variant?.id;
		// console.log(variantId);

		return {
			id: product.id,
			handle: product.handle,
			title: product.title,
			description: product.description,
			images: product.images.edges.map((edge) => edge.node.url),
			price: variant?.price?.amount || 0,
			compareAtPrice: variant?.compareAtPrice?.amount || 0,
			quantity: variant?.quantityAvailable ?? 0,
			tags: product.tags || [],
			variantId: variantId || null,
		};
	},

	updateCustomerDetails: async (accessToken, shippingAddress, billingAddress) => {
		const query = `
    mutation updateCustomer($token: String!, $input: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $token, input: $input) {
        customer {
          id
          firstName
          lastName
          email
          phone
          addresses {
            id
            address1
            address2
            city
            country
            province
            zip
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

		const variables = {
			token: accessToken,
			input: {
				addresses: [
					{
						address1: shippingAddress.street,
						address2: shippingAddress.apartment,
						city: shippingAddress.city,
						province: shippingAddress.state,
						zip: shippingAddress.zip,
						country: shippingAddress.country,
						phone: shippingAddress.phone,
					},
					{
						address1: billingAddress.street,
						address2: billingAddress.apartment,
						city: billingAddress.city,
						province: billingAddress.state,
						zip: billingAddress.zip,
						country: billingAddress.country,
						phone: billingAddress.phone,
					},
				],
			},
		};

		try {
			const data = await callShopify(query, variables);

			// Check for errors in response
			if (data.customerUpdate.userErrors.length > 0) {
				const errorMessage = data.customerUpdate.userErrors
					.map((error) => `${error.field}: ${error.message}`)
					.join(", ");
				throw new Error(`Error updating customer: ${errorMessage}`);
			}

			return data.customerUpdate.customer;
		} catch (error) {
			console.error("Error updating customer details:", error);
			throw new Error(error.message || "An error occurred while updating the customer details.");
		}
	},
	customerAddAddress: async (address, accessToken) => {
		const query = `
      mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
          customerAddress {
            id
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

		const variables = {
			address,
			customerAccessToken: accessToken,
		};

		try {
			const data = await callShopify(query, variables);
			const result = data.customerAddressCreate;

			if (result.customerUserErrors.length > 0) {
				const errorMessage = result.customerUserErrors.map(
					(err) => `${err.field}: ${err.message}`
				).join(", ");
				throw new Error(`Address creation failed: ${errorMessage}`);
			}

			return result.customerAddress.id;
		} catch (error) {
			console.error("Error adding address:", error);
			throw new Error(error.message || "An error occurred while adding address.");
		}
	},


	// Create an order in Shopify with "Cash on Delivery" payment method
	createOrder: async (accessToken, cartItems, shippingAddress, billingAddress) => {
		const query = `
    mutation createOrder($input: OrderInput!) {
      orderCreate(input: $input) {
        order {
          id
          status
          totalPrice
          currencyCode
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

		const lineItems = cartItems.map((item) => ({
			variantId: item.id,
			quantity: item.quantity,
			price: item.price,
		}));

		const variables = {
			input: {
				lineItems,
				shippingAddress: {
					address1: shippingAddress.street,
					address2: shippingAddress.apartment,
					city: shippingAddress.city,
					province: shippingAddress.state,
					zip: shippingAddress.zip,
					country: shippingAddress.country,
					phone: shippingAddress.phone,
				},
				billingAddress: {
					address1: billingAddress.street,
					address2: billingAddress.apartment,
					city: billingAddress.city,
					province: billingAddress.state,
					zip: billingAddress.zip,
					country: billingAddress.country,
					phone: billingAddress.phone,
				},
				customerAccessToken: accessToken,
				paymentMethod: {
					type: "CASH_ON_DELIVERY",
				},
			},
		};

		try {
			const data = await callShopify(query, variables);

			// Check for any user errors
			if (data.orderCreate.userErrors.length > 0) {
				const errorMessage = data.orderCreate.userErrors
					.map((error) => `${error.field}: ${error.message}`)
					.join(", ");
				throw new Error(`Error creating order: ${errorMessage}`);
			}

			return data.orderCreate.order;
		} catch (error) {
			console.error("Error creating order:", error);
			throw new Error(error.message || "An error occurred while creating the order.");
		}
	},
	createDraftOrder: async (accessToken, cartItems, shippingAddress, billingAddress, formData) => {
		const query = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          name
          invoiceUrl
          createdAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

		const lineItems = cartItems.map((item) => ({

			variantId: item.variantId,
			quantity: item.quantity,
		}));
		console.log(lineItems);

		const variables = {
			input: {
				lineItems,
				shippingAddress: {
					address1: shippingAddress.street,
					address2: shippingAddress.apartment,
					city: shippingAddress.city,
					province: shippingAddress.state,
					zip: shippingAddress.zip,
					country: shippingAddress.country,
					phone: shippingAddress.phone,
				},
				billingAddress: {
					address1: billingAddress.street,
					address2: billingAddress.apartment,
					city: billingAddress.city,
					province: billingAddress.state,
					zip: billingAddress.zip,
					country: billingAddress.country,
					phone: billingAddress.phone,
				},
				useCustomerDefaultAddress: false,
				email: formData.email,
			},
		};

		try {
			const response = await fetch(`${process.env.EXPO_BACKEND_URL}draft-order`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query, variables }),
			});

			const data = await response.json();

			if (data.errors) {
				throw new Error(`Error: ${data.errors[0].message}`);
			}

			return data.data.draftOrderCreate.draftOrder;
		} catch (error) {
			console.error("Error creating draft order:", error);
			throw new Error(error.message || "An error occurred while creating the draft order.");
		}
	},

};

export default shopifyClient;
