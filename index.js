const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const books = [
    {id:1, name:'book 1'},
    {id:2, name:'book 2'},
    {id:3, name:'book 3'}
]

app.get('/',(req,res)=>{
    res.send('Homepage')
})

app.get('/api/books', (req,res)=>{
    res.send(books)
})


app.get('/api/books/:id',(req,res)=>{
     //if course with particular id not found send 404 error
    const book = books.find(c=> c.id === parseInt(req.params.id))
    if(!book){
        res.status(404).send('Couldn\'t find a book with the given id')
        return
    }
    res.send(book)
    // res.send(books[req.params.id-1])
})


app.post('/api/books',(req,res)=>{
    //error handling
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('name inside body is required')
        return;
    }
    //creating new book object/item
    let newBook = {
        id: (books.length + 1),
        name: (req.body.name)
    }
    //pushing new object in the array
    books.push(newBook)
    console.log(books)
    res.send(newBook)
})


app.put('/api/books/:id', (req,res)=>{
    //if course with particular id not found send 404 error
    const book = books.find(c=> c.id === parseInt(req.params.id))
    if(!book){
       res.status(404).send('Couldn\'t find a book with the given id') 
       return
    }
    //error handling
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('name inside body is required')
        return;
    }
    //updating the object/book
    book.name = req.body.name
    res.send(book)
    console.log(books)
})


app.delete('/api/books/:id', (req,res)=>{
    //if course with particular id not found send 404 error
    const book = books.find(c=> c.id === parseInt(req.params.id))
    if(!book){
        res.status(404).send('Couldn\'t find a book with the given id')
        return
    }

    //deleting the object/book
    const index = books.indexOf(book)
    books.splice(index,1)
    
    //sending the response
    res.send(book)

})


// app.get('/api/books/:param1/:param2',(req,res)=>{
//     // res.send(req.params.param1+' '+req.params.param2)
//     // res.send(req.params)
//     // res.send(req.query)
// })

app.listen(port,()=>{console.log('listenining on port: '+port)})

