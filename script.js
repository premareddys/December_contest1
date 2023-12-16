function addTask() {
    var taskInput = document.getElementById('task-input').value;
    var dueDate = document.getElementById('dueDate').value;
    var prioritySelect = document.getElementById('priority-filter');
    var priority = prioritySelect.value;

    if (taskInput.trim() !== '' && dueDate !== '') {
        var taskContainer = document.getElementById('task-container');
        var taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('data-priority', priority);

        var priorityElement = document.createElement('select');
        priorityElement.classList.add('priority');
        var priorities = ['H', 'M', 'L'];
        for (var i = 0; i < priorities.length; i++) {
            var option = document.createElement('option');
            option.value = priorities[i];
            option.text = priorities[i];
            priorityElement.add(option);
        }

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('check-box');

        var checkboxHolder = document.createElement('div');
        checkboxHolder.classList.add('checkboxHolder');
        checkboxHolder.appendChild(checkbox);

        var taskInfo = document.createElement('span');
        taskInfo.textContent = taskInput;
        taskInfo.classList.add('taskInfo');
        taskInfo.classList.add('editable');

        var taskDueDate = document.createElement('span');
        taskDueDate.textContent = dueDate;
        taskDueDate.classList.add('taskDueDate');
        taskDueDate.classList.add('editable');

        var editButton = document.createElement('i');
        var deleteButton = document.createElement('i');

        editButton.classList.add('fas', 'fa-edit', 'task-icons');
        deleteButton.classList.add('fas', 'fa-trash-alt', 'task-icons');

        var buttonsHolder = document.createElement('div');
        buttonsHolder.classList.add('buttonsHolder');
        buttonsHolder.appendChild(editButton);
        buttonsHolder.appendChild(deleteButton);

        editButton.addEventListener('click', function () {
            taskDueDate.contentEditable = !taskDueDate.isContentEditable;
            taskDueDate.focus();

            taskInfo.contentEditable = !taskInfo.isContentEditable;
            taskInfo.focus();
        });

        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                document.getElementById('started-container').appendChild(taskDiv);
                updateTaskCounts();
            }
        });

        deleteButton.addEventListener('click', function () {
            if (taskDiv.parentNode.id === 'task-container' || taskDiv.parentNode.id === 'started-container') {
                document.getElementById('completed-container').appendChild(taskDiv);
            } else {
                document.getElementById('completed-container').removeChild(taskDiv);
            }

            updateTaskCounts();
        });

        taskDiv.appendChild(priorityElement);
        taskDiv.appendChild(checkboxHolder);
        taskDiv.appendChild(taskInfo);
        taskDiv.appendChild(taskDueDate);
        taskDiv.appendChild(buttonsHolder);

        taskContainer.appendChild(taskDiv);

        document.getElementById('task-input').value = '';
        document.getElementById('dueDate').value = '';

        updateTaskCounts();
        filterTasks(); // Added to update filter immediately after adding a task
    }
}


function updateTaskCounts() {
    var taskCount = document.getElementById('task-count');
    var startedCount = document.getElementById('started-count');
    var completedCount = document.getElementById('completed-count');

    var taskChild = document.getElementById('task-container').childElementCount;
    var startedChild = document.getElementById('started-container').childElementCount;
    var completedChild = document.getElementById('completed-container').childElementCount;

    taskCount.value = taskChild;
    startedCount.value = startedChild;
    completedCount.value = completedChild;
}

function filterTasks() {
    var selectedPriority = document.getElementById('priority-filter').value;

    // Get all task elements
    var tasks = document.querySelectorAll('.task');

    // Loop through tasks and hide/show based on selected priority
    tasks.forEach(function (task) {
        var taskPriority = task.getAttribute('data-priority');

        if (selectedPriority === 'all' || taskPriority === selectedPriority) {
            task.style.display = 'flex'; // Show task
        } else {
            task.style.display = 'none'; // Hide task
        }
    });
}

function searchTasks() {
    var searchInput = document.getElementById('search-input').value.toLowerCase();
    var tasks = document.querySelectorAll('.task');

    tasks.forEach(function (task) {
        var taskInfo = task.querySelector('.taskInfo').textContent.toLowerCase();
        if (taskInfo.includes(searchInput)) {
            task.style.display = 'flex'; // Show task
        } else {
            task.style.display = 'none'; // Hide task
        }
    });
}
