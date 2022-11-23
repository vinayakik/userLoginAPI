

//Local APIs

>GetAllUser (GET)
* http://localhost:5000/api/auth/users

>Register the user (POST)
* http://localhost:5000/api/auth/register
body{
        "name":"Vinayak5",
    "email":"vik5@gmail.com",
    "password":"12345",
    "phone":123456789,
    "role":"Admin"
}

>Login (POST)
* http://localhost:5000/api/auth/login
body{
    "email":"vik1@gmail.com",
    "password":"1234"
}

>Get user info (GET)
* http://localhost:5000/api/auth/userInfo

(Header) => {'x-access-token':'token value from login'}
ex:
(Header) => {'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzY1ZDg5Mzg2NmE3YjFhOWFmZTVmNCIsImlhdCI6MTY2ODcwMzI1NywiZXhwIjoxNjY4Nzg5NjU3fQ.d2ZrTfWow2EgIwnt4QdDT-qZHytdbluclLx7uy3JqbU'}









