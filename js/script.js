{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_, index) => index !== taskIndex);
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return {
                    ...task,
                    done: !task.done,
                };
            }
            return task;
        });
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            
            <li class="form__listItem">
            <button class="form__buttonDone js-done">✅</button>
            <span class="${task.done ? "form__listItem--done" : ""}">
            ${task.content}</span>
            <button class="form__buttonRemove js-remove">❌</button>
    
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;


        bindEvents();
    };



    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();

    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();


}


