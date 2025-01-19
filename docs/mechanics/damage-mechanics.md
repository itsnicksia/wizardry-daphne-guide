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

By default, a sure hit acts as a 75% damage increase to the final damage you deal.

!!! note
    Increasing your surety value does NOT increase the sure hit damage.

The only skill that currently exists to increase your sure hit damage is `Way of the Thief`. At skill level 1, this increases the sure hit damage multiplier from `1.75` to `2`. It is possible to increase the level of this skill, however this can currently only be done through the `Codex of Learning` items that add skill experience to any skill. We'll update this when we know the multipliers for subsequent skill levels.

## Buffs and Debuffs
Buffs and Debuffs are extremely powerful ways to turn a fight in your favor. Some of the most common and impactful buffs and debuffs are:

* Warrior's Battle Cry - boosts your Attack Power
* (MA)CALDIA - boosts your Surety and Accuracy
* PORTO - boosts your Action Speed
* MORLIS - reduces enemy Defense
* BATILGREF - reduces enemy Evasion and Action Speed

Note that these are not comprehensive lists, and other buffs and debuffs are situationally useful to apply.

One important thing to note is that there is a limit of 3 buffs and a limit of 3 debuffs that can be applied to a target. Applying more buffs/debuffs will cause earlier-applied ones to drop off. This means that you can accidentally remove an important buff or debuff if you're not paying too much attention to what you're applying.

I need to confirm this for sure, but from what I remember, afflictions (sleep, confuse, taunt, etc) do not count towards the debuff limit.

## Openings

### What Are Openings?
In combat, openings are critical opportunities to deal massive damage to enemies. Here’s how they work and when to use them effectively.

* Openings occur when an enemy is forced into a vulnerable state, marked by a gold circle icon above their head.
* During this state, they take increased damage from the next non-spell attack they receive.

### How to Trigger Openings:
* When a character successfully blocks or evades an attack while using `Defend`, or receives reduced damage through a passive skill like `Sanctuary's Blessing` or `Way of the Knight`, an opening is created. Magic attacks cannot create openings, but both single-target and multi-target physical attacks can, as long as everyone that got attacked was defending or had a passive skill trigger.
* The Opening is available to hit any time between when it pops up and the enemy's next turn. If you do not hit the Opening before the enemy moves next, the Opening disappears.
* Note that the Knight class skills Cover and Cover All do not create openings.

Openings work on all types of enemies, from basic mobs to bosses, although bosses that regularly use multi-target attacks are harder to create openings against, particularly when they mostly cast spells or multi-target attacks that hit both of your rows.

!!! note
    Opening can only be triggered on every other turn. You cannot get two consecutive turns of Opening being triggered.

### Opening Damage Multiplier
We're still in the process of figuring out exactly what this is, but our initial data collection seems to indicate that for basic attacks, Openings have, on average, a ~4x multiplier with the chance to hit with a ~7x multiplier. This has not been 100% confirmed, as there is some very unique behavior to Openings. See the disclaimer below.

It's currently unclear exactly how this fits in with skill usage, but it's either not linear or skill damage is factored into the formula in a unique way. For example, if you hit an Opening with a skill, you won't see 4x the damage of your skill damage - it will be less than that, however it will still be more than if you hit an Opening with your basic attack.

The Opening damage multiplier does stack multiplicatively with a sure hit. For example, if you would normally hit an enemy for ~250 with a basic attack, you would hit an Opening for `250 * 4 = 1000` damage. If that basic attack happened to be a sure hit, you'd be hitting closer to `250 * 2 * 4 = 2000` damage. If you happened to get what I'm calling an Extreme Opening hit, you'd be looking at `250 * 7 = 1750` damage for a non-sure hit, and `250 * 2 * 7 = 3500` damage for a sure hit.

From what I can tell, this Extreme Opening is random - I suspect an `x`% chance to get a regular Opening and a `1-x`% chance to get an Extreme Opening.

### Maximizing Damage from Openings:
* Use high-damage attacks, such as a two-handed weapon strike (e.g., axe or sword), or skills like `Heavy Attack` and `Precision Strike` to take full advantage of the multiplier. The latter is exceptionally helpful due to its defense piercing nature.
* Pair counterattacks with your heaviest hitters for optimal burst damage.
* Do not let an Opening disappear. If your ideal adventurer is stunned or otherwise unable to hit, you can still hit it with someone else and see increased damage.

!!! note "Disclaimer"
    One additional interesting point about Openings is that if you attack an enemy with Opening but miss, you still deal increased damage. I haven't tested this enough to see how much damage you deal, so it's possible that there's an additive element of the Opening damage instead of pure multipliers.

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

## Warrior's Battle Cry
Warrior's Battle Cry is an incredibly powerful damage buff. Due to the way damage mechanics work in this game, optimal damage comes from maximizing your attack power, minimizing enemy defense, subtracting the latter from the former, then multiplying the resulting value by your damage modifiers. Warrior's Battle Cry helps us achieve the first part of that by increasing your attack power before damage multipliers take effect.

We've done some data collection and testing around this, and we've settled on a best fit formula that seems to be mostly accurate (tested with WBC levels 1-4). This is not 100% guaranteed to be correct, but it should be a close approximation:

`BuffedAttackPower = (AttackPower + 20 + SkillLevel) * (1.2 + (SkillLevel / 50))`

## Defense Reduction and Penetration
There are two different types of modifiers that reduce defense. These are Defense Reduction and Defense Penetration. We're still working to confirm this, but from what we can tell, Defense Reduction stacks multiplicatively with Defense Penetration, but two spells or abilities from the same category do not stack with each other. This means that you can stack an axe or Precision Strike with MORLIS and get both the reduction and penetration applied, but you cannot stack an axe with Precision Strike and get penetration from both.

### MORLIS
MORLIS is an extremely handy spell that reduces an enemy's defense. This defense reduction is applied before subtracting the defense component in the damage formula. We don't have a great sense of the scale yet, but MORLIS at skill level 1 is roughly a 20% reduction in an enemy's defense.

### Defense Penetration
Defense Penetration properties, such as the innate properties of axes seems to be pretty steady at 30%. Essentially, attacking with an axe effectively reduces an enemy's defense by 30% in the calculation. One key thing to note here is that this seems to stack multiplicatively with a defense reduction spell or ability.

### Example Defense Calculation

!!! warning "Warning: Contains math"

Suppose you have `300` attack power and are fighting an enemy with `100` defense. You have two damage modifiers of `1.1` each. In this scenario, your normal final basic attack damage would be roughtly `(300 - 100) * 1.1 * 1.1 = 242`. If you cast MORLIS first, your final basic attack damage would be roughly `(300 - 100 * 0.8) * 1.1 * 1.1 = 266`. If you also happened to be using an axe, your final basic attack damage would be `(300 - 100 * 0.8 * 0.7) * 1.1 * 1.1 = 295`. For comparision, if you didn't have any form of defense reduction or penetration but instead added two more `1.1` modifiers, you would only be looking at `(300 - 100) * 1.1 * 1.1 * 1.1 * 1.1 = 293`, which is lower than if you were able to take advantage of both defense reduction and defense penetration. 

## Credits
Image source unknown, but shared by Nitsu and GrandAccelerator.
Damage formula has been reverse engineered and tested through a collaborative data collection and analysis effort by TheAxolotl, Salomae, L'Montes, and Aradace.