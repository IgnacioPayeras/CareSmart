const { Router } = require('express');
const router = Router();


const patientController = require("../controllers/patient.controller");
router.post("/",patientController.getAccountState);

const medicChainController = require("../controllers/medicChain.controller");
router.get("/chainInfo/:chainId",medicChainController.getMedicChain);

const accountController = require("../controllers/patientAccount.controller");
router.post("/create_account",accountController.createAccount);

module.exports = router;