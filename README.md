# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Intro Angular

### Why is this important?
<!-- framing the "why" in big-picture/real world examples -->
*This workshop is important because:*

Angular is the JavaScript framework that we'll explore as a class. There are many frameworks that all aim to solve the same pain points for JavaScript developers. Learning one framework is a foot in the door for teaching yourself React, Ember.js, Backbone, Angular 2, and whichever framework your employers use.


### What are the objectives?
<!-- specific/measurable goal for students to achieve -->
*After this workshop, developers will be able to:*

- Explain the benefits of using Angular and describe the problems Angular aims to solve.
- Initialize Angular in an HTML view, and use expressions and templates to impact the DOM.
- Organize the code into controllers and connect the View & Controller using `this`.
- Implement 2-way data binding.

### Where should we be now?
<!-- call out the skills that are prerequisites -->
*Before this workshop, developers should already be able to:*

- use Handlebars templates to populate your page with data.
- manipulate the DOM using jQuery.
- use AJAX to make HTTP calls to the server side.


## Highlights of AngularJS

[Angular Guide Introduction](https://docs.angularjs.org/guide/introduction)

Stuff that has been said about Angular:

* A "framework for dynamic web apps"
* "Lets you use HTML as your template language"
* Will "extend HTML's syntax"
* "Handles all of the DOM and AJAX glue code you once wrote by hand and puts it in a well-defined structure"
* Is "opinionated about how a CRUD application should be built"
* Comes with "Data-binding, basic templating directives, form validation, routing, deep-linking, reusable components and dependency injection"
* "Angular simplifies application development by presenting a higher level of abstraction to the developer"
* "Not every app is a good fit for Angular. Angular was built with the CRUD application in mind."
* "Angular is built around the belief that declarative code is better than imperative when it comes to building UIs and wiring software components together, while imperative code is excellent for expressing business logic."

## Refresher

### HTML attributes
In `HTML` when you can add additional information to tags by using attributes like: `src`, `href`, `type`, `name`, `placeholder`, etc.

```html
<img src="/cute-cat-3.gif">
<input type="text" placeholder="Username">
```

Some attributes don't need to be assigned a value:

```html
<input type="checkbox" checked disabled>
```

This is like saying `checked=true` and `disabled=true`. [x]

**HTML `data-*` attributes**

Sometimes it's helpful to attach additional information to an element so that you can reference it in your javascript or stylesheet. We can do this using the `data-*` attribute

```html
<h1 data-wdi-number="27">Welcome to WDI!</h1>
```

We'll discover that Angular uses lots of new custom attributes or `directives`.
Literally ever single attribute we might want to use in plain-old html has an equivalent angular attribute. These are always prefixed with `ng-*` or `data-ng-*` (we're going to stick with `ng-*`). For instance, an angular-style href is called `ng-href` or `data-ng-href`, and in the docs it's called [ngHref](https://docs.angularjs.org/api/ng/directive/ngHref).

**Expressions**
When we used Handlebars, we used the `{{}}` syntax to drop dynamic values into our html templates. Similarly in Angular, blocks of code within `{{}}`s are called *expressions*.  You can put working JavaScript inside of an expression. It's a JavaScript oasis inside of the html!

![Oasis](http://images.fineartamerica.com/images-medium-large-5/desert-oasis-robert-thornton.jpg)

`{{["a","b","c"][2]}}` will display `c` in the html. Why?

Typically, we aim to keep the JavaScript separated out into a different file and just use expressions to refer to that file's variables. We don't want to keep logic in the html. We'll discuss that structure in a few minutes.

### Event Binding
We learned about event-binding using jQuery. Here's how we might bind to a `button` tag being clicked (the "click event").

```html
<button>Pick Me!</button>
```

```js
$("button").on("click", function(event){
    alert("You clicked the button!")
});
// or, using the shorthand
$("button").click(function(event){
    alert("You clicked the button!")
});
```

It turns out you can do the same thing using inline click-listeners (long considered bad practice):

```html
<button onclick="alert('Holy moly!')">Pick Me!</button>
```

Note that your javscript expression is literally a string here.
```js
"alert('Holy moly!')"
```

What's happening is your string is being evaluated, using `eval`.

``` js
eval("alert('Holy moly!')")
eval("alert(1+1)")
```

We'll discover that Angular has come full circle, and does something quite similar in our views! To make the same button alert us on click, Angular would do it this way:

```html
<button ng-click="$window.alert('Holy moly!')">Pick Me!</button>
```
or to trigger an event on hover:

```html
<img ng-src="/cute-cat-{{cat.id}}.gif"
    ng-hover="$window.alert('{{cat.name}} says Meow!')">
```
With Angular, this is considered acceptable practice!

> Pro-Tip: You should never use jQuery in Angular applications! You'll need to learn to talk to the DOM the "angular" way.

### [Directives](https://docs.angularjs.org/guide/directive#what-are-directives-)

![](http://image.slidesharecdn.com/angularjssagaracharya-151228185609/95/angular-js-introduction-14-638.jpg?cb=1451329042)

In Angular, we **add behavior to HTML** through directives. A directive is a marker on a HTML tag that tells Angular to run or reference Angular code. You've already seen several!

Angular directives start with the prefix `ng-`

A few that will be important to know:

`ng-app` turns ordinary HTML into an Angular application. You will need Angular loaded into your project (via a package manager or CDN) for this to work.

`ng-controller` connects a controller (a JavaScript file containing logic) to a section of our application.

`ng-model` ties together (*binds*) values in HTML and data in the controller.

`ng-repeat` iterates over a collection and can display a chunk of html once for each element in the collection.

### `ng-controller`

Controllers contain the business logic for our application. They're the place that we're going to be writing our JavaScript.

This is typically what it looks like to define a controller:

app.js

```js
angular
  .module('tunely',[])
  .controller('AlbumsIndexController', AlbumsIndexController);

  function AlbumsIndexController() {
    var vm = this;
    vm.thing = {};
    vm.func = function(){};
    // more logic here
  }
```

Notice that we give a controller a name `'AlbumsIndexController'` and then pass a function that defines all of the logic within that controller, `AlbumsIndexController`.

Most applications will have several controllers. Each controller controls a different part of the application.

To use our controller in our View we have to declare it somewhere.

index.html
```html
<div ng-controller="AlbumsIndexController as albumsIndexCtrl">
	<!--placeholder for now-->
</div>
```

Using this `as` syntax, we have specified an abbreviated name,`albumsIndexCtrl`, for referring to our controller. In our view, if we want to refer to any of the logic defined in the controller, we can use `{{albumsIndexCtrl.thing}}` or `{{albumsIndexCtrl.func()}}`.


### `ng-model`

If a user wants to use an input element to create a piece of accessible data, `ng-model` is the directive for the job!

Within our controller `div` tag, let's create an input field for our name. We can then use `ng-model` to attach the input value to a variable name `myName`. Using an angular *expression* we can then display the current value of that `myName` variable as it changes.

```html
  <div ng-controller="SampleCtrl">

    <span>Enter your name:</span>
    <input type="text" ng-model="myName">

    <h1>{{ myName }}</h1>

  </div>
```

## Setting up an Angular app

#### Key steps
* Is angular loaded through a package manager or CDN?
* Has the html document been informed that it's supposed to act like an `ng-app`?
* If necessary, has the controller been defined?

If we want a specific `ng-app`, we need to define it in JavaScript with this kind of declaration:

```javascript
angular
.module('appName', []);
```

Our `ng-app` directive in the html needs to match that name:

```html
<html lang="en" ng-app="appName">
```

If we're using a controller, we need to define it in javascript along with our app:

```javascript
angular
  .module('tunely', [])
  .controller('PageController', PageController);

  function PageController () {
  var vm = this;
  vm.newPerson = {};

  vm.newPerson = {
      name: 'Cory',
      occupation: 'WDI instructor'
  };
}
```

We'd then declare its use in the proper place in our html:

```html
<div class="container" ng-controller="PageController as pageCtrl">
  <!--html inside of here can display and adjust the information from the PageController-->
</div>
```

## Practice
* [Intro Angular Challenges](https://github.com/sf-wdi-33/intro_angular_challenges)
<!-- https://github.com/SF-WDI-LABS/intro_angular_challenges -->

* [Tunely Angular, Sprint#1](https://github.com/sf-wdi-33/tunely-angular)
<!-- https://github.com/sf-wdi-33/tunely-angular -->
