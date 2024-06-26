# Easy Meal Map

![](Easy-Meal-Map-Planner.png)
![](Easy-Meal-Map-Tracker.png)

## Overview

Easy Meal Map is a meal planning tool designed to streamline your meal planning routine and get personalized recommendations.

### Problem

It is needed to address the common challenges and frustrations people face when planning meals. Many individuals struggle with finding inspiration for meals, managing their time effectively, and accommodating various dietary preferences. Easy Meal Map solves these problems by providing a user-friendly interface that offers a wide range of recipes, meal ideas, and customization options.

### User Profile

- People who plan for their cooking:
  - Getting recommendations (based on their preferences)
  - Customize meal plans
  - Keeping track of their meals

### Features

- As a user, I want to be able to get a meal plan
- As a user, I want to be able to change my meal plans
- As a user, I want to be able to keep track of my meals
- As a user, I want to be able to check out recipes

## Development

1. Clone the git repos
   - Front-end: https://github.com/biyunzhu/easy-meal-map
   - Back-end: https://github.com/biyunzhu/easy-meal-map-api
2. Run npm i to install all dependencies
3. Run npm start

## Implementation

### Tech Stack

- React
- SASS
- MySQL
- Express
- Client libraries
  - react-router
  - axios
  - react-beautiful-dnd
- Server libraries:
  - knex
  - express

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Planner (Homepage)
- Tracker

### Data

https://drawsql.app/teams/pen-3/diagrams/easymealmap

### Endpoints

- **GET /recipes**
- **GET /recipes/:id**

- **GET /meals**
- **GET /meals/auto**
- **DELETE /meals?meal_id&recipe_id**
- **POST /meals**
- **GET /meals/id/:id**
- **PUT /meals/id/:id**

### Auth

- N/A

## Roadmap

- Create repos and git setup

  - front-end: create-react-app
  - back-end

- Research API for recipes

- Database setup

  - Retrieve recipes and clean sample data from API as seeds
  - Create a new project and Configure Knex.js
  - Create Tables
  - Seeding Data
  - Querying Data

- Research

  - Drag and Drop library

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create endpoints for back-end

- Features: Planner/Homepage

  - Get Meal list for this week
  - Edit Meal list (drag & drop)
  - Auto save
  - Auto generation
  - Delete recipe
  - Change recipe
  - Add recipe

- Features: Tracker
  - Meal list

## Nice-to-haves

- Add specific recipe
- Search recipe
- Recipe detail
- Authentication
- Auto generation rules
- Sync with External data
  - Notion
  - Import
- AI integration: personalized recommendations
- Customize meals per day
