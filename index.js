var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");




var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
 var connectionString = "mongodb://localhost:27017";
app.get('/get-admin', (req, res)=>{
   mongoClient.connect(connectionString).then(connectionObject=>{
    var database = connectionObject.db("videoDb");
    database.collection("tbladmin").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
        
    })
   }) 
});

app.get("/get-videos",(req,res)=>{
   mongoClient.connect(connectionString).then(connectionObject=>{
      var database = connectionObject.db("videoDb");
   database.collection("tblvideos").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
   })

   })
   
})
app.get('/get-category', (req, res)=>{
   mongoClient.connect(connectionString).then(connectionObject=>{
    var database = connectionObject.db("videoDb");
    database.collection("tblcategory").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
        
    })
   }) 
});
app.get('/get-users', (req, res)=>{
   mongoClient.connect(connectionString).then(connectionObject=>{
    var database = connectionObject.db("videoDb");
    database.collection("tblusers").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
        
    })
   }) 

});
app.post("/add-video", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{

        var database = connectionObject.db("videoDb");

        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
        }

        database.collection("tblvideos").insertOne(video).then(()=>{
             console.log(`Video Added`);
             res.end();
        });

    });
});

app.put("/edit-video/:id", (req, res)=>{

    mongoClient.connect(connectionString).then(connectionObject=>{
          var database = connectionObject.db("videoDb");

          var video = {
            VideoId: parseInt(req.body.VideoId),
            Title: req.body.Title,
            Url: req.body.Url,
            Description: req.body.Description,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views: parseInt(req.body.Views),
            CategoryId: parseInt(req.body.CategoryId),
            Comments: [req.body.Comments]
        }

          database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
             console.log("Video Updated Successfully..");
             res.end();
          })


    })


})

app.delete("/delete-video/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database = connectionObject.db("videoDb");

        database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)})
        .then(()=>{
            console.log("Video Deleted.");
            res.end();
        })

    })
})
app.post("/register-user", (req, res) => {
    mongoClient.connect(connectionString)
        .then(connectionObject => {
            const database = connectionObject.db("videoDb");

            const user = {
                Userid: req.body.Userid,
                UserName: req.body.UserName,
                Password: req.body.Password,
                Email: req.body.Email,
                Mobile: req.body.Mobile
            };

            database.collection("tblusers").insertOne(user)
                .then(() => {
                    console.log("✅ User Registered");
                    res.status(201).json({ message: "User registered successfully" });
                })
                .catch(err => {
                    console.error("❌ Insert error:", err);
                    res.status(500).json({ error: "Failed to register user" });
                });
        })
        .catch(err => {
            console.error("❌ DB Connection error:", err);
            res.status(500).json({ error: "Database connection failed" });
        });
});
// app.post("/register-user", (req, res)=>{

//     mongoClient.connect(connectionString).then(connectionObject=>{

//         var database = connectionObject.db("videoDb");

//         var user = {
             
//              Userid: req.body.Userid,
//              UserName: req.body.UserName,
//              Password: req.body.Password,
//              Email: req.body.Email,
//              Mobile: req.body.Mobile
//         };

//         database.collection("tblusers").insertOne(user).then(()=>{
//              console.log(`User Registered`);
//              res.end();
//         });

//     });
// });


app.listen(5050);
console.log(`Server Started : http://127.0.0.1:5050`);