import express from "express"
import { create, deleteUser, get, getOne, update } from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/get", get);
route.get("/getone/:id", getOne);
route.put("/update/:id",update);
route.delete("/delete/:id", deleteUser);


export default route;