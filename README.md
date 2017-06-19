# Stepstone
## What is in this directory?
 
- [ ] Answers to written questions are saved as .txt files (*question1.txt, question2.txt*)
- [ ] Answers to coding developer questions are located in their respective folders (Q.3 -> Palindrome, Q.4 -> KeywordArray)
- [ ] The final API challenge is included in its own folder, labeled *vue-revenue-app*.  It is built in Vue.js
 
## How to get the API page up and running
 
- [ ] Clone the stepstone repository
- [ ] cd into *stepstone/vue-revenue-app*
- [ ] In the command line: *npm install*
- [ ] In the command line: *npm run dev*
 
## Issues (Bugs etc.)
 
- [ ] The given API ‘company’ sort option creates a fatal error when GET is called so a  replacement ‘companies’ parameter was used instead.  However, while this does not cause a fatal error, it also does not accomplish any type of sort functionality.  The ‘revenue’ sort parameter works properly.
- [ ] CORS.  Unfortunately, I was unable to resolve an issue when attempting to POST to the API.   It seemed to be requiring the addition of a header for the cross-site request but I was unable to figure out the configuration to allow this (if that is in fact the issue)
- [ ] The API key was committed to Github with the initial commit and was then moved to an environment variable which was also committed.  Ultimately, this is bad practice and in hindsight could have easily been avoided.
 
## TODO’s (Given more time)
 
- [ ] Clear out input fields based on different actions.
- [ ] Create a more dynamic graph that looks nicer and updates with updated information (currently only the text revenue totals would update on the graphs but not the actual bars themselves).
- [ ] Write tests for both the JavaScript challenges and the API page.
- [ ] Improve the responsiveness of the page when resizing and viewing on varied screen sizes
