const Customer = require("../database/model/customer");
const moment = require("moment-timezone");

exports.getCustomerStats = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;
    const { date } = req.params;
    console.log(organizationId);
    const givenMonth = moment(date, "YYYY-MM-DD").format("MMMM"); // Get the month as "September"
    const givenYear = moment(date, "YYYY-MM-DD").format("YYYY");  // Get the year as "2024"

    const previousMonth = moment(date, "YYYY-MM-DD").subtract(1, 'month').format("MMMM");
    const previousYear = moment(date, "YYYY-MM-DD").subtract(1, 'month').format("YYYY");
    // Find total customers for the given organizationId
    const totalCustomers = await Customer.countDocuments({ organizationId });
    console.log(totalCustomers);

    // Find active customers for the given organizationId
    const activeCustomers = await Customer.countDocuments({
      organizationId,
      status: "Active",
    });
    console.log(organizationId);
    const recentlyAddedCustomers = await Customer.find({
      organizationId: organizationId,
      createdDate: {
        $regex: new RegExp(`${givenMonth}/${givenYear}`)  // Match the "MMMM/YYYY" format
      }
    }).sort({ _id: -1 });
      const newCustomersCount = recentlyAddedCustomers.length
    // Send the counts as response
    res.status(200).json({
      totalCustomers,
      activeCustomers,
      newCustomersCount
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer stats", error });
  }
};

