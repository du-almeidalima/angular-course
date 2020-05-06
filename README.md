# Cooking App

This is the repository for the course project <b> Cooking App </b> from Section 25.
In this section we'll look into the Angular Universal, which is rendering Angular in NodeJS (Server Side) Environments.

To transform the app into a Angular Universal, run this command:

```
  ng add @nguniversal/express-engine
```

Also, for this project, two files needed to be adjusted:

tsconfig.server.json
```json
{
  ...
  "files": [
    "./main.server.ts",
    "../server.ts"
  ]
  ...
}
```

server.ts
```ts
  import express from 'express';
```

## App Planning
![App Diagram](src/assets/readme/app-planning.png?raw=true "App Diagram")

## State Management Approach
The initial approach was to use Services with Observables for managing the app state. This was a fine solution, but for scalability purposes
I decided to change the pattern to the [Redux](https://redux.js.org/) approach by using [NgRx](https://ngrx.io/) which is inspired by the
Redux pattern by with some advantages for Angular apps.

![NgRx State Management](src/assets/readme/state-management-ngrx.png?raw=true "NgRx State Management")

## Sections

The course sections / lessons will be organized as commits, for instance:
The Section 2: The Basics will be
```
  "[section number] : [lesson number and title]"
  
  OR
  
  "[section number and name]"
```


#### Installation
Bootstrap 4.3.1 was installed in this project through npm with the command: 
```
npm install --save bootstrap
```

Also, for using bootstrap js utilities: 
```
npm install --save jquery popper.js
```
#### Configuration
In order
to Angular recognizes it, we need to specify it into 'angular.json' file:

```
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
```

Bootstrap JS has been removed, so our custom JS could be implemented, for academic reasons

## Authors

* **Eduardo Lima** - Xenosgrilda
