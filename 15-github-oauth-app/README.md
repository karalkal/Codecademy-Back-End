# GitHub OAuth Application

## *Create an application that can be authenticated by your GitHub account*

### Set up GitHub OAuth Application

In this off-platform project, you will be using GitHub to authenticate our web application. Before we start coding, we need to register an OAuth application in GitHub. If you don’t have a GitHub account, you can sign up here.

First, navigate to your GitHub “Settings” page by clicking on your GitHub icon.  

Select “Developer settings” in the sidebar.  

Select “OAuth Apps” in the sidebar of the Developer settings page. Click on the “Register a new application” button.  

Lastly, fill out the form with the following information:  

- Application Name: OAuth Project (or any name for your project)
- Homepage URL: <http://localhost:3000>
- Authorization Callback URL: <http://localhost:3000/auth/github/callback>
Click “Register application”.  

Take note of the Client ID. Click on “Generate a new client secret” to generate a Client secret. Copy both your Client ID and the Client Secret and paste them into a text file somewhere secure. We will be using these in our application. Note that the secret key is displayed only once—when you navigate away from the GitHub page, you will no longer be able to see the Client Secret.  
*New Client Secret*

We are ready to use GitHub for authentication!

### Download the Starting and Solution Code

Download the folder containing the starting and solution code of the project.

The starting-code folder contains code to help you get started. Follow the instructions below to complete the project.

We’ve also included a solution code in the solution-code folder to help guide you if you get stuck. You can also compare your solution to our solution after you complete the project.

### Running Node.js App Locally

If you don’t have Node.js installed on your computer, check out this Setting Up Node Locally article for instructions.

Once you have Node.js installed, open a terminal/Bash window and navigate to the folder containing the starting code of this project using the cd command. For example, if your project folder is located at Documents/github-oauth/starting-code, you can type:

`cd Documents/github-oauth/starting-code`  
Once you are in the working directory, run:  
`npm install`

The above command will install all necessary dependencies for your web application.

---
---

### Project Instructions

#### Part 1 — GitHub Client ID and Client Secret Set Up

Let’s begin by adding inserting in the Client ID and Client Secret that we generated from GitHub’s OAuth App.

Inside the starting-code/ directory, open up a file named .env. Change the value of GITHUB_CLIENT_ID to the Client ID generated by GitHub. Then, change the value of GITHUB_CLIENT_SECRET to your Client Secret. If you do not see the .env file in the directory, you may need to change your Finder/File explorer settings to view hidden files.

---

#### Part 2 — Express Session Set Up

At the top of app.js, inside the “Package Imports” section, import the express-session module into a variable named session using the require() function.

Next, in the “Express Project Setup” section, initialize the session by calling the session() function within app.use(). Inside session(), pass an object for the options as its argument. Within the object, set secret to 'codecademy', resave to false, and saveUnitialized to false.

---

#### Part 3 — Passport Configuration

Import passport.

We will also need to import the passport-github2 module. This module allows GitHub to be used for authentication. Import Strategy from passport-github2 into a variable named GitHubStrategy.

Inside the “Passport Configurations” section, configure passport to use the GitHub strategy. Use the passport.use() function to pass in a new instance of GitHubStrategy(). Inside GitHubStrategy(), pass in a JSON object where clientId (error-must be clientID) is set to the GitHub Client ID, clientSecret is set to the GitHub Client Secret, and callbackURL is set to the authorization callback URL set in GitHub’s OAuth App.

Passport strategies require a verify callback function, which is used to find the user. Add a callback function as the second argument of the initialization of the GitHubStrategy instance we just created. Pass in accessToken, refreshToken, profile, and done as arguments. Return the profile in the done() function by passing null and profile as its arguments.

Inside the “Express Project Setup” section, initialize Passport by calling passport.initialize() inside app.use().

Below the Express configurations, configure our app to use Passport Session by calling passport.session() inside app.use().

---

#### Part 4 — Passport Session Serializers

To facilitate login sessions, Passport serializes and deserializes user instances to and from the session. We’ll do this by serializing the complete GitHub profile. Inside, the Passport configurations section, call the serializeUser() method on passport passing in a callback function with two arguments—user and done. In the callback function, call the done() function passing in null and user.

Next, implement the deserializeUser method on passport by passing a callback function with two arguments—user and done. In the callback function we’ll call done() passing in null and user.

#### Part 5 — Implement OAuth Routes

Let’s implement a new route in the “Routes” section for authenticating with passport. We’ll use the .get() method on app to the route /auth/github and pass as a middleware function, passport.authenticate(). passport.authenticate() takes two arguments— first the strategy employed, 'github', and for the second argument, pass the scope of the grant as an object. Use scope as a key and the value set to an array containing 'user'. When visiting /auth/github, the client will be redirected to GitHub for authorizing.

Next, implement the Authorization callback URL, which was defined in the GitHub application settings. This is where GitHub will redirect after a user authorizes it. Using the Express .get() method, define a route to '/auth/github/callback', and pass passport.authenticate() as a middleware function. Inside passport.authenticate(), pass the first argument 'github' for the scope, then as a second argument pass an object. Inside the object set the redirect URLs. Set the failureRedirect key to '/login', to redirect users back to the login page in the event of a failed authorization. Then set the successRedirect key to '/' to redirect users to the home page after a successful authorization attempt.

Now, we will need to protect the /account route to make it only accessible if a user is logged in. Inside the existing /account route, pass ensureAuthenticated as a middleware function to the route before the callback function that returns the render() function.

Finally, define the ensureAuthenticated() function to handle verifying if a request is authenticated. At the bottom of app.js, declare a function named ensureAuthenticated() with three parameters- req, res, and next. Use an if statement to check if req is valid using the .isAuthenticated() method. If the request is valid, return the next() function, otherwise use res.redirect() to direct to the /login page.

### Review

Congratulations! You just created an OAuth flow that connects to a GitHub account. Restart the server and log in to the app using your GitHub account. When you are logged in, you can go to the /account page and see details from your GitHub account displayed.

In this project, we implemented OAuth using the express-session module to manage user sessions authenticated using the passport module. We configured passport using the credentials from GitHub and implemented the URL routes for authentication. Finally, we implemented a middleware function to protect the route.

Now you have the skills to implement authentication safely and securely using OAuth.
