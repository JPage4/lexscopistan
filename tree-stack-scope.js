/*
    Generator functions can be used to generate a value, or object,
    on demand, until a certain condition is met. The function below
    defines a generator for tree storage containers. Since stack skupes
    are used to collect trees, and they use 10 storage containers, 
    instances of this generator will stop producing containers after the
    10th one.
*/
const treeContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 10

    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "tree", "logs": [] }
        currentContainer++
    }
}

/*
    Create an instance of the tree container generator function.
    `treeContainerFactory` will generate 10 containers.

    > treeContainerFactory.next().value
    { "id": 1, "type": "tree", "logs": [] }

    > treeContainerFactory.next().value
    { "id": 2, "type": "tree", "logs": [] }

    etc..
*/
const treeContainerFactory = treeContainerGenerator()

/*
    A field containing four types of trees to process
    It exists outside of the stack skope.
*/
const forest = [
    {
        "type": "Oak",
        "amount": 9
    },
    {
        "type": "Pine",
        "amount": 12
    },
    {
        "type": "Ash",
        "amount": 6
    },
    {
        "type": "Balsa",
        "amount": 10
    }
]

/*
    Create a skope function to process each tree.

    Lexscopistanian tree processors can produce 4 logs for every 1 tree.
*/
const treeStackSkope = function (rawTrees) {
    /*
        Use the array map() method to build up a new array
        populated with processed trees. Remember that the map
        method iterates over an array, one item at a time, 
        and runs the logic in the provided function on each 
        iteration.
    */
    const processedLogs = rawTrees.map(
        /*
            For each tree, return a new object representing
            the logs to store in the containers.

            This is an example of an arrow function with an
            expression body.
                https://mzl.la/1rrAsL3
        */
        currentTree => ({
            "type": currentTree.type,
            "logs": Math.floor(currentTree.amount * 4)
        })
    )

    /*
        `processedLogs` is only available within the block 
        scope of this function
    */
    return processedLogs
}

/*
    Remember that JavaScript is object-oriented, so everything
    is an object - including functions. Since functions are
    objects, then you can add key/value pairs to them
*/
treeStackSkope.containers = []


/*
    Construct the skope, and import all of the gathered
    resources to be processed. The end result is a collection
    of logs that need to be stored.

    a.k.a.
    Invoke the function, and store its return value - an array
    of objects - in the `allLogs` variable.
*/
let allLogs = treeStackSkope(forest)


/*
    Now that the trees have been processed into logs, you
    need to place them in the storage containers. Keep in mind
    that storage containers can hold 15 logs.

    1. Open the first container by invoking the `treeContainerFactory`
       generator function.
    2. Iterate over the `allLogs` array
    3. Look at each object, which holds information about the type of
       resource, and how many logs were produced, and get the value
       of the `logs` property 
    3. Do a `for` loop that iterates up to that value
    4. Insert a new object into a storage container. The object
       should describe the type of bushel.

         e.g. { "tree": "Oak" }

    5. Make sure you keep count of how many logs are in the
       container, and once it reaches 15, start placing the 
       objects in the next container.
*/

// Open the first container
let currentContainer = treeContainerFactory.next().value

// Iterate over the `allLogs` array
allLogs.forEach(

    // Look at each processed tree object
    currentLog => {

        // Do a `for` loop that iterates up to number of logs
        for (let i = 0; i < currentLog.logs; i++) {

            // Insert a new object into a storage container
            const log = {"type": currentLog.type}
            currentContainer.logs.push(log)

            // Once capacity is reached, use next storage container
            if (currentContainer.logs.length === 15) {
                treeStackSkope.containers.push(currentContainer)
                currentContainer = treeContainerFactory.next().value
            }
        }
    }
)


/*
    Try to console.log() any of the values defined in the block scope
    above, such as `i`, `log`, or `currentLog`
*/


/*
    If there is a partially filled container left over, add it to the
    collection of skope storage containers.
*/
if (currentContainer.logs.length > 0) {
    treeStackSkope.containers.push(currentContainer)
}

// Take a look at what's in your containers
console.log(treeStackSkope.containers)