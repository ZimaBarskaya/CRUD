var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var categories = require('./routes/categories');
var recipes = require('./routes/recipes');
var posts = require('./routes/posts');
var api = require('./routes/api');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');


app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.use(

    connection(mysql,{

        host: 'localhost', //'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodejs',
        multipleStatements: true

    },'pool') //or single

);


app.get('/', categories.list);
app.get('/categories', categories.list);
app.get('/categories/add', categories.add);
app.post('/categories/add', categories.save);
app.get('/categories/delete/:id', categories.delete_category);
app.get('/categories/edit/:id', categories.edit);
app.post('/categories/edit/:id',categories.save_edit);

app.get('/recipes', recipes.list);
app.get('/recipes/add', recipes.add);
app.post('/recipes/add', recipes.save);
app.get('/recipes/delete/:id', recipes.delete_recipe);
app.get('/recipes/edit/:id', recipes.edit);
app.post('/recipes/edit/:id',recipes.save_edit);

app.get('/posts', posts.list);
app.get('/posts/add', posts.add);
app.post('/posts/add', posts.save);
app.get('/posts/delete/:id', posts.delete_post);
app.get('/posts/edit/:id', posts.edit);
app.post('/posts/edit/:id',posts.save_post);


app.get('/api/recipe/:id', api.recipe);
app.get('/api/post/:id', api.post);
app.get('/api/category/:id/recipes', api.recipesCat);
app.get('/api/category/:id/posts', api.postsCat);

app.get('/api/category/:id', api.listCat);

app.get('/api/recipe/:id/category', api.catRecipe);
app.get('/api/post/:id/category', api.catPost);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
