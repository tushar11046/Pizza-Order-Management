# This backend will receive requests from the frontend and depending upon the request, will interact with the database.

[] Create Controllers
    [] /user for userController
    [] /admin for adminController

[] Create Models
    [] User model
        - name
        - email
        - password
        - previousOrders

    [] Order model
        - status
        - timestamp
        - price
        - base
        - toppings
        - cheese

    [] Admin model
        - name
        - email
        - password