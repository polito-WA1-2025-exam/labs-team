import sqlite from 'sqlite3';
import dayjs from 'dayjs';

const db = new sqlite.Database('db.sqlite', (err) => {if (err) throw err})


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

        this.getFoodItems = () => new Promise( (resolve, reject) => {
            const sql = `
                   SELECT bag_contents.food_item_id, food_items.name, bag_contents.quantity
                   FROM bag_contents, food_items
                   WHERE bag_contents.bag_id = ?
                   AND bag_contents.food_item_id = food_items.id`
             db.all(sql, [this.id], (err, row) => {
                 if(err) reject(err);
                 else{
                     if(!row) {
                         reject("Empty bag with id"+this.id)
                     }else{ 
                        const items = rows.map(row => new FoodItem(row.id, row.name, row.quantity))
                        resolve(new FoodItem(row.id, row.name, row.quantity))}
                 }
             })
        })

        this.addFoodItem = (fi) => new Promise((resolve, reject) => {
            const checkSql = `SELECT id FROM food_items WHERE name = ?`;
            db.get(checkSql, [fi.name], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    const insertIntoBagContents = (foodItemId) => {
                        const insertContentSql = `INSERT INTO bag_contents (bag_id, food_item_id, quantity) VALUES (?, ?, ?)`;
                        db.run(insertContentSql, [this.id, foodItemId, fi.quantity], function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        });
                    };
        
                    if (row) {
                        // FoodItem already exists
                        insertIntoBagContents(row.id);
                    } else {
                        // FoodItem doesn't exist yet
                        const insertFoodSql = `INSERT INTO food_items (name, quantity) VALUES (?, ?)`;
                        db.run(insertFoodSql, [fi.name, fi.quantity], function(err) {
                            if (err) reject(err);
                            else {
                                const newFoodItemId = this.lastID;
                                insertIntoBagContents(newFoodItemId);
                            }
                        });
                    }
                }
            });
        });
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

        this.addQuestion = (q) => new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO question (text, authorId, date)
                VALUES (?, ?, ?)
                `;
            db.run(sql, [q.text, q.authorId, q.date.toISOString()], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Resolve with the inserted ID if needed
                }
                });
    });

    this.getQuestion = (id) => new Promise( (resolve, reject) => {
            const sql = `
                   SELECT question.*, user.email
                   FROM question, user
                   WHERE question.id = ?
                   AND question.authorId = user.id`
             db.get(sql, [id], (err, row) => {
                 if(err) reject(err);
                 else{
                     if(!row) 
                         reject("No question found with id"+id)
                     else resolve(new Question(row.id, row.text, row.authorId, row.email, dayjs(row.date)))
                 }
             })
             
         
         })
    

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

    this.addQuestion = (q) => new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO question (text, authorId, date)
            VALUES (?, ?, ?)
            `;
        db.run(sql, [q.text, q.authorId, q.date.toISOString()], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Resolve with the inserted ID if needed
            }
            });
    });

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
    

    this.addQuestion = (q) => new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO question (text, authorId, date)
            VALUES (?, ?, ?)
            `;
        db.run(sql, [q.text, q.authorId, q.date.toISOString()], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Resolve with the inserted ID if needed
            }
            });
    });

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {   
        const sql = `
        SELECT answer.*, user.email 
        FROM answer, user
        WHERE questionId = ?
        AND answer.authorId = user.id`
        
        //inside the Question object you have access to its properties: parameter is this.id
        db.all(sql, [this.id], (err, rows) => {
            if(err) {reject(err)}
            else{
                const result = rows.map((item) => new Answer(item.id, item.text, item.authorId, item.email, dayjs(item.date), item.score))
                resolve(result);
                }
            })
        }
    )}

    this.getQuestion = (id) => new Promise( (resolve, reject) => {
        const sql = `
               SELECT question.*, user.email
               FROM question, user
               WHERE question.id = ?
               AND question.authorId = user.id`
         db.get(sql, [id], (err, row) => {
             if(err) reject(err);
             else{
                 if(!row) 
                     reject("No question found with id"+id)
                 else resolve(new Question(row.id, row.text, row.authorId, row.email, dayjs(row.date)))
             }
         })
         
     
     })

    this.getAllEstablishmentsAlphabetically = () => {
        const sortedEstablishments = [...this.establishments]
        return sortedEstablishments.sort((a, b) => (a.name<b.name)? -1 : ( (a.name>b.name)? +1 : 0));
    }

    this.findEstablishmentById = (id) => {
        return this.establishments.find(est => est.id === id);
    }
}


//Populating collections
const establishmentManager = new Establishments();

establishmentManager.addEstablishment(new Establishment(undefined, "Green Grocery", "123 Apple St", "123-456-7890", "Groceries"))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

establishmentManager.addEstablishment(new Establishment(undefined, "Baker's Delight", "456 Bread Blvd", "987-654-3210", "Bakery"))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

establishmentManager.addEstablishment(new Establishment(undefined, "Fresh Bites", "789 Salad Ave", "555-123-4567", "Restaurant"))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

establishmentManager.addEstablishment(new Establishment(undefined, "Ocean's Catch", "321 Fish Rd", "222-333-4444", "Seafood"))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

establishmentManager.addEstablishment(new Establishment(5, "Sweet Treats", "654 Candy Ln", "888-777-6666", "Desserts"))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

// Create instances of the managers
const bagManager = new Bags();

// Populate BagManager with 5 bags
bagManager.addBag(new Bag(undefined, "surprise", null, 5.99, "small", 1, { start: "2025-04-27T10:00", end: "2025-04-27T12:00" }))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

bagManager.addBag(new Bag(undefined, "regular", [
    new FoodItem(1, "Apple", 2),
    new FoodItem(2, "Banana", 1)
], 7.49, "medium", 2, { start: "2025-04-28T14:00", end: "2025-04-28T16:00" }))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

bagManager.addBag(new Bag(undefined, "surprise", null, 6.25, "large", 3, { start: "2025-04-29T18:00", end: "2025-04-29T20:00" }))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

bagManager.addBag(new Bag(undefined, "regular", [
    new FoodItem(3, "Salmon Fillet", 1),
    new FoodItem(4, "Shrimp", 12)
], 15.99, "medium", 4, { start: "2025-04-30T12:00", end: "2025-04-30T14:00" }))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

bagManager.addBag(new Bag(undefined, "regular", [
    new FoodItem(5, "Chocolate Bar", 3),
    new FoodItem(6, "Candy Cane", 5)
], 4.50, "small", 5, { start: "2025-05-01T16:00", end: "2025-05-01T18:00" }))
.then(id => console.log('Inserted with ID:', id))
.catch(err => console.error('Insertion error:', err));

//visualize
establishmentManager.getAllEstablishmentsAlphabetically().forEach((r) => console.log(r.name + ''+r.address))
bagManager.bags.forEach(b => console.log(b.type + ' ' + b.price))