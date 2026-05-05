const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

const createAddress = async (req, res) => {
  try {
  
    const { street, city, state, zip, country, isDefault } = req.body;

    //  Step 1: If new address is default → remove old default
    if (isDefault) {
      const { error: resetError } = await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", req.user.id)
        .eq("is_default", true);

      if (resetError) throw resetError;
    }

    //  Step 2: Create new address
    const { data: address, error: insertError } = await supabase
      .from("addresses")
      .insert({
        user_id: req.user.id,
        street,
        city,
        state,
        zip,
        country,
        is_default: !!isDefault,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    res.status(201).json({
      message: "Address created",
      address,
    });

  } catch (error) {
    console.log("ERROR:", error.message);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const {data:addresses, error} = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id",userId);

    if(error)throw error;
    
    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
      error: error.message,
    });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const allowedFields = [
      "street",
      "city",
      "zip",
      "state",
      "country",
      "isDefault",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // 🔥 Handle boolean properly
    if (updates.isDefault !== undefined) {
      updates.is_default =
        updates.isDefault === true || updates.isDefault === "true";
      delete updates.isDefault;
    }

    // 🔥 If setting new default → reset old default
    if (updates.is_default === true) {
      const { error: resetError } = await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", userId)
        .eq("is_default", true);

      if (resetError) throw resetError;
    }

    // 🔥 Update address
    const { data: updatedAddress, error: updateError } = await supabase
      .from("addresses")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) throw updateError;

    res.status(200).json({
      success: true,
      address: updatedAddress,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: error.message,
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select(); // 🔥 IMPORTANT

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted",
      deletedAddress: data[0], // optional
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};
router.post("/",auth , createAddress);
router.get("/fetchAddresses", auth, getUserAddresses);
router.put("/:id", auth, updateAddress);
router.delete("/:id", auth, deleteAddress);
module.exports = router;
