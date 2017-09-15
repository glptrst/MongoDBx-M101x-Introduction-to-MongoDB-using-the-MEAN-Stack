var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
/*
  Again, the first thing this program does is connect to MongoDB using
  this connect function. You pass the connection function a connection
  string and a callback function. For now all you need to know is
  callbacks are functions you provide to the Node.js driver to specify
  what to do once a given operation completes. Once, again the .connect
  function does not return a handle to a MongoDB connection. Instead,
  you need to pass a callback function that the MongoDB driver executes
  when your MongoDB handle is ready. The callback takes two parameters:
  an error and a db handle. If the operation fails, the callback gets an
  error as the first argument. If the operation succeeds, the callback
  gets null as the first argument and the result of the operation as the
  second argument.
  */
mongodb.MongoClient.connect(uri, function(error, db){
    /*
      In the case of this code, if the callback gets an error, that means
      that the driver cannot connect to MongoDB.
    */
    if (error) {
        console.log(error);
        process.exit(1);
    }

    /*
      Now, if error is null, that means there was no error and you now
      have a db handle that you can use to interact with MongoDB.  So with
      this db handle, you can now insert a JSON object into a MongoDB
      collection.
      */
    var doc = {
        title: 'Jaws',
        year: 1975,
        director: 'Steven Spielberg',
        rating: 'PG'
    };
    /*
      So this code right here inserts a document representing the movie
      entitled Jaws into the collection named movies. This .collection
      function gives you a handle to an individual MongoDB
      collection. Note that in order to identify the collection that you
      need, you specify it by name with a string argument to this
      .collection function. Now, with this .insert call, you also need to
      pass a callback.  This callback will get called when the insert
      operation completes and will report any errors that occurred in
      inserting the document.
      */
    db.collection('movies').insert(doc, function(error, result){
        if (error) {
            console.log(error);
            process.exit(1);
        }
        /* 
           Once you insert a document, you can then execute a query to get
           that document back. The find function is how you execute a query
           with MongoDB. If you use the Node.js driver directly, you also
           need to chain find together with this .toArray function. You do
           this so that you can work with an array of documents rather than
           iterate through a cursor, which is what you'd have if you did not
           use this .toArray function. Again, you also need to pass a
           callback to the .toArray function. The first argument the callback
           gets is an error if the operation fails. If not, the value of the
           error parameter will be null and the second parameter, docs, will
           contain an array of documents that match the query. So then you
           can iterate through all of the documents and print them to the
           screen. Once again, the return value of this .toArray function
           does not contain the documents. You need to get the array of
           documents from the second parameter to the callback.
           */
        db.collection('movies').find().toArray(function (error, docs){
            if (error) {
		console.log(error);
		process.exit(1);
            }

            console.log('Found docs:');
            docs.forEach(function(doc){
		console.log(JSON.stringify(doc));
            });
            process.exit(0);
        });
    });
});
