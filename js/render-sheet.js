const trustSheet = {
    url: "https://docs.google.com/spreadsheets/d/1yZmJFzlspu45kUQmqfb-mBzlomwRYlaWUn_8ACECok8/gviz/tq?tqx=out:csv&sheet=Affinity%20Chart",
    containerElementId: "trust-chart",
    columnRange: [1, 12]
}

document$.subscribe(() => {
    buildTableFromSheet(trustSheet);
});

function buildTableFromSheet({containerElementId, url, columnRange}) {
    const container = document.getElementById(containerElementId);

    if (!container) {
        return;
    }

    Papa.parse(
        url,
        {
            download: true,
            header: true,
            complete: ({ data, meta }) => {
                let html = [
                    "<div class='md-typeset__scrollwrap'>",
                    "<div class='md-typeset__table'>",
                    "<table><thead><tr>"];
                // headers
                meta.fields.slice(...columnRange).forEach(h => html.push(`<th>${h}</th>`));
                html.push("</tr></thead><tbody>");
                // rows
                data.forEach(row => {
                    html.push("<tr>");
                    meta.fields.slice(...columnRange).forEach(f => html.push(`<td>${row[f]||""}</td>`));
                    html.push("</tr>");
                });
                html.push("</tbody></table></div></div>");
                container.innerHTML = html.join("");
            }
        }
    );
}
