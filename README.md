## What a Track
***
This project is created for the Interactive Frontend Development module at the **Full Stack Software Development Course** with **Code Institute**.
***
**The brief** 

_Project purpose_: Presentation of interactive data
In this project, you'll build an interactive front-end site. The site should respond to the users' actions, allowing users to actively engage with data, alter the way the site displays the information to achieve their preferred goals.

_Main Technologies Required_: HTML, CSS, JavaScript.

_Optional_: jQuery, d3.js, crossfilter and/or dc.js, any other JavaScript libraries, SaSS, external APIs.

_Value provided_:
Users are able to interact with the site in their particular way, to achieve their personal goals and derive answers to their specific questions.
The site owner advances their own goals by providing this functionality, potentially by being a regular user themselves.

*** 
**THE IDEA**

I’ve always been interested in discovering new music, so I choose to bring my passion for music into this project.

The name for the website, _What a Track_ was born trough a brainstorming session with my friends. They were delighted to take part in choosing the name for my project.

**What a Track is a lyrics finder website created with the API’s data from Musixmatch.com.**
[Musixmatch](https://www.musixmatch.com/) is world’s largest lyrics database with more than 14 million lyrics in over 50 distinct languages. 

I had to sign up and register my app on their website to get an API key. I have signed up for the Not Commercial Use plan, free to use version (personal use and beta testing). 
The Not Commercial Use plan allows 2000 API Calls per day, 500 Lyrics display per day and after I've reached those limit I'll get a 401 Error. Only 30% of the lyrics will be displayed. In order to get the full view I’ll need to buy a Licensing Data Package.

### The need:
Music lovers who want to know the exact lyrics of a song. Could be just as a curiosity and knowledge or even for a karaoke session.
### The goals of this website are:
* Provide a clean feel and easy to navigate website, on mobile and desktop;
* Offer a wide range of lyrics to the user;

***
###  UX Design
Common characteristics of a user:
* Music lover
* Computer literate

#### Design wireframes / mock-ups:

I had to change from the initial design concept of wireframes and structure because the initial concept was very complex and would've taken more time to implement all the APIs I wanted to use: Musixmatch and Songkick.These features can be implented at a later stage.
I have decided to make a simple lyrics search app and not have the gig list displayed for the artists.

At the beggining I wanted to have the content of each song/artist/album on a relevant image, such as an album cover picture or an artist picture. The response I was getting back from Musixmatch didn't allow me to do that, only for the albums display, when searching for an artists, so I have decided to leave a general image everywhere on the right hand side of the music content.

Click on the below links to see the wireframes or you can view them in the separate folder where are saved called [wireframes](https://github.com/andreeaiosip/what-a-track/tree/master/wireframes).

##### Initial Wireframes
* **[Mobile view](https://github.com/andreeaiosip/what-a-track/blob/master/wireframes/initial-design/initial-mobile-view.pdf)**
* **[Desktop view](https://github.com/andreeaiosip/what-a-track/blob/master/wireframes/initial-design/initial-desktop-view.pdf)**

##### Final Wireframes

* **Mobile View**

* **[Desktop View](https://github.com/andreeaiosip/what-a-track/blob/master/wireframes/final-design/final-desktop-view.pdf)**


#### Client stories:

* As _a user_ I want to easily look up for the lyrics of a song.
* As _a user_ I want to be able to read clearly the lyrics on mobile and desktop.
* As _a user_  I want to able to find the title of a song from an artist I know, so I can get the lyrics.
* As _a user_  I want to able to connect on social media to keep me updated on what new lyrics are added to their site.

***
### FEATURES
#### EXISTING FEATURES

##### Logo 
I have created the logo for What a Track website with [Canva](https://www.canva.com/). 
##### Back to top button
The link has a unique identifier, a tooltip title and contains a special arrow character (➤), so I didn’t have to use an image to display the arrow. Code found [here](https://html-online.com/articles/dynamic-scroll-back-top-page-button-javascript/).

#### Radio buttons
The radio buttons will direct which search to be performed:
* Song Search - this is a very straighforward search. When the user knows the song name or part of it, can look up for that and gets back a list of songs which will match the keywords inserted.


##### Search area
I have used two radio buttons which will trigger the type of search will be performed using the keywords inserted in the search bar.


...

##### Features left to implement
......
***

### Technologies Used
I have created this website with the help of a multiple technologies:
* HTML 
* CSS 
* JavaScript
* jQuery 
* Visual Studio Code
* Bootstrap 
* Google Fonts 
* AdobeXD 
* PhotoPad Photo editor 
* Boostnote
***
### TESTING
When I have first started the project, I thought I could use the _fetch_ method. After lots of research and two full weeks of trying to make it work through _fetch_ method, I have started asking more people if they could help me. My colleague Sean Murphy told me I should use AJAX instead, because is a better tool for the response Musixmatch is sending back.
...
***
### Deployment
This project was developed using the Visual Studio Code, committed to git and pushed to GitHub using GitHub Desktop.

To deploy What a Track to GitHub Pages from its GitHub repository, the following steps were taken:


##### How to run this project locally:
To clone this project from GitHub:
...
There are no differences between the deployed version and the development version.

***
## Credits
#### Content
The code for the _Back to the top button_ was found [here](https://html-online.com/articles/dynamic-scroll-back-top-page-button-javascript/).
#### Media
**Background picture** was taken from [Adobe Stock](https://stock.adobe.com/uk/). I have signed up for the 1 month free trial which gives you 10 lincesed images.

**Musixmatch logo**  - In order to use the free version of the API for Musixmatch, I had to credit them on my page with ther logo.

##### Acknowledgement

This website wouldn’t have not been live without the help of my mentor [Simen Daehlin](https://www.github.com/Eventyret), my colleagues [Heather Olcot](https://github.com/hfolcot) and [Sean Murphy](https://github.com/nazarja), tutors Stephen and Hailey from the Code Institute and numerous colleagues from Code Institute from Slack channels. 

Heather Olcot was big help to me because she was the only student I knew who worked with Musixmatch APIs, so she could give me more straighforward answers. Here is her project [lyrics-finder](https://github.com/hfolcot/lyrics-finder) based on Musixmatch APIs.

#### Disclaimer
The content of this Website is for educational purposes only.


