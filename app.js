const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./middlewares/logger')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const quizRouter = require('./routes/quizRouter');


const app = express();

// app.use(morgan('dev'));
app.use(morgan("combined", { "stream": logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);
app.use('/quiz',quizRouter);


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err)
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        status: 'MAIN Error',
        message: err.message
    });
    // res.render('error');
});


module.exports = app;
