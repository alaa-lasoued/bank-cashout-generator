const fs = require('fs')

let PropPosition = {
    0: 'CodeE',
    2: 'Matricule',
    10: 'BankCode',
    12: 'Filler',
    28: 'NomPrénom',
    58: 'Rib',
    78: 'Libellé',
    95: 'Montant',
    105: 'Mois',
    107: 'Année',
    111: 'Filler'
}

let transactions = [{
    CodeE:
        'sh',
    Matricule:
        '00000009',
    BankCode:
        '35',
    Filler:
        ' ',
    NomPrénom:
        'ala lassoued',
    Rib:
        '51464684468484648645',
    Libellé:
        'paye',
    Montant:
        '2000',
    Mois:
        '01',
    Année:
        '2021',
    Filler:
        ' ',
},
{
    CodeE:
        'sh',
    Matricule:
        '00000007',
    BankCode:
        '25',
    Filler:
        ' ',
    NomPrénom:
        'ala lassoued',
    Rib:
        '51464684468484648645',
    Libellé:
        'paye',
    Montant:
        '3000',
    Mois:
        '02',
    Année:
        '2021',
    Filler:
        ' ',
}]

function generateMassBankCashoutFile(transactionsList) {

    let FileContent = ''
    let lineLength = 128

    // create a new empty ext file [transactions-dd-mm-yyyy.txt]
    createTxsFile()

    transactions.map((transaction, i) => {
        // append trnasaction details to txt file
        appendTxToFile(transaction)
    })


    for (var i = 0; i < transactionsList.length; i++) {
        for (var position = 0; position < lineLength; position++) {

            if (PropPosition[position] && PropPosition[position] !== 'Filler') {

                FileContent += transactionsList[i][PropPosition[position]]
                position = position + (transactionsList[i][PropPosition[position]].length - 1)

            } else {

                FileContent += ' '

            }

            FileContent += '\n'
        }
    }



    fs.writeFile('VIRAMEN.txt', FileContent, function (err) {
        if (err) return console.log(err);
        console.log('VIRMEN.txt Generated');
    })
}

appendTxToFile(transaction) {
        
}

createTxsFile() {
    // get today's date
    // Create the file name
    // Create the file with fs
}

generateMassBankCashoutFile(transactions)
