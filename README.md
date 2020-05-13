# Angular 2+ Learning Project

This repository is dedicated to my learning journey in Angular, in here as described below, all the lessons are sorted as commits.
The Cooking App was the project that assembled all the knowledge gathered.

## Angular Features used:

* Components (Data biding, Dynamic, Projection...)
* Services
* Directives
* Modules
* HttpClient
* RxJs (Observables, Subjects and Operators)
* Forms (Template Driven and Reactive Approach)
* Routes
* Redux with NgRx

This project is hosted in [Firebase Hosting](https://firebase.google.com/docs/hosting) and the live version can be found [here](https://my-lists-api.web.app/home), and you can log in with
* email: testuser@test.com
* password: 123456

I had a great time learning this framework and this repository will be used for consult the learned content.

## Sections

The lessons will be organized as commits, for instance:
The Section 2: The Basics will be
```
  "[Section 'number'] : [lesson name]"
```
## Cooking App

The <b>Cooking App</b> is a project to practice what was being learned, It consists of a enhanced shopping list where you can add recipes with ingredients to make the shopping list creation easier. All the data and authentication is maintained in <b>Firebase</b>, you can upload your data a fetch it from there. 

It's structured as depicted below.

### App Planning
![App Diagram](src/assets/readme/app-planning.png?raw=true "App Diagram")

### State Management Approach
The initial approach was to use Services with Observables for managing the app state. This was a fine solution, but for scalability purposes
I decided to change the pattern to the [Redux](https://redux.js.org/) approach by using [NgRx](https://ngrx.io/) which is inspired by the
Redux pattern by with some advantages for Angular apps.

![NgRx State Management](src/assets/readme/state-management-ngrx.png?raw=true "NgRx State Management")




## Author

* **Eduardo Lima** - du-almeidalima
