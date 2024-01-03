const { Router } = require('express');
const router = Router();

const chainsController = require("../controllers/medicChain.controller");


//// Medic Chain management
router.get("/:id",chainsController.getMedicChain);
router.get('/',chainsController.getMedicChains);
router.post('/',chainsController.addMedicChain);
router.delete("/:id",chainsController.deleteMedicChain);
router.put("/:id",chainsController.updateMedicChain);

module.exports = router;