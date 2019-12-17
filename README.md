# iMatch
CS-546 Final Project

## Project iMatch

Overview

Project iMatch is a web application that can assign a class of students into groups based on location and availability in order to complete a group project. Students can sign into Project iMatch and complete their member profile including where they live or work and what days of the week and time of day they are available to collaborate. Professors can use Project iMatch to set maximum group sizes or number of groups and upload a class roster. The application then sorts students into groups based on matching schedules and locations that adhere to the group size the professor set. With the help of the Google Maps API, Project iMatch can even suggest a convenient and equidistant meeting spot based on the location of students in a group.


## Core Features


Students matched and sorted into groups according to availability and/or location
Google Maps API used to triangulate a convenient meeting place

## Extra Features

Support for multiple group projects per student and course
Support for the application to suggest meeting places based on a type filter (e.g. suggest only libraries or only locations that have x feature)

## iMatch Installation
In the command shell, navigate to the directory where iMatch is located
run the following:

        npm install

iMatch and all it's dependencies should install.

## Seeding the iMatch Sample Database
In the command shell, navigate to the directory where iMatch is located
run the following:

        npm run seed

The iMatch sample database will be populated with sample users. The command shell will output: "Done seeding database"

## Starting the iMatch Web Server
In order to view the features of iMatch, you must start the web server.

In the command shell, navigate to the directory where iMatch is located
run the following:

        npm start

The iMatch sserver will start and display a log of all http requests executed in the browser.

iMatch can be viewd in your favorite browser while the iMatch Web server is running by
navigating to http://localhost:3000/

## iMatch Code Repository
The imatch code repository is hosted on GitHub:

https://github.com/yayacodes/iMatch