var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');
var Schema = mongoose.Schema;

//Employee setup
var Employee = new Schema({
    firstName: String,
    lastName: String,
    email: String
}, { collection: 'Employee' });
mongoose.model('Employee', Employee);

mongoose.connect(dbConfig.url,
    { useNewUrlParser: true /*表示不需帳號密碼*/ },
    (err, res) => {
        if (err)
            console.log(err);
    }
);