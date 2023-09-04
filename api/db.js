import { application } from "express"
import mysql from "mysql"
// read about jsw web token
// while deleting some post we should make sure that we are deleteing only our user's post and not someone else's
export const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Jotsna@1997",
    database:"blog",
    port: "3306"

})
export default db