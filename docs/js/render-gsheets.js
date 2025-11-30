const Sort = (table) => new Tablesort(table);
const Filter = (table) => addFilterPlugin(table);

const trustSheet = {
    url: "https://docs.google.com/spreadsheets/d/1yZmJFzlspu45kUQmqfb-mBzlomwRYlaWUn_8ACECok8/gviz/tq?tqx=out:csv&sheet=Affinity%20Chart",
    containerElementId: "trust-chart",
    columnRange: [0, 14],
    plugins: [Sort, Filter]
}

const equipmentSheet = {
    url: "https://docs.google.com/spreadsheets/d/1XzlwOeuDjlFJ86zUrFtE2sO6J5AIdis0PM-nC7O0MQw/gviz/tq?tqx=out:csv&sheet=Drop%20Data",
    containerElementId: "equipment-drop-rates",
    columnRange: [0, 9],
    plugins: [Sort, Filter]
}


const equipWishlistWeaponsSheet = {
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdkxkQ7MR0kOOOlPgZ666s2oFoyI5Z34y6l1hxcwHXdktXuf9OrsfhQAsINwLvCBVEfylIygj5oCAE/pub?gid=1453934832&single=true&output=csv",
    containerElementId: "weapons-wishlist-table-container",
    columnRange: [0, 31]
}

const equipWishlistArmorSheet = {
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdkxkQ7MR0kOOOlPgZ666s2oFoyI5Z34y6l1hxcwHXdktXuf9OrsfhQAsINwLvCBVEfylIygj5oCAE/pub?gid=1044801618&single=true&output=csv",
    containerElementId: "armor-wishlist-table-container",
    columnRange: [0, 13]
}

document$.subscribe(() => {
    buildTableFromSheet(trustSheet);
    buildTableFromSheet(equipmentSheet);
    buildTableFromSheet_equipwishlist(equipWishlistWeaponsSheet);
    buildTableFromSheet_equipwishlist(equipWishlistArmorSheet);
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

function buildTableFromSheet_equipwishlist({containerElementId, url, columnRange, plugins = []}) {
    const container = document.getElementById(containerElementId);
    if (!container) {
        return;
    }

    Papa.parse(
        url,
        {
            download: true,
            header: false,
            skipEmptyLines: true,

            complete: ({ data, meta }) => {
               let html = [
                    "<div class='md-typeset__scrollwrap'>",
                    "<div class='md-typeset__table narrow-table'>",
                    "<table><thead><tr>"];
                data.shift().slice(...columnRange).filter((_,index)=>index%2===1).forEach(h => html.push(`<th>${h}</th>`));
                html.push("</tr></thead><tbody>");

                // rows
                data.forEach((row, index) => {
                    html.push('<tr>');
                    row.slice(...columnRange).filter((_,index)=>index%2===1).forEach(columnValue => html.push(`<td>${columnValue}</td>`));
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

