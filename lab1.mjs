//Objects
function Establishment (id, name, address, phone, category) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.category = category;
}

function Bag (id, type, content, price, size, establishmentId, pickupTimeRange, state = "available") {
        this.id = id;
        this.type = type;
        this.content = content || [];
        this.price = price;
        this.size = size;
        this.establishmentId = establishmentId;
        this.pickupTimeRange = pickupTimeRange;
        this.state = state;
}

function FoodItem (id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
}

function User(id, username, email, allergiesOrRequests = "") {
        this.id = id;
        this.username = username;
        this.email = email;
        this.allergiesOrRequests = allergiesOrRequests;
        this.shoppingCart = new ShoppingCart(this.id);
}

function ShoppingCart(userId) {
    this.userId = userId;
    this.bags = [];
    

    this.addBag = (bag) =>
        // Check one bag per establishment per day rule here
        this.bags.push(bag);
    

    this.removeBag = (bagId) => this.bags = this.bags.filter(b => b.id !== bagId);
    

    this.findBagByCriteria = (criteriaFn) => {
        const matchingBags = [...bags]
        return matchingBags.filter(criteriaFn);
    }

    this.clearCart = () => this.bags = [];
    
}

//Collections
function Bags() {
    this.bags = [];
    
    this.addBag = (bag) => this.bags.push(bag);

    this.getAvailableBags = () => {
        const availableBags = [...this.bags]
        return availableBags.filter(bag => bag.state === "available");
    }

    this.findBagById = (id) => this.bags.find(bag => bag.id === id);
    
    this.reserveBag = (id) => {
        const bag = this.findBagById(id);
        if (bag && bag.state === "available") {
            bag.state = "reserved";
            return true;
        }
        return false;
    }

    this.deleteBag = (id) => { this.bags = this.bags.filter(bag => bag.id !== id);}
}

function Establishments() {
    this.establishments = [];

    this.addEstablishment = (establishment) => this.establishments.push(establishment);
    
    this.getAllEstablishmentsAlphabetically = () => {
        const sortedEstablishments = [...this.establishments]
        return sortedEstablishments.sort((a, b) => (a.name<b.name)? -1 : ( (a.name>b.name)? +1 : 0));
    }

    this.findEstablishmentById = (id) => {
        return this.establishments.find(est => est.id === id);
    }
}

//Populating collections
// Create instances of the managers
const establishmentManager = new Establishments();
const bagManager = new Bags();

// Populate EstablishmentManager with 5 establishments
establishmentManager.addEstablishment(new Establishment(1, "Green Grocery", "123 Apple St", "123-456-7890", "Groceries"));
establishmentManager.addEstablishment(new Establishment(2, "Baker's Delight", "456 Bread Blvd", "987-654-3210", "Bakery"));
establishmentManager.addEstablishment(new Establishment(3, "Fresh Bites", "789 Salad Ave", "555-123-4567", "Restaurant"));
establishmentManager.addEstablishment(new Establishment(4, "Ocean's Catch", "321 Fish Rd", "222-333-4444", "Seafood"));
establishmentManager.addEstablishment(new Establishment(5, "Sweet Treats", "654 Candy Ln", "888-777-6666", "Desserts"));

// Populate BagManager with 5 bags
bagManager.addBag(new Bag(1, "surprise", null, 5.99, "small", 1, { start: "2025-04-27T10:00", end: "2025-04-27T12:00" }));
bagManager.addBag(new Bag(2, "regular", [
    new FoodItem(1, "Apple", 2),
    new FoodItem(2, "Banana", 1)
], 7.49, "medium", 2, { start: "2025-04-28T14:00", end: "2025-04-28T16:00" }));

bagManager.addBag(new Bag(3, "surprise", null, 6.25, "large", 3, { start: "2025-04-29T18:00", end: "2025-04-29T20:00" }));

bagManager.addBag(new Bag(4, "regular", [
    new FoodItem(3, "Salmon Fillet", 1),
    new FoodItem(4, "Shrimp", 12)
], 15.99, "medium", 4, { start: "2025-04-30T12:00", end: "2025-04-30T14:00" }));

bagManager.addBag(new Bag(5, "regular", [
    new FoodItem(5, "Chocolate Bar", 3),
    new FoodItem(6, "Candy Cane", 5)
], 4.50, "small", 5, { start: "2025-05-01T16:00", end: "2025-05-01T18:00" }));

//visualize
establishmentManager.getAllEstablishmentsAlphabetically().forEach((r) => console.log(r.name + ''+r.address))

bagManager.bags.forEach(b => console.log(b.type + ' ' + b.price))