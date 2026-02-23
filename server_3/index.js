const express = require("express");
const app = express();
app.use(express.json());


const users = [
    { id: 1, name: "Arjun", role: "student" },
    { id: 2, name: "Priyesha", role: "mentor" },
    { id: 3, name: "jalak", role: "child" },
    { id: 4, name: "Rahul", role: "mentor" }
];


app.get("/", (req, res) => {
    res.send("Express server is running");
});


app.get("/users", (req, res) => {
    res.status(200).json(users);
});


app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});



app.post("/user", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});


app.post("/users", (req, res) => {
    const user1 = {
        id: req.body[0].id,
        name: req.body[0].name,
        role: req.body[0].role
    }
    console.log("user1:", user1);
    users.push(user1);

    const user2 = {
        id: req.body[1].id,
        name: req.body[1].name,
        role: req.body[1].role
    }
    console.log("user2:", user2);
    users.push(user2);

    const user3 = {
        id: req.body[2].id,
        name: req.body[2].name,
        role: req.body[2].role
    }
    console.log("user3:", user3);
    users.push(user3);


    res.status(201).json({
        message: "User created",
    });
})


app.put("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        id: userId,
        name: req.body.name,
        role: req.body.role
    };

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});