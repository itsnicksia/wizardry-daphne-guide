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
    The exact influence of the trait points on stats depends in part of an adventurer's class multiplier, but there are also quite a few unknown factors. For example, we know that `Dexterity` increases `Surety` at a rate of 5 `Dexterity` = 1 `Surety`, but we don't know exactly how HP, MP, and SP are influenced by traits.

### Base Trait Points

The base trait points an adventurer starts with considers multiple factors, including gender, race, class, and element type. Using this table, we can calculate the base traits for an given adventurer.

|        |                       | Strength |  IQ | Piety | Vitality | Dexterity | Speed | Luck |
|:------:|:---------------------:|:--------:|:---:|:-----:|:--------:|:---------:|:-----:|:----:|
|  Base  |                       |    10    |  10 |   10  |    10    |     10    |   10  |  10  |
|        |                       |          |     |       |          |           |       |      |
| Gender |          Male         |    +1    |     |       |    +1    |     +1    |       |      |
|        |         Female        |          |  +1 |   +1  |          |           |   +1  |      |
|        |                       |          |     |       |          |           |       |      |
|  Race  |         Human         |          |     |       |          |           |       |      |
|        |          Elf          |    -2    |  +3 |   -1  |    -2    |     +2    |   +1  |  -1  |
|        |         Dwarf         |    +2    |  -2 |   +1  |    +3    |     +3    |   -4  |  -3  |
|        |       Beastfolk       |    -1    |  +1 |   -4  |    +2    |     +2    |   +3  |  -3  |
|        |                       |          |     |       |          |           |       |      |
|  Type  |          Fire         |    +2    |     |       |    +1    |           |       |      |
|        |          Air          |          |     |       |          |     +1    |   +2  |      |
|        |         Earth         |          |     |       |    +2    |     +1    |       |      |
|        |         Water         |          |  +2 |   +1  |          |           |       |      |
|        |         Light         |          |     |   +2  |          |           |       |  +1  |
|        |          Dark         |          |  +2 |       |          |           |       |  +1  |
|        |          Void         |     ?    |  ?  |   ?   |     ?    |     ?     |   ?   |   ?  |
|        |                       |          |     |       |          |           |       |      |
|  Class |        Fighter        |    +3    |  +1 |   +1  |    +2    |     +2    |   +1  |  +1  |
|        |         Knight        |    +3    |  +1 |   +2  |    +3    |     +1    |   +1  |  +1  |
|        |         Thief         |    +1    |  +1 |   +1  |    +1    |     +2    |   +3  |  +2  |
|        |         Priest        |    +1    |  +2 |   +3  |    +1    |     +1    |   +1  |  +2  |
|        |          Mage         |    +1    |  +3 |   +1  |    +1    |     +2    |   +2  |  +1  |
|        |         Ninja         |    +2    |  +1 |   +1  |    +1    |     +2    |   +3  |  +2  |
|        |        Samurai        |    +3    |  +2 |   +1  |    +2    |     +2    |   +1  |  +1  |
|        | Mage of the Black Rod |     ?    |  ?  |   ?   |     ?    |     ?     |   ?   |   ?  |
|        |       Tall Mage       |    +2    |  +2 |   +1  |    +1    |     +2    |   +1  |  +1  |

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
    | Samurai   | 1            | 1           | 0.6          | 1        |
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
    | Samurai   | 0.95    | 0.95          | 0.9     | 0.89       |
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
    | Samurai   | 0.6    | 0.6         | 0.6        | 0.85         |
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
**Resistance:** There is almost definitely a rounding bug of some kind here but these are the numbers that work. 

### Trait Boost (Commonly called IV)
A Trait Boost/IV is manifested in one of two ways.  First, and most commonly, a Character will have clearly improved growth in one Trait.  Normally this is visible at level 1 on character creation by 1 Trait being 1 point higher than normal.  However, this is not always the case.  This is a "buff" to the Trait growth rate, not an extra Trait point.  So it's possible to recieve a single Trait Boost/IV on a Trait that has poor growth for the Character/Class.  For example: a Dwarf Knight may not show an extra point of Speed at level 1, but may have a Speed Boost/IV. The second way this can manifest is as a "Neutral" Boost, where all Traits recieve a very small increase in growth.  This variety will not be visible at level 1 as all Traits will be their normal value.  

