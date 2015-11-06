MVP: send an email every day with a word of the day, and a definition 

features:
- list of words and definitions
  - [DONE] get a list of words
  - get their definition (scrape m-w)
- [DONE] ability to send email
- [DONE] some scheduling process

every day:

[DONE ON DB]grab a random word that hasn't already been sent 
  initialize a words table with a sent flag, either true or false
extend into a word obj with  part of speech and definition added
generate an html template for the body of the email with the word obj
generate mailOptions (can be multiple)
send a mail with each set of mailOptions