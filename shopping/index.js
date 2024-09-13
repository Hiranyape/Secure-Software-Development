const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', (req,res,next) => {

    return res.status(200).json({"msg": "Hello from Shopping"})
})


app.listen(8003, () => {
    console.log('Shopping is Listening to Port 8003')
})