It is important to note that this means you cannot tell if a given Character copy has a single Trait Boost/IV or a Neutral one at level 1 if all Traits are the normal value.  Generally speaking, leveling a Character to level 20-30 will reveal what type of Boost/IV is happening for this particular Character copy in this situation.  This is important to understand because your Character may have a Boost/IV in an undesireable Trait.  Such as a Human Fighter with a Boost/IV of Piety.

You should know and understand that Boost/IV is just a bonus.  A Characters Trait growth is primarily driven by their Class, and Race.  An Elf Mage will always have great IQ even if their Boost/IV is Dexterity.  Even if you should have a Boost/IV with a high degree of synergy (for example a Beastfolk Thief with Speed Boost/IV) the difference between "normal average" and "Boost/IV" will generally only be 6-10 points.  If the Boost/IV is a single Trait with poor synergy (for example a Human Ninja with Vitality Boost/IV) the difference between normal average and the Boost/IV will be lower, commonly around 5-7 points. 

The biggest unknown around Boosts/IVs, though, is exactly what this means for long-term Adventurer development. Assuming we will eventually be at a maximum level of 130, it's possible that the Boost/IV means a particular Trait Point will get to a "maximum value" faster but by level 130, all copies of an adventurer will have the same Trait Point values.

TheAxolotl's personal opinion on IVs is that when you have multiple copies of an adventurer to register, select the one with the IV that you prefer, as that will make a more currently notable difference in Trait Point growth than bonus points will. When you don't have multiple copies, don't worry about the IV. We don't know how IVs will play out long-term, so I personally think it's not worrying about.

Karkarov's personal opinion is much the same as TheAxolotl's.  Ultimately it depends on the player, those who are happy to spend money and "whale" should absolutely be picky and wait for that perfect Character copy with the desired meta level 1 Traits.  For the average player who is Free to Play you should just use what you have and know that this is not going to make or break a Character.  There are many ways to tweak your ultimate Trait values, from gear, to bondmates, to brews, etc etc.  There is no such thing as a "bad Character" in Daphne.  

!!! note "You will never ruin an adventurer by selecting one with no IV or a less than ideal IV."

### Trait Point Variance
Trait Points can vary across two copies of the same Adventurer, and this is due to a combination of level growth, which have an element of randomness, how bonus points were spent, and Boost/IV. For example, one level 50 Adam could end up with 59 IQ, while another could end up with 73 IQ. We don't have a full understanding of the degree of variance from level growth and Boost/IV, but when looking at those two Adams, using the chart above, you can see that there's only a difference in Magic Power of `(73-59)*1.2=16.8`. That is not a large difference, especially as our Magic Power increases through equipment.

What does that mean? Ultimately, the impact of trait points on stats is significantly smaller than the impact of equipment on stats.

One popular myth to be aware of, "Lower Fortitude = Highter Trait Growth".  This is a popular theory on Social Media based on anecdotal observations but is not true. A lower Fortitude Adventurer does not benefit from extra Trait growth and is no more likely to have high Trait growth than a 100 Fortitude character.

What about Legendary VS General VS Anonymous Adventurers, is there a difference?  Advanced Classes VS Normal Classes?  Yes, there is a difference on both counts.

Legendary Adventurers generally have slightly higher overall Trait growth VS General and Anonymous Adventurers, while General and Anonymous Adventurers have the same growth.  Likewise Advanced Classes (Samurai and Ninja) generally have higher Trait growth than the Standard Classes.

Please understand this will not massively impact a non Legendary or Advanced Class Adventurers potential.  You could potentially see gaps around 20 total Trait points comparing say Shiou to Olive at level 60.  For a more fair comparison, Livana compared to Olive at 60 would be around a 5-8 point total difference on average.  

## What Do Trait Points And Stats Mean For Bonus Points?
We've often found ourselves saying bonus points don't matter. This is both true and not true. In one sense, it's not true because there can be a large visible difference between primary stats across Adventurers, however in another sense, it is true because the overall in-battle impact of bonus points is small.

