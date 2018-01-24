
/*
 * GET categories list
 */

exports.list = function(req, res){
  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM category ORDER BY parent_name DESC',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('categories',{page_title:"Categories",data:rows});
         });
    });
};

/*Add the category*/
exports.add = function(req, res){
  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM category',function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.render('add_category',{page_title:"Add Category",data:rows});
     });
  });
};

/*Edit the category*/
exports.edit = function(req, res){
    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM category WHERE id = ?; SELECT * FROM category',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_category',{page_title:"Edit Category",data:[rows[0], rows[1]]});
         });
    });
};

/*Save the category*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            parent_name    : input.category
        };

        var query = connection.query("INSERT INTO category set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/categories');
        });
    });
};

/*Save edited category*/
exports.save_edit = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            parent_name    : input.category
        };
        var old = {
            parent_name    : input.name
        };old_recipe

        var old_recipe = {
            category_name    : input.name
        };

        connection.query("UPDATE category set ? WHERE parent_name = ?; UPDATE recipe set ? WHERE category_name = ?; UPDATE post set ? WHERE category_name = ?;",[old, input.old_name, old_recipe, input.old_name,old_recipe, input.old_name], function(err, rows )
        {
          if (err)
              console.log("Error Updating : %s ",err );
        });
        connection.query("UPDATE category set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );
          res.redirect('/categories');
        });
    });
};

/*Delete category*/
exports.delete_category = function(req,res){
     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM category  WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/categories');
        });
     });
};
