const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movie-list.json')
const app = express()
const port = 3000

// using engine template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// using static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const movieFiltered = movieList.results.filter(movie => movie.title.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { movies: movieFiltered, keyword: req.query.keyword})
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})

app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})