import  express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';
import env from 'dotenv';
import jwt from 'jsonwebtoken'


env.config()
const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
const port = process.env.Port

app.use(cors({
  origin: process.env.ORIGIN
}))

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
        ssl: {
    rejectUnauthorized: false
  },
});

db.connect();

// login to website
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(`SELECT * FROM Login WHERE username = $1 AND password =$2`, [username, password]);
    const user = result.rows[0];

    if (!user || user.username !== username || user.password !== password) {
      return res.status(401).json({ message: "username or password invalid" });
    } else {
      res.status(200).json({
        status: "success", 
        data: result.rows
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
})



// register to website
app.post("/register", async (req, res) => {
  const { username, password } = req.body

  try {
    // Check if username already exists
    const existingUser = await db.query(
      "SELECT * FROM login WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        status: "failure",
        message: "Username already exists",
      });
    }
    // Step 1: Insert the user (without token initially)
    const result = await db.query(
      `INSERT INTO Login (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password]
    );

    const user = result.rows[0];

    // Step 2: Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
    );

    // Step 3: Update the user with the token
    await db.query(
      `UPDATE Login SET token = $1 WHERE id = $2 RETURNING *`,
      [token, user.id]
    );
    const updatedUserResult = await db.query(
      `SELECT * FROM Login WHERE id = $1`,
      [user.id]
    );

    // Step 4: Return the response
    res.status(201).json({
      status: "success",
      data: updatedUserResult.rows[0],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});


app.post("/google-login", async (req, res) => {
  const { username, password, login_method } = req.body;

  try {
    const existingUser = await db.query(
      `SELECT * FROM login WHERE username=$1`,
      [username]
    );

    // If user exists → login (do not re-insert)
    if (existingUser.rows.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: existingUser.rows[0],
      });
    }

    // Step 1: Insert the user (without token initially)
    const result = await db.query(
      `INSERT INTO login (username, password, login_method) VALUES ($1, $2, $3) RETURNING *`,
      [username, password, login_method]
    );

    const user = result.rows[0];

    // Step 2: Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    // Step 3: Update the user with the token
    await db.query(
      `UPDATE login SET token = $1 WHERE id = $2`,
      [token, user.id]
    );

    // Step 4: Return the response
    const updatedUserResult = await db.query(
      `SELECT * FROM login WHERE id = $1`,
      [user.id]
    );

    res.status(201).json({
      status: "success",
      message: "Google user registered successfully",
      data: updatedUserResult.rows[0],
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failure",
      message: "Database error"
    });
  }
});




//get details by username and personid
app.get("/details",async(req,res)=>{
  const username = req.query.username;
  const id = req.query.id;
  try {
    const response = await db.query(`SELECT token FROM login WHERE username=$1 and id=$2`,[username,id]);
    if(response.rows.length ==0){
      return res.status(400).json({
        status: "failure",
        message: "User not found ",
      })
    }
    return res.status(200).json({
      status: "success",
      message: "User found",
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
           status: "failure",
           message:"Database error",
      }
    )}

})




/// wordel backendpoint
app.get("/score",async(req,res)=>{
  const scoreid =req.query.scoreid;
  try {
    const response = await db.query(`SELECT * FROM score WHERE scoreid=$1`,[scoreid]);
    if(response.rows.length === 0){
      return  res.status(404).json({
        status:"failure",
        message:"score id not found",
      })
    }
    res.status(200).json({
      status:"success",
      data:response.rows[0]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:"failure",
      message:"database failure"
    })
  } 
})



/// wordel backendpoint

app.post("/score", async (req, res) => {
  // const { scoreid, stage1, stage2, stage3, stage4, stage5, totalscore } = req.body;
  const { scoreid,totalscore } = req.body;

  try {
    const scoreidExists = await db.query('SELECT * FROM score WHERE scoreid=$1', [scoreid]);

    if (scoreidExists.rows.length > 0) {
      return res.status(409).json({
        status: "failure",
        message: "Score already exists"
      });
    }
      // const response = await db.query(
    //   `INSERT INTO score (scoreid, stage1, stage2, stage3, stage4, stage5, totalscore)
    //    VALUES ($1, $2, $3, $4, $5, $6, $7)
    //    RETURNING *`,
    //   [scoreid, stage1, stage2, stage3, stage4, stage5, totalscore]
    // );

    const response = await db.query(
      `INSERT INTO score (scoreid,totalscore)
       VALUES ($1, $2)
       RETURNING *`,
      [scoreid, totalscore]
    );

    res.status(200).json({
      message: "Score saved successfully",
      data: response.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      message: "Database failure"
    });
  }
});


/// wordel backendpoint

app.put("/score", async (req, res) => {
  // const { scoreid, stage1, stage2, stage3, stage4, stage5, totalscore } = req.body;
  const { scoreid,totalscore } = req.body;

  try {
    // const result = await db.query(
    //   `UPDATE score SET
    //     stage1 = $1,
    //     stage2 = $2,
    //     stage3 = $3,
    //     stage4 = $4,
    //     stage5 = $5,
    //     totalscore = $6
    //   WHERE scoreid = $7
    //   RETURNING *`,
    //   [stage1, stage2, stage3, stage4, stage5, totalscore, scoreid]
    // );
    const result = await db.query(
      `UPDATE score SET
      totalscore = $1
      WHERE scoreid = $2
      RETURNING *`,
      [totalscore, scoreid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Score ID not found" });
    }

    res.status(200).json({
      message: "Score updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database update failed"
    });
  }
});





app.listen(port, () => 
  console.log(`REST API running at http://localhost:${port}`)
 
);




