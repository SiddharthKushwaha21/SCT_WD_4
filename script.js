 const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text: text,
            date: taskDate.value || 'No date',
            time: taskTime.value || 'No time',
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        saveAndRender();
    });

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(t => {
            if (filter === 'completed') return t.completed;
            if (filter === 'active') return !t.completed;
            return true;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="task-info">
                    <h3>${task.text}</h3>
                    <div class="task-date"><i class="fa-regular fa-calendar"></i> ${task.date} | ${task.time}</div>
                </div>
                <div class="task-actions">
                    <button class="btn-complete" onclick="toggleTask(${task.id})"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleTask = (id) => {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveAndRender();
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);
        saveAndRender();
    };

    window.filterTasks = (filter) => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        renderTasks(filter);
    };

    renderTasks();