# Cooking App

This is the repository for the course project <b> Cooking App </b> from Section 3.

You can check it out [here](https://xenosgrilda.github.io/angular-8-course/home).

## App Planning
![App Diagram](./app-planning.png?raw=true "App Diagram")
## Sections

The course sections / lessons will be organized as commits, for instance:
The Section 2: The Basics will be
```
  "[section number] : [lesson number and title]"
  
  OR
  
  "[section number and name]"
```

## Bootstrap

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

Bootstrap JS was removed so our custom JS could be implemented, for academic reasons

## Authors

* **Eduardo Lima** - Xenosgrilda
