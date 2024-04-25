const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // //이 미들워어에서 user를 조회한것을
    // //seqlize catch~then에서 사용할수 있을까? -> X
    // User.findByPk(1)
    // .then(user =>{
    //     req.user = user;
    //     //다음 단계의 함수로의 전달의 위한 next()
    //     next();
    // })
    // .catch(err =>{
    //     console.log(err);
    // })
    next();
});

//라우터 등록
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);



mongoConnect(() => {
    app.listen(7600);
})