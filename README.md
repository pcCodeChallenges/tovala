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
I am going to use the Google App Engine to host and run my server, as I am not interested in building out the infrastructure for a simple application when a standard implementation has already been vetted by many thousands of users.
That being said, even a GCP App Engine app is not "simple". I followed their tutorials and had to put a bit of effort into getting the sample app running on the custom subdomain of https://tovala-api.peteclodi.com. But, working it is.

## Writing the server
As a n00b to Go, I'm following the GCP provided tutorials for creating a Hello World app. It is proving to be useful as it is providing the basic structures for handling a root ('/') request and writing out "Hello, World!". So that's something useful.
At this stage it deploys to GCP at the address [https://tovala-api.peteclodi.com](). It's not much, but I'll take it.

