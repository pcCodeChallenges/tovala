# Pete Clodi's Tovala Code Challenge Developer Journal
## Initial choices
The languages I chose to use are Go for the backend and TypeScript from the frontend, and hosting on Google Cloud Platform.

### Go
I chose Go because it is what is used at Tovala, and I've always been interested in trying it out. I feel that this is a golden opportunity to see what it is all about and whether I'd like to spend time developing in this language.

### TypeScript
I have been using TypeScript for the better part of 3 years for frontend development, and I am really enjoying all that it has to offer. I feel like I am returning to my roots as a developer (somewhat) by coding in a implicitly typed language. While it can be challenging at times to develop proper types for custom code elements, I have seen great gains in flushing out bugs during design-time. These stem from being able to see the difference between what I know the type should be and what it actually is based upon its execution. It also helps to eliminate the fear of targeting some of the newer features of JavaScript/ECMAScript by making it possible to compile down to ECMAScript 5 and ensure support on all significant browsers in the marketplace.

### Google Cloud Platform (GCP) 
I am hosting the applications on the Google Cloud Platform because that is my current hosting platform of choice for my personal projects, and what I am most familiar with at my current workplace. As a result it is the hosting platform with which I the  most familiar, so I did not want to take any significant chances with setup or configuration, as I was already taking on Go.

## Deployment Scheme

### Backend
I am going to use the Google App Engine to host and run my server, as I am not interested in building out the infrastructure for a simple application when a standard implementation has already been vetted by many thousands of users.
That being said, even a GCP App Engine app is not "simple". I followed their tutorials and had to put a bit of effort into getting the sample app running on the custom subdomain of https://tovala-api.peteclodi.com. But, working it is.

### Frontend
I have selected a Firebase hosted solution for the frontend application. This solution provides clear and easy to use setup and deployment schemes and tools. It also provides hosting capabilities with custom domains, so that I am able to host the frontend of this project at [https://tovala.peteclodi.com](). In addition to providing hosting, Firebase also provides a robust and easy to use Authentication system. This system "easily" allows for the usage of Single Sign On from the major providers; Google, Facebook, Twitter, GitHub, Microsoft, Apple, and others. In addition it also provides a hosted Email/Password authentication option that doesn't require any additional configuration to implement.

In all honesty though, the configuration code you insert into your webapp is a but gnarly, so I was quite happy to see that there are open source packages for Angular and React that wrap this configuration into framework and library specific packages.

## Writing the server
As a n00b to Go, I'm following the GCP provided tutorials for creating a Hello World app. It is proving to be useful as it is providing the basic structures for handling a root ('/') request and writing out "Hello, World!". So that's something useful.
At this stage it deploys to GCP at the address [https://tovala-api.peteclodi.com](). It's not much, but I'll take it.

In this same vein, I am going to pursue two different avenues for User Auth. The first will be to research if there is a simple to implement, standard Auth mechanism for Go that I can use. If that fails to yield results then I will circle back to using Google's Single Sign On mechanism, as that is part and parcel of implementing a GCP App Engine server.

### User Auth Research Results
This research has taken me on quite the journey. I initially started looking into how to implement OAuth2 in Go, with the goal being to create a "hand-rolled" solution to prove I know what I'm doing. Truth be told, I don't (at least not with Go). I found myself going down multiple rabbit holes trying to learn Go, understand its package management system (I don't really, but I have a sense of it now), and find, understand and integrate an OAuth2 package, This proved to be beyond difficult due to my lack of knowledge of Go's ecosystem. I found that I had no way of vetting one package against another. So I was really just looking for something that was simple to implement. This never panned out, as even the most basic package I found seemed to still need some way of storing the tokens against a user. In the end, I abandoned this "hand-rolled" approach and decided to look into solutions provided by GCP. Unfortunately, their solutions were equally complex and seemed to be targeted at allowing the hosted Go app to access Google APIs. This was not what I was looking for, and I started to consider the Basic Authentication scheme. When that didn't prove to present a simpler alternative, I finally succumbed to the Firebase Authentication solution.

I was leery of this solution as it is entirely driven by the Frontend application, and I wanted to illustrate my Backend chops. What I realized was thatI have a better opportunity to show that I am able to pull together well established systems to achieve my project goal. This decision is paying off as I have been able to implement 3 different sign on options within the application, Google and GitHub Single Sign Ons and traditional Email/Password authentication. With the best part being that they are all implemented and maintained by Firebase (Google), so there is minimal maintenance involved within my application for these systems. Additionally, the Firebase system also provides an "Admin" capability that allows servers to perform auth token verification on the tokens retrieved by the client. Thus providing a clean mechanism for validating users within authenticated endpoint handlers, It also would allow user maintenance on the server, but that is outside the scope of this project.

## Writing the Client
Since I was taking on so much new and interesting work with the using Go for teh server and figuring out the server and client deployments, plus adding support for an authentication system, I opted for building the client in Angular. In this respect I wanted to limit the risk of building out this application, since I knew that the authentication and the actual drag and drop drawing application were going to be tough enough.

In addition to keeping it simple for myself with Angular, I also decided to use teh Angular Material styling and component library. This will afford me some well styled and well built UI components to achieve all of the basic UI functions in the application, so I can focus on the actual work of the layout generator.
