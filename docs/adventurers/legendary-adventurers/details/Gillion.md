# Gillion    

**Race**: Human  
**Gender**: Male  
**Type**: Dark  
**Personality**: Evil  
**Starting Class**: Fighter  
**Class Change**:   
**Role**: Damage  

??? info "Portraits"
    === "Fighter"
        ![](../img/gillion-fighter.jpg)

## Skills

!!! info "Unique Skill (Inheritable)"
    === "Cry of Ruin"
       {{ get_skill_description("Cry of Ruin") }}  
       
!!! info "Unique Skill (Not Inheritable)"
    === "Cursed-Blood Resonance"
       {{ get_skill_description("Cursed-Blood Resonance") }}  
       
!!! info "Discipline Skill"
    === "Vengeful Oath Conditioning"
       {{ get_skill_description("Vengeful Oath Conditioning") }}  
       
## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    There's a lot to unpack here. Read on if you're interested in specifics, but for those that just want some advice on whether or not to pull without knowing the why, I recommend skipping.

    First off, we'll talk about the easy one - his passive, Cursed-Blood Resonance, provides accuracy, action speed, and approximately a 10% damage increase at the cost of a loss of 5% of his maximum HP. Note that if he's below 5% of his maximum, this passive can kill him.

    Now, his active skill is much more interesting. Cry of Ruin has a lot going on. First, it's a medium attack that is a Dark type physical attack, which makes it subject to damage reduction when fighting Undead. Second, this attack is locked in to close range, regardless of the range of the equipped weapon, and is a single hit, so you absolutely do not want to be using it with a 1h sword or dagger. Third, the self damage costs 25% of his maximum HP (35% when inherited to someone else) and is additive with Cursed-Blood Resonance. This means he takes recoil damage equal to 30% of his maximum HP when he uses this skill and can absolutely kill himself with it. This damage is applied after any end-of-attack or enemy kill heals, but prior to an end-of-battle heal, such as Lana's passive HP restore.

    On to the weird stuff - the splash damage of his attack is very unique because it is based off the actual enemy formation and positioning. We don't have any real insight into those mechanics, but in general, this splash damage takes the damage dealt to the primary target and deals 35%, plus or minus X, of that damage to adjacent enemies. This splash damage is considered "true" damage, as it is based solely on the initial damage dealt (including factors like Slayer/Type weapons, Surety, and other damage boosts). If there are any targets adjacent to those receiving splash damage, they get hit with 35% of the splash damage.

    As an example, suppose you deal 3000 damage to target A in this enemy formation, this illustration shows the magnitude of damage that targets B and C would receive:

    ```
    A (3000) - B (1050) - C (368)
    ```

    When fighting undead, this splash damage will appear to be reduced further in the text display, however the numeric value is still calculated at the 35% as expected.

    Earlier, I mentioned the "plus or minus X." This is where things get really weird. Enemy positions and formations are somewhat variable, so while 35% is pretty constant for most enemy formations, you'll occasionally encounter formations where enemies are slightly closer together or slightly further apart. These variances actually impact the splash damage, so against some enemy formations, you might see splash damage closer to 45% or 55% of the original damage, while in others, you might see splash damage closer to 15% or 25% of the original damage. Annoying, right?

    His Discipline is fine - it's attack power and accuracy.

    So, what does all this mean? Well, this is our third damage dealing legendary recently that follows the high risk, high reward approach after Shiou and Galbadus, with the caveat that he's probably the highest risk for the lowest reward. If you plan to use his active skill, you effectively have to treat him as having 30% less effective HP, which can be very detrimental in some fights. While his attack is our first true physical row attack (Rinne's MoF targets the enemy's MDEF instead of DEF), the nature of the splash damage makes it not very well suited for acting as a row damage attack. If you're using it to farm, you'll constantly have to be restoring his HP between fights. If you're using it for progression, many of the encounters where you might want to deal large levels of row damage against difficult enemies (certain Emergency Occurrence strategies, for example), have enough enemies that lowering Gillion's effective HP is a bad idea.

    There are some unique positives to this skill, though. The first is that the splash damage being true damage could be helpful to chip away at any future encounters were we might have enemies that are largely immune to physical damage (depending completely on what those enemy formations might be). Similarly, there could be future encounters where there is shared damage across targets, and the splash damage would let you essentially double-dip by dealing regular and splash damage to the shared HP pool. The second is that if you inherit his skill to the MC, you give the MC a very easy way to force a flame if an encounter starts going poorly.

    These use cases are far and few between, though. I wouldn't go as far as saying Gillion is a bad adventure. He's essentially Wizardry's version of Dark Knight Cecil from Final Fantasy, and Cecil is awesome. I love the idea of the Dark Knight mechanics, but unfortunately, they don't lend themselves well to the mechanics in this game, and he's definitely a risky adventurer to use for very little unique gain.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Pretty easy pass here for me. The distance based damage and recoil damage are just too unreliable for me to consider running him.

## Duplicate Usage

* Inherit his skill to himself for increased damage on his heavy hitting single target spell
* Discipline for the usual small gains to stats
* Inherit to the MC if you want a relatively quick "kill me now so I can flame and reset" trigger
