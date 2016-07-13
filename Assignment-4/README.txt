Exam Management System.





Authors: 

    

Arzaan Irani (100826631), 
    
Charles Jonathan Bimm (100972986)





Installation:
    
    
1) Open two terminal windows using the COMP2406-A4 folder.

    
2) With one terminal, run the sqlite database by navigating to the db directory of the Assignment folder and inputting 
    'sqlite3 db_1200iRealSongs' into the terminal.

    
3) Run 'npm install'. After typing 'npm install' the

 node_modules folder should consist of:
	- body-parser
	- cookie-session
	- epilogue
	- express
	- express-session
	- passport
	- passport-local
	- sequelize
	- sqlite3   
4) With the other terminal, run 'node app.js'.

    
5) In the browser open 'http://localhost:3000/index.html'.

    
6) Login using any of the following Student Name and Student number (password) combinations: 

        
	- Arzaan Irani, Student Number: 100826631
        
	- Charles Bimm, Student Number: 100972986
        
	- Dan Brown, Student Number: 100123456
        
	- Julia Roberts, Student Number: 100654321





This APP uses the following technologies and third party-libraries:

    
- Node (Server) 
    
- Components: Express, Sequelize, PassportJS, epilogue
    
- Client Side Components: AngularJS, HTML, CSS





Testing: 

    
- Tested with the Chrome 46.0.2490.86 (64-bit) browser





Database used: 

    
- SQLITE





Details of Other Students in Database:
    
    
- Arzaan Irani, 100826631
        
- Charles Bimm, 100972986
        
- Dan Brown, 100123456
        
- Julia Roberts, 100654321


The DATABASE contains the following tables:

    
- Users: To store student's name and number 

    
- Tests: To store a testers Name and Id. This enables us to create different tests (currently there is just 1 test is stored in the database)
    
    
- Questions: To store a questions Text. It is associated with Tests Table
    
    
- Choices: To store choices for questions. It is associated with Questions Table

    
- Responses: To store students' response for a give question. It is associated with Questions, Choices and UserId table

    
- HintRequests: To store the hint requests of a student





Notes:

    
1) The database currently contains 4 users and 10 questions. Each question has 5 choices.

    
2) You can add/edit/view more users or questions by using sqlite browser application that you can download from 'http://sqlitebrowser.org/'. 

    
3) It is available for Linux, Windows and MAC. 





Bugs:

    

- There are no known bugs at the time of submission.


