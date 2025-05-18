import {
    attributeEnhancementValueTable,
    type Blessing,
    type BlessingAttribute,
    type BlessingLine,
    type BlessingLines,
    type BlessingUpgrade,
    type Grade,
    type ItemType,
    itemTypeAttributes,
    type Quality,
    type Range,
} from './types';

const ENHANCEMENT_CHECKPOINT_INTERVAL = 5;

export interface Item {
    baseGrade: Grade;
    currentGrade: Grade;
    quality: Quality;
    blessingLines: BlessingLines;
    enhancementLevel: number;
    alteredLine: number | undefined;
    itemType: ItemType;
}

export function createEquipmentModel(quality: Quality, baseGrade: Grade, itemType: ItemType) {
    const model: Item = {
        alteredLine: undefined,
        currentGrade: baseGrade,
        enhancementLevel: 0,
        baseGrade,
        quality,
        blessingLines: [
            { current: null, base: null },
            { current: null, base: null },
            { current: null, base: null },
            { current: null, base: null },
        ],
        itemType,
    };

    for (let blessingIndex = 0; blessingIndex < baseGrade; blessingIndex++) {
        addNewBlessingAtLine(model, blessingIndex);
    }

    return { ...model };
}

export function alter(model: Item, lineToAlter: number, upgrade: BlessingUpgrade): Blessing | string {
    if (model.alteredLine && lineToAlter != model.alteredLine) {
        return `You already altered line ${model.alteredLine}. model can be unlocked by using a Full Alteration Stone!`;
    }

    const alteredBlessing = {
        attribute: upgrade.attribute,
        value: rollRange(upgrade.range),
    };

    model.blessingLines[lineToAlter].base = alteredBlessing;
    model.blessingLines[lineToAlter].current = alteredBlessing;

    return alteredBlessing;
}

export function enhance(model: Item): Item {
    if (model.enhancementLevel >= 20) {
        return model;
    }
    model.enhancementLevel++;

    const reachedCheckpointLevel = model.enhancementLevel % ENHANCEMENT_CHECKPOINT_INTERVAL == 0;

    if (reachedCheckpointLevel) {
        const shouldAddNewStat = model.enhancementLevel / ENHANCEMENT_CHECKPOINT_INTERVAL > model.baseGrade;
        if (shouldAddNewStat) {
            const targetLine = model.enhancementLevel / ENHANCEMENT_CHECKPOINT_INTERVAL - 1;
            addNewBlessingAtLine(model, targetLine);
            model.currentGrade++;
        } else {
            const lineToEnhance = model.enhancementLevel / ENHANCEMENT_CHECKPOINT_INTERVAL - 1;
            enhanceBlessing(model, lineToEnhance);
        }
    }

    return { ...model };
}

export function refine(model: Item, lineToRefine: number, upgrade: BlessingUpgrade): Blessing | string {
    const baseBlessing = model.blessingLines[lineToRefine].base;

    if (!baseBlessing) {
        return 'You cannot use a Refinement Stone on a Blessing line without a Blessing!';
    }

    return {
        attribute: baseBlessing.attribute,
        value: baseBlessing.value + rollRange(upgrade.range),
    };
}

function enhanceBlessing(model: Item, lineToEnhance: number): Item {
    console.log(`Enhancing line ${lineToEnhance}`);
    const blessingLine = model.blessingLines[lineToEnhance];
    const existingBlessing = blessingLine.current;

    if (!existingBlessing) {
        throw new Error('Unable to enhance without an existing blessing!');
    }

    blessingLine.current = enhanceExistingBlessing(model, existingBlessing);
    return { ...model };
}

function addNewBlessingAtLine(model: Item, lineToEnhance: number): Item {
    const blessingLine = model.blessingLines[lineToEnhance];

    const existingAttributes = getExistingAttributes(model);

    const possibleNewAttributes = itemTypeAttributes
        .get(model.itemType)!
        .filter((attribute) => !existingAttributes.find((existing) => existing === attribute));
    const attribute = possibleNewAttributes[rollBetween(0, possibleNewAttributes.length - 1)];

    const value = rollValueForBlessingAttributeEnhancement(attribute, model.quality);

    blessingLine.current = blessingLine.base = {
        attribute,
        value,
    };

    return { ...model };
}

function enhanceExistingBlessing(model: Item, existingBlessing: Blessing): Blessing {
    const attribute = existingBlessing.attribute;
    const additionalValue = rollValueForBlessingAttributeEnhancement(attribute, model.quality);
    return {
        attribute,
        value: existingBlessing.value + additionalValue,
    };
}

function getExistingAttributes(model: Item): BlessingAttribute[] {
    return model.blessingLines.map((line) => line.current?.attribute).filter((attribute) => !!attribute);
}

export function formatBlessing(blessingLine: BlessingLine) {
    // Not rolled yet
    if (!blessingLine.current) {
        return '-';
    }

    const { attribute, value } = blessingLine.current;

    if (blessingLine.current) {
        return attribute.endsWith('%')
            ? `${attribute.substring(0, attribute.length - 1)}+${value}%`
            : `${attribute}+${value}`;
    }
}

export function rollRange({ min, max }: Range) {
    return Math.floor(Math.random() * max) + min;
}

export function rollBetween(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

function rollValueForBlessingAttributeEnhancement(attribute: BlessingAttribute, quality: Quality): number {
    const attributeRangeTable = attributeEnhancementValueTable.get(attribute);
    if (!attributeRangeTable) {
        throw new Error(`unknown attribute: ${attribute}`);
    }

    return rollRange(attributeRangeTable[quality - 1]);
}
