const mineHeapSkope = function () { // No parameter needed
    // Resource contained inside
let mountain = {
    "coalGoldMine": {
        "Coal": {
            "kilograms": 5302
        },
        "Gold": {
            "kilograms": 2775
        }
    },
    "ironCopperMine":  {
        "Iron": {
            "kilograms": 3928
        },
        "Copper": {
            "kilograms": 901
        }
    }
}
    // do for in
    return Object.create(null, {
        // to make this work dynamically, create an array and push using a for loop

        products: {
            get: () => ["Coal", "Gold", "Iron", "Copper"]
        },
        process: {
            value: (requestedMineral) => {
                let howMuchIHaveLeft = 0
                let parcelAmount = 0
                for (let mine in mountain) {
                    const currentMine = mountain[mine]
                    if (currentMine.hasOwnProperty(requestedMineral)) {
                        // We found it. Get the amount left
                        howMuchIHaveLeft = currentMine[requestedMineral].kilograms
                        
                        if (howMuchIHaveLeft >= 5) {
                            parcelAmount = 5
                        } else {
                            parcelAmount = howMuchIHaveLeft
                        }
                        currentMine[requestedMineral].kilograms -= parcelAmount
                    }
                }            
                return {
                    "mineral": requestedMineral,
                    "amount":parcelAmount
                }
            }
        }
    })
}

const SkopeManager = mineHeapSkope()
const mineOrders = []

SkopeManager.products.forEach(
    mineral => {

        let processResult = null
        do {
            processResult = SkopeManager.process(mineral)
            if (processResult.amount > 0) mineOrders.push(processResult) 
        } while (processResult.amount === 5)
    }
)
// dat sweet sweet generator
const mineContainerGenerator = function* () {
    let containerId = 1
    const maxContainers = 30

    while (containerId <= maxContainers) {
        yield { "id": containerId, "type": "Mineral", "orders": []}
        containerId++
    }
}
// this is an instance!
const containerMaker = mineContainerGenerator()

// put mines in their stupid containers
let currentMineContainer = containerMaker.next().value
let mineSiloh = []
mineOrders.forEach(
    order => {
        if (currentMineContainer) {
            
            currentMineContainer.orders.push(order)
            let capacity = 565 / (currentMineContainer.orders.length * 5)
            
            // no more space, move to next container
            if (capacity === 1) {
                console.log(currentMineContainer)
                currentMineContainer = containerMaker.next().value
                
            }
        }
    }
)
// push again for the leftovers
mineSiloh.push(currentMineContainer)
console.log(currentMineContainer)






