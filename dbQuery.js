db.aptiQAs.find({})

db.aptiQAs.insertMany([{
    qid:'QA1',
    question:'MEAN stands for?',
    ans1:'MongoDB,Express',
    ans2:'React ,Node.js',
    ans3:'React,AngularJs',
    c_ans:'MongoDB,Express,AngularJs,Node.js'
},{
    qid:'QA2',
    question:'Which language is MongoDB written in?',
    ans1:'C',
    ans2:'phyton',
    ans3:'JavaScript',
    c_ans:'C++'    
},{
    qid:'QA3',
    question:'MongoDB is ________.',
    ans1:'Object-oriented DBMS',
    ans2:'Key-value store',
    ans3:'RDBMS',
    c_ans:'Document-oriented DBMS'    
},{
    qid:'QA4',
    question:'What type of web application can built using Express JS?',
    ans1:'single-page applications',
    ans2:'multi-page applications',
    ans3:'web applications',
    c_ans:'All of the above'    
}])