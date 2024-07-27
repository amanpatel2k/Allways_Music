# CPSC-491 Capstone Project: ALLWAYS MUSIC

## Team Members: 
Names: Aman Patel, Matthew Merrick, Siddharth Chauhan, Kyle Yee & Peter Ossipov
<br> Team Number: Group #4 </br>

## Project Description: 
This application can allow users to convert any public playlist from one music platform to another. Our application will create a generic music playlist once the client converts a music playlist and will be granted the ability to open that specific generic playlist on any available music platform, such as Spotify or Apple Music.

## Installation

Once you have cloned or downloaded our repo and navigating to the current directory for this project on an IDE, follow these steps: 

```
1. npm install 
2. npm start
```

If you don't have npm install, use this command:

```
npm install -g npm
```

## Technologies and Tools Used: 

<strong> Programming Language: </strong> JavaScript, HTML5, CSS3 <br>
<strong> IDE: </strong> Visual Studio Code <br>
<strong> Software Frameworks:</strong> React JS, Tailwind, Firebase <br>
<strong> Database:</strong> Firebase Cloud Firestore <br>
<strong> API: </strong> Spotify and Apple Music API <br>

## Different Pages: 

### Sign-Up, Sign-In, and Forgot Password
---

<br>Sign-Up Page: The sign-up page is where the user will be able to create their account in order to use the application. The client will be prompted to provide their: First Name, Last Name, Username, Email address, and Password. 
 </br>
 
<img width="794" alt="Sign Up" src="https://user-images.githubusercontent.com/50725935/235390022-eda8ff0f-f389-4a1e-9f4b-d33fcf021cb2.png">

<br>Sign-In Page: The sign-in page is the first page the user will see when they visit the website. The user will input their email address and password to sign in successfully. </br>

<img width="809" alt="Sign In" src="https://user-images.githubusercontent.com/50725935/235389982-07c8a6be-5b4c-4719-8b32-556a22ee5633.png">

<br>Forgot Password Page: The forgot password page is for when the user does not remember their password. The user will be prompted to enter their email address. If the email address entered is valid and in the database, an email will be sent to that email address, prompting the user to enter a new password. </br>

<img width="795" alt="Forgot Password" src="https://user-images.githubusercontent.com/50725935/235390045-9bd09d40-3c46-4e52-a28c-c64d3223680f.png">

### Dashboard Page 
---
<br> This is the welcome page of the Allways Music application. This page allows the user to learn more about this application, such as a brief introduction, credits, and what music applications/platforms work with this application. Overall, it is an introduction page to our application. </br>

<img width="1440" alt="Dashboard Page" src="https://github.com/user-attachments/assets/834f105f-ee5a-4c11-bead-af3df023a87b">

### Convert Page
---
<br> The converted page is where users can convert their public playlist from any music platform to create a generic playlist stored on our database and accessible on the Playlist page. The user will enter a public ID associated with an application and select the music platform related to the playlist. An example is such a public Spotify playlist URL is https://open.spotify.com/playlist/3ybZkcoA09pYekp0DIo1OP, where the ID is after the playlist/ which you will input as the public ID. Once the user enters all the parameters, the client can click the convert button to generate a generic playlist that they can view on the playlist page. </br>

<img width="1440" alt="Convert Page" src="https://github.com/user-attachments/assets/ef5001e6-29d2-4377-baa7-7cf41a277769">

### Playlist Page
---
<br> The playlist page displays the user's generic music playlists already converted. This page will display all the music playlists that the users converted. Users will be shown a table of detailed information regarding song titles, artists, and time duration for each of their playlists. Also, the users can now open the playlist on their desired music platform, such as Spotify or Apple Music.  </br>

<img width="1440" alt="Playlist Page" src="https://github.com/user-attachments/assets/a74b2d8e-4040-4a02-85c7-5828b21699b7">

<br> Additionally, users can click the "View2" button on a given playlist to see their song in a different visual format visually. Each song will be wrapped in a card where each card will display the song's image, the title of the song, the artist, and the song's album. </br>

<img width="1440" alt="Playlist Detail" src="https://github.com/user-attachments/assets/63c4e1fc-d6f4-4590-b120-0831c1998def">

### Profile Page
---
<br> Users will be able to edit their attributes, such as their username and their profile picture. When the user clicks on change password, an email will be sent to the email address provided by the user. Additionally, the user’s playlists will be displayed below, giving a brief overview of that playlist itself. </br>

<img width="1440" alt="Profile Page" src="https://github.com/user-attachments/assets/3bffe70f-4267-4d12-ab7c-6e2822d385c9">
<img width="1440" alt="Profile Page_2" src="https://github.com/user-attachments/assets/cd88c657-c7d5-485a-82ae-9f6bff3514d8">
