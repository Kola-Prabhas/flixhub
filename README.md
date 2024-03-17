# Description


This is made with `NextJS`, `TailwindCSS`, `NextAuth` and `mongodb`.

Flixhub is a video streaming app. You can watch movies, Tv and so on..
You can add your favourites movies to your list and find them in the my-list section.

# Set Up Instructions

### Clone this repository 

```
https://github.com/Kola-Prabhas/flixhub.git
```

### Enter the app directory

```
cd flixhub
```

### Install the dependencies

```
npm install
```

### Enter the following command to run the app
```
npm run dev
```

# Logic Summary

## The main folders in the app are

- app
- app/api
- auth-provider
- components
- context
- database
- models
- utils

### app
This is the main folder and contains various routes of the app using app-router

### app/api
This folder contains api-endpoints to add, delete and get data from the database and authetication using github provider.

### auth-provider
This folder provides the utility of session provider using next-auth session provider

### components
This folder contains various reusable components of the app.

### context
This folder provides utilities for global state using context provider

### database
This folder provides utilities for connecting to the database

### models
This folder has models like Account and Favourites which provides schema for storing the data in the database

### utils
This folder has utility functions for communicating with the api endpoints
