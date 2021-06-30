### /users
/GET /
Return all users

/GET /:id
Return specific user

/POST /register
{
    "username": string,
    "password": string,
    "email": string,
}

/POST /login
{
    "username": string,
    "password": string
}

/PUT /

/DELETE /


### /tickets
/GET /
Returns an array of each item object

/GET /:id
Returns the item object with that id

/POST / *seller auth*
{
    "title": string,
    "ticket_description": string
}

/PUT /:id

/DELETE /:id

### /comments

/GET /

/GET /:id

/POST /

/PUT /

/DELETE /
