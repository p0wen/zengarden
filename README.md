# Zen Garden

_"Zen Garden is a minimalistic Meditation-Timer to help you find your zen moment fast"_

[![Portofolio View](https://github.com/p0wen/zengarden/blob/master/assets/media/img/portfolioview.gif?raw=true "Zen Garden Demo")](https://p0wen.github.io/zengarden/ "Zen Garden")
 
___
## UX

### Purpose
The purpose of this Web-App is to allow people to track their meditation habits and have reliable timer to take the desired time off. Meditation is an effective method to relieve stress and increase well being. In our busy and stressful everday life it is often hard to find time to sit still and just take a deep breath. Due to my own experiences of meditating everyday and using various timers i had the motivation to build something that i can use myself and enable others to get the chance to benefit from a daily meditation.
 
### Who?

The WebApp is targeted to users who now basic principles or practices of meditation and who are looking for a solution to track their meditation time and have a motivation to keep up the day-to-day sessions by tracking their streak.

### Why a timer?

Even though it would be great to have unlimited time for meditation like a zen monk, everyday life has its demands and we can often only slice a couple of minutes out of the day. Therefore the timer helps to enjoy the meditation sitting without worrying about meditating too long or too short. Since phone timers often have awkward timer sounds that are not sensitive the use of compelling gong sounds start and end the session itself.

### What?

 The core functionaly of this WebApp is to provide an meditation timer. It allows the user to start a session, which is signaled by a gentle gong sound. Furthermore the user has the option to activate/deactive an ambient sound, choose the prefered meditation time (5, 10, 15, 20 Minutes) and a background image. Additionally the WebApp tracks the day-to-day interactions and allows the user to track his/her meditation streak.

### User Stories 

The following user stories where defined before the development:
* As a meditator i want to choose between longer and shorter sessions, so that i can adjust my practice to my liking.
* As a mediator i want to have a countdown button after starting the mediation, so that i have time to close my eyes and adjust my seating before the "real" practice starts.
* As a meditator i want to be able to start / stop the timer, so that i can react to interruptions.
* As a meditator i want to be informed when a session is done, so that i know when my time is up.
* As a meditator i want to be able to activate / deactivate whitenoise, so that i have the chance to focus on my meditation in noisy surroundings.
* As a mediator i want to keep track of my day-to-day practice, so i keep being motivated even on days where my energy is low.
* As a meditator i want to see inspiration quotes, so that my mind has something to ponder on during my day.
* As a meditator i want to have beautiful backgrounds, so that my mind is in a positive state.

### Wireframes

The wireframes were sketched in Balsamiq Mockups and can be found [here](https://github.com/p0wen/zengarden/tree/master/assets/media/wireframes) or following the direct links:

[![Zen Garden](https://github.com/p0wen/zengarden/tree/master/assets/media/wireframes/ZenGardenApp.jpg "Zen Garden")](https://github.com/p0wen/zengarden/tree/master/assets/media/wireframes/ZenGardenApp.jpg)

[![Zen Garden - Settings](https://github.com/p0wen/zengarden/tree/master/assets/media/wireframes/ZenGardenSet.jpg "Zen Garden - Settings")](https://github.com/p0wen/zengarden/tree/master/assets/media/wireframes/ZenGardenSet.jpg)

#### Wireframes vs Finished project

|                 | Planned           | Result            | Reasoning   |
|-----------------|-------------------|-------------------|-------------|
| Web Landing     | insert screenshot | insert screenshot | * a * b * c |
| Mobile Landing  | insert screenshot | insert screenshot | * a * b * c |
| Web Settings    | insert screenshot | insert screenshot | * a * b * c |
| Mobile Settings | insert screenshot | insert screenshot | * a * b * c |

### UI-Design

* Structure
** single page 
** site with 4 Sections: Logo and Settings, Quotes, Timer, Streakbar

* Colour scheme
** orange as highlighting color and white font colour
** pictures with grey "filter" to standardize the looking

* font
** "Roboto has a dual nature. It has a mechanical skeleton and the forms are largely geometric. At the same time, the font features friendly and open curves. While some grotesks distort their letterforms to force a rigid rhythm, Roboto doesn’t compromise, allowing letters to be settled into their natural width. This makes for a more natural reading rhythm more commonly found in humanist and serif types."


## Features

* Timer incl. Control, Start / Finish Sound

* Inspirational Quotes

* Ambient Sound can be activated/deactivated incl. volume controle

* 7-Day-Streak

* Background-Image can be switched (Morning, Afternoon, Random)

* Warm Up & Cool-Down Time can be activated

 
### Finished Features

* Timer inkl. Control
** Interactive countdown timer with animated circle created through the use of html, css, javascript
** countdown time can be adjusted (5, 10, 15, 20 Minutes)
** countdown can be restored after finishing a session
** countdown can be started, stopped and resumed

* Inspirational Quotes

* Ambient Sound can be activated/deactivated incl. volume controle
** integrated soundmanager2 (ADD LINK) to handle playing of songs and support different browser
** integrated start and endbell
** integrated option to play ambient sound (river sound)

* 7-Day-Streak
** day to day activities are tracked through 2 localstorage variables (Number of Sessions & Date last session completed)

* Background can be switched (Morning, Afternoon, Random)
** depending on the time of the day the user gets a different image
** in the setting modal the user has the chance to manually switch between morning, afternoon or a random background image. 
** random background image is pulled from unsplash (https://source.unsplash.com)

### Features/Changes for the Future

* Warm Up & Cool-Down Time can be activated

* Reduce amount of global variables

* Refactor code

* Track amount of completed streaks (e.g. 4 x 7-Day-Streaks)

* Integrate reward program for multiple completed streaks 

* As user accaptance increases it could be interesting to store the user activities to a server to provide cross device support

* in order to support cross device support a user data base would also be a helpful feature

## Technologies Used

Languages

* HTML5
* CSS3
* JavaScript

Frameworks, Libraries & Programs

* Bootstrap 4.5.0
** 
* Font Awesome 5.13.0
** 
* ~SoundManager2~
** SoundManager2 helps with audio() support abroad various browser
* Howler.js
** Howler.js library helpt to handles all audio() calls across various browsers
** special support for iOS
* Google Fonts
** 
* jQuery
** 
* Git
** 
* GitHub
** 
* Gitpod
** 
* Balsamiq
** 
* Am I responsive
** 

## Testing

### Automatated Testing

### Manual Testing

Testing Protocol
1. Start Stop of Timer
2. Entering Settings while no mediation is running
3. Entering Settings while meditation is running
4. Switching Meditation-Duration while no mediation is running
5. Switching Meditation-Duration while Timer is playing
6. Switch background
7. Activate/Deactivate White-Noise
8. Toggle Volume of White-Noise
9. Check Streak Logic after one missed day
10. Check Streak Logic over 7 days
11. Testing if Service Worker is running --> Screenshot and Way to check

Testing Methods
* Browser Compatability 
* Device Compatibility
* Friends and Family Testing
* Peer-Review in CI #slack 

### Validator Checks, Audits & Tools

* HTML Validator
* CSS Validator
* JS Hint
* Lighthouse
* Troy
* caniuse.com

### Known Bugs & Issues

* Fixed Bugs & Issues:
** Sound on Safari (switched from SoundManager2 to Howler.js)
** Location of the play/pause button due to absolute positioning
** Setup of PWA was tricky due to routing of github pages - solution was adapted from https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e

* Open Issues:
** landscape view an mobile devices

## Deployment

Deployment via Github Pages
* Log in to GitHub 
* Choose prefered GitHub Repository
* Navigate to Repository Settings
* Scroll to GitHub Pages Section
* Set Source from "None" to "Master Branch"

Working with the Code

Option A: Make a Local Clone from GitHub Repository (also see https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
* Navigate to Mainpage of the repository
* Click on "Code" button
* Choose "Clone with HTTPs" & copy URL
* Open Terminal
* Change the current working directory to prefered location
* Type git clone and past copied URL
```git clone https://github.com/p0wen/zengarden.git```
* Press Enter to create local clone

Option B: Fork the repository (also see https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo):
* Navigate to Mainpage of the repository
* Click Fork in the top-right corner
* you sh

## Credits

### References

* Bootstrap 4.5
* css-trciks.com
* w3schools.com
* youtube.com
* stackoverflow.com
* medium.com

### Media

* unsplash.com
* freesound.org
* http://ami.responsivedesign.is

### Acknowledgements

My Mentor for continuous help and support throughout the project.

The Code Institute Slack Community.

Friends & Family for continuous feedback and support.

# Contact

Created by @p0wen
