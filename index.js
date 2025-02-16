const jsonfile = require("jsonfile");
const moment = require("moment");
const FILE_PATH = "./data.json";
const simplegit = require("simple-git");
const random = require("random");

// Create an instance of the Random class
const rand = new random.Random();

const makeCommit = (n) => {
    if (n === 0) return simplegit().push();

    const x = rand.int(0, 54); // Use rand.int to generate a random integer
    const y = rand.int(0, 6);  // Use rand.int to generate a random integer

    const DATE = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();
    const data = {
        date: DATE,
    };

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, (err) => {
        if (err) return console.error(err);

        simplegit().add([FILE_PATH]).commit(DATE, { "--date": DATE }, () => {
            makeCommit(--n);
        });
    });
};

makeCommit(50);