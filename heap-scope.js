const gemHeapSkope = function () { // No parameter needed
    // Resource contained inside
    /*
    The gem mine does not exist outside the barricade of the
    hëap-skopes. The Lexscopistanians build the barricade
    around their facility AND the resource.
    
    a.k.a.
    Instead of being located in an outer scope to the
    function, the gem mine is enclosed by the scope of
    the `gemHeapSkope` function.
    */
    const GemMine = {
        "Onyx": {
            "kilograms": 453
        },
        "Amethyst": {
            "kilograms": 453
        },
        "Bloodstone": {
            "kilograms": 453
        },
        "Emerald": {
            "kilograms": 453
        }
    }
    /*
    Instead of processing the entirety of the resources in
    bulk - which is what the stâck-skope does - this skope
    will return an object that has a method for processing
    each type of mineral.
    
    We're exposing the functionality of this skope to code
    in the outer scope, so that the order in which minerals
    are processed can be customized.
    
    Hëap-skopes workshops can process 5 kilograms of a
    mineral with each work order. So every time the `process`
    function is invoked, subtract 5 from the amount of the
    requested mineral from the enclosed GemMine above.
    */
    return Object.create(null, {
        products: {
            get: () => Object.keys(GemMine)
        },
        process: {
            value: requestedMineral => {
                let parcelAmount = 0
                if (GemMine[requestedMineral].kilograms >= 5) {
                    parcelAmount = 5
                } else {
                    parcelAmount = GemMine[requestedMineral].kilograms
                }
                GemMine[requestedMineral].kilograms -= parcelAmount

                return {
                    "mineral": requestedMineral,
                    "amount": parcelAmount
                }
            }
        }
    })
}
const SkopeManager = gemHeapSkope()
const gemOrders = []

SkopeManager.products.forEach(
    mineral => {

        let processResult = null
        do {
            processResult = SkopeManager.process(mineral)
            if (processResult.amount > 0) gemOrders.push(processResult)
        } while (processResult.amount === 5)
    }
)
// dat sweet sweet generator
const gemContainerGenerator = function* () {
    let containerId = 1
    const maxContainers = 30

    while (containerId <= maxContainers) {
        yield { "id": containerId, "type": "Mineral", "orders": [] }
        containerId++
    }
}
// this is an instance!
const containerMaker = gemContainerGenerator()


// put gems in their stupid containers
let currentGemContainer = containerMaker.next().value
let heapSkopeSiloh = []
gemOrders.forEach(
    order => {
        if (currentGemContainer) {

            currentGemContainer.orders.push(order)
            let capacity = 565 / (currentGemContainer.orders.length * 5)

            // no more space, move to next container
            if (capacity === 1) {
                heapSkopeSiloh.push(currentGemContainer)
                currentGemContainer = containerMaker.next().value
            }
        }
    }
)
heapSkopeSiloh.push(currentGemContainer)

console.log(heapSkopeSiloh)
