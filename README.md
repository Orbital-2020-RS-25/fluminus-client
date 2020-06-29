# Fluminus Mobile App

Mobile client for the Luminus app made for Orbital. 

Made in React Native, with a [flask backend server](https://github.com/Orbital-2020-RS-25/pyfluminus-server) hosted on Heroku. 

Work in progress.

# Motivation
Luminus is one of the essential platforms for all National University of Singapore (NUS) personnel. It allows students to access their classes and their relevant information, such as announcement, lecture files, and reminders of events.  Our team identified two drawbacks that we believe there exists room for improvement - 1. lack of clarity on upcoming important events, such as due dates, and 2. the lag users experience when a large number of students sign on at once.

To tackle the identified problems, we defined clear expectations for our proposed solution; the product must be intuitive, and fast.  Intuitive so that users can easily view the information they require(such as test dates), and fast to reduce user frustration. Mobile phones will be our platform of choice as we believe crucial information such as test timings should always be within an arm's reach at any point in time.

Although there is a pre-existing APP for Luminus, its' UI is cluttered, and navigation is tedious. The APP also lacks basic features such as a file management system, making it even harder to use the APP. Thus there is merit in our solution to improve the convenience of NUS students.

# Screenshots
![Login]
![Schedule]
![Side drawer]
![Announcements]
![Files]

# Tech stack

Front-end: [React-Native](https://reactnative.dev/ "React-Native")

Back-end: [Flask](https://flask.palletsprojects.com/en/1.1.x/ "Flask documentation")

Server: 

# Features
S/N |	Feature |	Function	| Achieved
--- | ------- | --------- | --------
1 | Login | Able to login to user account | ✅
2 | Schedule | Able to look at schedule to see upcomming events/ tests/ etc. | ✅
3 | Module info | Able to select modules and get relevant information (files, announcements) | ✅
4 | Push notification | Able to send push notification for important events (eg. assignement due date) | ❌
5 | Persistent login | Able to set login once and forget feature (TBD on security risk) | ❌

Legend:
✅ - Done
❌ - Under review / Not done

# Installation

Yarn: `$yarn install`

# API Reference

# Tests

# How to use?
1. Emulate the APP using emulator of choice
2. Login to Luminus with studentID, passowrd
3. Homepage will display current schedule, upcomming classes etc
4. Clicking the menu on the top left hand corner will allow navigation to module information and to log out
5. On the module information page, select module to view
6. Announcements will be displayed, along with files, and multimedia on bottom tab

# License
