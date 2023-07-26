# Hospital_API
## URL: No FrontEnd page, use Postman for the results: https://hospitalapi-qfmi.onrender.com
### Description:
This is hospital Api for doctors of hospital where doctor can register them self then register there patients and create report of there patients after checkup.
Patient Report will have the following fields
Created by doctor,Status (You can use enums if you want to):Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,Positive-Admit]

#### Functionality / Available Routes:
1. /doctors/register → with username and password
2. /doctors/login → returns the JWT to be used
3. /patients/register → create patient (require jwt token of doctor as only Doctor and create a patient) 
4. /patients/:id/create_report (require jwt token of doctor as only Doctor and create a patient report) 
5. /patients/:id/all_reports → List all the reports of a patient oldest to latest
6. /reports/:status → List all the reports of all the patients filtered by a specific status

### How to run:
1. Clone project.
2. cd to project folder and run npm install
3. Create the .env file and update db credentials and google client credentials.
4. run command nodemon index.js
