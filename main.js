const fs = require('fs');

let userlist = [];

const user = function(name, age, eyeColor, friends = []) {
	return {
		name: name,
		age: age,
		eyeColor: eyeColor,
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

			break;
			case "put":

			break;
			case "delete":

			break;
			default:
				console.log("Invalid method: " + method);
		}
	});
}

// Write json file
const saveUsers = function() {
	setTimeout(function() {
		data = JSON.stringify(userlist);
		fs.writeFile("./users2.json", data, "utf8", function(error) {
			if(error) {
				throw error;
			}
		});	
	}, 250)
}


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
	console.log(cuser.name + ", age " + cuser.age + ", eye color: " + cuser.eyeColor);
	if(cuser.friends.length) {
		friends = [];
		for(friend of cuser.friends) {
			friends.push(friend.name);
		}
		console.log("Friends: " + friends.join(", "));
	}
	console.log();
}

loadUsers();
//saveUsers();
