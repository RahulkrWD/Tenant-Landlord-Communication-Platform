const PropertyModel = require("../models/property");
const mongoose = require("mongoose");

// only landlord will create property
const createProperty = async (req, res) => {
  try {
    const { userId } = req.user;
    await PropertyModel.create({ landlordId: userId, ...req.body });
    res
      .status(200)
      .json({ message: "Property Created Successfull", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

// get property by id
const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  const objectId = new mongoose.Types.ObjectId(id);
  const tenantId = new mongoose.Types.ObjectId(userId);
  try {
    if (role == "landlord") {
      const properties = await PropertyModel.findById(id);
      return res.status(200).json({
        success: true,
        message: "fetch Property",
        data: properties,
      });
    }

    if (role === "tenant") {
      const property = await PropertyModel.aggregate([
        {
          $match: { _id: objectId },
        },
        {
          $lookup: {
            from: "users",
            localField: "landlordId",
            foreignField: "_id",
            as: "landlord",
          },
        },
        { $unwind: "$landlord" },
        {
          $lookup: {
            from: "interesteds",
            let: { propertyId: "$_id", tenantId: tenantId },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$propertyId", "$$propertyId"] },
                      { $eq: ["$tenantId", "$$tenantId"] },
                      { $eq: ["$interested", true] }, // Only consider if interested is true
                    ],
                  },
                },
              },
              { $limit: 1 },
              { $project: { _id: 0, interested: 1 } },
            ],
            as: "interestedData",
          },
        },
        {
          $lookup: {
            from: "addtocarts",
            let: { propertyId: "$_id", tenantId: tenantId },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$propertyId", "$$propertyId"] },
                      { $eq: ["$tenantId", "$$tenantId"] },
                      { $eq: ["$addToCart", true] }, // Only consider if addToCart is true
                    ],
                  },
                },
              },
              { $limit: 1 },
              { $project: { _id: 0, addToCart: 1 } },
            ],
            as: "cartData",
          },
        },
        {
          $addFields: {
            interested: {
              $cond: {
                if: { $gt: [{ $size: "$interestedData" }, 0] },
                then: true,
                else: false,
              },
            },
            addToCart: {
              $cond: {
                if: { $gt: [{ $size: "$cartData" }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            propertyName: 1,
            propertyType: 1,
            address: 1,
            rentAmount: 1,
            depositAmount: 1,
            isActive: 1,
            interested: 1,
            addToCart: 1,
            landlord: {
              _id: "$landlord._id",
              name: "$landlord.name",
              email: "$landlord.email",
              phone: "$landlord.phone",
              role: "$landlord.role",
            },
          },
        },
      ]);

      if (!property || property.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Property fetched successfully",
        data: property[0],
      });
    }
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getproperty = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (role === "landlord") {
      // Landlord: Get only their own properties
      const properties = await PropertyModel.find({ landlordId: userId });
      return res.status(200).json({
        success: true,
        message: "Fetched landlord's properties",
        properties,
      });
    }
    if (role === "tenant") {
      // Tenant: Get all properties with interested status (if any)
      const properties = await PropertyModel.aggregate([
        {
          $lookup: {
            from: "interesteds",
            let: { propertyId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$propertyId", "$$propertyId"] },
                      {
                        $eq: ["$tenantId", new mongoose.Types.ObjectId(userId)],
                      },
                    ],
                  },
                },
              },
              {
                $project: {
                  interested: 1,
                  _id: 0,
                },
              },
            ],
            as: "interestedInfo",
          },
        },
        {
          $addFields: {
            interested: {
              $cond: [
                { $gt: [{ $size: "$interestedInfo" }, 0] },
                { $arrayElemAt: ["$interestedInfo.interested", 0] },
                false,
              ],
            },
          },
        },
        {
          $project: {
            landlordId: 1,
            propertyName: 1,
            propertyType: 1,
            address: 1,
            rentAmount: 1,
            depositAmount: 1,
            isActive: 1,
            interested: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        message: "Fetched all properties with interest info",
        properties,
      });
    }

    // If role is not tenant or landlord
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// soft delete property by id
const softDeleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await PropertyModel.findByIdAndUpdate(
      id,
      { isActive: !property.isActive },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Property deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// hard Delete
const hardDeleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    await PropertyModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Property deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getproperty,
  getPropertyById,
  softDeleteProperty,
  hardDeleteProperty,
};
