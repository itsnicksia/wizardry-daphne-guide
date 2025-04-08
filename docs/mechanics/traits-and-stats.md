# Trait Points and Stats

!!! warning "This is our current understanding of Traits and Stats and is subject to change as we get more information."

## Trait Points

Trait Points are the core seven attributes that influence an adventurer's stats. These are:

* **Strength**: Affects Attack Power and SP.
* **I.Q.**: Affects Magic Power, MP, and Detect.
* **Piety**: Affects Divine Power, Resistance, Magic Defense, and MP.
* **Vitality**: Affects Resistance, physical defense, HP, and SP.
* **Speed**: Affects Evasion, Evade Trp, Sure Evasion, and Action Speed.
* **Dexterity**: Affects Accuracy, Surety, and Disarm Trap.
* **Luck**: Affects the outcome of various actions.

!!! note
    The exact influence of the trait points on stats depends in part of an adventurer's class multiplier, but there are also quite a few unknown factors. For example, it's not entirely clear how `Dexterity` affects `Surety`, but the increase does appear to be very small.

### Base Trait Points

The base trait points an adventurer starts with considers multiple factors, including gender, race, class, and element type. Using this table, we can calculate the base traits for an given adventurer.

|        |                       | Strength |  IQ | Piety | Vitality | Speed | Dexterity | Luck |
|:------:|:---------------------:|:--------:|:---:|:-----:|:--------:|:-----:|:---------:|:----:|
|  Base  |                       |    10    |  10 |   10  |    10    |   10  |     10    |  10  |
|        |                       |          |     |       |          |       |           |      |
| Gender |          Male         |    +1    |     |       |    +1    |       |     +1    |      |
|        |         Female        |          |  +1 |   +1  |          |   +1  |           |      |
|        |                       |          |     |       |          |       |           |      |
|  Race  |         Human         |          |     |       |          |       |           |      |
|        |          Elf          |    -2    |  +3 |   -1  |    -2    |   +1  |     +2    |  -1  |
|        |         Dwarf         |    +2    |  -2 |   +1  |    +3    |   -4  |     +3    |  -3  |
|        |       Beastfolk       |    -1    |  +1 |   -4  |    +2    |   +3  |     +2    |  -3  |
|        |                       |          |     |       |          |       |           |      |
|  Type  |          Fire         |    +2    |     |       |    +1    |       |           |      |
|        |          Wind         |          |     |       |          |   +2  |     +1    |      |
|        |         Earth         |          |     |       |    +2    |       |     +1    |      |
|        |         Water         |          |  +2 |   +1  |          |       |           |      |
|        |         Light         |          |     |   +2  |          |       |           |  +1  |
|        |          Dark         |          |  +2 |       |          |       |           |  +1  |
|        |          Void         |     ?    |  ?  |   ?   |     ?    |   ?   |     ?     |   ?  |
|        |                       |          |     |       |          |       |           |      |
|  Class |        Fighter        |    +3    |  +1 |   +1  |    +2    |   +1  |     +2    |  +1  |
|        |         Knight        |    +3    |  +1 |   +2  |    +3    |   +1  |     +1    |  +1  |
|        |         Thief         |    +1    |  +1 |   +1  |    +1    |   +3  |     +2    |  +2  |
|        |         Priest        |    +1    |  +2 |   +3  |    +1    |   +1  |     +1    |  +2  |
|        |          Mage         |    +1    |  +3 |   +1  |    +1    |   +2  |     +2    |  +1  |
|        |         Ninja         |    +2    |  +1 |   +1  |    +1    |   +3  |     +2    |  +2  |
|        | Mage of the Black Rod |     ?    |  ?  |   ?   |     ?    |   ?   |     ?     |   ?  |
|        |       Tall Mage       |    +2    |  +2 |   +1  |    +1    |   +1  |     +2    |  +1  |

## Stats

### Class Multipliers

!!! warning "These are approximate baseline multipliers. There is a strong chance that class levels and/or grade gets factored in as well."

=== "Offensive Stats"

    | Class     | Attack Power | Magic Power | Divine Power | Accuracy |
    | --------- | ------------ | ----------- | ------------ | -------- |
    | Wanderer  | 1.1          | 0.7         | 0.7          | 1        |
    | Knight    | 1.1          | 0.5         | 1            | 1        |
    | Fighter   | 1.2          | 0.5         | 0.6          | 1        |
    | Thief     | 1            | 0.6         | 0.5          | 1.1      |
    | Ninja     | 1            | 0.75        | 0.3          | 1.15     |
    | Priest    | 0.9          | 0.9         | 1.2          | 0.9      |
    | Mage      | 0.5          | 1.2         | 1            | 0.7      |
    | Black Rod | 1.05         | 1           | 0.6          | 1        |
    | Tall Mage | 1            | 1           | 0.8          | 1.1      |

