const { Router } = require('express');
const router = Router();


const coordinatorController = require("../controllers/coordinator.controller");
const medicController = require("./../controllers/medic.controller");
const specialtyController = require("../controllers/specialty.controller");

//// Coordinator management
router.get("/coordinator/:rut",coordinatorController.getCoordinator);
router.get("/coordinator",coordinatorController.getCoordinators);
router.post("/coordinator",coordinatorController.addCoordinator);
router.delete("/coordinator/:rut",coordinatorController.deleteCoordinator);
router.put("/coordinator/:rut",coordinatorController.updateCoordinator);

//// Medic management
router.get("/medic/:rut",medicController.getMedic);
router.get("/medic",medicController.getMedics);
router.post("/medic",medicController.addMedic);
router.delete("/medic/:rut",medicController.deleteMedic);
router.put("/medic/:rut",medicController.updateMedic);

//// Specialty management
router.get("/specialty/:id",specialtyController.getSpecialty);
router.get('/specialty',specialtyController.getSpecialties);
router.post('/specialty',specialtyController.addSpecialty);
router.delete("/specialty/:id",specialtyController.deleteSpecialty);
router.put("/specialty/:id",specialtyController.updateSpecialty);


module.exports = router;