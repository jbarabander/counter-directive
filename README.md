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
To set the min value of the directive as a clearing point simply put in the min-clears attribute on the counter.
```html
<counter step='1' max='50' min='1' quantity='myModel.quantity' clears='Remove Quantity'></counter>
```
If the property clears is not on the directive the quantity will not clear after setting it for the first time.
If clears is present without a value then the quantity will clear on the minimum you specified.  If you clears is present with a value then it will add that value as the first entry of your dropdown. 

You can also specify the message that is displayed when there is no quantity like so:
```html
<counter step='1' max='76' min='0' quantity='myModel.quantity' message='"Please select a quantity"'></counter>
```
If not specified it defaults to 'Choose a quantity'

##!!IMPORTANT!!
In order to change the height of the list items please do not set them with css, instead use the attribute cell-height on the counter-directive to change it.  Like so:
```html
<counter step='1' max='100' min='0' cell-height='32px'></counter>
```
This is done to ensure that autoscrolling works consistently (i.e. when you open the dropdown the topmost element in view will be the one that is currently selected.



