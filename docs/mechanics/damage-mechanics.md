# Damage and Skill Mechanics

## Surety
There has been a lot of confusion around Surety and what exactly it does. Surety is simply the chance to deal a sure hit. When you increase your surety value, you increase your chance to land a sure hit. Dexterity contributes to Surety at a rate of 5 Dex = 1 Surety.

By default, a sure hit acts as a 80% damage increase to the final damage you deal.

!!! note
    Increasing your surety value does NOT increase the sure hit damage.

The only skill that currently exists to increase your sure hit damage is `Way of the Thief`. At skill level 1, this increases the sure hit damage multiplier from `1.8` to `2`. It is possible to increase the level of this skill, however this can currently only be done through the `Codex of Learning` items that add skill experience to any skill. We'll update this when we know the multipliers for subsequent skill levels.

!!! note
    Despite what was previously assumed, spells can deal Sure Hits. Most spells seem to have a very large innate negative surety value, which makes this hard to achieve. We're currently assuming it's something like -100 surety, however some spells like `TZALIK` and `True Words of Fire` appear to have a higher (possibly 0 or positive) innate surety value. We have been able to confirm that an MC Mage casting CONES is still able to land a sure hit, though, so spell surety is NOT specific to just `TZALIK` and `True Words`.

## Buffs and Debuffs
Buffs and Debuffs are extremely powerful ways to turn a fight in your favor. Some of the most common and impactful buffs and debuffs are:

* Warrior's Battle Cry - boosts your Attack Power
* (MA)CALDIA - boosts your Surety and Accuracy
* PORTO - boosts your Action Speed
* MORLIS - reduces enemy Defense
* BATILGREF - reduces enemy Evasion and Action Speed

Note that these are not comprehensive lists, and other buffs and debuffs are situationally useful to apply.

One important thing to note is that there is a limit of 3 buffs and a limit of 3 debuffs that can be applied to a target. Applying more buffs/debuffs will cause earlier-applied ones to drop off. This means that you can accidentally remove an important buff or debuff if you're not paying too much attention to what you're applying. Afflictions (sleep, confuse, taunt, etc) do not count towards the debuff limit.

## Openings

### What Are Openings?
In combat, openings are critical opportunities to deal massive damage to enemies. Here’s how they work and when to use them effectively.

* Openings occur when an enemy is forced into a vulnerable state, marked by a gold circle icon above their head.
* During this state, they take increased damage from the next non-spell attack they receive.

