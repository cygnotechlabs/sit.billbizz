const Supplier = require("../database/model/supplier");
const moment = require("moment-timezone");

exports.getSupplierStats = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { date } = req.params;
    console.log(organizationId);
    const givenMonth = moment(date, "YYYY-MM-DD").format("MMMM"); // Get the month as "September"
    const givenYear = moment(date, "YYYY-MM-DD").format("YYYY");  // Get the year as "2024"

    const previousMonth = moment(date, "YYYY-MM-DD").subtract(1, 'month').format("MMMM");
    const previousYear = moment(date, "YYYY-MM-DD").subtract(1, 'month').format("YYYY");
    // Find total Suppliers for the given organizationId
    const totalSuppliers = await Supplier.countDocuments({ organizationId });
    console.log(totalSuppliers);

    // Find active Suppliers for the given organizationId
    const activeSuppliers = await Supplier.countDocuments({
      organizationId,
      status: "Active",
    });
    console.log(organizationId);
    const recentlyAddedSuppliers = await Supplier.find({
      organizationId: organizationId,
      createdDate: {
        $regex: new RegExp(`${givenMonth}/${givenYear}`)  // Match the "MMMM/YYYY" format
      }
    }).sort({ _id: -1 });
      const newSuppliersCount = recentlyAddedSuppliers.length
    // Send the counts as response
    res.status(200).json({
      totalSuppliers,
      activeSuppliers,
      newSuppliersCount
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Supplier stats", error });
  }
};


