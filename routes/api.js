/*Select recipe*/
exports.recipe = function(req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM recipe WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.send(rows);
         });
    });
};

/*Select post*/
exports.post = function(req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM post WHERE id = ?',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.send(rows);
         });
    });
};

/*Select recipe by category id*/
exports.recipesCat = function(req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){
      var category_name;
      connection.query("SELECT name FROM category WHERE id = ?",[id], function(err, rows )
      {
        if (err)
            console.log("Error Updating : %s ",err );
            category_name = rows[0].name;
            connection.query('SELECT * FROM recipe WHERE category_name = ?',[category_name],function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );
                res.send(rows);
             });
      });
    });
};

/*Select post by category id*/
exports.postsCat = function(req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){
      var category_name;
      connection.query("SELECT name FROM category WHERE id = ?",[id], function(err, rows )
      {
        if (err)
            console.log("Error Updating : %s ",err );
            category_name = rows[0].name;
            connection.query('SELECT * FROM post WHERE category_name = ?',[category_name],function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );
                res.send(rows);
             });
      });
    });
};

/*Select post by category id*/
exports.catRecipe = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
      var category_name;
      var arr = [];
      var catRecipe = function (id, parentName) {
        if (id != "None") {
          connection.query("SELECT category_name FROM recipe WHERE id = ?",[id], function(err, rows )
          {
            if (err)
                console.log("Error Updating : %s ",err );
            category_name = rows[0].category_name;
            arr.push(rows[0].category_name);
            console.log(category_name);
            catRecipe("None", category_name);
          });
        } else {
          if (parentName != "None") {
            connection.query("SELECT parent_name FROM category WHERE name = ?",[parentName], function(err, rows )
            {
              if (err)
                  console.log("Error Updating : %s ",err );
                  if (rows[0].parent_name != "None") {
                    arr.push(rows[0].parent_name);
                  }
                  catRecipe("None", rows[0].parent_name);
            });
          } else {
            res.send(arr.reverse());
          }
        }
      }
      catRecipe(id);
    });
};

/*Select post by category id*/
exports.catPost = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
      var category_name;
      var arr = [];
      var catPost = function (id, parentName) {
        if (id != "None") {
          connection.query("SELECT category_name FROM post WHERE id = ?",[id], function(err, rows )
          {
            if (err)
                console.log("Error Updating : %s ",err );
            category_name = rows[0].category_name;
            arr.push(rows[0].category_name);
            console.log(category_name);
            catPost("None", category_name);
          });
        } else {
          if (parentName != "None") {
            connection.query("SELECT parent_name FROM category WHERE name = ?",[parentName], function(err, rows )
            {
              if (err)
                  console.log("Error Updating : %s ",err );
                  if (rows[0].parent_name != "None") {
                    arr.push(rows[0].parent_name);
                  }
                  catPost("None", rows[0].parent_name);
            });
          } else {
            res.send(arr.reverse());
          }
        }
      }
      catPost(id);
    });
};

exports.listCat = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){
    var category_name;

          connection.query("SELECT name FROM category WHERE id = ?",[id], function(err, rows )
            {
              if (err)
                  console.log("Error Updating : %s ",err );
                  category_name = rows[0].name;
                 connection.query('SELECT * FROM category WHERE name = ? OR parent_name = ? OR name = (SELECT parent_name FROM Person p2 WHERE name = ?) OR parent_name = (SELECT parent_name FROM Person p2 WHERE name = ?)',[category_name,category_name,category_name,category_name],function(err,rows)
                  {
                      if(err)
                          console.log("Error Selecting : %s ",err );
                      res.send(rows);
                   });

            });




    });
};
