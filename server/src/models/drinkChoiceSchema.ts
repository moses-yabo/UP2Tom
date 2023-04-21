import mongoose from "mongoose";
import { IDrinkChoice } from "../types/types";


const drinkChoiceSchema = new mongoose.Schema({
    input1: String,
    input2: String,
    input3: String,
    input4: String,
    input5: String,
    input6: String,
    input7: String,
    input8: String,
    input9: String,
    decision: String,
  });
  
  export const DrinkChoice = mongoose.model<IDrinkChoice>('DrinkChoice', drinkChoiceSchema);