# counter-directive
Your friendly neighborhood stepped counter directive
##Summary
This is a small directive that allows you to put a stepped counter complete with dropdown and plus or minus buttons for your code.
It utilizes ui-bootstrap along with the kamilkp's marvelous angular-vs-repeat directive.

##Example
counter-directive is very simple to use.  You simply inject ng-counter-directive into your dependencies and then you have access to a counter directive like follows:
```html
<counter step='1' max='100' min='0'></counter>
```
and voila! you have a nice counter dropdown.  Of course you will likely want to connect this with an ng-model.  Using the attribute quantity you can do just that:
```html
<counter step='1' max='100' min='0' quantity='myModel.quantity'></counter>
```
Sometimes you wish to have a minimum quantity after which your input clears.
To set the min value of the directive as a clearing point simply set the min-clears attribute to true like follows.
```html
<counter step='1' max='100' min='0' quantity='myModel.quantity' min-clears='true'></counter>
```

##!!IMPORTANT!!
In order to change the height of the list items please do not set them with css, instead use the attribute cell-height on the counter-directive to change it.  Like so:
```html
<counter step='1' max='100' min='0' cell-height='32'></counter>
```
This is done to ensure that autoscrolling works consistently (i.e. when you open the dropdown the topmost element in view will be the one that is currently selected.



