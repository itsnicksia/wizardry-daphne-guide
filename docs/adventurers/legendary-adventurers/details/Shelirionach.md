# Shelirionach

**Race**: Elf  
**Gender**: Female  
**Type**: Dark  
**Personality**: Evil  
**Starting Class**: Mage  
**Class Change**:  
**Role**: Damage, Support

!!! info "Portraits"
    === "Mage"
        ![](../img/shelirionach-mage.png)

## Skills

!!! info "Unique Skill (Inheritable)"
    === "Eyes That Know the Future"
        By glimpsing the future, the user can act against a dangerous situation. Chance to evade or reduce the first received damage higher than 50% of own max HP. Activation rate greatly reduced if learned by anyone other than Shelirionach.

!!! info "Unique Skill (Not Inheritable)"
    === "Dream of the Sleeping Witch"
        Due to the strain of shared perception with the Sacred Tree, at turn end, if MP is 25% or lower, the user falls Asleep during battle for 1 ime only. While Asleep, damage taken is not increased, and MP is recovered at turn end. While Asleep, the user automatically uses a dark-type spell attack on one enemy.

!!! info "Discipline Skill"
    === "Child of the Sacred Tree"
        Continuously increases each stat, with Magic Power and Action Speed increased even further.

## Adventurer Reviews

!!! info "TheAxolotl's Analysis"

    Shelirionach is our latest mage, and she has a very interesting and unique kit.

    `Eyes That Know The Future` gives a nice defensive boost to mages and helps her avoid extremely strong one-shotting attacks, which at a glance seems just okay, but there's an interesting nuance to this. This skill can trigger multiple times within a turn, once for each enemy that attacks her. During testing we saw sequences of her evading an attack followed by her receiving reduced damage from two additional attacks within the same turn. This is quite noteworthy, as in theory, she could evade multiple times in a row, really adding to her defensive protections. Mechanically, this skill seems to work by having an `X%` chance of evading and a `1-X%` chance of reducing damage. As the skill level increases, the chance to evade increases and the chance to reduce damage decreases. This is quite powerful as more evades means a higher overall uptime of protection, but it's not clear how impactful each level increase would be.
    
    When inherited, there is a significant reduction in the activation rate, so it's likely not going to be too helpful when given to other adventurers, but something worth considering for the whales out there.

    This is fine since her Discipline is one of the stronger ones. While I'm not a big fan of Disciplines in general, `Child of the Sacred Tree` works great for Sheli since it boosts her two most important stats - Magic Power for more damage and Action Speed for maintaining optimal turn order.

    The real interesting mechanic, though, is with her signature skill, `Dream of the Sleeping Witch`. This skill has a lot of nuance to it, making for a very interesting skill. First, it helps alleviate one of the major issues that mages face right now - longevity in long dungeon exploration sessions. If Sheli is below 25% MP at the end of her turn, she will put herself to sleep. While sleeping, she performs two actions automatically - the first is that she nukes an enemy with a dark attack. This attack hits significantly harder than a manually-cast `ZELOS`. The second action is that she restores a flat 8 MP. This doesn't scale, but it can add up over a long time. If she ends up sleeping for 5 turns in a fight for some reason, she will restore 40 MP, and while she can only put herself to sleep once in the course of a given battle, she can put herself to sleep multiple times over the course of a given dungeon exploration session.

    There's a specific sequence of events that occur here. We need to verify this completely, but I believe the order of events is:

    1. If Sheli is asleep, perform her sleepy nuke.
    2. If Sheli is awake, take an action like normal.
    3. If Sheli is awake and meets the MP threshold criteria, she goes to sleep.
    4. If Sheli is asleep, she restores 8 MP.
    5. If Sheli is asleep, there's a chance for her to wake up.

    One important thing to note about this sequence is that early testing shows that if she puts herself to sleep, she's guaranteed to stay asleep that first turn, so you are guaranteed to get 8 MP back. If a fight lasts 2 turns and she puts herself to sleep on turn 1, she is guaranteed to restore 16 MP as long as she's not woken up before her second turn comes.

    In addition to the MP restore and damage boost, she will not take double damage from attacks made against her while she's asleep. This is quite significant and will go a long way to helping a squishy elf mage stay alive.

    One key thing to think about with this skill is that the MP restore and the sleepy nuke will happen regardless of the source of her nap. This effectively means if you're in a fight where `KATINO` or `Eye of Torpor` gets used against you, she does not have a dead turn, as she's immediately perform her sleepy nuke when her turn came around.

    Shelirionach's kit is extremely interesting and nuanced. While it won't help a ton during the course of a boss fight, the MP restore can be quite impactful while progressing through a new map. In addition, her race, element, and Discipline are all very favorable towards her role as a damage dealing mage. Also note that while she does have access to `LAZELOS`, Sheli is the first legendary mage that does not have a `Secret Art` spell, so you won't get a boosted `LAZELOS`. I certainly don't consider her a must-pull, but I do personally think she has the strongest kit of any damage-oriented mage released thus far. If you have any spare Iarumas' around, Shelirionach makes an excellent recipient of a `TZALIK` inherit.

??? note "TheAxolotl's Pull Plan"
    I really like Sheli, so I pulled for a couple copies with the goal being a base copy and an OCD Discipline copy. I managed to get an additional copy that I gave to my MC, and if I happen to get another copy with the free bones, I'll likely take her up to D2.

??? note "Lynd's Pull Plan"
    Despite her name, I still pulled because she's cool. Should I have pulled more? Maybe, maybe. Did I? Nope.
    
## Duplicate Usage

* Discipline to improve her Magic Power and Action Speed
* Inherit to herself to improve the activation rate of her "one-shot-prevention" skill
* Inherit her skill to other adventurers to give them a very low chance of triggering the "one-shot-prevention" skill