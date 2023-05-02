const test = "maya";
console.log(test.slice(1))
const jwt = require('jsonwebtoken');

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsInVzZXJuYW1lIjoibWF5YSIsImVtYWlsIjoiYkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2NzA1MzQ3OTIsImV4cCI6MTY3MDUzNDc5Mn0.GFj00ThuDJdhdyQdMn7G_ifH9w181RzvdSsR4bELUfs"
token = jwt.decode(token).result.id
console.log(token)
