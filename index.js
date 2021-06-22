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

    let filename;

    // create a new empty ext file [transactions-dd-mm-yyyy.txt]
    filename = createTxsFile();

    transactions.map((transaction) => {
        // append trnasaction details to txt file
        appendTxToFile(transaction,filename)
    })

};

function appendTxToFile(transaction, fileName) {

    let lineLength = 128
    let FileContent = ''

    for (var position = 0; position < lineLength; position++) {

        if (PropPosition[position] && PropPosition[position] !== 'Filler') {

            FileContent += transaction[PropPosition[position]]
            position = position + (transaction[PropPosition[position]].length - 1)

        } else {
            FileContent += ' '
        }
    }

    FileContent += '\n'

        //add new content
        fs.appendFile(fileName, FileContent, (err) => {
            if (err) console.log(err);
            console.log("Successfully File appending.");
        });

};

function createTxsFile() {
    // get today's date
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    // Create the file name

    let fileName = `transactions-${today}.txt`

    // Create the file with fs

    fs.writeFile(fileName, '', function (err) {
        if (err) throw err;
        console.log(`${fileName} was generated`);
    });

    return fileName
};

generateMassBankCashoutFile(transactions)
