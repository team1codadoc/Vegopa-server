import express from "express";

import { saveParty, getParties, getParty } from "../Controller/partyController";

const partyRouter = express.Router();

partyRouter.route("/").post(saveParty).get(getParties);
partyRouter.route("/:partyName").get(getParty);

export default partyRouter;
