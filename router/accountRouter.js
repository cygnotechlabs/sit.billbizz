const express = require("express")

const router = new express.Router()

const accountController = require("../controller/accountController")

const journalController = require("../controller/journalController")



//Accounts

router.post('/add-account',accountController.addAccount)

router.put('/get-all-account',accountController.getAllAccount)

router.put('/get-one-account/:accountId',accountController.getOneAccount)

router.put('/edit-account/:accountId',accountController.editAccount)

router.put('/delete-account/:accountId',accountController.deleteAccount)




//Journal

router.post('/add-journal-entry',journalController.addJournalEntry)

router.put('/get-all-journal',journalController.getAllJournal)

router.put('/get-last-journal-prefix',journalController.getLastJournalPrefix)


module.exports = router