=== "Defensive Stats"

    | Class     | Defense | Magic Defense | Evasion | Resistance |
    | --------- | ------- | ------------- | ------- | ---------- |
    | Wanderer  | 1.05    | 0.9           | 0.9     | 0.9        |
    | Knight    | 1.15    | 1.15          | 0.7     | 1.05       |
    | Fighter   | 1.05    | 0.9           | 0.9     | 0.9        |
    | Thief     | 0.95    | 0.95          | 1.1     | 0.89       |
    | Ninja     | 0.95    | 1             | 1.15    | 0.89       |
    | Priest    | 1       | 1.1           | 0.8     | 1          |
    | Mage      | 0.9     | 1.1           | 0.7     | 0.9        |
    | Black Rod | 1       | 0.9           | 0.85    | 0.89       |
    | Tall Mage | 1       | 0.95          | 0.7     | 0.85       |

=== "Utility Stats"

    | Class     | Detect | Disarm Trap | Evade Trap | Action Speed |
    | --------- | ------ | ----------- | ---------- | ------------ |
    | Wanderer  | 1      | 1           | 1          | 0.9          |
    | Knight    | 0.8    | 0.8         | 0.8        | 0.75         |
    | Fighter   | 0.9    | 0.9         | 0.9        | 0.9          |
    | Thief     | 0.95   | 1.1         | 1.15       | 1            |
    | Ninja     | 0.95   | 1           | 1          | 1            |
    | Priest    | 1      | 0.9         | 0.9        | 0.9          |
    | Mage      | 1.15   | 0.85        | 0.85       | 0.85         |
    | Black Rod | 0.9    | 0.9         | 0.9        | 0.85         |
    | Tall Mage | 0.8    | 0.85        | 0.8        | 0.85         |

#### Formulae
- **Attack Power**: (X * STR)
- **Magic Power**: (X * IQ)
- **Divine Power**: (X * PIE)
- **Defense**: (X * VIT)
- **Magic Defense**: (X * PIE)
- **Detect**: (X * (IQ * 0.7 + LUK * 0.3))
- **Disarm Trap**: (X * (DEX * 0.7 + LUK * 0.3))
- **Evade Trap**: (X * (SPD * 0.7 + LUK * 0.3))
- **Action Speed**: (X * SPD)
- **Accuracy**: (X * (DEX * 0.7 + LUK * 0.3))
- **Evasion**: (X * (SPD * 0.7 + LUK * 0.3))
- **Resistance**: (X * (PIE * 0.65 + VIT * 0.35))

Looking at the above charts, we can see that while primary stats (STR, IQ, etc) have a direct impact on the substats (Attack Power, Magic Power, etc), it's not a direct 1:1 relationship due to the class multiplier. As a base example, if you have a Fighter with 70 STR and no other Attack Power bonuses, that Fighter's Attack Power will be `70*1.2=84`, while a Fighter with 60 STR and no other Attack Power bonuses would have an Attack Power of `60*1.2=72`, or a difference of `12`. This ultimately means that for a Fighter, a 10 point difference in STR results in only a 12 point difference in Attack Power.

#### Errata

**Detect:** Formula is correct, but multipliers might be off
**Disarm Trap:** Treasure Trap Disarm Skill Lv1 adds 10 + 10% of disarm
**Resistance:** There is almost definitely a rounding bug of some kind here but these are the numbers that work. |

### IVs
An IV is an extra bonus Trait Point that exists on an adventurer when you create them, and it shows up as something we previously termed a "hidden bonus point." There is some evidence that this impacts Trait Point growth, with an IV in a Trait Point leading towards an adventurer having a higher value for that Trait Point than a copy of that adventurer without the IV. The biggest unknown around IVs, though, is exactly what the IV means for long-term adventurer development. Assuming we will eventually be at a maximum level of 130, it's possible that the IV means a particular Trait Point will get to a "maximum value" faster but by level 130, all copies of an adventurer will have the same Trait Point values.

TheAxolotl's personal opinion on IVs is that when you have multiple copies of an adventurer to register, select the one with the IV that you prefer, as that will make a more currently notable difference in Trait Point growth than bonus points will. When you don't have multiple copies, don't worry about the IV. We don't know how IVs will play out long-term, so I personally think it's not worrying about.

!!! note "You will never ruin an adventurer by selecting one with no IV or a less than ideal IV."

### Trait Point Variance
Trait Points can vary across two copies of the same Adventurer, and this is due to a combination of level growth, which have an element of randomness, and bonus points. For example, one level 50 Adam could end up with 59 IQ, while another could end up with 73 IQ. We don't have a full understanding of the degree of variance, but when looking at those two Adams, using the chart above, you can see that there's only a difference in Magic Power of `(73-59)*1.2=16.8`. That is not a large difference, especially as our Magic Power increases through equipment.

