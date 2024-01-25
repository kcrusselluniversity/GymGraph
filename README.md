# GymGraph

A full stack weight lifting tracker app.


## :open_book: Table of Contents
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Purpose](#project-purpose)
- [Lessons Learnt](#lessons-learnt)
- [Future Features](#future-features)

## :camera_flash: Screenshots


## :sparkles: Features

-   **User Authentication**: Offers a streamlined account creation process, allowing users to sign up using their email and a secure password. Alternatively, for enhanced convenience, users have the option to sign in directly using their Google account.
-   **Exercise Database**: A comprehensive database of over 1,200 exercises with descriptions, muscle groups targeted, and detailed animations demonstrating proper form.
-   **Progress Tracking**: Features for tracking workouts, including sets, reps, and weights lifted. 
-   **Analytics**: Graphs and charts to visualize progress over time.
-   **Countdown Timer**: A timer you can use to ensure you rest for long enough between sets for optimal hypertrophy.
-   **Calendar**: A calendar which highlights the days you have completed a gym session in green. When you click on the day in the calendar a modal opens and shows a summary of all exercises you have done for that day.  
-   **History using Pagination**: View your exercise history. This feature uses pagination to query the backend for only the data needed to fill the page. This avoid unnecessary payloads of data being requested, reducing load times and backend costs. 
-   **Mobile Responsiveness**: Designed to provide an excellent user experience on both mobile and desktop devices.

## :rocket: Technologies Used
-   **Frontend**:
    -   HTML/CSS/JavaScript
    -   React
    -   Vite 

- **Backend**
    - Firebase (Firestore/Authentication/Hosting)
    - Python (for scripting)

- **Testing**
    - Jest/Vitest
    - React Testing Library 
    - React Developer Tools (Chrome extension)

-   **Libraries**:
    - Material UI
    - React Router
    - Recharts

- **Other**
    - Jira (for project management)
    - Git and Github (for version control/repository hosting)
    - Figma (for initial design)

## :bulb: Project Purpose
I wanted to work on a larger scale, full stack project. I found the weight lifting tracking app I personally used didn't have the functionality and user experience I wanted, so I built one myself. 

A key focus I had for this project was to learn more about testing. I learnt a lot about good testing practices, when and what to test, and the different testing strategies including unit testing, integration testing and end-to-end (E2E) testing. I documented my lessons in the 'Lessons Learnt' section of this page.

Other key areas I wanted to focus on included project management (using Jira), folder management, and clean code practices (reusability/readability/maintainability etc).

I decided on using Firebase for the backend mainly for the simplicity and time saved by working with a Backend-as-a-Service (BaaS). I initially considered building the backend with Django/Python, however realised it would take a significantly longer time to build compared to Firebase, and my focus for this project was to improve my frontend and testing skills. 

## :books: Lessons Learnt


## :seedling: Future Features
With an application like this the opportunities for additional features are endless. Some of the keys things I would want to add include: 
- **Social Integration**: Functionality for users to connect with friends, share workouts, achievements, and potentially find workout partners.
- **Community and Support**: Forums or chat groups for users to discuss workouts, share tips, and offer support.
- **Gamification Elements**: Features like badges, challenges, and leaderboards to motivate users by making the process of lifting weights more engaging and competitive.
- **Personalised AI Recommendations**: Using AI to suggest personalised workouts and suggestions based on user data and progress.