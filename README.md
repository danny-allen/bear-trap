# Bear Trap

## Overview
+ About
+ Installation
+ Usage
+ Options

---------------------------------------


## About

JS helper to show which CSS breakpoint is active.


## Installation

```bash
	bower install https://github.com/danny-allen/bear-trap.git --save-dev
```

## Usage

```js
	(function($, window, document, undefined) {

		'use strict';

		var bearTrap = new Helpers.BearTrap();
	  
	})(jQuery, window, document);
```

## Options

| Option 	    		| Default value    					| Description   										|
| --------------------- |-----------------------------------| ------------------------------------------------------|
| bears		    		| (See code)						| The screen sizes, named as bears, with a width value.	|
| styles	      		| (See code)    					| Styles for the bear trap element.						|
| appendElement    		| $('body')			      			| Element to append the bear trap to					|

