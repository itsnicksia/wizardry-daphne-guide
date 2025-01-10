# Damage Mechanics

## Calculating Power
Your stats page power is caluclated through the following formula, which factors in your primary stats, class multiplier, equipment, and passive skills.

!!! warning "Warning: Contains math"

### Power Formula
`StatsPagePowerValue = SpecialRound(MainStat * ClassMod * %EquipmentValuesMultiplicatively) + Sum(ScalarEquipmentValues) + Sum(ScalarStatValues) + Sum(ScalarSkillValues) + Sum(ScalarTraitMods)`

### Power Formula Variable Definitions
* `StatsPagePowerValue` is the final power value you see displayed on the stats page.
* `MainStat` is `Strength`, `IQ`, or `Piety`, depending on if you're trying to calculate `Attack Power`, `Magic Power`, or `Divine Power` respectively.
* `ClassMod` is based on the stats chart above. As an example, Fighters have a `ClassMod` for `Strength` of `1.2`.
* `%EquipmentValuesMultiplicatively` is the combination of all percentage modifiers from your equipment. What's unique about this is that percentage values are multiplicative with each other.
* For example, if you have equipment modifiers of `ATK+16%` and `ATK+5%`, instead of being a `21% (*1.21)` attack increase, this is instead a `*1.16*1.05` attack increase.
* `SpecialRound` is...unique. Instead of multiplying these values together and rounding the final result like you'd normally expect to happen with, well, math, the game instead **rounds after each multiplication**. This leads to some slightly unexpected behavior with the formula.
* For example, if you have a Fighter with `58` Strength, the naked, skill-less attack power is `70` instead of the expected `69.6`. This is the same value you get if you completely unequip a character, then subtract the parenthesized value on the stats page.
* Continuing the example above, if I completely unequip my Fighter MC, his Strength shows `58(+0)` on the stats page, while his Attack Power shows `101(+31)` on the stats page. Subtracting the `31` from the `101` gives us the `70` that matches `Round(58*1.2)`.
* This does mean that when reading your stats page, a value of `101(+31)` simply says that `31` points of those `101` total points came from skills. It does not mean that you add the `31` to the `101`. Weird, right?
* `Sum(ScalarEquipmentValues)` is the summation of the baseline power value of all your equpiment. For example, this value is `118` for a `+15 Steel Two-Handed Spear`.
* `Sum(ScalarStatValues)` is self-explanatory, but it's the addition of all scalar (example `ATK+11`) stat values from your equipment.
* `Sum(ScalarSkillValues)` is the sum of all stat values from skills. This ultimately just that parenthesized value on your stats page, and it does adjust automatically to factor in conditional skills such as `2h Weapon Proficiency`.
* `Priest Weapon Mastery` falls under this category and is already calculated and displayed for you in the parenthesized value.
* `Sum(ScalarTraitMods)` is the final component and unique. In most cases, this value will be `0`, but this captures additional bonuses like `Strength+` and `I.Q. Conversion`.
* `Strength+` is calculated as `STR * ClassMod * 0.75`.
* `I.Q. Conversion` appears to be around `I.Q. * 0.2` but we haven't fully confirmed this yet.

## Surety
There has been a lot of confusion around Surety and what exactly it does. Surety is simply the chance to deal a sure hit. When you increase your surety value, you increase your chance to land a sure hit.

By default, a sure hit acts as an 80% damage increase to the final damage you deal.

!!! note
Increasing your surety value does NOT increase the sure hit damage.

The only skill that currently exists to increase your sure hit damage is `Way of the Thief`. At skill level 1, this increases the sure hit damage multiplier from `1.8` to `2`. It is possible to increase the level of this skill, however this can currently only be done through the `Codex of Learning` items that add skill experience to any skill. We'll update this when we know the multipliers for subsequent skill levels.

### Way of the Thief Modifier

| Skill Level | Damage Modifier |
|:-----------:|:---------------:|
|      1      |        2        |
|      2      |                 |
|      3      |                 |
|      4      |                 |
|      5      |                 |
|      6      |                 |
|      7      |                 |

## Passive Damage Modifiers
There are multiple passive damage multipliers that can increase the damage you deal to enemies.

The most common of these are personality-oriented damage modifiers such Lanavaille's `Stirring Righteousness`, Wandering Princess Lanavaille's `Valiant Righteousness`, Alice's `Agent of Heresy`, Elise's `Impartial Collaborator`, and Milana's `Mutual Interests`. Each of these increase damage by 10%, stacking multiplicatively. For example, if you have a neutral MC that deals 200 damage against an enemy, adding Lana to your MC's row and Elise behind your MC will result in that MC dealing `200 * 1.1 * 1.1 = 242` damage.

