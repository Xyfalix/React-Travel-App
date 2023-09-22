# TravelLog

TravelLog serves as an app where users can search for attractions by city and save their favourite destinations into a bucket list, and the saved destinations can be checked off when visited.

## Table of Contents

1. [Features](#features)
1. [Project Brief](#project-brief)
   - [MVP - Minimum Viable Product](#mvp---minimum-viable-product)
   - [Optional Goals](#optional-goals)
1. [Screenshots](#screenshots)
1. [Technologies Used](#technologies-used)
1. [Getting Started](#getting-started)
1. [Next Steps](#next-steps)
1. [References](#references)
   - [APIs](#apis)

 
## Features

- Search for attractions by country/city.
- Save desired attractions into your bucket list.
- Bucket List displays all saved attractions
- Saved Attractions can be marked as completed/deleted.

## Project Brief

### MVP - Minimum Viable Product

- Build a web application using create-react-app / vite or next.js.
- Use 3rd party API and Airtable
  - Calling an API and displaying the data for the user. You may use any API of your choosing.
  - You must use Airtable to store data.
- Use React framework to build your application with at least:
  - 5 components
  - 4 props
  - 2 useStates
  - 2 react router routes
  - 1 lifting state, which isused to implement CRUD on the client side
- Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, **it should have a consistent and polished user interface**.
- Be deployed online (Vercel).
- Have **full-CRUD single model operations** somewhere within the app's features. For example, you can have functionality that Creates & Updates & Delete by implementing the ability to CRUD favourites.

### Optional Goals

- Use more than 1 API
- Use more than 1 model with Airtable
- Have suitable validations and/or fetch loading states
- Use a React component library like Ant Design or Material UI
- Use a CSS Framework or a design system

## Screenshot(s)

<img width="500" height="500" alt="Screenshot 2023-09-22 at 9 19 39 AM" src="https://github.com/Xyfalix/React-Travel-App/assets/129175727/6d73400f-c45d-4075-81d2-0baa89b10ad2">

<img width="500" height="500" alt="Screenshot 2023-09-22 at 9 22 55 AM" src="https://github.com/Xyfalix/React-Travel-App/assets/129175727/e5253906-e972-4c2c-9f66-6bbb15e91bdd">

<img width="500" height="500" alt="Screenshot 2023-09-22 at 9 23 22 AM" src="https://github.com/Xyfalix/React-Travel-App/assets/129175727/47a2496e-5270-40c4-a4b7-d125f4caa17b">

<img width="500" height="500" alt="Screenshot 2023-09-22 at 9 23 39 AM" src="https://github.com/Xyfalix/React-Travel-App/assets/129175727/5db41560-4d94-4a80-b74f-f59649a447ad">


## Technologies Used

- React with Vite
- Tailwind CSS
- Insomnia

## Getting Started

- [Wireframe Draft (Project Planning)](https://miro.com/app/board/uXjVMknY8Us=/?share_link_id=990921427117)

## Next Steps

Possible future improvements for the TravelLog app include:

- Display a short description and a carousel of images for each displayed destination

- Display search results by highest user review

- Add additional filters when searching (e.g filtering by nature, theme park, food establishments

- Allow user to submit reviews and ratings of the places they have visited.

## Challenges Faced

- Struggled to find a suitable API that had the information that I required. Was unable to use the better APIs like Google Places or TripAdvisor which has better travel related information.

- Learnt to compromise and make use of available APIs, even if they are more limited in features.

- Struggled with Tailwind.css for a while due to not knowing that certain styles have prerequisite style settings that also need to be included in order for the styling to work.

## References

### APIs

- [OpenCageData](https://opencagedata.com/api)
- [GeoApify](https://www.geoapify.com/place-details-api)
- [AirTable](https://airtable.com/)

