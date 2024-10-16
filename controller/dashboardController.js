



// const Item = require('../database/model/item');
// const ItemTrack = require('../database/model/itemTrack');
// const moment = require("moment-timezone");

// exports.calculateTotalInventoryValue = async (req, res) => {
//   try {
//     const organizationId = req.user.organizationId;

//     // Get the start and end of the current month
//     const startOfMonth = moment().startOf('month').toDate();
//     const endOfMonth = moment().endOf('month').toDate();

//     // Fetch all items for the given organizationId
//     const items = await Item.find({ organizationId });

//     if (items.length === 0) {
//       return res.status(404).json({ message: "No items found for the organization" });
//     }

//     let totalInventoryValue = 0; // For costPrice
//     let totalSaleValue = 0; // For sellingPrice
//     let underStockItems = [];
//     let recentlyAddedItems = [];

//     // Loop through each item and calculate stock from itemTracks
//     for (const item of items) {
//       const itemTracks = await ItemTrack.find({ organizationId, itemId: item._id });

//       // Calculate total stock by adding creditQuantity and subtracting debitQuantity
//       let totalStock = 0;
//       for (const track of itemTracks) {
//         if (track.creditQuantity) {
//           totalStock += track.creditQuantity;
//         }
//         if (track.debitQuantity) {
//           totalStock -= track.debitQuantity;
//         }
//       }

//       // console.log(totalStock);

//       // Handle missing costPrice by setting it to 0 if not provided
//       const costPrice = item.costPrice || 0;
//       const inventoryValue = totalStock * costPrice;
//       totalInventoryValue += inventoryValue; // Add to total inventory value (costPrice)

//       // Calculate the sale value for the item using sellingPrice
//       const sellingPrice = item.sellingPrice || 0; // Ensure sellingPrice has a default
//       const saleValue = totalStock * sellingPrice;
//       totalSaleValue += saleValue; // Add to total sale value (sellingPrice)

//       // Check if totalStock is less than or equal to reorderPoint
//       if (totalStock <= item.reorderPoint) {
//         underStockItems.push(item); // Push the entire item document to underStockItems
//       }

//       // Check if the item was added in the current month
//       const itemCreatedDate = moment(item.createdDate);
//       if (itemCreatedDate.isBetween(startOfMonth, endOfMonth, null, '[]')) {
//         recentlyAddedItems.push(item); // Push the entire item document to recentlyAddedItems
//       }
//     }

//     // Calculate underStockItemsCount and recentlyAddedItemsCount
//     const underStockItemsCount = underStockItems.length;
//     const recentlyAddedItemsCount = recentlyAddedItems.length;

//     // Send totalInventoryValue, totalSaleValue, underStockItems, underStockItemsCount,
//     // recentlyAddedItems, and recentlyAddedItemsCount in the response
//     const totalStockCount = await getTotalStockCount(items,organizationId);

//     res.status(200).json({
//       totalInventoryValue, // Calculated using costPrice
//       totalSaleValue, // Calculated using sellingPrice
//       underStockItems, // Items where totalStock <= reorderPoint
//       underStockItemsCount, // Count of underStockItems
//       recentlyAddedItems, // Items added in the current month
//       recentlyAddedItemsCount, // Count of items added in the current month
//       totalStockCount
//     });

//   } catch (error) {
//     console.error("Error calculating total inventory value:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const Item = require('../database/model/item');
const ItemTrack = require('../database/model/itemTrack');
const moment = require("moment-timezone");

