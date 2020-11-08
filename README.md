# NoteGenix API
 A databse that stores and contains a task object. The task object is able to be updated, edited, and destroyed.
 
## Documentation of API

### Todos Endpoint

#### GET /api/v1/todos

 Returns a list of all todos within the database.

#### GET /api/v1/todos/:id

 Returns a single todo within the database at that id.

#### POST /api/v1/todos

Creates a todo object to send to the database
  
  {
   description: "" 
  }
  
#### Patch /api/v1/todos/:id

Edit/update a previously created todo within the database.

#### Delete /api/v1/todos/:id

### Authentication
What is the preferred way of using the API?
- No Authentication

### Error Codes
Notegenix uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the 2xx range indicate success. Codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the 5xx range indicate an error with Stripe's servers (these are rare).

### Rate limit
Is there a limit to the number of requests an user can send?
There is not a rate limit set at this time, user is able to make as many requests at they need

## Summary

## Technology Used
- Express
- Knex
- PSQL
