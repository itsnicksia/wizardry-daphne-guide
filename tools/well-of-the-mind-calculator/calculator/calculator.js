const SIZE = 4000;
const VIEW_SIZE = 1000;
const NODE_SIZE = 100;
const LINK_LENGTH = 150;

const INACTIVE_NODE_COLOR = {
    fill: "grey",
    stroke: "black",
}

const HP = "hp";
const ATK = "atk";
const DEF = "def";

const rootNode = {
    label: "Well of the Mind",
    connections: {
        northEast: () => node2,
    },
}

const node2 = {
    label: "node2",
    effects: [HP, ATK],
    connections: {
        southWest: () => rootNode,
        northEast: () => node3,
    },
}

const node3 = {
    label: "node3",
    effects: [HP, ATK],
}

const selected = {

};

SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG()
        .addTo('#well-calculator')
        .size(SIZE, SIZE)
        .viewbox(0, 0, VIEW_SIZE, 500)
        .panZoom({
            zoomMin: 2,
            zoomMax: 4,
            wheelZoom: false,
            zoomFactor: 1
        });

    renderNode(draw, rootNode, 0, 0);
})

function renderNode(parent, node, x, y) {
    const nodeGroup = parent.group().x(x).y(y);
    console.log(`x: ${x}, y: ${y}`)

    const circle =     nodeGroup
        .circle(NODE_SIZE)
        .move(x, y)
        .fill('grey')
        .stroke('black')
        .click(() => {
            console.log(node);
        })
        .mouseover(function() {
            selected[]
            circle.fill('red');
        })
        .mouseout(function() {
            circle.fill('grey');
        })


    nodeGroup.text("Well\nof the\nMind").move(20, 20)

    console.log(`gx: ${nodeGroup.x()}, gy: ${nodeGroup.y()}`);

    const northEast = node.connections?.northEast?.();
    if (northEast) {
        nodeGroup
            .line(x + NODE_SIZE / 2, y + NODE_SIZE / 2, x + NODE_SIZE / 2 + LINK_LENGTH,y + NODE_SIZE / 2  + -LINK_LENGTH)
            .stroke({color: 'red', width: 10})
            .back()
        renderNode(nodeGroup, northEast, x + LINK_LENGTH, y + -LINK_LENGTH)
    }
}