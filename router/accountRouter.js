const express = require("express")
const router = new express.Router()

const accountController = require("../controller/accountController")
const journalController = require("../controller/journalController")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');



//Sensitive

router.put('/get-bank-account-number/:accountId',verifyToken,checkPermission('AccountNumber'),accountController.getBankAccNum)



//Accounts

router.post('/add-account',verifyToken,checkPermission('AccountAdd'),accountController.addAccount)

router.get('/get-all-account',verifyToken,checkPermission('AccountView'),accountController.getAllAccount)

router.get('/get-one-account/:accountId',verifyToken,checkPermission('AccountView'),accountController.getOneAccount)

router.put('/edit-account/:accountId',verifyToken,checkPermission('AccountEdit'),accountController.editAccount)

router.delete('/delete-account/:accountId',verifyToken,checkPermission('AccountDelete'),accountController.deleteAccount)




//Journal

router.post('/add-journal-entry',verifyToken,checkPermission('JournalAdd'),journalController.addJournalEntry)

router.get('/get-all-journal',verifyToken,checkPermission('JournalView'),journalController.getAllJournal)

router.get('/get-last-journal-prefix',verifyToken,checkPermission('JournalAdd'),journalController.getLastJournalPrefix)




//Trial Balance

router.get('/get-one-trial-balance/:accountId',verifyToken,checkPermission('TrailBalanceView'),accountController.getOneTrailBalance)


module.exports = router