What does that mean? Ultimately, the impact of trait points on stats is significantly smaller than the impact of equipment on stats.

## What Do Trait Points And Stats Mean For Bonus Points?
We've often found ourselves saying bonus points don't matter. This is both true and not true. In one sense, it's not true because there can be a large visible difference between primary stats across Adventurers, however in another sense, it is true because the overall in-battle impact of bonus points is small.

### How Should You Assign Bonus Points?
There aren't really any bad options here, but the community tends to recommend either the Adventurer's main stat (for example, a Fighter's main stat would be STR), Luck, Speed, or some combination of the three. You cannot break a character with your bonus point allocation. TheAxolotl's personal opinion is STR/IQ/Luck > Speed > Others, but this is subject to change as the game evolves.

!!! note "You will never ruin an adventurer with your bonus point assignment."

## Calculating Power
Your stats page power is calculated through the following formula, which factors in your primary stats, class multiplier, equipment, and passive skills.

!!! warning "Warning: Contains math"

### Power Formula

!!! note
    The formula has been updated now that we have another tier of gear to look at, and it appears to be correct for both Ebonsteel tier gear and lower. 

`StatsPagePowerValue = SpecialCeiling(MainStat * ClassMod * Sum(%BlessingValues)) + Sum(ScalarBlessingValues) + Sum(ScalarEquipmentValues) + Sum(ScalarSkillValues) + Sum(ScalarTraitMods)`

### Power Formula Variable Definitions
* `StatsPagePowerValue` is the final power value you see displayed on the stats page.
* `SpecialCeiling` is...unique. Instead of multiplying these values together and rounding the final result like you'd normally expect to happen with, well, math, the game instead **rounds up after each multiplication**. This leads to some slightly unexpected behavior with the formula.
    * For example, if you have a Fighter with `51` Strength, the naked, skill-less attack power is `62` instead of the expected `61.2` or even `61` as normal rounding would work. This is the same value you get if you completely unequip a character, then subtract the parenthesized value on the stats page.
    * Continuing the example above, if I completely unequip my Fighter MC, his Strength shows `51(+0)` on the stats page, while his Attack Power shows `93(+31)` on the stats page. Subtracting the `31` from the `93` gives us the `62` that matches `Ceiling(51*1.2)`.
        * This does mean that when reading your stats page, a value of `93(+31)` simply says that `31` points of those `93` total points came from skills. It does not mean that you add the `31` to the `93`. Weird, right?
* `MainStat` is `Strength`, `IQ`, or `Piety`, depending on if you're trying to calculate `Attack Power`, `Magic Power`, or `Divine Power` respectively.
* `ClassMod` is based on the stats chart above. As an example, Fighters have a `ClassMod` for `Strength` of `1.2`.
* `Sum(%BlessingValues)` is self-explanatory, but it's the addition of all percentage (example `ATK+19%`) blessing values from your equipment.
* `Sum(ScalarBlessingValues)` is self-explanatory, but it's the addition of all scalar (example `ATK+11`) blessing values from your equipment.
* `Sum(ScalarEquipmentValues)` is the summation of the baseline power value of all your equipment. For example, this value is `118` for a `+15 Steel Two-Handed Spear`.
* `Sum(ScalarSkillValues)` is the sum of all stat values from skills. This ultimately just that parenthesized value on your stats page, and it does adjust automatically to factor in conditional skills such as `2h Weapon Proficiency`.
    * `Priest Weapon Mastery` falls under this category and is already calculated and displayed for you in the parenthesized value. This calculation adds `PIE * 0.2` to Attack Power
* `Sum(ScalarTraitMods)` is the final component and unique. In most cases, this value will be `0`, but this captures additional bonuses like `Strength+` and `I.Q. Conversion`. Note that due to these factoring in the class multiplier, these are also subject to the `SpecialCeiling` rounding.
    * `Strength+` - see table below.
    * `I.Q. Conversion` appears to be around `I.Q. * 0.2`.
    * `Nimble Strike` appears to be `DEX * 0.1` rounded down.

### Strength+

Strength+ is a unique property that appears on 2h weapons that adds a portion of the adventurer's STR value to the attack power. This value appears to be different for Ebonsteel than for anything earlier. In addition, it appears to be different for staves.

| Weapon Category | Steel or Lower Multiplier | Ebonsteel Multiplier |
| --------------- | ------------------------- | -------------------- |
| Non-staff       | STR * 0.75                | STR * 1              |
| Staff           | STR * 0.5                 | STR * 0.75           |