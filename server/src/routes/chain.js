const { Router } = require('express');
const router = Router();

const centerController = require("./../controllers/medicCenter.controller");

//// Medic Center management
router.get("/:id",centerController.getMedicCenter);
router.get('/',centerController.getMedicCenters);
router.post('/',centerController.addMedicCenter);
router.delete("/:id",centerController.deleteMedicCenter);
router.put("/:id",centerController.updateMedicCenter);

module.exports = router;