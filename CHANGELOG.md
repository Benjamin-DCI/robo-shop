# The Tutorial Changelog

This changelog is ordered in reverse chronological order, meaning that the last changes made will always be on top of the file, so that readers will not have to scroll all the way down with each change.

## Stage 3: Handlebars Templates

By creating various templates, we have learned how to use the major parts of handlebars, such as conditionals and loops. We have also used `res.locals` to set global variables to all of our templates.

- Imported bootstrap and replaced styles in our [`public/stylesheets/style.scss`](public/stylesheets/style.scss) file.
- Installed and configured [`express-handlebars`](https://github.com/ericf/express-handlebars#express-handlebars) in [`app.js`](app.js)
- Created middleware to have our session available in all templates in [`middleware/init-session.js`](middleware/init-session.js) and hooked it up in `app.js`
- Replaced our old jade views with handlebars views in the [views](views) folder.
- Created a helper function to avoid rounding errors in [`lib/helpers.js`](lib/helpers.js)
- Modified our controllers in [`controllers/shop.js`](controllers/shop.js) and [`controllers/cart.js`](controllers/cart.js) to render our new views


## Stage 2: Cookies and Sessions

After learning a bit about the theory behind cookies and sessions, we have implemented a shopping cart by creating our own `Cart` class to serve as a state container. We then configured our server to use sessions with the [`express-session`](https://github.com/expressjs/session#express-session) package and we have implemmented the [`connect-mongo`](https://github.com/jdesboeufs/connect-mongo#readme) package to save our sessions in the db and make sure that we don't lose our session if the server crashes.

- Added a controller for our shop's home page in [`controllers/shop.js`](controllers/shop.js) and used it in [`routes/index.js`](routes/index.js);
- Installed and implemented `express-session` and `connect-mongo` to enable in database sessions in [`app.js`](app.js)
- Created a state container for our shopping cart in [`models/cart.js`](models/cart.js)
- Added our cart to session by creating a custom middleware in [`middleware/init-session.js`](middleware/init-session.js), updated `app.js` to use that middleware for all routes
- Created a controller for our cart operations in [`controllers/cart.js`](controllers/cart.js) and hooked it up in a new router in [`routes/cart.js`](routes/cart.js). The new router was added to `app.js` under the route `/cart`


## Stage 1: Data Models and Seeding

In this branch, we have set up our initial models and data to prepare our db for development.

- Created a product mongoose model in [`models/product.js`](models/product.js)
- Installed [faker.js](https://github.com/marak/Faker.js/) to quickly generate random data
- Created a seed script in [`seed/product-seeder.js`](seed/product-seeder.js) to fill our development db with mock products

## Stage 0: Boilerplate

This branch contains a boilerplate for almost every express server you are going to create, as long as you are using mongodb for your DB. This boilerplate consists of:

- Files create by `express-generator`, slightly modified and modernised. See list below.
- An environment config file in [`config/environment.js`](config/environment.js) to hold our environment specific configurations.
- A [`now.json`](now.json) file to configure various envrionment variables for deployment.

### Changes made to `express-generator` files:

- `routes/index.js` and `routes/users.js` have been updated to use `const`
- `app.js` was also updated to use `const`. In addition, Comments were added to seperate the file to smaller more easily readable chunks. Also, the mongodb connection is already made at the top of the file.
