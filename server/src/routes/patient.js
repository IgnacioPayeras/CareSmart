const { Router } = require('express');
const router = Router();


const attentionController = require("../controllers/attention.controller");
const specialtyController = require("../controllers/specialty.controller");
const medicController = require("../controllers/medic.controller");
const medicCenterController = require("../controllers/medicCenter.controller");


//// see medic chain info
//lo cambie jejeje

//// see available centers
router.get("/available_centers/:chainId",medicCenterController.getMedicCentersByChainId);

//// see available specialties
router.get("/available_specialties/:centerId",specialtyController.getSpecialtiesPatient);

//// see available medics
router.get("/available_medics/:centerId/:specialtyId",medicController.getMedicsPatient);

//// see available attentions
router.get("/available_attentions/:rut/:date",attentionController.getAvailableBlocks);

//// manage his own attentions
router.get("/my_attentions/:id",attentionController.getAttention);
router.get("/my_attentions",attentionController.getAttentions);
router.post("/my_attentions",attentionController.addAttention);
router.delete("/my_attentions/:id",attentionController.deleteAttention);




module.exports = router;