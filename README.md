# Section 27: Service Workers

In this Module we'll look into Angular Service Workers to add Offline capabilities to an Angular
project.

A Service Worker is like a WebWorker, it runs in a separated thread from main JS, and it can be used
to intercept our requests and cache them.

To enable this feature in our project, we can run the command
```
    ng add @angular/pwa
```

Just by running this command, we already have a Service Worker application ready.
However, the Service Worker can be tweaked. in the [ngsw-config.json](ngsw-config.json) file.

In there the "assetGroups" groups can be defined, which are the assets our SW will cache. 
For example, it can be configured to cache "files" from our application or "urls".

To cache/serve dynamic data, we can use the "dataGroups" property, just like the "assetGroups".
This is the data requested by API, data that changes constantly.
## Sections

The course sections / lessons will be organized as commits, for instance:
The Section 2: The Basics will be
```
  "[section number] : [lesson number and title]"
  
  OR
  
  "[section number and name]"
```

## Built With
* [Angular](https://angular.io/docs) - 9.0.1
* [Materialize CSS](https://materializecss.com/getting-started.html) - 1.0.0

## Authors

* **Eduardo Lima** - Xenosgrilda
