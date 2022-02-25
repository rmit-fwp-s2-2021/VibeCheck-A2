# VibeCheck-A2
Full Stack application for Further Web Programming semester 2 2021. This is a social networking site for students of RMIT.

## How to run
After cloning, install dependencies with
<code>npm install</code>

Run the api first and then the frontend with 
<code>npm start</code>

## What I learned
<ul>
  <li>How to use built-in and custom React hooks. </li>
  <li>How to convert class components to functional components.</li>
  <li>How to build a CRUD app with Node and GraphQL.</li>
  <li>How to use Chart.js to display analytics.</li>
  <li>How to build a REST Api with Node.js. </li>
</ul>

## App Architecure
![](architecture.PNG)


## Database Design
![](ER_Diagram.png)

<hr>

## Admin Functionalities
Start the admin-backend (GRAPHQL API) first and then the admin-app (React fronted) with the same 
<code>npm start</code>

<ul>
<li>Admin can update and block users.</li>
<li>Admin is able to delete posts</li>
</ul>
<br>

React-Chart.Js was used to display graphs.
<ul>
<li>Admin can view popular posts. Posts are ranked by a popularity score which is measured by likes/dislikes and replies. <br>Each like increases point by 1. Each reply increases point by 2. If post has more dislikes than likes 2 points are deducted from score</li>
</ul>

