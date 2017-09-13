var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';

/*
  This MongoClient helper is what you will use to create a connection
  to MongoDB. This MongoClient.connect function takes a MongoDB
  connection string, which is a URI that tells the driver which MongoD
  to connect to. And in this case the URI is MongoDB://localhost port
  27017, and the example database. In other words, this translates to
  connect to the MongoDB running on localhost port 27017, and use the
  example database. The MongoClient.connect function also takes a
  callback function. The callback function gets called when either an
  error occurred, or the driver successfully connected. The callback
  function takes two parameters. A potentially null error and a
  potentially null db handle. In this simple example, if an error
  occurs, we just log it and exit.
*/
mongodb.MongoClient.connect(uri, function(error, db) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    /*
      Once the program has a db handle, it can then access the sample
      collection using the db.collection collection function. With a
      collection you can use the insert function to insert a document much
      like how you did in the shell.
    */     
    db.collection('sample').insert({ x: 1 }, function(error, result) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        /*
          Query for a document is slightly trickier. If you pass the call back
          to the driver's find function, you'll get back a cursor rather than a
          set of documents. In the context of MongoDB, a cursor is an object
          that you could call next on to get the next document. However, in
          order to make things easier for users who don't need fine grained
          control over the cursor, the driver has this nice chainable toArray
          function that exhausts the cursor for you and returns an array of
          documents in the call back. And once you run this program, you should
          see that MongoDB successfully inserted a document, and then query to
          back.
        */
        db.collection('sample').find().toArray(function(error, docs) {
            if (error) {
		console.log(error);
		process.exit(1);
            }
	    
            console.log('Found docs:');
            docs.forEach(function(doc) {
		console.log(JSON.stringify(doc));
            });
            process.exit(0);
        });
    });
});
