# Character Stats and Discipline

!!! warning "This is an interpretation of what we know about Stats and Discipline as of now and is subject to change as we get more information."

## Character Stats

### Class Multipliers

!!! warning "These are approximate baseline multipliers. There is a strong chance that class levels and/or grade gets factored in as well."

| Class     | ATK  | MAG  | DIV | DEF  | MDEF | DET  | DIS  | EVA  | SPD  | ACC  | EVA  | RES  |
|-----------|------|------|-----|------|------|------|------|------|------|------|------|------|
| Wanderer  | 1.1  | 0.7  | 0.7 | 1.05 | 0.9  | 1    | 1    | 1    | 0.9  | 1    | 0.9  | 0.9  |
| Knight    | 1.1  | 0.5  | 1   | 1.15 | 1.15 | 0.8  | 0.8  | 0.8  | 0.75 | 1    | 0.7  | 1.05 |
| Fighter   | 1.2  | 0.5  | 0.6 | 1.05 | 0.9  | 0.9  | 0.9  | 0.9  | 0.9  | 1    | 0.9  | 0.9  |
| Thief     | 1    | 0.6  | 0.5 | 0.95 | 0.95 | 0.95 | 1.1  | 1.15 | 1    | 1.1  | 1.1  | 0.89 |
| Ninja     | 1    | 0.75 | 0.3 | 0.95 | 1    | 0.95 | 1    | 1    | 1    | 1.15 | 1.15 | 0.89 |
| Priest    | 0.9  | 0.9  | 1.2 | 1    | 1.1  | 1    | 0.9  | 0.9  | 0.9  | 0.9  | 0.8  | 1    |
| Mage      | 0.5  | 1.2  | 1   | 0.9  | 1.1  | 1.15 | 0.85 | 0.85 | 0.85 | 0.7  | 0.7  | 0.9  |
| Black Rod | 1.05 | 1    | 0.6 | 1    | 0.9  | 0.9  | 0.9  | 0.9  | 0.85 | 1    | 0.85 | 0.89 |
| Tall Mage | 1    | 1    | 0.8 | 1    | 0.95 | 0.8  | 0.85 | 0.8  | 0.85 | 1.1  | 0.7  | 0.85 |

### Abbreviations and Formula
- **ATK**: Attack Power (X * STR)
- **MAG**: Magic Power (X * IQ)
- **DIV**: Divine Power (X * PIE)
- **DEF**: Defense (X * VIT)
- **MDEF**: Magic Defense (X * PIE)
- **DET**: Detect (X * (IQ * 0.7 + LUK * 0.3))
- **DIS**: Disarm Trap (X * (DEX * 0.7 + LUK * 0.3))
- **EVA**: Evade Trap (X * (SPD * 0.7 + LUK * 0.3))
- **SPD**: Action Speed (X * SPD)
- **ACC**: Accuracy (X * (DEX * 0.7 + LUK * 0.3))
- **EVA**: Evasion (X * (SPD * 0.7 + LUK * 0.3))
- **RES**: Resistance (X * (PIE * 0.65 + VIT * 0.35))

Looking at the above chart, we can see that while primary stats (STR, IQ, etc) have a direct impact on the substats (Attack Power, Magic Power, etc), it's not a direct 1:1 relationship due to the class multiplier. As a base example, if you have a Fighter with 70 STR and no other Attack Power bonuses, that Fighter's Attack Power will be `70*1.2=84`, while a Fighter with 60 STR and no other Attack Power bonuses would have an Attack Power of `60*1.2=72`, or a difference of `12`. This ultimately means that for a Fighter, a 10 point difference in STR results in only a 12 point difference in Attack Power.

### Errata

**Detect:** Formula is correct, but multipliers might be off
**Disarm Trap:** Treasure Trap Disarm Skill Lv1 adds 10 + 10% of disarm
**Resistance:** There is almost definitely a rounding bug of some kind here but these are the numbers that work. |

### Stat Variance
Stats can vary across two copies of the same Adventurer, and this is due to a combination of level growth, which have an element of randomness, and bonus points. For example, one level 50 Adam could end up with 59 IQ, while another could end up with 73 IQ. We don't have a full understanding of the degree of variance, but when looking at those two Adams, using the chart above, you can see that there's only a difference in Magic Power of `(73-59)*1.2=16.8`. That is not a large difference, especially as our Magic Power increases through equipment.

What does that mean? Ultimately, the impact of primary stats on substats is significantly smaller than the impact of equipment on substats.

### What Does That Mean For Bonus Points?
We've often found ourselves saying bonus points don't matter. This is both true and not true. In one sense, it's not true because there can be a large visible difference between primary stats across Adventurers, however in another sense, it is true because the overall in-battle impact of bonus points is small.

