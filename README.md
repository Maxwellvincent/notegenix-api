# NoteGenix API
 A databse that stores and contains a task object. The task object is able to be updated, edited, and destroyed.
 
## Documentation of API

You can use FETCH to call the Todo API and you will receive a list of tasks in return.

![image](https://user-images.githubusercontent.com/44560811/96656664-48fde200-130e-11eb-9518-98ab35e5f792.png)

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
