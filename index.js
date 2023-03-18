var fs_1 = require("fs");
var commander_1 = require("commander");
var program = new commander_1.Command();
var users = JSON.parse(
    fs_1.readFileSync("./todolist.json", { encoding: "utf-8" })
);

program
    .name("ToDoList")
    .description("Creating To do list")
    .version("0.8.0");
program
    .command("add")
    .description("Add new TODO")
    .requiredOption("-t, --title <string>", "TODOS must have titles")
    .addOption(
        new commander_1.Option(
            "-s, --status <string>",
            "status for the TODO"
        ).choices(["to-do", "in Progress", "Done"])
    )
    .action(function (options) {
        var listId = 1;
        if (users.length) {
            listId = users[users.length - 1].id + 1;
        }
        users.push({
            id: listId,
            title: options.title,
            status: options.status || "to-do",
        });
        fs_1.writeFileSync("./todolist.json", JSON.stringify(users, null, 2));
        //  console.log(users)
    });


program
    .command("list")
    .description("Add new TODO")
    .addOption(
        new commander_1.Option(
            "-s, --status <string>",
            "status for the TODO"
        ).choices(["to-do", "in Progress", "Done"])
    )
    .action(function (options) {
        var status = options.status || "to-do";
        //   console.log(status)
        console.log(
            users.filter(function (todo) {
                // console.log(todo.status);
                return todo.status == status;
            })
        );
    });
program
    .command("update")
    .description("Update a todo")
    .requiredOption("-i , --id <string>", "The ID of the TODO")
    .requiredOption("-t , --title <string>", "The new title of the TODO")
    .addOption(
        new commander_1.Option(
            "-s, --status <string>",
            "status for the TODO"
        ).choices(["to-do", "in Progress", "Done"])
    )
    .action(function (options) {
        if (
            users.find(function (_a) {
                var id = _a.id;
                return id === Number(options.id);
            })
        ) {
            users = users.map(function (user) {
                return user.id == options.id
                    ? {
                        ...user,
                        title: options.title,
                        status: options.status || user.status,
                    }
                    : user;
            });
            fs_1.writeFileSync("./todolist.json", JSON.stringify(users, null, 2));
        } else {
            console.log("wrong id");
        }
    });

    
program
    .command("delete")
    .description("delete a todo")
    .requiredOption("-i , --id <string>", "The ID of the TODO")
    .action(function (options) {
        users = users.filter(function (user) {
            return user.id != options.id;
        });
        fs_1.writeFileSync("./todolist.json", JSON.stringify(users, null, 2));
    });
program.parse();
