/* Get recipes list */

exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM recipe',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('recipes',{page_title:"Recipes",data:rows});
         });
    });

};

/*Add the recipe*/
exports.add = function(req, res){
  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM recipe; SELECT name FROM category',function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.render('add_recipe',{page_title:"Add Recipe",data:rows[0], categories: rows[1]});
     });
  });
};

/*Edit the recipe*/
exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM recipe WHERE id = ?; SELECT name FROM category',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_recipe',{page_title:"Edit Recipe",data:rows[0], categories: rows[1]});
         });

    });
};

/*Save the recipe*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
          name    : input.name,
          category_name    : input.category,
          recipe: input.recipe
        };

        var query = connection.query("INSERT INTO recipe set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/recipes');
        });
    });
};

/*Save edited recipe*/
exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            category_name    : input.category,
            recipe: input.recipe
        };

        connection.query("UPDATE recipe set ? WHERE id = ?",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/recipes');
        });

    });
};

/*Delete recipe*/
exports.delete_recipe = function(req,res){
     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM recipe  WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/recipes');
        });

     });
};