Skills like `Wind Formation` and `Fire Formation` will also fall into this category. I suspect they're similar 10% increases, but I haven't tested them out personally.

The final current skill that falls into this category is `Way of the Warrior`. Like `Way of the Thief`, this skill can be leveled up and appears to have an initial increase of 10%. One unique component of this skill is that it appears to only care about the enemy row, and will activate the multiplier if you're hitting something with a close or mid-range weapon regardless of the position the adventurer is in your party. For example, my Elise was hitting the enemy front row with a spear for the same damage when she was in my front row as when she was in my back row.

### Way of the Warrior Modifier

| Skill Level | Damage Modifier |
|:-----------:|:---------------:|
|      1      |       1.1       |
|      2      |                 |
|      3      |                 |
|      4      |                 |
|      5      |                 |
|      6      |                 |
|      7      |                 |

## Type Advantage Modifiers
When you hit a type advantage on an enemy, you deal roughly 30% more damage (a modifier of 1.3). If you happen to be hitting a type advantage with an adventurer that shares its type with the weapon or spell, that advantage increases by an additional 25% (a modifier of ~1.6).

For example, if you deal `200` damage against a neutral enemy with an Earth weapon, if that same enemy were Water type, you would be dealing `200 * 1.3 = 260` damage instead. If the adventurer that was hitting the weakness happened to also be an Earth type, you would instead be dealing `200 * 1.3 * 1.25 = 325` damage.

## Status Affliction Modifiers
There are two status afflictions that currently allow you to deal increased damage.

* `KATINO` causes the first hit to deal 100% more damage (a modifier of 2).
* `Opening` is even more unique. It causes you to deal over 100% damage, but we're not entirely sure what the number is yet, as there are some nuances to it. For example, if you miss while attacking an enemy with the `Opening` affliction, the enemy will still take a large amount of damage. It's possible that a component of this damage is tied to the enemy's maximum or current HP.

## Calculating Damage

!!! warning "Warning: Contains math"

### Partial Damage Formula
`FinalDamage = BaseDamageFromPowerDefenseAndActiveSkills * PassiveDamageModifiersMultiplicatively * TypeAdvantageModifier * SameTypeAdvantageModifier * SureHitModifier * StatusAfflicitionModifier`

### Damage Formula Explanation
This looks like a relatively simple formula, but there are some nuances that make it surprisingly complex and hard to fully figure out. We'll start with the easy things that we know.

    * `PassiveDamageModifiersMultiplicatively` is the combination of your passive damage modifiers multiplied together
    * `TypeAdvantageModifier` is factored in if you are hitting a type weakness, such as using an Earth weapon against a Water enemy
    * `SameTypeAdvantageModifier` is factored in if you are hitting a type weakness with an adventurer that shares type with the attack
    * `SureHitModifier` is factored in if you land a sure hit
    * `StatusAfflicitionModifier` is factored in if you're hitting a sleeping enemy or an Opening
    * `BaseDamageFromPowerDefenseAndActiveSkills` is currently the big unknown. We're not entirely sure how the power listed on the stats page translates to the damage that you deal. We also don't entirely know how the active skills fit into the equation. We're still trying to determine if they're a damage multiplier, a multiplier on attack power, or something else. We do know that some component of this is involves taking your attack power, adding attack power boosts from `Warrior's Battle Cry`, subtracting your enemy's defense, subtracting (or adding) any additional defense values from spells and skills like `MORLIS`, `Armor Break`, `MAKALTU`, and factoring in the defense penetration on axes, `Precision Strike`, and `Sneak Attack`. This is the black box that we hope to decipher as we gather more data.

### Example Damage Calculation
As an example, suppose you meet the following criteria:

    * You deal `200` damage on a regular attack without factoring in `Way of the Warrior`
    * You have `Way of the Warrior` and `Way of the Thief` at level 1 each
    * You have a party that consists of a Neutral MC, Lanavaille in the same row as your MC, Elise behind your MC
    * You have an Earth elemental weapon
    * You have changed your MC's type to Earth
    * You are attacking a Water enemy

    In this scenario, your `200` damage would become `200 * 1.1 * 1.1 * 1.1 * 1.3 * 1.25 ~= 436`. If you went on to land a sure hit, that damage would instead become `872`. Lastly, if you happened to land that sure hit on a sleeping enemy, you would be looking at `1744` damage with a simple basic attack.

    This will increase even further as you factor in the damage from skills, attack power buffs, defense debuffs, and defense penetration/ignore.

## Credits
Image source unknown, but shared by Nitsu and GrandAccelerator
