# JSON Born

Exploring accessing local JSON files.


### Introduction

We'll be exploring how to read and write to the local file system!

Now, we can't do that directly from the browser for good reason--malicious websites could do much, much more than they already can if they could access your filesystem.

So we'll be doing this on the command line via Node, and in the _next_ challenge we'll make it its own app that can talk to other apps (including web apps!).


### Setup

From our user's perspective, they will run our Node app with `node main.js`, possibly tacking on some extra parameters, and then get the result in the console. We'll have an interface for them using mock routes to describe what data we want to act on and how we want to act on it.  And then we'll use `process.argv` to parse what the user's input is, `fs.readFile` to grab it (or `fs.writeFile` to write it if the request calls for us to make changes), and `console.log` to output the raw data back to the user.

Everything will be written to and from our `users.json` file, which has been prepopulated for you. If you want to get a fresh JSON file, there's a copy in `backup-db` directory. Make sure your code isn't doing anything with that backup file or you'll have to redownload the JSON file. Which, not the worst thing. But still.

Let's dive in!


### The Steps

-1- **Input**

We'll be taking the user's command line input in the following form:

`[HTTP Method] [Route] [Parameters...]`

Let's break that down!

1. The methods, or verbs, will be a subset of the real ones outlined in [MDN's simple article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) and explained further in [this more detailed article](https://restfulapi.net/http-methods/). So: `GET` and `POST` and all their friends.
2. The routes will be the objects of those verbs. `GET` what? `POST` what? So we might `GET` a single `user` or all `users`, `POST` a `user` or a `friend`, and so on.
3. The parameters, if there are any, allow the user to give more information, just like with a standard function. `GET` _which_ `user`? In this case, the parameter would be the index of the requested user. There might be no parameter, like with `GET users`, or there might be several, like when you outline the properties of the user you want to add in a `POST`.

So how can we grab that information? Our old friend `process.argv`! Remember that it returns an array, and keep in mind that the first two indices hold the command we ran and the file we ran it on--so `process.argv[0]` will be `node` and `process.argv[1]` will be the absolute path to `main.js`, leaving index 2 on for our actual input.

-2- **Reading The File**

We'll use `fs.readFile` and `fs.writeFile` to get data to and fro our `users.json` file. Remember that these are asynchronous functions, and we'll be handling that through callbacks. And no, you are **not** allowed to use their evil twins from the synchronous universe, `fs.readFileSync` and `fs.writeFileSync`. We could use the callback practice, and running async code is always a better user experience anyway, as the app doesn't freeze until it's done with async. Don't do that to your users!

So how do we use `fs`? I'l leave `writeFile` for YOUR research, but `fs.readFile` takes in two parameters: a string giving the relative path to the file, and a callback for `readFile` to call once it's finished reading the file. Your callback function itself takes in two parameters: an error that `readFile` will pass you if something went wrong reading the file and the contents of the file (a parameter we usually name `data`).

Assuming the file exists and its JSON, what we've got is a nugget of JSON data. How do we convert it to a JS object? JSON.parse.


-3- **Outputting To The User**

This part's easy. Just `console.log`! Now, you DO have to make sure you're doing that in the right place, i.e., in your callback, where you actually _have_ the data. But otherwise: piece of cake.

-4- **Converting Back To JSON, Writing To Files, And So On.**

We've been walking together, but it's time for you to forget your own path. Time to flex your research muscle (sometimes called the stack overflow muscle).


### Your Routes

It's recommended you go in this order, which is from easiest to hardest. But if you find one of the later ones particularly difficult, feel free to skip around!

1. `GET users` - print out all users
2. `GET user [index]` - print out the user with that index value.
3. `GET friends [index]` - print out all the friends from the user with that index value.
4. `POST user [name] [age] [eye color]` - add a new user to the data with those attributes. As a stretch goal, add an index value that doesn't conflict with any other user. Print out that you have added a user, and double check by running the first route again.
5. `POST friends [index] [name]` - add a new friend with that name property to the user with that index. As a stretch goal, add an index value that doesn't conflict with any other friend of that user.
6. `PUT user [index] [property name] [new value]` - update the given property of the  user at that index to have the new value.
7. `DELETE user [index]` - delete the user with that index from the data.
