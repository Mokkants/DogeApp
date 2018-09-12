# DogeApp

Pull the repo and run "npm install" in the terminal, this will download every module and dependency specified in package.json. 

Your workflow should look something like this:
1. Take a task on trello and move it to In Progress.
2. Create your own branch for the task you took in Trello.
3. Create a pull request into the develop branch once your task is finished.
4. Move the card on trello to finished once you merged with develop and delete your branch.

Don't directly push to master or develop.

The heart of the program is app.js, you can run it in the command line with "node app.js", package.json contains a line for a script "start" that calls exactly that, so you should start the program using *npm start*.