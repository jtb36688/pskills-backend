# pskills
This app contains two user types. A prison admin (who has the ability to log in) and a single user (no need to log in so no need for user data to be persisted on this user type) who can view posted profiles by prison. 


# Routes
Prison Routes

GET to /api/prisons
- Should return an an array of objects. Each object is a prison with the following keys:
- id, name, location, phoneNumber, totalPrisoners


GET to /api/prisons/:id
- Should return an object. The object has the following keys:
- id, name, location, phoneNumber, prisoners.

prisoners is an array of objects. Each object is a prisoner with:
- id, name, picture, prisonId, availability, skills

POST to /api/prisons
- Creates a new prison
- Must send in the body the name, location, and phoneNumber
- returns the id
- Must send JWT in header

PUT to /api/prisons/:id
- edits a prison with the req.params.id
- Only need to send the key/value that is changing
- Must send JWT in header
- Responds with the updated prison object

DELETE to /api/prisons/:id
- deletes the prison with the req.params.id
- Must send JWT in header


Prisoner Routes
GET to /api/prisoners
- returns an array of objects
- Each object is a prisoner with the following keys:
- id, name, picture, prisonId, availability, skills
- skills is a string of skills separated by commas

GET to /api/prisoners/:id
- returns an object of one prisoner with the id provided
- same keys as above

GET to /api/prisoners/prison/:prisonId
- returns an array of prisoner objects with the provided prisonId

POST to /api/prisoners
- Need to provide the name, prisonId, skills in the body
- returns the new id of the prisoner
- Must send JWT in header

PUT to /api/prisoners/:id
- edits the prisoner with the provided id
- Must send JWT in header
- Responds with the updated prisoner object

DELETE to /api/prisoners/:id
- deletes the prisoner with the provided id
- Must send JWT in header


Login Routes
POST to /api/users/register
- Registers the user in the database
- Need to provide the username, password, and prisonId

POST to /api/users/login
- logs the user in
- Need to provide the username and password in the body
- Responds with an object that includes the prisonId of the user that logged in, and the JWT.