#### How Should You Assign Bonus Points?
There aren't really any bad options here, but the community tends to recommend either the Adventurer's main stat (for example, a Fighter's main stat would be STR), Luck, Speed, or some combination of the three. You cannot break a character with your bonus point allocation. TheAxolotl's personal opinion is STR/IQ/Luck > Speed > Others, but this is subject to change as the game evolves.

## Discipline
Discipline boosts all of your secondary stats by a set amount per duplicate (not per skill level) and can go up to a maximum skill level of 9 at 1500 Mastery. The amount each stat gets boosted is static, but it's not completely uniform. It also seems to be a bigger boost for Legendary Adventurers than General or Anonymous Adventurers. The numbers below reflect the Discipline gains for Legendary Adventurers.

Substats seem to be broken up into four main categories:

* General Stats (most stats)
    * General stats see a boost of +2 per dupe (increased at each Discipline skill level) for Discipline levels 1-6 and an average of +1.5 per dupe for Discipline levels 7-9.
* Featured Stat (Adam's is Magic Power, for example)
    * The Featured stat sees a higher than +2 per dupe increase, but it's less uniform. The increases are always the same across Adventurers at a given Discipline level, but the individual amounts vary between +1 and +3 per dupe on top of the General stat boost.
* HP
    * HP is similar to the Featured stat, however its individual amounts vary between +8 and +19 per dupe (or between +10 and +22 per dupe if HP is the Featured stat), ignoring the General stat boost
* ASPD
    * ASPD sees a smaller than +2 per dupe increase, varying between +1 and +3 per dupe, ignoring the General stat boost

As you can see, this means that while Discipline can add up at higher skill levels, ultimately results in a relatively low boost to performance.

### Copies Per Legendary Discipline Level

| Discipline Level | Number of Copies | Number of Cumulative Copies |
| ---------------- | ---------------- | --------------------------- |
| 0                | 1                | 1                           |
| 1                | 1                | 2                           |
| 2                | 1                | 3                           |
| 3                | 2                | 5                           |
| 4                | 1                | 6                           |
| 5                | 1                | 7                           |
| 6                | 2                | 9                           |
| 7                | 2                | 11                          |
| 8                | 2                | 13                          |
| 9                | 3                | 16                          |

### How Should You Use Your Dupes?
This is going to vary a lot by the Adventurer, but in general, if the Adventurer is a damage dealer with their inheritance skill being an attack (such as Gerard and Gerulf), you will see significantly more damage coming from skill inheritance than from Discipline. However, if your Adventurer is someone like Yekaterina who doesn't have an inheritance skill that deals damage, it's less clear as to where you'll see the bigger gains with dupes.

## Calculating Power
Your stats page power is caluclated through the following formula, which factors in your primary stats, class multiplier, equipment, and passive skills.

!!! warning "Warning: Contains math"

### Power Formula

!!! warning
    With the latest Ebonsteel gear, this formula is proving to be incorrect. It is currently calculating power lower than the stats page shows. I believe it is currently undervaluing both Strength+ and %Blessings, but I'm not sure how yet. Please be patient while I work to determine an updated formula.

`StatsPagePowerValue = SpecialRound(MainStat * %BlessingsMultiplicatively * ClassMod) + Sum(ScalarEquipmentValues) + Sum(ScalarBlessingValues) + Sum(ScalarSkillValues) + Sum(ScalarTraitMods)`

### Power Formula Variable Definitions
* `StatsPagePowerValue` is the final power value you see displayed on the stats page.
* `MainStat` is `Strength`, `IQ`, or `Piety`, depending on if you're trying to calculate `Attack Power`, `Magic Power`, or `Divine Power` respectively.
* `ClassMod` is based on the stats chart above. As an example, Fighters have a `ClassMod` for `Strength` of `1.2`.
* `%BlessingsMultiplicatively` is the combination of all percentage modifiers from your equipment blessings. What's unique about this is that percentage values are multiplicative with each other.
    * For example, if you have equipment modifiers of `ATK+16%` and `ATK+5%`, instead of being a `21% (*1.21)` attack increase, this is instead a `*1.16*1.05` attack increase.
* `SpecialRound` is...unique. Instead of multiplying these values together and rounding the final result like you'd normally expect to happen with, well, math, the game instead **rounds after each multiplication**. This leads to some slightly unexpected behavior with the formula.
    * For example, if you have a Fighter with `58` Strength, the naked, skill-less attack power is `70` instead of the expected `69.6`. This is the same value you get if you completely unequip a character, then subtract the parenthesized value on the stats page.
    * Continuing the example above, if I completely unequip my Fighter MC, his Strength shows `58(+0)` on the stats page, while his Attack Power shows `101(+31)` on the stats page. Subtracting the `31` from the `101` gives us the `70` that matches `Round(58*1.2)`.
        * This does mean that when reading your stats page, a value of `101(+31)` simply says that `31` points of those `101` total points came from skills. It does not mean that you add the `31` to the `101`. Weird, right?
* `Sum(ScalarEquipmentValues)` is the summation of the baseline power value of all your equpiment. For example, this value is `118` for a `+15 Steel Two-Handed Spear`.
* `Sum(ScalarBlessingValues)` is self-explanatory, but it's the addition of all scalar (example `ATK+11`) blessing values from your equipment.
* `Sum(ScalarSkillValues)` is the sum of all stat values from skills. This ultimately just that parenthesized value on your stats page, and it does adjust automatically to factor in conditional skills such as `2h Weapon Proficiency`.
    * `Priest Weapon Mastery` falls under this category and is already calculated and displayed for you in the parenthesized value.
* `Sum(ScalarTraitMods)` is the final component and unique. In most cases, this value will be `0`, but this captures additional bonuses like `Strength+` and `I.Q. Conversion`.
    * `Strength+` - see below.
    * `I.Q. Conversion` appears to be around `I.Q. * 0.2` but we haven't fully confirmed this yet.
    * `Nimble Strike` appears to be `DEX * 0.1` rounded down.

### Strength+

Strength+ is a unique property that appears on 2h weapons that adds a portion of the adventurer's STR value to the attack power. This value appears to be different for Ebonsteel than for anything earlier. In addition, it appears to be different for staves.

| Weapon Category | Steel or Lower Multiplier | Ebonsteel Multiplier |
| --------------- | ------------------------- | -------------------- |
| Non-staff       | STR * 0.75                | STR * 1              |
| Staff           | STR * 0.5                 | STR * 0.75           |