# "Arta_test" - A multilanguage test-project for Frontend-Developer position.

Project is configured by webpack, it's loaders and plugins.  
Languages versions are stored in JSON-files.  
For prepaering project to development or production you have to run some ***node scripts***.   
## Project technologies:
- HTML
- CCS
- JS

## Preparing scripts | Process images | Process languages:
At first you need run ***imagemin.js*** and ***parse-lang-map.js*** files. By default they're running when you run <kbd>npm run dev</kbd> or <kbd>npm run build</kbd> commands.  

- <kbd>imagemin.js</kbd> - is a node.js script that compress saved original images and converts it to ***.webp*** format by default. It should approve the UX and web-page perfomance time. The converted images are stored in  <kbd>src/images/</kbd> path.

- <kbd>parse-lang-map.js</kbd> - is a node.js script that analyses json files in <kbd>src/lang/</kbd> folder and builds a "Language map" in <kbd>src/languagesMap.js</kbd> file, because of it we don't need to create one more Constant to describe our project-languages. We can just add .json file in a <kbd>src/lang/</kbd> folder  

To start project development you need run in console:  
1. <kbd>npm i</kbd>  - install dependecies
2. <kbd>npm run dev</kbd>  - run webpack in dev mode

To build project you need run in console:  
1. <kbd>npm i</kbd> ***(optional)***  - install dependecies
2. <kbd>npm run build</kbd>  - run webpack in production mode

## Translation
In text there are as ***static*** as ***{{dynamic}}*** text, that needs to get variables. Because of it there are two functions for each text-type.   
If the user-system language or lang-param in query string are not detected, then we put the page in english without translation, but anyway   translate function for ***{{dynamic}}*** text will be called.

To implement dynamic translation in general the libraty <kbd>i18next</kbd> was used.

## Authors feedback:

👉🏻 It was interestning test-project. I have demonstrated my skills in HTML, CSS and JS, but also in Webpack.  
Some tasks in layout were quite heavy in my view, but it's good, this is a challenge for me. 😊 
I'd be glade to hear some advice from you regarding some aspects 🤓.   
In the rest I think i've developed a well project. Hope for feedback 😊