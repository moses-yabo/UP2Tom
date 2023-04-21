import express ,{Request,Response} from 'express';
import bodyParser from "body-parser";
import { DrinkChoice } from "./models/drinkChoiceSchema";
import { connection } from "./Db/dbConnection";

connection();


const app = express();
const port = process.env.PORT || 5000;

// Add middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req:Request,res:Response)=>{
   req.headers = {
    "content-type":"application/json; charset=utf-8"
   }
res.status(200).json({
message:"izinja madoda",
data:{
    lol:"❤️❤️"
}
})


})
// Add endpoint to store data
app.post('/api/drink-choices', async (req:Request, res:Response) => {

    req.headers = {
        "content-type":"application/json; charset=utf-8",
        "access-control-allow-origin":"**",
        
    };

  try {

    const drinkChoice = new DrinkChoice(req.body);
    await drinkChoice.save();
    res.sendStatus(200);
  } catch (error) {

    console.error(error);
    res.sendStatus(500);
  }
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
