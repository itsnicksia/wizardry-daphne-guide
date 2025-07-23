const Sort = (table) => new Tablesort(table);
const Filter = (table) => addFilterPlugin(table);

const trustSheet = {
    url: "https://docs.google.com/spreadsheets/d/1yZmJFzlspu45kUQmqfb-mBzlomwRYlaWUn_8ACECok8/gviz/tq?tqx=out:csv&sheet=Affinity%20Chart",
    containerElementId: "trust-chart",
    columnRange: [1, 14],
    plugins: [Sort, Filter]
}

const equipmentSheet = {
    url: "https://docs.google.com/spreadsheets/d/1XzlwOeuDjlFJ86zUrFtE2sO6J5AIdis0PM-nC7O0MQw/gviz/tq?tqx=out:csv&sheet=Drop%20Data",
    containerElementId: "equipment-drop-rates",
    columnRange: [0, 9],
    plugins: [Sort, Filter]
}

const equipTableWeaponsSheet = {
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdkxkQ7MR0kOOOlPgZ666s2oFoyI5Z34y6l1hxcwHXdktXuf9OrsfhQAsINwLvCBVEfylIygj5oCAE/pub?gid=1651673786&single=true&output=csv",
    containerElementId: "weapons-table-container",
    columnRange: [2, 59]
}

const equipTableArmorSheet = {
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdkxkQ7MR0kOOOlPgZ666s2oFoyI5Z34y6l1hxcwHXdktXuf9OrsfhQAsINwLvCBVEfylIygj5oCAE/pub?gid=139619551&single=true&output=csv",
    containerElementId: "armor-table-container",
    columnRange: [2, 59]
}

document$.subscribe(() => {
    buildTableFromSheet(trustSheet);
    buildTableFromSheet(equipmentSheet);
    buildTableFromSheet_equip(equipTableWeaponsSheet);
    buildTableFromSheet_equip(equipTableArmorSheet);
});

function buildTableFromSheet({containerElementId, url, columnRange, plugins = []}) {
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

                plugins.forEach(plugin => plugin(table));
            }
        }
    );
}

function buildTableFromSheet_equip({containerElementId, url, columnRange, plugins = []}) {
    const container = document.getElementById(containerElementId);
    if (!container) {
        return;
    }

    Papa.parse(
        url,
        {
            download: true,
            header: false,
            preview: 100,
            complete: ({ data, meta }) => {
                let html = [
                    "<div class='md-typeset__scrollwrap'>",
                    "<div class='md-typeset__table'>",
                    "<table><thead><tr>"];
                data.shift().slice(...columnRange).forEach(h => html.push(`<th>${h}</th>`));
                html.push("</tr></thead><tbody>");

                // rows
                data.forEach((row, index) => {
                    if (`${row[4]}`) {
                        html.push('<tr>');
                        row.slice(...columnRange).forEach(columnValue => html.push(`<td>${columnValue}</td>`));
                        html.push('</tr>');
                    }
                });
                html.push("</tbody></table></div></div>");
                container.innerHTML = html.join("");


                const table = container.querySelector("table");

                plugins.forEach(plugin => plugin(table));
            }
        }
    );
}