### How Should You Assign Bonus Points?
There aren't really any bad options here, but the community tends to recommend either the Adventurer's main stat (for example, a Fighter's main stat would be STR), Luck, Speed, or some combination of the three. You cannot break a character with your bonus point allocation.

TheAxolotl generally (but not always) does the following for his bonus points:

* Fighter: Strength, Dexterity, or Luck
* Knight: Luck
* Thief: Strength, Dexterity, Speed, or Luck
* Mage: IQ or Speed
* Priest: Speed, but it largely depends on what its second class is, if one exists
* Ninja: Strength, Dexterity, or Luck if planning on inheriting Follow Up Attack and Counterattack
* Samurai: Strength, IQ, Dexterity, Speed, or Luck (if factoring in inherited passive skills)

Karkarov typically suggests spending bonus points as follows:

* Fighter: Strength or Dexterity... Unless the Character will only be used for Auto Farming, then go Luck.
* Knight: Strength Speed.  Luck if you want more survivability/Knight Skill synergy.
* Thief: Strength.
* Mage: IQ or Speed.
* Priest: Speed.
* Ninja: Strength.
* Samurai: Strength, IQ, or Speed are all viable.
* NOTE: If you plan to long term permanently Class change the Character, choose based on the destination Class, not the base Class.

!!! note "You will never ruin an adventurer with your bonus point assignment."

## Calculating Power
Your stats page power is calculated through the following formula, which factors in your primary stats, class multiplier, equipment, and passive skills.

!!! warning "Warning: Contains math"

### Power Formula

!!! note
    The formula has been updated now that we have another tier of gear to look at, and it appears to be correct for both Ebonsteel tier gear and lower.
    This formula has also been updated and simplified to incorporate the new `Strength+` calculations. 

`StatsPagePowerValue = (SpecialCeiling(TraitPoint * ClassMod * Sum(%BlessingValues)) + Sum(ScalarBlessingValues)) * (1 + Strength+WeaponMod) + Sum(OtherValues)`

### Power Formula Variable Definitions
* `StatsPagePowerValue` is the final power value you see displayed on the stats page.
* `SpecialCeiling` is...unique. Instead of multiplying these values together and rounding the final result like you'd normally expect to happen with, well, math, the game instead **rounds up after each multiplication**. This leads to some slightly unexpected behavior with the formula.
    * For example, if you have a Fighter with `51` Strength, the naked, skill-less attack power is `62` instead of the expected `61.2` or even `61` as normal rounding would work. This is the same value you get if you completely unequip a character, then subtract the parenthesized value on the stats page.
    * Continuing the example above, if I completely unequip my Fighter MC, his Strength shows `51(+0)` on the stats page, while his Attack Power shows `93(+31)` on the stats page. Subtracting the `31` from the `93` gives us the `62` that matches `Ceiling(51*1.2)`.
        * This does mean that when reading your stats page, a value of `93(+31)` simply says that `31` points of those `93` total points came from skills. It does not mean that you add the `31` to the `93`. Weird, right?
* `TraitPoint` is `Strength`, `IQ`, or `Piety`, depending on if you're trying to calculate `Attack Power`, `Magic Power`, or `Divine Power` respectively.
* `ClassMod` is based on the stats chart above. As an example, Fighters have a `ClassMod` for `Strength` of `1.2`.
* `Sum(%BlessingValues)` is self-explanatory, but it's the addition of all percentage (example `ATK+19%`) blessing values from your equipment.
* `Sum(ScalarBlessingValues)` is self-explanatory, but it's the addition of all scalar (example `ATK+11`) blessing values from your equipment.
* `Sum(OtherValues)` is pretty much everything else that increases the stat. Examples of this are:
    * The flat, non-blessing values found on equipment, including a weapon's attack/magic power.
    * Stat values from passive skills such as `2h Weapon Proficiency` or `Priest Weapon Mastery`. This is largely just the parenthesized value on your stats page, but see below for the oddity with Strength+.
        * `Priest Weapon Mastery` adds a rounded `PIE * 0.2` to Attack Power.
    * Stat values from passive weapon properties such as `I.Q. Conversion`.
        * `I.Q. Conversion` adds a rounded `IQ * 0.2` to Attack Power.
    * Relicbrews.
    * Stat-boosting bondmates. Note that trait-boosting bondmates actually modify the `TraitPoint` value.

### Strength+

Strength+ is a unique property that appears on 2h weapons that adds a portion of the adventurer's STR value to the attack power. This value factors in the Strength trait, the class multiplier, all blessings, and a scalar value that changes based on the "tier" of the weapon. It shows up in parentheses as an additive component, however it doesn't show the full additive value because that would make too much sense. Instead, it only shows the `STR * ClassMod * WeaponMod` value.

| Weapon Tier    | Strength+ Weapon Mod | ParenthesizedVisibleValue |
| -------------- | -------------------- | ------------------------- |
| Steel or Lower | 0.75                 | STR * ClassMod * 0.75     |
| Ebonsteel      | 1                    | STR * ClassMod * 1        |
| Unnamed Tier   | 1.1                  | STR * ClassMod * 1.1      |

## Resistance

!!! warning "The information about resistance is not exact, what we know is gathered through empirical evidence"

Resistance is a stat that contributes to resisting status effects (in the case of poison, it also reduces poison damage). There are two main sources of resistance, which is the RES stat itself and Tolerances that come from passive skills and gear.

All info in this section credited to: [名はある冒険犬柴丸](https://www.youtube.com/@名はある冒険犬柴丸)

### Resistance Formula

![](./img/res-formula.png)

- Estimated formula, not exact calculations. End result is probably multiplicative to the base chance of status affliction application.
- RES stat has very high diminishing returns relative to effort obtaining RES. 
- RES and Tolerance are multiplicative to each other (50% from RES and 50% from Tolerance = 75% reduction in status affliction chance)
- Fortitude Adjustment is a flat additive chance added to status affliction chance after multipliers.

### Estimated Tolerances

=== "Skill-Bind Tolerance"

    |        Name                                  |     Type               |     Base %     |   % Increase Per Level   |
    | -------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Gessi                                        |  Bondmate              |     15 (lvl 5) |          ?               |
    | Featherbronze Gauntlets                      |  Equipment             |      30        |          N/A             |
    | Protection Charm                             |  Equipment             |      30        |          N/A             |
    | Master Armor                                 |  Gacha Equipment       |      ?         |          N/A             |
    | Prediction Hood                              |  Gacha Equipment       |      ?         |          N/A             |
    | Honest Living (Olive)                        |  Adventurer Passive    |      50        |          N/A             |
    | Apostle of Breaking Commandments (Red Beard) |  Adventurer Passive    |     70-80      |          N/A             |
    | Future Dreamt With the Skull (Yekaterina)    |  Adventurer Discipline |      25        |          5               |
    | Bind Tolerance Up (Mind)                     |  Well of Mind          |      30        |          3-4             |
    | Bind Resistance                              |  Harken Blessing       |      30        |          N/A             |

=== "Curse Tolerance"

    |        Name                                  |     Type               |     Base %     |   % Increase Per Level   |
    | -------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Ring of Spellbreaking                        |  Equipment             |      20        |          N/A             |
    | Honest Living (Olive)                        |  Adventurer Passive    |      50        |          N/A             |
    | Salvation through Wealth (Marianne)          |  Adventurer Discipline |      20        |          5               |
    | Curse Tolerance Up (Mind)                    |  Well of Mind          |      30        |          3-4             |

=== "Stone Tolerance"

    |        Name                                  |     Type               |     Base %     |   % Increase Per Level   |
    | -------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Graham, Knight Commander of Guarda           |  Bondmate              |      ?         |           ?              |
    | Goatskin Cloak                               |  Equipment             |      ?         |          N/A             |
    | Master Armor                                 |  Gacha Equipment       |      ?         |          N/A             |
    | Compassionate Apothecary (Asha)              |  Adventurer Passive    |      50        |          N/A             |
    | Blessing of Insta-Kill/Stone Tolerance       |  Harken Blessing       |      30        |          N/A             |
    | Memory of Bordaon's Battle                   |  Harken Blessing       |      30        |          N/A             |

=== "Charm Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Brita                                                   |  Bondmate              |     20 (lvl 5) |          ?               |
    | Circlet                                                 |  Equipment             |      30        |          N/A             |
    | Light Helmet of Separation                              |  Equipment             |      20        |          N/A             |
    | Light Gauntlets of Separation                           |  Equipment             |      20        |          N/A             |
    | Heat Haze Light Armor Boots                             |  Equipment             |      20        |          N/A             |
    | Elegant Dancer                                          |  Equipment             |      20        |          N/A             |
    | Oath of Fortitude (Clarissa)                            |  Adventurer Passive    |      50        |          N/A             |
    | Warrior Princess of Resolution and Love (Lanavaille)    |  Adventurer Discipline |      25        |          5               |
    | Flawlessly Composed Warrior Princess (Lanavaille)       |  Adventurer Discipline |      25        |          5               |
    | Blessing of Owen (Abenius)                              |  Adventurer Discipline |      25        |          5               |
    | Charm Tolerance Up (Mind)                               |  Well of Mind          |      30        |          3-4             |
    | Blessing of Confusion/Charm Tolerance                   |  Harken Blessing       |      30        |          N/A             |
    | Memory of Bordaon's Battle                              |  Harken Blessing       |      30        |          N/A             |

=== "Confuse Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Gigi                                                    |  Bondmate              |     10 (lvl 1) |          N/A             |
    | Eugen and Bibi                                          |  Bondmate              |     27 (lvl 5) |           ?              |
    | Circlet                                                 |  Equipment             |      30        |          N/A             |
    | Light Helmet of Separation                              |  Equipment             |      20        |          N/A             |
    | Light Gauntlets of Separation                           |  Equipment             |      20        |          N/A             |
    | Heat Haze Light Armor Boots                             |  Equipment             |      20        |          N/A             |
    | Mauve Shield                                            |  Equipment             |      30        |          N/A             |
    | Oath of Fortitude (Clarissa)                            |  Adventurer Passive    |      50        |          N/A             |
    | Warrior Princess of Resolution and Love (Lanavaille)    |  Adventurer Discipline |      25        |          5               |
    | Flawlessly Composed Warrior Princess (Lanavaille)       |  Adventurer Discipline |      25        |          5               |
    | Blessing of Owen (Abenius)                              |  Adventurer Discipline |      25        |          5               |
    | Confusion Tolerance Up (Mind)                           |  Well of Mind          |      30        |          3-4             |
    | Blessing of Confusion/Charm Tolerance                   |  Harken Blessing       |      30        |          N/A             |
    | Memory of Bordaon's Battle                              |  Harken Blessing       |      30        |          N/A             | 

=== "Paralysis Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Royal Knight Albano                                     |  Bondmate              |     10 (lvl 5) |           ?              |
    | Head Cook                                               |  Bondmate              |     17 (lvl 5) |           ?              |
    | Plague Mask                                             |  Equipment             |      30        |          N/A             |
    | Bracelet of Impurity                                    |  Equipment             |      40        |          N/A             |
    | Compassionate Apothecary (Asha)                         |  Adventurer Passive    |      50        |          N/A             |
    | Blessing of the Beast God (Debra)                       |  Adventurer Discipline |      25        |          5               |
    | Paralysis Tolerance Up (Mind)                           |  Well of Mind          |      30        |          3-4             |
    | Blessing of Poison Paralysis                            |  Harken Blessing       |      30        |          N/A             |
    | Abductor of Kings                                       |  Harken Blessing       |      30        |          N/A             |

=== "Sleep Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Doris, the Frightened Maid                              |  Bondmate              |     20 (lvl 5) |           ?              |
    | Melgina                                                 |  Bondmate              |     17 (lvl 5) |           ?              |
    | Sam the Rascally Dog                                    |  Bondmate              |      12        |           2              |
    | Pearl of the Sea God                                    |  Equipment             |      20        |          N/A             |
    | Circlet                                                 |  Equipment             |      30        |          N/A             |
    | Bracelet of Urgency                                     |  Equipment             |      50        |          N/A             |
    | Nameless Loyalty (Eldorado)                             |  Adventurer Passive    |      50        |          N/A             |
    | Cold-Blooded Elf (Elda)                                 |  Adventurer Discipline |      20        |          5               |
    | Sleep Tolerance Up (Mind)                               |  Well of Mind          |      30        |          3-4             |
    | Blessing of Unsleeping Will                             |  Harken Blessing       |      30        |          N/A             |
    | Bind Rejecting Immunity                                 |  Harken Blessing       |      30        |          N/A             |
    | Mermaid Aboard the Ship                                 |  Harken Blessing       |      30        |          N/A             |
    | Memory of Bordaon's Battle                              |  Harken Blessing       |      30        |          N/A             |

=== "Poison Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Willful Theo                                            |  Bondmate              |     20 (lvl 5) |           ?              |
    | Songstress Marin                                        |  Bondmate              |     17 (lvl 5) |           ?              |
    | Plague Mask                                             |  Equipment             |      30        |          N/A             |
    | Antivenom Shield                                        |  Equipment             |      50        |          N/A             |
    | Bracelet of Impurity                                    |  Equipment             |      40        |          N/A             |
    | Compassionate Apothecary (Asha)                         |  Adventurer Passive    |      50        |          N/A             |
    | Apothecary's Knowledge (Asha)                           |  Adventurer Discipline |      20        |          5               |
    | Hot-Blooded Adventurer (Gaston)                         |  Adventurer Discipline |      20        |          5               |
    | Poison Tolerance Up (Mind)                              |  Well of Mind          |      30        |          3-4             |
    | Poison Resistance Blessing                              |  Harken Blessing       |      30        |          N/A             |
    | Blessing of Poison Paralysis                            |  Harken Blessing       |      30        |          N/A             |
    | Abductor of Kings                                       |  Harken Blessing       |      30        |          N/A             |
    | Dwarf Race                                              |  Race                  |      20        |          N/A             |

=== "Fear Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Caterwaul Crew                                          |  Bondmate              |     20 (lvl 5) |           ?              |
    | Pearl of the Sea God                                    |  Equipment             |      20        |          N/A             |
    | Peony Hair Ornament                                     |  Gacha Equipment       |      ?         |          N/A             |
    | Breastplate of Hope                                     |  Gacha Equipment       |      ?         |          N/A             |
    | Renegade's Sabatons                                     |  Gacha Equipment       |      ?         |          N/A             |
    | Oath of Fortitude (Clarissa)                            |  Adventurer Passive    |      50        |          N/A             |
    | Honest Living (Olive)                                   |  Adventurer Passive    |      50        |          N/A             |
    | Unstoppable Curiosity (Dino)                            |  Adventurer Discipline |      20        |          5               |
    | Fear Tolerance Up (Mind)                                |  Well of Mind          |      30        |          3-4             |
    | Blessing of Unsleeping Will                             |  Harken Blessing       |      30        |          N/A             |
    | Abductor of Kings                                       |  Harken Blessing       |      30        |          N/A             |
    | Beastfolk Race                                          |  Race                  |      20        |          N/A             |

=== "Stun Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Harry, the Wandering Adventurer                         |  Bondmate              |      ?         |           ?              |
    | Kidnapped Girl Liam                                     |  Bondmate              |      ?         |          N/A             |
    | Plague Mask                                             |  Equipment             |      30        |          N/A             |
    | Goddess's Earrings                                      |  Equipment             |      ?         |          N/A             |
    | Nameless Loyalty (Eldorado)                             |  Adventurer Passive    |      50        |          N/A             |
    | Knight's Creed (Eckart)                                 |  Adventurer Discipline |      20        |          5               |
    | Solid Devotion (Eldorado)                               |  Adventurer Discipline |      20        |          5               |
    | Stun Tolerance Up (Mind)                                |  Well of Mind          |      30        |          3-4             |
    | Memory of Bordaon's Battle                              |  Harken Blessing       |      30        |          N/A             |

=== "Instakill Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Concerned Brother Elequon                               |  Bondmate              |      ?         |           ?              |
    | Helmet of Malice                                        |  Equipment             |      ?         |          N/A             |
    | Skull Necklace                                          |  Equipment             |      ?         |          N/A             |
    | Shining Finger Band                                     |  Equipment             |      ?         |          N/A             |
    | Faith of the Wicked (Galina)                            |  Adventurer Passive    |      50        |          N/A             |
    | Apostle of Breaking Commandments (Red Beard)            |  Adventurer Passive    |      70-80     |          N/A             |
    | Instakill Tolerance Up (Mind)                           |  Well of Mind          |      30        |          3-4             |
    | Blessing of Instakill/Stone Tolerance                   |  Harken Blessing       |      30        |          N/A             |

=== "Critical Tolerance"

    |        Name                                             |     Type               |     Base %     |   % Increase Per Level   |
    | ------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
    | Beheading Bunny                                         |  Bondmate              |      ?         |           ?              |
    | Safety Ring                                             |  Equipment             |      ?         |          N/A             |
    | Rabbit Talisman                                         |  Gacha Equipment       |      ?         |          N/A             |
    | Faith of the Wicked (Galina)                            |  Adventurer Passive    |      50        |          N/A             |
    | Apostle of Breaking Commandments (Galina)               |  Adventurer Discipline |      20        |          5               |
    | Flawlessly Composed Warrior Princess (Lanavaille)       |  Adventurer Discipline |      25        |          5               |
    | Abductor of Kings                                       |  Harken Blessing       |      30        |          N/A             |
