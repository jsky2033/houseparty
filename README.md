
# App Description

This is an app that allows for users to create profiles for their houses or apartments in a similar way to many social media apps. The uses for the app will be as follows:

## An Apartment Finder

Users will be able to upload photos of their apartment, add their roommates to the house profile (provided they also have profiles). This is in addition to listing amenities, rental price (if they are renting) as well as location (a satellite map will be used to display all houses/apartments in the area listed in the app). Users interested in joining a house through a rental agreement can directly message the house owner through an in-built chat sub application. They can also be introduced to the other roommates through a groupchat for the house as well. A search function for users in the area to look for nearby housing with several search filters for price can also be used as well.

## A Social Media Application

The house groupchat will be particularly attractive to the roommates or people living in this house. This is more useful for people who have a bigger house with more induviduals in it. Fraternity/Sorority houses may find this useful in organizing events and maintaining communication with people within the organization.

## An Event Promotion Platform

People will also be able to make posts promoting events at their location and attract people to events at their house. Fraternity and Sorority houses can have events tagged to them and users can filter for events by fraternity as well.

The target audience of this app is predominantly going to be in Gainesville where there are many students living in a series of houses and apartment complexes around UF. College Students/Young professionals can see which events are going to be present in their area and connect with them. I've observed that most people here seem to make friends through their roommates so this make socializing even easier as all residents of the house get added to the house groupchat by default. Of course users can also easily hide their identity or parts of their identity as they see fit.

## Platform

Web application at first with mobile support through PWA use (maybe).

## Technology

MERN Stack (MongoDB, ExpressJS, React and NodeJS)

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Firebase

Firebase functions essentially return a promise so they all need to be inside async functions. They are extracted directly from the firebase/auth library. 

However the firebase configuration/initialization needs to then be used as a provider to tell the functions which Firebase app is utilizing the services.

Automatic sign in when an account is created.

Firebase has tokens it has in localstorage to tell if a user is already logged in. This is interacted with using the auth provider object exported from firebase.js. 

## Firebase structure

Note that the compatibility version of firebase is being used in this application. That is because most of the tutorials for the chat are in v8 while the auth functionality was built using v9.

Firstly the firebase app connection needs to be initialized in the firebase file. Afterwards the initialized connection needs to be passed into the specific connections also present within the firebase software package. 

Afterwards these connections can be used in conjunction with certain functions that are imported from the firebase package as well. 

## Firestore

Remember to change the rules to allow users to read or write to the database. 

## The auth variable

This can be used to validate that the current user is logged in. 

onAuthStateChanged is like useEffect but it will trigger whenever the authentication state change. Meaning the auth variable has changed. 


## Context

This is so that a global value for the user is provided for all of the routes. The Context provider wraps around the application in general and its children are the functions mentioned in it. 

The functions are accessible by all child components. 

These functions allow the child components to change state within the Context Provider and then trat that state like a persistent, global value. 

Note that the loading functionality is needed because the firebase auth provider needs some time to fetch the current user and when it is not present, any checks for it in the auth context will yield undefined even when it is there.

# Tasks done so far

1. MERN flow completed: There is now a continous flow between the frontend, backend server processors and the database. Fully completed features are now ready to start being implemented into the application. 
2. Firebase password/account manager and MongoDD have been integrated for the user. 
3. Profile Page features complete: users can now change their profile information. 
4. House Page re-designed and completed: users can now create a house and update information about the house. 
5. Deployment of Express backend server using Heroku now means the app is truly online.
6. The Blog page needs to be made functional for the user.
7. The People page needs to be made functional for the user.
8. An inert profile page for other users needs to be functional for the user so that the app can start to be a truly multi-user system. The add housemates feature needs to be made functional here especially.
9. Housemate groupchat feature needs to be implemented. 
10. Geolocation of Houses on the map needs to be done and interactivity with the map needs to be implemented. 
11. Implement forgot password capability.

# Miscallaneous Tasks

1. Create delete function for user
2. Create reset function for user

# .local feature

This simply means that the environment variables will work both in development mode and production mode as well. Please note that the react project needs to be run again after changes are made to the  

# Github and the lack of security with Firebase/Database keys

It is important to note that the Firebase and Database keys are plainly in the github repos and public for everyone to see. This is a massive security risk if this were a real application instead of a demo application. 

The reason I have avoided placing the keys in a secure local file is due to the fact that I am using Netlify and Heroku to host my application and they are currently connected to the githubs of the project in order for updates to show up faster. 

Once we have moved out of the demo stage, the deployments will be de-linked from github and secure local files stored on the servers themselves will be used to provide the keys. 

