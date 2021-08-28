const Material = require("../models/material.model");
const HttpError = require("../models/http.error");

const createMaterial = async (req, res, next) => {
  let materialDetails = req.body;
  let isNewMaterial;
  try {
    isNewMaterial = await Material.findOne({ name: materialDetails.name });
  } catch {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }

  if (isNewMaterial) {
    const error = new HttpError("Material exists already.", 500);
    return next(error);
  }

  const createdMaterial = Material(materialDetails);

  try {
    await createdMaterial.save();
  } catch (err) {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  res.status(201).json({
    materialId: createdMaterial.id,
    code: "200",
  });
};


const fetchMaterial

exports.createMaterial = createMaterial;
