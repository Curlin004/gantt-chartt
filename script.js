document.addEventListener('DOMContentLoaded', () => {
    const ganttBody = document.getElementById('gantt-body');
    const addTaskButton = document.getElementById('add-task');
    const addTimelineButton = document.getElementById('add-timeline');

    const createTaskRow = (taskName = "New Task", barStart = 10, barWidth = 20, barColor = "#ff6699") => {
        const row = document.createElement('div');
        row.classList.add('gantt-row');

        const taskNameDiv = document.createElement('div');
        taskNameDiv.classList.add('task-name');
        taskNameDiv.contentEditable = "true";
        taskNameDiv.textContent = taskName;
        row.appendChild(taskNameDiv);

        const timelineDiv = document.createElement('div');
        timelineDiv.classList.add('gantt-timeline');

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.left = `${barStart}px`;
        bar.style.width = `${barWidth}px`;
        bar.style.backgroundColor = barColor;
        bar.textContent = "Task";

        let isDragging = false;
        let startX = 0;

        bar.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            bar.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                startX = e.clientX;
                bar.style.left = `${parseInt(bar.style.left, 10) + deltaX}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                bar.style.cursor = 'grab';
            }
        });

        bar.addEventListener('dblclick', () => {
            const newWidth = prompt("Enter new width (px):", bar.style.width.replace("px", ""));
            if (newWidth && !isNaN(newWidth)) {
                bar.style.width = `${newWidth}px`;
            }
        });

        timelineDiv.appendChild(bar);
        row.appendChild(timelineDiv);

        return row;
    };

    addTaskButton.addEventListener('click', () => {
        const newRow = createTaskRow();
        ganttBody.appendChild(newRow);
    });

    addTimelineButton.addEventListener('click', () => {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = `New Date`;
        dateDiv.contentEditable = "true";
        dateDiv.style.flex = "1";
        dateDiv.style.textAlign = "center";
        document.querySelector('.gantt-dates').appendChild(dateDiv);
    });

    ganttBody.appendChild(createTaskRow("Kick-Off", 50, 150, "#005b96"));
    ganttBody.appendChild(createTaskRow("Risikoanalyse", 200, 120, "#ff6699"));
    ganttBody.appendChild(createTaskRow("Schulungsmaßnahmen", 400, 100, "#ff6699"));
});
