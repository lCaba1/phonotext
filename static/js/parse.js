function highlightSelectedLetters() {
    // Снимаем предыдущие подсветки
    document.querySelectorAll('.letter').forEach(el => el.classList.remove('highlight'));

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const contents = range.cloneContents(); // клонируем выделение

    // Находим все span с классом letter внутри выделенного диапазона
    const spans = contents.querySelectorAll('.letter');

    spans.forEach(span => {
        // Находим оригинальный span в DOM по data-id (или можно по тексту)
        const id = span.dataset.id;
        const orig = document.querySelector(`.letter[data-id="${id}"]`);
        if (orig) orig.classList.add('highlight');
    });
}

// Вешаем событие на отпускание мыши
document.addEventListener('mouseup', highlightSelectedLetters);




function highlightTableOnTextSelection() {
    // Сначала снимаем все подсветки
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('active-row'));

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = document.getElementById('text-container');

    // Получаем все .letter внутри выделения
    const letters = [];
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode(node) {
                return (node.classList.contains('letter')) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        },
        false
    );

    while(walker.nextNode()) {
        const node = walker.currentNode;
        if (selection.containsNode(node, true)) {
            letters.push(node.dataset.id);
        }
    }

    if (letters.length === 0) return;

    // Подсвечиваем строки таблицы
    document.querySelectorAll('#repeats-table tbody tr').forEach(tr => {
        const trIds = tr.getAttribute('data-ids'); // ожидаем массив или строку с разделителем
        if (!trIds) return;

        // Если data-ids — строка JSON, парсим
        let ids = [];
        try {
            ids = JSON.parse(trIds);
        } catch {
            ids = trIds.split(','); // если строка через запятую
        }

        // Проверяем пересечение с выделенными буквами
        if (letters.some(lid => ids.includes(lid))) {
            tr.classList.add('active-row');
        }
    });
}

// Вешаем событие на отпускание мыши
document.addEventListener('mouseup', highlightTableOnTextSelection);