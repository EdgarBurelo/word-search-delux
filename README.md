## Word Search Deluxe

It is a React Application which displays a grid of characters, the user
needs to find the word in the translation expected language and select it
with the mouse.

The tech stack is React and Typescript, the application is bundled with
webpack, tested with jest and react testing library finally the code is being 
formatted for development with eslint. 

The application can be run by installing the dependencies by in the root folder
and run `npm install` (ideally with  node v18.3.0 && npm v8.12.1) and the run
`npm run dev`, the application should run on localhost port 9009.

### General Improvements
#### Infrastructure 
Ideally this application should be able to run by a container 
so writing a dockerfile would be one of the next steps to be able to be deployed
and developed within a contained environment.

#### Two or more answer options
The data structure defined supports words with only one translation yet
there are options that have more than one translation and this would be
another improvement.

#### Nicer Styles
The color scheme could be nicer to look at :)