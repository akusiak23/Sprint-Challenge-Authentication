<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    Sessions store information about a client on the server.
2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt hashes passwords to keep them secure.
3. What does bcrypt do to slow down attackers?
Bcrypt uses salts to slow down attackers, by hashing the password more than once.
4. What are the three parts of the JSON Web Token?
Header, payload, signature. Header contains algorithm and type, payload the data requested, signature the signature which is verified via secret key.