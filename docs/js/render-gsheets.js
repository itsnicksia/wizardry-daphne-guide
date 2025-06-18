const trustSheet = {
    url: "https://docs.google.com/spreadsheets/d/1yZmJFzlspu45kUQmqfb-mBzlomwRYlaWUn_8ACECok8/gviz/tq?tqx=out:csv&sheet=Affinity%20Chart",
    containerElementId: "trust-chart",
    columnRange: [1, 14]
}

const equipmentSheet = {
    url: "https://docs.google.com/spreadsheets/d/1XzlwOeuDjlFJ86zUrFtE2sO6J5AIdis0PM-nC7O0MQw/gviz/tq?tqx=out:csv&sheet=Drop%20Data",
    containerElementId: "equipment-drop-rates",
    columnRange: [0, 9]
}

const decorators = (table) => {
    new Tablesort(table);
    addFilterDecorator(table);
};

document$.subscribe(() => {
    buildTableFromSheet(trustSheet, decorators);
    buildTableFromSheet(equipmentSheet, decorators);
});

function buildTableFromSheet({containerElementId, url, columnRange}, onPostBuild) {
    const container = document.getElementById(containerElementId);
    if (!container) {
        return;
    }

    Papa.parse(
        url,
        {
            download: true,
            header: false,
            complete: ({ data, meta }) => {
                let html = [
                    "<div class='md-typeset__scrollwrap'>",
                    "<div class='md-typeset__table'>",
                    "<table><thead><tr>"];
                data.shift().slice(...columnRange).forEach(h => html.push(`<th>${h}</th>`));
                html.push("</tr></thead><tbody>");

                // rows
                data.forEach((row, index) => {
                    html.push('<tr>');
                    row.slice(...columnRange).forEach(columnValue => html.push(`<td>${columnValue}</td>`));
                    html.push('</tr>');
                });
                html.push("</tbody></table></div></div>");
                container.innerHTML = html.join("");


                const table = container.querySelector("table");
                onPostBuild(table);
            }
        }
    );
}
