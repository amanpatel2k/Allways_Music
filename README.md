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

<img width="1440" alt="Dashboard" src="https://github.com/GooseM3/CPSC-491/assets/50725935/582dddd1-d0b7-458d-b1b0-d2218d3296b4">

### Convert Page
---
<br> The converted page is where users can convert their public playlist from any music platform to create a generic playlist stored on our database and accessible on the Playlist page. The user will enter a public ID associated with an application and select the music platform related to the playlist. An example is such a public Spotify playlist URL is https://open.spotify.com/playlist/3ybZkcoA09pYekp0DIo1OP, where the ID is after the playlist/ which you will input as the public ID. Once the user enters all the parameters, the client can click the convert button to generate a generic playlist that they can view on the playlist page. </br>

<img width="1440" alt="Convert" src="https://github.com/GooseM3/CPSC-491/assets/50725935/bb9a231a-0269-4284-a2d3-04cf7461d2f9">

### Playlist Page
---
<br> The playlist page displays the user's generic music playlists already converted. This page will display all the music playlists that the users converted. Users will be shown a table of detailed information regarding song titles, artists, and time duration for each of their playlists. Also, the users can now open the playlist on their desired music platform, such as Spotify or Apple Music.  </br>

<img width="1440" alt="Playlist" src="https://github.com/GooseM3/CPSC-491/assets/50725935/2d81abf8-1673-4050-b0e5-0c0aac52f2bb">

<br> Additionally, users can click the "View2" button on a given playlist to see their song in a different visual format visually. Each song will be wrapped in a card where each card will display the song's image, the title of the song, the artist, and the song's album. </br>

<img width="1440" alt="Playlist View2" src="https://github.com/GooseM3/CPSC-491/assets/50725935/938d30cd-7218-49e2-bc23-2de849088b47">

### Profile Page
---
<br> Users will be able to edit their attributes, such as their username and their profile picture. When the user clicks on change password, an email will be sent to the email address provided by the user. Additionally, the user’s playlists will be displayed below, giving a brief overview of that playlist itself. </br>

<img width="1440" alt="Profile Page" src="https://github.com/GooseM3/CPSC-491/assets/50725935/4d98bde4-3012-4531-9ab1-b5e9369e70d0">

<img width="1440" alt="Profile Page_2" src="https://github.com/GooseM3/CPSC-491/assets/50725935/e16bf933-6c03-4ff7-b7a5-efb4fb90ba8e">



