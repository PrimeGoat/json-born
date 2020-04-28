const fs = require('fs');

let userlist = [];

const user = function(name, age, eyeColor, friends = [], index = 0) {
	return {
		index: index,
		age: age,
		eyeColor: eyeColor,
		name: name,
		friends: friends
	}
}

// Load json file
const loadUsers = function() {
	fs.readFile("./users.json", function(error, data) {
		if(error) {
			throw error;
		}
		userlist = JSON.parse(data);
		let method = process.argv[2];
		let command = process.argv[3];
		let args = process.argv.slice(4);
		
		switch(method.toLowerCase()) {
			case "get":
				getCommands(command, args);
			break;
			case "post":
				postCommands(command, args);
			break;
			case "put":
				putCommands(command, args);
			break;
			case "delete":
				deleteCommands(command, args);
			break;
			default:
				console.log("Invalid method: " + method);
		}
	});
}

// Write json file
const saveUsers = function() {
	data = JSON.stringify(userlist);
	fs.writeFile("./users.json", data, "utf8", function(error) {
		if(error) {
			throw error;
		}
	});	
}

// Process GETs
const getCommands = function(command, args) {
	if(!command) {
		console.log("Missing command.");
		return;
	}

	switch(command.toLowerCase()) {
		case "users":
			console.log("Users: ");
			for(const cuser of userlist) {
				printUser(cuser);
			}
			break;
		case "user":
			if(userlist[args[0]]) {
				printUser(userlist[args[0]]);
			} else {
				console.log("User " + args[0] + " doesn't exist.");
			}
			break;
		case "friends":
			let cuser = userlist[args[0]];
			if(userlist[args[0]]) {
				if(cuser.friends.length) {
					friends = [];
					for(friend of cuser.friends) {
						friends.push(friend.name);
					}
					console.log(cuser.name + "'s friends: " + friends.join(", "));
				} else {
					console.log(cuser.name + " has no friends.  Muahahahaha");
				}
			} else {
				console.log("User " + args[0] + " doesn't exist.");
			}
			break;
		default:
			console.log("Invalid command: " + command);
	}
}

const printUser = function(cuser) {
	//console.log("User " + cuser.index + ':');
	console.log(cuser.index + ": " + cuser.name + ", age " + cuser.age + ", eye color: " + cuser.eyeColor);
	if(cuser.friends.length) {
		friends = [];
		for(friend of cuser.friends) {
			friends.push(friend.name);
		}
		console.log("Friends: " + friends.join(", "));
	}
	console.log();
}

// Process POSTs
const postCommands = function(command, args) {
	if(!command) {
		console.log("Missing command.");
		return;
	}

	switch(command.toLowerCase()) {
		case "user":
			let name = args[0];
			let age = args[1];
			let eyes = args[2];

			// name, age, eyeColor, friends = [], index = 0
			userlist.push(user(name, age, eyes, [], userlist.length));

			console.log("User added:");
			printUser(userlist[userlist.length - 1]);

			break;
		case "friends":
			let index = args[0];
			let friendName = args[1];
			if(!userlist[index]) {
				console.log("User index " + index + " doesn't exist.");
			}
			console.log("Current friends list: " + userlist[index].friends);
			let id = makeFriendId(userlist[index].friends);
			
			userlist[index].friends.push({id: id, name: friendName});
			
			friends = [];
			for(friend of userlist[index].friends) {
				friends.push(friend.name);
			}
			console.log("Friend " + friendName + " has been added to " + userlist[index].name + "'s friend list.  Their current friends list is now: " + friends.join(", "));

			break;
		default:
			console.log("Invalid command: " + command);
	}
	saveUsers();
}

const makeFriendId = function(friends) {
	let id = 0;

	for(friend of friends) {
		if(id == friend.id) {
			id++;
		}
	}

	return id;
}

// Process PUTs
const putCommands = function(command, args) {
	if(!command) {
		console.log("Missing command.");
		return;
	}

	switch(command.toLowerCase()) {
		case "user":
			let index = args[0];
			let propertyName = args[1];
			let value = args[2];

			if(typeof(value) == "undefined") {
				console.log("Syntax: PUT user <index> <property name> <new value>");
				break;
			}
			if(typeof(userlist[index]) == "undefined") {
				console.log("User with index " + index + " does not exist.");
				break
			}
			console.log("User " + userlist[index].name + "'s " + propertyName + " property changed from " + userlist[index][propertyName] + " to " + value);
			userlist[index][propertyName] = value;

			break;
		default:
			console.log("Invalid command: " + command);
	}
	saveUsers();
}


loadUsers();
//saveUsers();
