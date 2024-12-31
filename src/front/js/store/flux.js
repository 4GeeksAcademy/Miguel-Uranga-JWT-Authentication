import { RegisterUser } from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loginAccount: async (username, password) => {
				try{
					// fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify({
							username: username,
							password: password
						})
					})
					
					// if (!response.ok){
					// 	const errorMsg = await response.json()
					//  	throw new Error(errorMsg.msg)
					// }

					const data = await response.json()
					console.log(data)

					localStorage.setItem("access_token", data.token)
					localStorage.setItem("username", data.username)

					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
					return error
				}
			},
			registerUser: async (userInfo) => {
				//Post the user data
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify({
							username: userInfo.username,
							password: userInfo.password,
							first_name: userInfo.first_name,
							last_name: userInfo.last_name
						})
					})
					const data = await response.json()

					console.log(data)
					return data;
				}
				catch(error){
					console.log(error)
				}

			},
			getUserInfo: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/access", {
						headers: {
							"Authorization": `Bearer ${localStorage.access_token}`
						}
					})
					
					const data = await response.json()

					if(!data){
						return -1
					}
	
					console.log(data)
					setStore({user:data})
					return data[1];
				}
				catch(error){
					console.log(error)
					return error
				}
			}
		}
	};
};

export default getState;
