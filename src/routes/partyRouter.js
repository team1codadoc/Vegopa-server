import express from "express";
import Party from "../models/Party";
import { saveParty } from "../Controller/partyController";

const partyRouter = express.Router();

partyRouter.route("/").post(saveParty);

export default partyRouter;
