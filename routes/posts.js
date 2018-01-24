/* Get posts list */


exports.list = function(req, res){
  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM post',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('posts',{page_title:"Posts",data:rows});
         });
    });

};

/*Add the post*/
exports.add = function(req, res){
  req.getConnection(function(err,connection){
    var query = connection.query('SELECT * FROM post; SELECT name FROM category',function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        res.render('add_post',{page_title:"Add Post",data:rows[0], categories: rows[1]});
     });
  });
};

/*Edit the post*/
exports.edit = function(req, res){
    var id = req.params.id;
    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM post WHERE id = ?; SELECT name FROM category',[id],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_post',{page_title:"Edit Post",data:rows[0], categories: rows[1]});
         });

    });
};

/*Save the post*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {

        var data = {
          name    : input.name,
          category_name    : input.category,
          preview_text: input.preview,
          text: input.text
        };

        var query = connection.query("INSERT INTO post set ? ",data, function(err, rows)
        {
          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/posts');
        });
    });
};

/*Save edited post*/
exports.save_post = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function (err, connection) {

        var data = {
            name    : input.name,
            category_name    : input.category,
            preview_text: input.preview,
            text: input.text
        };

        connection.query("UPDATE post set ? WHERE id = ?",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/posts');
        });

    });
};

/*Delete post*/
exports.delete_post = function(req,res){
     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM post  WHERE id = ? ",[id], function(err, rows)
        {
             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/posts');
        });

     });
};
