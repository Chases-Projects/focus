document.addEventListener("DOMContentLoaded", function () {
    ['top3', 'todo', 'distractions'].forEach(section => {
        const list = document.querySelector(`#${section}-list`);
        if (!list) return;

        new Sortable(list, {
            animation: 150,
            handle: '.drag-handle',
            onEnd: function (evt) {
                const ids = Array.from(list.children).map(li => li.dataset.id);
                fetch("/reorder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ order: ids })
                });
            }
        });
    });
});
