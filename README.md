# Restaurant Review

### The Goal:
To produce a full-stack web application for reviewing restaurants in 5 days.

Functionality had to include the ability to log in; view other people's restaurants and reviews; and finally be able to create, edit and delete your own restaurants and reviews.

### Link: https://restaurant-review-project.herokuapp.com/restaurants

---

### Site Guide:
* The homepage shows a list of all restaurants and their average rating. The navbar has the option to register or login.

* If logged in, you will see a 'My Restaurants' tab that allows you quick access to view or edit your own restaurants.

* Clicking on the 'View Restaurant' button will take you to that restaurant's show page. There you are presented with an interactive google map, and the reviews for the restaurant. You can add/edit/delete your own reviews here too.

* The register page is accessed via the navbar. A proper email address is required and your password is double-checked with a password confirmation field.

* The login page can be navigated to in the same way will send you back to the home page upon successful login.

* The 'Create New Restaurant' navbar button allows you to add your own restaurant with a form.

### Technologies used:
* HTML 5
* CSS 3
* SASS
* JavaScript
* jQuery
* GitHub
* Git
* Materialize CSS
* Node.js
* Express
* MongoDB

### Approach Taken:
---
I initially planned how I wanted to create the site by drawing wireframes, listing out the functionality I wanted, and the MVP I should work towards. First I ensured proper functionality of my first resource, restaurants. Having implemented functioning views, models and controllers for the restaurants, I worked on user registration and login.

With those key elements in place, I continued to my next resource, reviews. After initially attempting to make the review resource as its own model separate from the restaurants, I resorted to merging the two to ensure functionality. After ensuring a user's ability to  add, edit and delete their own resources, I had my MVP.

Finally, as finishing touches I worked on the CSS styling and added the google maps api to give a more complete and refined final product. I also added an star rating for the restaurants, that took the average review rating and displayed the result using whole- or half-stars.

### The Experience:
---
As our first NodeJS project, utilising the principles of REST was a challenge, and understanding what each of the many required packages and dependencies took time. As the project developed, my understanding of how the models, views and controllers interacted with each other grew, and it became easier to work out the next steps to getting the restaurants resource working.

The password encryption was a key part to creating the authentication process, and was done through the package bcrypt. The code required to enable this was new territory, but with the right documentation it wasn't too hard to set up.

Getting reviews functional was the hardest part of the project. Initially I had a separate models and controllers for both restaurants and reviews. Restaurants and reviews could be created and edited but were entirely separate from each other.

After further reading and questions, I managed to link the two resources. The first step was to merge their models and controllers; the second required the 'new review' form to be created inside the restaurant's show page so that the required restaurant id was available. When the review was created, it was stored inside the specific restaurant's object under the key 'reviews'.

Once all the key resources were in place, styling and additional features such as Google Maps integration and star ratings were comparatively simple and didn't take long to complete. Overall I was very happy with the final product.

If I had more time, I'd have improved on my google maps implementation. It works well for seeded data, but restaurants added by the user will not have google maps, the space populated instead by reviews. I would also have further developed the user authentication process to ensure no account could be created with an existing username.
