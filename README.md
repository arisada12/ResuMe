# ResuMe

This is a simple portfolio page built using only html css and vanilla javascript and backed with Firbase, so you only need host to your web hosting as usual or you can use github pages.

## Current Features

- Login Pages
- Add Project
- Del Project
- Edit Project

## Demo

- Go to [my portfolio](http://www.arisada.is-great.net/login.html) login page.
- You can login using the email and password below.

```sh
Email: guest@guest.com
Pass: guest1234
```

Of course as a guest you can't add or delete the list of projects that I have.

## Profile Setup

Just change the **index.html** files according to your needs.

**note: Make sure you change it, you don't want your profile turn into a Shrek profile right?"**

## Firebase Setup

I hope you familiar with Firebase first, so I don't have to give a detailed step by step tutorial.
- Create a new project in Firebase.
- Create a new web project.
- Copy your Firebase configuration to **firebase.js** file.
- Enable Email/Password authentication method and add new user with your own email and password (pay attention at "User UID") so yo can login to your portfolio pages.
- Copy this rule to your Firestore database rules

```sh
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mails/{mail} {
      allow read, write: if true;
    }
     match /projects/{project} {
      allow read
      allow write: if request.auth != null && request.auth.uid == "Your User UID";
    }
  }
}
```

## Email

You can manually check email in the Firestore database. If you want to get notifications every time data enters to your mail collection, you can use the Firebase trigger email extension (requires a blaze plan).
In the future I might add read and delete mails to to c-panel or dashboard page in portfolio, so there's no need to manually check Firestore.

## To do list:

- Create a dashboard or c-panel page to costumize user profile without edit in index.html manually.
- Translate portfolio.
- Read and delete mail.
