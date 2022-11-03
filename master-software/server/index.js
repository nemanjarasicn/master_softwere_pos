const express = require("express");
const app = express();
const multer  = require('multer')

const fileUpload = require("express-fileupload");
const fs = require('fs');
const fns = require('date-fns')




// setup multer for file upload
var storage = multer.diskStorage(
    {
        destination: 'public/document',
        filename:  'test'
        
    }
);

const cors = require('cors');
const { default: TextSnippet } = require("@mui/icons-material/TextSnippet");
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors());
app.use(express.static('public'));

app.use(express.json());


app.get('/provera', (req, res) => {
    console.log('asdasasa');
    res.send('hello world')
  })




app.post("/saveRacun", function(req,res,next) {
    console.log(__dirname);


    const pathTmp = 'C:/Users/neman/posao/master_software_frontend/master-software/master-software/racuni/'
    let data =JSON.stringify(req.body.body);
    let todayNow = fns.format(new Date(), 'dd_MM_yyyy_HH_mm_ss');

    fs.writeFile(pathTmp + 'racun_' +todayNow + '.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });


    
});

app.post("/saveArtikli", function(req,res,next) {
    //console.log('usao u save',req.body.body);
   
    const pathTmp = 'C:/Users/neman/posao/master_software_frontend/master-software/master-software/src/Data/'
    let data =(JSON.stringify(req.body.body))

    console.log(data);
    //let todayNow = fns.format(new Date(), 'dd_MM_yyyy_HH_mm_ss');

    fs.writeFile(pathTmp + 'artikliTmp1' + '.json', data, (err) => {
        if (err) throw err;
        console.log('Artikal written to file');
    });


    
});

app.post("/upload",async (req, res) => {
    console.log('test',req.body)
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        
  const file = req.body.body;
  const path = __dirname + "/files/" + 'test.json';

  console.log(path);

  file.mv(path, (err) => {
    if (err) {
        console.log('erro');
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });



});


  app.post("/stornoRacun", function(req,res,next) {
    console.log(__dirname);


    const pathTmp = 'C:/Users/neman/posao/master_software_frontend/master-software/master-software/storno_racuni/'
    let data =JSON.stringify(req.body);
    let todayNow = fns.format(new Date(), 'dd_MM_yyyy_HH_mm_ss');

    fs.writeFile(pathTmp + 'storno_racun_' +todayNow + '.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    
});



app.listen(3001, () => console.log("Listening on port 3001"));