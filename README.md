# Zen Garden

_"Zen Garden is a minimalistic Meditation-Timer to help you find your zen moment fast"_

[![alt text](https://github.com/p0wen/zengarden/blob/master/assets/media/img/portfoliooverview.gif?raw=true "Zen Garden Demo")](https://p0wen.github.io/zengarden/ "Zen Garden")
 
___
## UX

### Purpose
The purpose of this Web-App is to allow people to track their meditation habits and have reliable timer to take the desired time off. Meditation is an effective method to relieve stress and increase well being. In our busy and stressful everday life it is often hard to find time to sit still and just take a deep breath. Due to my own experiences of meditating everyday and using various timers i had the motivation to build something that i can use myself and enable others to get the chance to benefit from a daily meditation.
 
### Who?

The WebApp is targeted to users who now basic principles or practices of meditation and who are looking for a solution to track their meditation time and have a motivation to keep up the day-to-day sessions by tracking their streak.

### Why?

Even though it would be great to have unlimited time for meditation like a zen monk, everyday life has its demands and we can often only slice a couple of minutes out of the day. Therefore the timer helps to enjoy the meditation sitting without worrying about meditating too long or too short. Since phone timers often have awkward timer sounds that are not sensitive the use of compelling gong sounds start and end the session itself.

### What?

 The core functionaly of this WebApp is to provide an meditation timer. It allows the user to start a session, which is signaled by a gentle gong sound. Furthermore the user has the option to activate/deactive an ambient sound, choose the prefered meditation time (5, 10, 15, 20 Minutes) and a background image. Additionally the WebApp tracks the day-to-day interactions and allows the user to track his/her meditation streak.

## User Stories 

The following user stories where defined before the development:
* As a meditator i want to choose between longer and shorter sessions, so that i can adjust my practice to my liking.
* As a mediator i want to have a countdown button after starting the mediation, so that i have time to close my eyes and adjust my seating before the "real" practice starts.
* As a meditator i want to be able to start / stop the timer, so that i can react to interruptions.
* As a meditator i want to be informed when a session is done, so that i know when my time is up.
* As a meditator i want to be able to activate / deactivate whitenoise, so that i have the chance to focus on my meditation in noisy surroundings.
* As a mediator i want to keep track of my day-to-day practice, so i keep being motivated even on days where my energy is low.
* As a meditator i want to see inspiration quotes, so that my mind has something to ponder on during my day.
* As a meditator i want to have beautiful backgrounds, so that my mind is in a positive state.


## Wireframes

The wireframes were sketched in Balsamiq Mockups and can be found [here](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes) or following the direct links:

[![Zen Garden](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/ZenGardenApp.jpg?raw=true "Zen Garden")](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/ZenGardenApp.jpg)

[![Zen Garden - Settings](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/ZenGardenSet.jpg?raw=true "Zen Garden - Settings")](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/ZenGardenSet.jpg)

#### Wireframes vs Finished project

|                 | Planned           | Result            | Reasoning   |
|-----------------|-------------------|-------------------|-------------|
| Web Landing     | ![Zen Garden -  Web](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_web.png?raw=true "ZenGarden") | ![Zen Garden - Final Web](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_fin_web.png?raw=true "Zen Garden Final") | * progressbar exchanged for animated outline * left out warmup/cooldown options * included settingsbutton |
| Mobile Landing  | ![Zen Garden - Mob](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_mob.png?raw=true) | ![Zen Garden - Final Mob](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_fin_mob.png?raw=true) | * exchanged progressbar for animated circle to track progress |
| Web Settings    | ![Zen Garden - Web Settings](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_web_set.png?raw=true) | ![Zen Garden - Final Web Settings](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_fin_web_set.png?raw=true) | * left out warm-up/cool-down option * only provided on/off switch for white noise and used bell as a default * reminder bell was excluded * added option for a random background * used morning/afternoon background |
| Mobile Settings | ![Zen Garden - Mob Settings](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_mob_set.png?raw=true) | ![Zen Garden - Final Mob Settings](https://github.com/p0wen/zengarden/blob/master/assets/media/wireframes/zengarden_fin_mob_set.png?raw=true) | (see websettings) |


## UI-Design

### Structure

The Web App is designed to be a single page application. It basically contains 4 different size sections. On top is the title bar which holds the Logo/Application Name and the Settings-Button. The section that follows provides space to display random Quotes from type.fit. The third section holds the core functionality of the app - the meditation timer. It displays a circle that gets filled as time progresses. Additionally the time is printed below the circle. The user has the option to interact with a single button which controls play, pause and reset. At the bottom of the page the Streakbar is being displayed. It contains of 7 squares which get exchanged for squares with a checkmark after a completed meditation.

### Colour scheme

The App backgrounds with a light greyfilter on top of it to reach a standardized look. Orange is used as a highlighting color and the font is white.


### Font

Roboto was used due to its "dual nature". On the one hand its clean and geometric and on the other hand it signals friendliness and openness, which is believed to also effect the user when seeing the font.


## Features

* Timer incl. Control, Start / Finish Sound
* Random Inspirational Quotes
* Ambient Sound can be activated/deactivated incl. volume controle
* 7-Day-Streak
* Background-Image can be switched (Morning, Afternoon, Random)
* Offline support
* Progress Web App support
* Warm Up & Cool-Down Time can be activated
 
### Finished Features

* Timer inkl. Control  
   Interactive countdown timer with animated circle created through the use of html, css, javascript  
   countdown time can be adjusted (5, 10, 15, 20 Minutes)
   countdown can be restored after finishing a session  
   countdown can be started, stopped and resumed  
   default meditation duration is 15 minutes  

* Inspirational Quotes  
   Quotes are fetched from type.fit/api/  
   Function calculates random number between 1 and 100 which is then used to choose the quoate from the array  
   quotes get fetched on every page reload

* Ambient Sound can be activated/deactivated incl. volume controle  
   integrated ~soundManager2~ howler.js library (ADD LINK) to handle playing of songs and support different browser  
   integrated start- and endbell sound  
   integrated option to play ambient sound (river sound)

* 7-Day-Streak  
   day to day activities are tracked through 2 localstorage variables (Number of Sessions & Date last session completed)  
   if one day of meditation is missed the streak is broken and all values are reset  
   after 7 days in a row a congratz popup will show

* Background can be switched (Morning, Afternoon, Random)  
   depending on the time of the day the user gets a different image  
   in the setting modal the user has the chance to manually switch between morning, afternoon or a random background image.   
   random background image is pulled from unsplash (https://source.unsplash.com)

* Offline support  
   Service Worker has been integrated to store core files in the users storage
   CacheName + CacheVersion can be used to control cacheUsage after Updates by increasing the version number

* PWA support  
   manifest was set up, so that it also allows the user to save the url to the homescreen and start it as an app from the homescreen
   necessary logos in demanded sizes where designed and created
   can be used as a standalone app

#### How to use it as an standalone App on iPhone Devices?

1. Open Safari
2. Call https://p0wen.github.io/zengarden/ 
2. Press "Share"-Button
3. Choose "Add to Homescreen"
4. Close Safari
5. Look on Homescreen for an orange app icon called "Zen"


### Features/Changes for the Future

* Warm Up & Cool-Down Time can be activated
* Reduce amount of global variables
* Increase amount of Jasmine tests
* Refactor code to increase testability
* Track amount of completed streaks (e.g. 4 x 7-Day-Streaks)
* Integrate reward program for multiple completed streaks 
* As user accaptance increases it could be interesting to store the user activities to a server to provide cross device support
* in order to support cross device support a user data base would also be a helpful feature
* Integrate End-to-End Testing Framework (e.g. Cypress) to increase quality


## Technologies Used

### Languages

* HTML5
* CSS3
* JavaScript

### Frameworks & Libraries 

* Bootstrap 4.5.0  
   To make use of a responsive css-framework and to ensure mobile first approach.
* Font Awesome 5.13.0  
   Using Icons within the page
* ~SoundManager2~  
* Howler.js  
   Howler.js library helpy to handles all audio() calls across various browsers  
   special support for iOS
* Google Fonts  
   To make use of the Roboto Font
* jQuery  
   Comes with Bootstrap

### Programms 
* Git  
   Version Control  
* GitHub  
   cloud-based hosting service to manage Git repositories.
* Gitpod  
   cloud-base development Environment 
* Balsamiq  
   Wireframe design tool
* Am I responsive  
   To Check responsiveness and create demonstration gif for readme


## Testing

### Automatated Testing

Jasmine used to set up tests. Some example test where written but should be extended more broadly in the future. Therefore it would make sense to refactor the existing functions to make them easier for testing.

### Manual Testing

#### Testing Protocol
1. Start Stop of Timer  
   ![Start / Stop Control](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/startstop.gif?raw=true)
   ![Start / Stop Countdown](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/countdown.gif?raw=true)
2. Entering Settings while no mediation is running
3. Entering Settings while meditation is running
4. Switching Meditation-Duration while no mediation is running  
   ![Time Control](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/switchinactive.gif?raw=true)
5. Switching Meditation-Duration while Timer is playing  
   ![Time Control while Active](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/switchwhilemed.gif?raw=true)
6. Switch background  
   ![Background Control](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/backgroundswitch.gif?raw=true)
7. Activate/Deactivate White-Noise & Change Volume of White-Noise  
   ![Sound Control](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/soundcontrol.gif?raw=true)
9. Check Streak Logic after one missed day
10. Check Streak Logic over 7 days  
   ![7 Day Streak](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/7daystreak.gif?raw=true)
11. Testing if Service Worker is running  
   ![Service Worker](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/serviceworker.png?raw=true)


#### Testing Methods
* Browser Compatability  
   Chrome  
   Safari  
   Brave
* Device Compatibility  
   iPhone 11 Pro  
   iPad
* Friends and Family Testing
* Peer-Review in CI #slack 

#### Validator Checks, Audits & Tools

* W3C HTML Validator (https://validator.w3.org/)  
   Used to make sure that no obvious html mistakes are made  
   fixed wrong data-attribute on buttons  
   removed unused code  
![Zen Garden - w3c Validator](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/w3validator.png?raw=true)
* CSS Validator https://jigsaw.w3.org/css-validator/  
   Running the Site through the validator produced a lot of errors - even from the bootstrap library  
   Only manually pasting my own css threw the following output  
   Warnings and errors are mainly focusing on browser specific extensions
   No changes were applied
   ![Zen Garden - Css Validator](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/cssvalidator.png?raw=true)
* JS Hint (https://jshint.com/)  
   Used to remove unused variables and check for mistakes  
   Howl was found since the howler.js libarary is called in the index.html and wasn't included in the file  
   controlAmbientSound & updateVolume are used on the buttons and not in the app.js file itself
![JS Hint Results](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/jshint.png?raw=true) 
* Lighthouse (https://developers.google.com/web/tools/lighthouse)  
   Used the validator to improve Performance, Accessibility, Best Practices, SEO and Progress Web App Setup  
![Light House Results](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/lighthouseresults.png?raw=true)
* Troy (http://troy.labs.daum.net/)
   tested layout on different device sizes
* caniuse.com  
   to check CSS content-visibility

### Known Bugs & Issues

* Fixed Bugs & Issues:  
   Sound on Safari not playing (switched from SoundManager2 to Howler.js)  
   Location of the play/pause button due to absolute positioning  
   Setup of PWA was tricky due to routing of github pages - solution was adapted from https://gist.github.com/kosamari/c5d1e8449b2fbc97d372675f16b566e

* Open Issues:  
   landscape view on mobile devices (especially iOS X Devices) still not 100%

#### Making the Site work on an iPhone 11 
Before:
![iPhone Support Before](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/appinlandscape.jpg?raw=true)

The site has problems with safari (and also chrome) and the viewheight calculation. The mobile browsers decided to calculate the viewheight incl. the bottom toolbar, which disappears when scrolling. Therefore content often hides behind the toolbar which is especially problematic when its a single page site. The solution which i found after hours of research and stackoverflow reading is to calculate the innerHeight of the screen and use it as a variable for the css height calculation. The innerHeight gets calculated on every resize action. Landscape mode made this even trickier with the notch. Removing the white bars in landscape mode and to allow fullscreen view pushed content behind the notch. Hence safety margins for Devices in Landscape mode and small screens where introduced. The solution is good but not perfect. The parent element displays content over the full screen width. However the grey masking of images is assigned to the content elements which use a different width and therefore not the whole screen is perfectly displayed on landscapemode. Many attemps with safari debugger and debugging the iPhone helped to make it better, unfortuantely it could not be resolved completly.

After:
![iPhone Support Before](https://github.com/p0wen/zengarden/blob/master/assets/media/test_results/appinlandscapefixed.PNG?raw=true)

____ 
## Deployment

### Deployment via Github Pages
* Log in to GitHub 
* Choose prefered GitHub Repository
* Navigate to Repository Settings
* Scroll to GitHub Pages Section
* Set Source from "None" to "Master Branch"

If you want to deploy the site to githubpages yourself, you will need to adjust the routes for the registration of the service worker and the according manifest.json. If you want to test the service worker on a local machine you also need to remove the /{repository name}/ from the scope. 

### Working with the Code

#### Option A: Make a Local Clone from GitHub Repository (also see https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
* Navigate to Mainpage of the repository
* Click on "Code" button
* Choose "Clone with HTTPs" & copy URL
* Open Terminal
* Change the current working directory to prefered location
* Type git clone and past copied URL
```git clone https://github.com/p0wen/zengarden.git```
* Press Enter to create local clone



#### Option B: Fork the repository (also see https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo):
* Navigate to Mainpage of the repository
* Click Fork in the top-right corner

#### Option C: Download zip file form Github

## Credits

### References

* Bootstrap 4.5
* css-trciks.com
* w3schools.com
* youtube.com
* stackoverflow.com
* medium.com
* css-tricks.com
* https://webkit.org/
* Registering Service Worker https://developers.google.com/web/fundamentals/primers/service-workers
* Fix Viewport for mobile Browser https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
* Accessing the Quotes - How to work with APIs based on this tutorial https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data
* Fetch JSON feed from type.fit
* Counting down the countdown & meditationduration (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)
* Streak Recording for past 7 days Inspiration by https://github.com/sanspoint/justdothething
* Meditation-Timer Tutuorial (https://www.youtube.com/watch?v=oMBXdZzYqEk&lc=UgxCgmwEKX-ECmNdcqN4AaABAg)
* iPhone safety margins https://webkit.org/blog/7929/designing-websites-for-iphone-x/

### Media

* unsplash.com
* freesound.org
* http://ami.responsivedesign.is
* favicon.io

### Acknowledgements

My Mentor for continuous help and support throughout the project.

The Code Institute Slack Community.

Friends & Family for continuous feedback and support.

# Contact

Created by @p0wen
