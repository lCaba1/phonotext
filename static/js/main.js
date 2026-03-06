function renderData(data) { // вывод текста и таблицы
    const textContainer = document.getElementById('text-container');
    const tableBody = document.querySelector('#repeats-table tbody');

    textContainer.innerHTML = '';
    tableBody.innerHTML = '';

    data.text.forEach(char => {
        if (char.origin === "\n") {
            textContainer.appendChild(document.createElement('br'));
        } else {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char.origin;
            span.setAttribute('data-id', char["positions"].text);
            textContainer.appendChild(span);
        }
    });

    data["repeats"].forEach(rep => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><b>${rep.key}</b></td><td>${rep.count}</td><td>${parseFloat(rep.power).toFixed(2)}</td>`;
        tr.setAttribute('data-ids', rep.letters);
        
        tr.onclick = () => {
            document.querySelectorAll('.letter').forEach(l => l.classList.remove('highlight'));
            document.querySelectorAll('tr').forEach(r => r.classList.remove('active-row'));
            tr.classList.add('active-row');
            
            rep.indCombs.forEach(group => {
                group.forEach(id => {
                    const el = document.querySelector(`.letter[data-id="${id}"]`);
                    if (el) el.classList.add('highlight');
                });
            });
        };
        tableBody.appendChild(tr);
    });
}

function handleRowClick(tr, indCombs) { // подсветка по нажатию
    document.querySelectorAll('.letter').forEach(l => l.classList.remove('highlight'));
    document.querySelectorAll('tr').forEach(r => r.classList.remove('active-row'));

    tr.classList.add('active-row');
    
    indCombs.forEach(group => {
        group.forEach(id => {
            const el = document.querySelector(`.letter[data-id="${id}"]`);
            if (el) {
                el.classList.add('highlight');
            }
        });
    });
}



console.log(JSON.parse(document.getElementById('initial-data').textContent));
renderData(JSON.parse(document.getElementById('initial-data').textContent));