exports.calculateTotalInventoryValue = async (req, res) => {
  try {
    // const organizationId = req.user.organizationId;
    const organizationId = req.body.organizationId;
    console.log(organizationId);
    
    // Get the start and end of the current month
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
    const topSelling = await topSellingProductsUtil(organizationId);
    // Fetch all items for the given organizationId
    const items = await Item.find({ organizationId });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found for the organization" });
    }

    let totalInventoryValue = 0; // For costPrice
    let totalSaleValue = 0; // For sellingPrice
    let underStockItems = [];
    let recentlyAddedItems = [];

    // Loop through each item and calculate stock from the latest itemTrack entry
    for (const item of items) {
      // Find the last (most recent) entry for this item in ItemTrack
      const latestTrack = await ItemTrack.findOne({
        itemId: item._id,
        organizationId: organizationId,
      }).sort({ _id: -1 }); // Sort by _id to get the latest document (or use createdAt if preferred)

      let totalStock = 0;

      if (latestTrack) {
        totalStock = latestTrack.currentStock; // Use the currentStock from the latest track
      }

      // Handle missing costPrice by setting it to 0 if not provided
      const costPrice = item.costPrice || 0;
      const inventoryValue = totalStock * costPrice;
      totalInventoryValue += inventoryValue; // Add to total inventory value (costPrice)

      // Calculate the sale value for the item using sellingPrice
      const sellingPrice = item.sellingPrice || 0; // Ensure sellingPrice has a default
      const saleValue = totalStock * sellingPrice;
      totalSaleValue += saleValue; // Add to total sale value (sellingPrice)

      // Check if totalStock is less than or equal to reorderPoint
      if (totalStock <= item.reorderPoint) {
        underStockItems.push(item); // Push the entire item document to underStockItems
      }

      // Check if the item was added in the current month
      const itemCreatedDate = moment(item.createdDate);
      if (itemCreatedDate.isBetween(startOfMonth, endOfMonth, null, '[]')) {
        recentlyAddedItems.push(item); // Push the entire item document to recentlyAddedItems
      }
    }

    // Calculate underStockItemsCount and recentlyAddedItemsCount
    const underStockItemsCount = underStockItems.length;
    const recentlyAddedItemsCount = recentlyAddedItems.length;

    // Use your total stock count function
    const {date} = req.body


    const totalStockCount = await getTotalInventoryValues(items, organizationId, date);
    const { inventoryValueChange , salesValueChange} = totalStockCount
    const { topSellingProducts , stockLevel} = topSelling
  
    // Send the response with all calculated data
    res.status(200).json({
      totalInventoryValue, // Calculated using costPrice
      totalSaleValue, // Calculated using sellingPrice
      underStockItems, // Items where totalStock <= reorderPoint
      underStockItemsCount, // Count of underStockItems
      recentlyAddedItems, // Items added in the current month
      recentlyAddedItemsCount, // Count of items added in the current month
      inventoryValueChange,
        salesValueChange ,
        topSellingProducts,
        stockLevel,
      // totalStockCount
    });

  } catch (error) {
    console.error("Error calculating total inventory value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const topSellingProductsUtil = async (organizationId) => {
  try {
    // Fetch all items for the given organizationId
    const items = await Item.find({ organizationId });

    if (items.length === 0) {
      return { topSellingProducts: [], stockLevel: [] };
    }

    let topSellingProducts = [];
    let stockLevel = [];

    for (const item of items) {
      // Find all sales (action: 'Sale') for this item in ItemTrack for top-selling products
      const salesTracks = await ItemTrack.find({
        itemId: item._id,
        organizationId: organizationId,
        action: "Sale", // This is required only for topSellingProducts
      });

      // For stockLevel, we remove the action filter
      const latestTrack = await ItemTrack.findOne({
        itemId: item._id,
        organizationId: organizationId,
      }).sort({ _id: -1 }); // Get the most recent entry for stock

      // Proceed with top-selling product calculations if there are sales records
      if (salesTracks.length > 0) {
        // Calculate the total units sold (sum of debitQuantity)
        const unitSold = salesTracks.reduce((total, track) => total + track.debitQuantity, 0);

        // Calculate the sale volume (unitSold * sellingPrice)
        const saleVolume = unitSold * (item.sellingPrice || 0);

        // Determine the stock status
        const status = latestTrack && latestTrack.currentStock < 0 ? "Out Of Stock" : "In Stock";

        // Add the product details to the topSellingProducts array
        topSellingProducts.push({
          itemName: item.name,
          itemId: item._id,
          saleVolume: saleVolume,
          unitSold: unitSold,
          status: status,
          itemImage: item.itemImage, // Assuming itemImage is available in the Item collection
        });
      }

      // Add the stock information to the stockLevel array regardless of sales
      if (latestTrack) {
        stockLevel.push({
          stock: latestTrack.currentStock,
          itemName: item.name,
          itemId: item._id,
        });
      }
    }

    // Sort the topSellingProducts by unitSold in descending order
    topSellingProducts.sort((a, b) => b.unitSold - a.unitSold);

    // Sort the stockLevel array by stock value (currentStock) in descending order
    stockLevel.sort((a, b) => b.stock - a.stock);

    // Return both topSellingProducts and stockLevel
    return { topSellingProducts, stockLevel };
  } catch (error) {
    console.error("Error fetching top-selling products or stock levels:", error);
    throw new Error("An error occurred while calculating top-selling products or stock levels.");
  }
};




const getTotalInventoryValues = async (items, organizationId, dateFromReq) => {
  try {
    // Parse the request date (YYYY-MM-DD)
    const givenMonth = moment(dateFromReq, "YYYY-MM-DD").format("MMMM"); // Get the month as "September"
    const givenYear = moment(dateFromReq, "YYYY-MM-DD").format("YYYY");  // Get the year as "2024"

    const previousMonth = moment(dateFromReq, "YYYY-MM-DD").subtract(1, 'month').format("MMMM");
    const previousYear = moment(dateFromReq, "YYYY-MM-DD").subtract(1, 'month').format("YYYY");

    let totalInventoryValueGivenMonth = 0;
    let totalInventoryValuePreMonth = 0;
    let totalSalesValueGivenMonth = 0;
    let totalSalesValuePreMonth = 0;

    // Loop through each item to calculate total inventory and sales values for the given month and previous month
    for (const item of items) {
      const costPrice = item.costPrice || 0; // Get costPrice from item collection
      const sellingPrice = item.sellingPrice || 0; // Get sellingPrice from item collection

      // Find the stock movement for the given month (matching only month and year)
      const stockGivenMonth = await ItemTrack.findOne({
        itemId: item._id,
        organizationId: organizationId,
        date: {
          $regex: new RegExp(`${givenMonth}/${givenYear}`)  // Match the "MMMM/YYYY" format
        }
      }).sort({ _id: -1 }); // Sort to get the latest document

      if (stockGivenMonth) {
        totalInventoryValueGivenMonth += stockGivenMonth.currentStock * costPrice;
        totalSalesValueGivenMonth += stockGivenMonth.currentStock * sellingPrice;
      }

      // Find the stock movement for the previous month (matching only month and year)
      const stockPreMonth = await ItemTrack.findOne({
        itemId: item._id,
        organizationId: organizationId,
        date: {
          $regex: new RegExp(`${previousMonth}/${previousYear}`)  // Match the "MMMM/YYYY" format
        }
      }).sort({ _id: -1 });

      if (stockPreMonth) {
        totalInventoryValuePreMonth += stockPreMonth.currentStock * costPrice;
        totalSalesValuePreMonth += stockPreMonth.currentStock * sellingPrice;
      }
    }

    // Calculate the percentage change for inventory and sales values
    const inventoryValueChange = totalInventoryValuePreMonth !== 0
      ? Math.round(((totalInventoryValueGivenMonth - totalInventoryValuePreMonth) / totalInventoryValuePreMonth) * 100 * 100) / 100
      : 0;  // If no previous month data, set to 0 instead of 100

    const salesValueChange = totalSalesValuePreMonth !== 0
      ? Math.round(((totalSalesValueGivenMonth - totalSalesValuePreMonth) / totalSalesValuePreMonth) * 100 * 100) / 100
      : 0;  // If no previous month data, set to 0 instead of 100

    // Return the calculated percentage changes
    return {
      totalInventoryValueGivenMonth,
      totalInventoryValuePreMonth,
      totalSalesValueGivenMonth,
      totalSalesValuePreMonth,
      inventoryValueChange,
      salesValueChange
    };
  } catch (error) {
    console.error("Error calculating total inventory and sales values:", error);
    throw new Error("An error occurred while calculating total inventory and sales values.");
  }
};


// const getTotalInventoryValues = async (items, organizationId, dateFromReq) => {
//   try {
//     // Parse the request date (YYYY-MM-DD)
//     const givenMonth = moment(dateFromReq, "YYYY-MM-DD").format("MMMM"); // Get the month as "September"
//     const givenYear = moment(dateFromReq, "YYYY-MM-DD").format("YYYY");  // Get the year as "2024"

//     const previousMonth = moment(dateFromReq, "YYYY-MM-DD").subtract(1, 'month').format("MMMM");
//     const previousYear = moment(dateFromReq, "YYYY-MM-DD").subtract(1, 'month').format("YYYY");

//     let totalInventoryValueGivenMonth = 0;
//     let totalInventoryValuePreMonth = 0;
//     let totalSalesValueGivenMonth = 0;
//     let totalSalesValuePreMonth = 0;

//     // Loop through each item to calculate total inventory and sales values for the given month and previous month
//     for (const item of items) {
//       const costPrice = item.costPrice || 0; // Get costPrice from item collection
//       const sellingPrice = item.sellingPrice || 0; // Get sellingPrice from item collection

//       // Find the stock movement for the given month (matching only month and year)
//       const stockGivenMonth = await ItemTrack.findOne({
//         itemId: item._id,
//         organizationId: organizationId,
//         date: {
//           $regex: new RegExp(`${givenMonth}/${givenYear}`)  // Match the "MMMM/YYYY" format
//         }
//       }).sort({ _id: -1 }); // Sort to get the latest document

//       if (stockGivenMonth) {
//         totalInventoryValueGivenMonth += stockGivenMonth.currentStock * costPrice;
//         totalSalesValueGivenMonth += stockGivenMonth.currentStock * sellingPrice;
//       }

//       // Find the stock movement for the previous month (matching only month and year)
//       const stockPreMonth = await ItemTrack.findOne({
//         itemId: item._id,
//         organizationId: organizationId,
//         date: {
//           $regex: new RegExp(`${previousMonth}/${previousYear}`)  // Match the "MMMM/YYYY" format
//         }
//       }).sort({ _id: -1 });

//       if (stockPreMonth) {
//         totalInventoryValuePreMonth += stockPreMonth.currentStock * costPrice;
//         totalSalesValuePreMonth += stockPreMonth.currentStock * sellingPrice;
//       }
//     }

//     // Calculate the percentage change for inventory and sales values
//     const inventoryValueChange = totalInventoryValuePreMonth !== 0
//     ? Math.round(((totalInventoryValueGivenMonth - totalInventoryValuePreMonth) / totalInventoryValuePreMonth) * 100 * 100) / 100
//     : (totalInventoryValueGivenMonth > 0 ? 100 : 0);

//   const salesValueChange = totalSalesValuePreMonth !== 0
//     ? Math.round(((totalSalesValueGivenMonth - totalSalesValuePreMonth) / totalSalesValuePreMonth) * 100 * 100) / 100
//     : (totalSalesValueGivenMonth > 0 ? 100 : 0);
//     // Return the calculated percentage changes
//     return {
      
//         totalInventoryValueGivenMonth,
//         totalInventoryValuePreMonth,
//         totalSalesValueGivenMonth,
//         totalSalesValuePreMonth,
//         inventoryValueChange,
//         salesValueChange

//     };
//   } catch (error) {
//     console.error("Error calculating total inventory and sales values:", error);
//     throw new Error("An error occurred while calculating total inventory and sales values.");
//   }
// };