### Requirements to Trigger Openings:
* Enemies uses a "melee" physical attack (so minotaur rock fling doesn't count).
* If this move can cause debuffs, then their targets must not receive debuffs from this attack.
* Target is alive after being attacked.
* Enemy did not get an Opening from their previous turn.
* If this move is an AOE, you'll need a majority of the targets to be defending to obtain an opening.

### Some more Opening Details:
* Opening created through 1st action of 2 consecutive actions/turns will not be lost because of what happened with the 2nd action.
* If defending members simultaneously gets attacked by multiple enemies, you can inflict Opening on all attackers.
* The Opening is available to hit any time between when it pops up and the enemy's next turn. If you do not hit the Opening before the enemy moves next, the Opening disappears.
* Note that the Knight class skills Cover and Cover All do not create openings.

Openings work on all types of enemies, from basic mobs to bosses, although bosses that regularly use multi-target attacks are harder to create openings against, particularly when they mostly cast spells or multi-target attacks that hit both of your rows.

### Opening Damage
We're still in the process of figuring out exactly what this is, but our current data collection seems to indicate that Opening damage can be calculated as `OpeningDamage = AttackDamage + HP%Damage` where `AttackDamage` is the damage an adventurer would normally deal with a basic attack or skill, and `HP%Damage` is an additional amount that is based on the enemy's maximum HP. This `HP%Damage` appears to ignore any offensive or defensive modifiers.

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

Skills like `Air Formation` and `Fire Formation` will also fall into this category. I suspect they're similar 10% increases, but I haven't tested them out personally.

The final current skill that falls into this category is `Way of the Warrior`. Like `Way of the Thief`, this skill can be leveled up and appears to have an initial increase of 8%. One unique component of this skill is that it appears to only care about the enemy row, and will activate the multiplier if you're hitting something with a close or mid-range weapon regardless of the position the adventurer is in your party. For example, my Elise was hitting the enemy front row with a spear for the same damage when she was in my front row as when she was in my back row. One key thing to note is that `Way of the Warrior` does not increase damage done by spells, but `Way of the Thief` does increase the sure hit damage from spells.

### Way of the Warrior Modifier

| Skill Level | Damage Modifier |
|:-----------:|:---------------:|
|      1      |       1.08      |
|      2      |                 |
|      3      |                 |
|      4      |                 |
|      5      |                 |
|      6      |                 |
|      7      |                 |

## Type Advantage Modifiers
When you hit a type advantage on an enemy, you deal roughly 30% more damage (a modifier of 1.3). If you happen to be hitting a type advantage with an adventurer that shares its type with the weapon or spell, that advantage increases by an additional 25% (a modifier of ~1.6).

For example, if you deal `200` damage against a neutral enemy with an Earth weapon, if that same enemy were Water type, you would be dealing `200 * 1.3 = 260` damage instead. If the adventurer that was hitting the weakness happened to also be an Earth type, you would instead be dealing `200 * 1.3 * 1.25 = 325` damage.

### Element Type Chart

![Element Chart](./img/element-chart.png)

## Status Affliction Modifiers
There are two status afflictions that currently allow you to deal increased damage.

* `KATINO` causes the first hit to deal 100% more damage (a modifier of 2).
* `Opening` is even more unique. It causes you to deal over 100% damage, but we're not entirely sure what the number is yet, as there are some nuances to it. For example, if you miss while attacking an enemy with the `Opening` affliction, the enemy will still take a large amount of damage. It's possible that a component of this damage is tied to the enemy's maximum or current HP.

## Active Skill and Spell Damage
Active skills and spells are a very unique bunch. It's hard to figure out the exact formula for them, but latest testing shows some interesting behavior. It currently seems that rather than being perfectly linear or on a damage curve, the damage is linear up until a certain inflection point of attack or magic power, then there is a shift and the skill or spell remains linear but the slope of that line changes. This behavior is very bizarre, but it ultimately means that at a certain point, a skill or spell at a particular level stops increasing at the rate it used to increase at and tapers off to increase at a significantly slower rate.

For active skills, this has a very unique side effect. After that skill level's inflection point (or soft cap if you want to think of it that way), a basic attack starts to deal more damage than the skill at that level.

## Calculating Damage

!!! warning "Warning: Contains math"

### Partial Damage Formula
`FinalDamage = BaseDamageFromPowerDefenseAndActiveSkills * PassiveDamageModifiersMultiplicatively * TypeAdvantageModifier * SameTypeAdvantageModifier * SureHitModifier * StatusAfflicitionModifier * OffHandDamageReduction`

### Damage Formula Explanation
This looks like a relatively simple formula, but there are some nuances that make it surprisingly complex and hard to fully figure out. We'll start with the easy things that we know.

* `PassiveDamageModifiersMultiplicatively` is the combination of your passive damage modifiers multiplied together
* `TypeAdvantageModifier` is factored in if you are hitting a type weakness, such as using an Earth weapon against a Water enemy
* `SameTypeAdvantageModifier` is factored in if you are hitting a type weakness with an adventurer that shares type with the attack
* `SureHitModifier` is factored in if you land a sure hit
* `StatusAfflicitionModifier` is factored in if you're hitting a sleeping enemy or an Opening
* `OffHandDamageReduction` appears to start out at a `0.5` multiplier when hitting with the off-hand weapon while Dual Wielding. This multiplier increases as the Dual Wield skill level increases
* `BaseDamageFromPowerDefenseAndActiveSkills` is currently the big unknown. We're not entirely sure how the power listed on the stats page translates to the damage that you deal. We also don't entirely know how the active skills fit into the equation. We're still trying to determine if they're a damage multiplier, a multiplier on attack power, or something else. We do know that some component of this is involves taking your attack power, adding attack power boosts from `Warrior's Battle Cry`, subtracting half of your enemy's defense, subtracting (or adding) any additional defense values from spells and skills like `MORLIS`, `Armor Break`, `MAKALTU`, and factoring in the defense penetration on axes, `Precision Strike`, and `Sneak Attack`. This is the black box that we hope to decipher as we gather more data.

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
There are two different types of modifiers that reduce defense. These are Defense Reduction and Defense Penetration. One key thing to note is that two sources of Defense Penetration do not stack (for example, Axes and Precision Strike do not stack together) but multiple sources of Defense Reduction do stack. This means it is possible to apply MORLIS, Armor Break, and Corrosion Dagger simultaneously.

### MORLIS
MORLIS is an extremely handy spell that reduces an enemy's defense. This defense reduction is applied before subtracting the defense component in the damage formula. We don't have a great sense of the scale yet, but MORLIS at skill level 1 is roughly a 20% reduction in an enemy's defense.

### Defense Penetration
Defense Penetration properties, such as the innate properties of axes seems to be pretty steady at 30%. Essentially, attacking with an axe effectively reduces an enemy's defense by 30% in the calculation. One key thing to note here is that this seems to stack multiplicatively with a defense reduction spell or ability.

### Example Defense Calculation

!!! warning "Warning: Contains math"

Suppose you have `300` attack power and are fighting an enemy with `200` defense. You have two damage modifiers of `1.1` each. In this scenario, your normal final basic attack damage would be roughly `(300 - 200 / 2) * 1.1 * 1.1 = 242`. If you cast MORLIS first, your final basic attack damage would be roughly `(300 - 200 / 2 * 0.8) * 1.1 * 1.1 = 266`. If you also happened to be using an axe, your final basic attack damage would be `(300 - 200 / 2 * 0.8 * 0.7) * 1.1 * 1.1 = 295`. For comparision, if you didn't have any form of defense reduction or penetration but instead added two more `1.1` modifiers, you would only be looking at `(300 - 200 / 2) * 1.1 * 1.1 * 1.1 * 1.1 = 293`, which is lower than if you were able to take advantage of both defense reduction and defense penetration. 

## Follow-Up Attack
Follow-Up Attack is a powerful passive skill when invested in. When it triggers with a multi-hit weapon, it adds a single basic attack hit, effectively acting as +50% damage for 2-hit weapons and +33% damage for 3-hit weapons. With single-hit weapons, however, this effectively gives you +100% more basic attack damage. The higher the difference between your attack and an enemy's defense, the more valuable this is.

The formula for Follow-Up Attack appears to be:

`FollowUpChance = (SkillLevel + 1) / 1000 * Luck`

Note that this is our best guess as of now and appears accurate, but due to the nature of percentage activation rates, your mileage may vary.

### Example Follow-Up Attack Calculation

!!! warning "Warning: Contains math"

Here are a few expected follow-up rates at different skill and luck levels.

| SkillLevel | Luck | Expected |
|:----------:|:----:|:--------:|
|      1     |  37  |   .074   |
|      1     |  41  |   .082   |
|      2     |  42  |   .126   |
|      3     |  43  |   .172   |
|      4     |  43  |   .215   |
|      5     |  44  |   .264   |
|      7     |  44  |   .352   |

What this means is that if you have 43 Luck and Follow-Up Attack 4, you can expect to see roughly a 22% chance to trigger Follow-Up Attack on any basic attack. If you have 44 Luck and Follow-Up Attack 7, you can expect that to jump up to roughly a 35% chance. This is very significant since as our level caps increase, so will our Luck values, thus our Follow-Up Attack rates will coninue to climb.

### Practical Applications of Follow-Up Attack
The absolute best application of Follow-Up Attack is with 2-handed weapons. If you have a 25% chance to trigger Follow-Up Attack with a single hit, 2-handed weapon (which will give you the biggest gap between your attack and an enemy's defense), you will on average be dealing `AverageDamage = ProbabilityNormalDamage + ProbabilityDoubleDamage = (100 * 0.75) + (200 * 0.25) = 75% + 50% = 125%`. In other words, you would on average be dealing 25% more basic attack damage across the board with a 2h weapon. This is pretty significant.
