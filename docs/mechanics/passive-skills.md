# Passives Skill Levels

!!! warning "Work in Progress"
    - This is a brand new page. There will be errors and missing information. 
    - Ctrl + F5 to refresh. The page is updated regularly. 
    - If you want to help: 
        - Leave a comment at the bottom of this page.
        - Post in the dedicated [Discord](https://discord.gg/CQETxvUW) Forum called Theorycrafting.

## Overview

=== "Table Guide" 

    - The numeric value in the cell is what is gained per level. The number in '(#)' is the cumulative total up to that level. 
    - A blank space means that we have no information on that entry.
    - A `-` means that nothing is gained at that level. 
    - L refers to the level of the passive. Lv4 = Level 4. 
    - Inherits with <span style="color: DarkOrange">Name P</span> refer to Potential inherits. Full list [here](../adventurers/quicklist/adventurer-quicklist.md#__tabbed_1_4).
    - Inherits with <span style="color: cyan">Name A</span> refer to inherits from an alternative style.

=== "How accurate are the numbers?"

    - Drecom shares very little information on exact values or the inner workings of its formulas. Almost everything we know about the game is due to dedicated fans across multiple online communities.  
    - Confirmed 
        - Any passive that gives a flat stat gain per level. 
        - Level 1-3 on the vast majority of passives. 
    - Estimates 
        - Passives that have % values, proc chances, or scale off a Trait. We are actively working on scaling formulas to fit the collected data. 
        - Drecom tends to use consistent per level patterns across similar passive "families". 
        - Passives that see little to no change per level are defaulted to +1-2 per level and are generally not worth further investment. 
    - Testing
        - Most passives have at least 1-200 observations under controlled conditions. Several passives have 500-1,000 observations. 
        - Testing is not "kill 10 enemies and call it a day". The community has many dedicated fans that use their free time to collect this information to benefit everyone. 
        - Even with the best community-gathered data there are going to be errors due to damage variance and the nature of RNG. This page does not and cannot give exact values for everything, outside of the flat stats. 

## Class  

- Class passives that increase a stat follow the same exact progression with a total of 25 at Level 7.
- For HP, MP, and SP are the same as well with a total of 60 at Level 7.
- Class passives do not increase Traits, but derived stats.
- Additional tabs are for passives that effect multiple stats or require a more in-depth explanation.

### Fighter 

=== "Stats"

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:----------------|:---------|----|----|----|----|----|----|----|
    | Accuracy Up     | <span style="color: DarkOrange">Chloe P</span> | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Attack Up       | Gaston   | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Defense Up      | <span style="color: cyan">Chloe A</span> | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | HP Up           | Benjamin | 4  | 6 (10)  | 8 (18)  | 10 (28) | 12 (40)  | 14 (54) | 6 (60) |
    
    </div>

=== "Armsmanship" 

    === "1H Weapon" 

        <div class="nofilter-table nosort-table" markdown>
    
        |                   | Lv1 | Lv2    | Lv3    | Lv4     | Lv5     | Lv6     | Lv7     |
        |:------------------|-----|--------|--------|---------|---------|---------|---------|
        | Accuracy          |  7  | 1 (8)  | 1 (9)  | 1 (10)  | 1 (11)  | 1 (12)  | 1 (13)  |
        | Action Speed &emsp; &emsp; &emsp; &emsp; &emsp;       |  7  | 1 (8)  | 1 (9)  | 1 (10)  | 1 (11)  | 1 (12)  | 1 (13)  |

        </div>

        - Applies to only Dagger, Sword, Axe, Staff, Blunt, Throwing, Ninjato, and Katana.
    
    === "2H Weapon" 

        <div class="nofilter-table nosort-table" markdown>
    
        |                   | Lv1 | Lv2    | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
        |:------------------|-----|--------|---------|---------|---------|---------|---------|
        | Accuracy          |  9  | 1 (10) | 1 (11)  | 1 (12)  | 1 (13)  | 1 (14)  | 1 (15)  |
        | Attack Power &emsp; &emsp; &emsp; &emsp; &emsp;      |  9  | 1 (10) | 1 (11)  | 1 (12)  | 1 (13)  | 1 (14)  | 1 (15)  |

        </div>

        - Applies to only Sword, Spear, Axe, Staff, Blunt, Bow, and Odachi.

=== "Counterattack" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
    |:------------------|-----|---------|---------|---------|---------|---------|---------|
    | Proc Chance       | 15  | 2 (17)  | 3 (20)  | 2 (22)  | 3 (25)  | 2 (27)  | 6 (33)  |

    </div>

    - Only procs after successfuly evading an enemy attack. Must be equipped with a close or mid-ranged weapon. 
    - Table values are the base proc chance and does not include the scaling bonus for Luck. 
    - Best estimate is that the Luck contribution is Luck/10. 


=== "Follow-Up Attack" 

=== "Way of the Warrior"

    <div class="nofilter-table nosort-table" markdown>
    
    | Damage Modifier &emsp; &emsp; &emsp; &emsp;         | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:-------------------------|-----|-----|-----|-----|-----|-----|-----|
    | Per Level                | 8%  | 1%  | 2%  | 1%  | 3%  | 2%  | 3%  |
    | Total                    | 8%  | 9%  | 11% | 12% | 15% | 17% | 20% |
    
     </div>    
    
    - Damage modifier for basic attacks and skills. 
    - Only applies when using a short- or medium-range weapon. Does not apply to Bows or Kunais. 
    - Inherit from:
         - <span style="color: DarkOrange">Gandolfo P</span>
         - <span style="color: DarkOrange">Ophelia P</span>

=== "Will to Fight" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7     |
    |:------------------|-----|--------|--------|--------|--------|--------|---------|
    | Accuracy &emsp; &emsp; &emsp; &emsp; &emsp;          | 15  | 2 (17) | 3 (20) | 2 (22) | 3 (25) | 3 (28) | 7 (35)  |
    | Evasion           | 15  | 2 (17) | 3 (20) | 2 (22) | 3 (25) | 3 (28) | 7 (35)  |
    | Surety            | 15  | 2 (17) | 3 (20) | 2 (22) | 3 (25) | 3 (28) | 7 (35)  |

    </div>
    
    - Activates at or below 50% HP. The HP threshold does not change with higher skill levels. 
    - Inherited from Olive.

### Knight

=== "Stats"

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:------------------|:---------|----|----|----|----|----|----|----|
    | Defense Up        |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | HP Up             |          | 4  | 6 (10)  | 8 (18)  | 10 (28) | 12 (40)  | 14 (54) | 6 (60) |
    | Magic Defense Up  | <span style="color: DarkOrange">Barbara P</span> &emsp; &emsp; | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Resistance Up     |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    
     </div>

=== "Assault Guard" 

    <div class="nofilter-table nosort-table" markdown>

    |                    | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:-------------------|-----|--------|--------|--------|--------|--------|--------|
    | Defense            |  30 | 5 (35) | 7 (42) | 5 (47) | 6 (53) | 4 (57) | 5 (62) |
    | Duration (turns) &emsp; &emsp; &emsp; &emsp; &emsp;    |   2 |      2 |      2 |      2 |      2 |      2 |      3 |

    </div> 

    - Triggers on an ambush and lasts for 2 turns with an additional turn gained at Level 7. 
    - Inherited from Barbara. 

=== "Behind Cover" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:------------------|-----|--------|--------|--------|--------|--------|--------|
    | Proc Chance       | 20% | 3% (23%)| 2% (25%)| 3% (28%)| 2% (30%)| 2% (32%)| 3% (35%)|
    | Defense (self) &emsp; &emsp; &emsp; &emsp; &emsp;    |  -  |   -    |  10    | - (10)   | 10 (20) | - (20) | 10 (30) |

    </div>

    - As noted in the description the proc chance is not based off a Trait like Luck, it is static. 
    - Defense is not added until Level 3, which is not how it is described in the passive description. You gain an additional 10 DEF at Level 5 and Level 7.  
    - If building a long-term Knight, the main thresholds are at Level 3 (25% proc rate) and Level 5 (30% proc rate). Taking the skill to Level 6-7 becomes extremely expensive for only an extra 5% gain. 

=== "Way of the Knight" 

    === "Skill Levels"

    === "Details" 

### Thief

=== "Stats" 

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:----------------------|:---------|----|----|----|----|----|----|----|
    | Action Speed Up       | <span style="color: DarkOrange">Bakesh P</span> &emsp; &emsp; &emsp;  | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Detect Up             |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Evade Trap Up         |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Evasion Up            | <span style="color: DarkOrange">Jean P</span>    | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Surety Up             | <span style="color: DarkOrange">Viviana P</span> | 2  | 2 (4)  | 4 (8)  | 4 (12) | 4 (16)  | 4 (20)  | 5 (25) |  
    
     </div>

    - For the Treasure Trap Detection Skill (Bakesh) and Treasure Trap Disarm Skill (Jean) see the dedicated section [here](#chest-opening). 

=== "Calm Mind Technique" 

    - Straight forward passive with only one level. 
    - Reduces Fortitude loss from failing a chest by 2 (normally -4 or -5). 

=== "Cunning Pursuit" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3   | Lv4    | Lv5    | Lv6   | Lv7    |
    |:------------------|-----|--------|-------|--------|--------|-------|--------|
    | Surety &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;            | 10  | 2 (12) | 3 (15)| 2 (17) | 3 (20) | 2 (23) | 2 (25) |

    </div>

    - Only procs if an enemy is debuffed or has a status ailment. 
    - There is a risk that the translation is incorrect and it is only active when an enemy is debuffed. We have noticed inconsistencies with status ailments.

=== "Nose for Treasure" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2      | Lv3      | Lv4      | Lv5      | Lv6      | Lv7      |
    |:------------------|-----|----------|----------|----------|----------|----------|----------|
    | Proc Chance          | 30% | 5% (35%) | 5% (40%) | 5% (45%) | 5% (50%) | 5% (55%) | 2% (57%) |
    | # of Items &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; | 1   | 1        | 1        | 1        | 1        | 1        | 2        |

    </div>

    - Only triggers if a treasure (sellable item) drops. 
    - Stacks with the "Treasures of the Abyss" event blessing. 
    - Per level gain is exactly 5% until Level 7, which is 2%. At Level 7 the number of items increases to 2. 

=== "Stealth" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:------------------|-----|--------|--------|--------|--------|--------|--------|
    | Initiative Rate &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;   |  2  | 1 (3)  | 2 (5)  | 1 (6)  | 2 (8)  | 1 (9)  | 2 (11) |
    
    </div>

=== "Way of the Thief" 

    <div class="nofilter-table nosort-table" markdown>

    |                          | Lv0    | Lv1  | Lv2  | Lv3  | Lv4  | Lv5  | Lv6  | Lv7  | 
    |:-------------------------|-------|------|------|------|------|------|------|------|
    | Per Level                | -     | 20%  | 4%   | 6%   | 4%   | 4%   | 4%   | 3%   |
    | Total                    | -     | 20%  | 24%  | 30%  | 34%  | 38%  | 42%  | 45%  |
    | Total with base SUR &emsp; &emsp; &emsp;   | 175%  | 195% | 199% | 205% | 209% | 213% | 217% | 220% |

    </div>

    - SUR Damage = `Damage x SUR Modifier` 
    - SUR damage modifier is 1.75x at Lv0. 
    - No way to inherit to non-Thieves. Codexes are the only way to increase its level.

### Priest

=== "Stats" 

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:-----------------|:---------|----|----|----|-----|-----|-----|-----|
    | Divine Power Up  |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Magic Defense Up |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    
     </div>

=== "Priest Weapon Mastery"

    <div class="nofilter-table nosort-table" markdown>

    |                              | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
    |:-----------------------------|-----|-----|-----|-----|-----|-----|-----|
    | % PIE Added &emsp; &emsp; &emsp;&emsp; &emsp; &emsp;&emsp;  | 20% | 24% | 30% | 34% | 40% | 44% | 50% |

    </div>
    
    - The table shows the % of PIE added to ATK Power.

=== "Sacred Blessing" 

    <div class="nofilter-table nosort-table" markdown>

    |                              | Lv1 | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
    |:-----------------------------|-----|---------|---------|---------|---------|---------|---------|
    | Damage Reduction % &emsp; &emsp; &emsp;&emsp; &emsp;           | 10% | 3% (13%)| 3% (16%)| 3% (19%)| 3% (22%)| 3% (25%)| 5% (30%)|

    </div>

    - Only applies to Undead enemies. Reduces damage from all sources.
    - Must be in the Priest class for it to be active.
    
=== "Sacred Resistance" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:------------------|-----|--------|--------|--------|--------|--------|--------|
    | Divine Power &emsp; &emsp; &emsp; &emsp; &emsp;      | 30  | 5 (35) | 7 (42) | 5 (47) | 6 (53) | 4 (57) | 5 (62) |
    | Resistance        | 45  | 5 (50) | 7 (57) | 5 (62) | 6 (68) | 4 (72) | 5 (77) |

    </div>

    - Only triggers when ambushed.
    - Turn duration is 2 rounds. Higher levels do not increase the turn duration.

=== "Way of the Priest" 

    === "Skill Levels" 

        <div class="nofilter-table nosort-table" markdown>
        
        | MP Reduction % &emsp; &emsp; &emsp;            | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
        |:--------------------------|-----|- ---|-----|-- --|-----|-----|-----|
        | Per Level                 | 10% | 4%  | 4%  | 4%  | 4%  | 4%  | 5%  |    
        | Total                     | 10% | 14% | 18% | 22% | 26% | 30% | 35% |    

        </div>

        - 10% reduction at Level 1. 
        - All subsequent levels are an additional 4% and 5% at Level 1. 
        - To calculate the exact value of a spell at different levels of the passive see the next tab. 

    === "Formula"

        - Formula 
            - MP Cost (Base MP, WL) = `⌊Base MP x (0.094 - (0.04*WL))⌋`
        - Terms
            - Base MP = The cost of the spell at any level. 
            - WL = The level of Way of the Priest on a unit.    
        - Floor Function (⌊ ⌋)  
            - The formula uses a floor function. The calculated value is rounded -down- to the nearest whole number independent of its decimal value. 
            - For example, if the calculated MP Cost = 3.84, then the MP cost would be rounded down to 3.  
            - MP cost can never go below 1. 
        - Data 
            - Base MP data from 63 spells from Lv1-7 against Lv1-7 Way of the Priest. Total of 441 data points. 
            - The formula fit 437/441 observations. There is likely a small correction or a conditional override on a handful of spells. 
            - The Way of the Mage uses the exact same formula. 
            
### Mage

=== "Stats" 

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:------------------|:---------|----|----|----|----|----|----|----|
    | Detection Up      |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Magic Detection   |          | 6  | 2 (8)  | 4 (12) | 2 (14)  | 4 (18)  | 2 (20)  | 5 (25) |
    | Magic Power Up    |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | MP Up             |          | 4  | 6 (10) | 8 (18) | 10 (28) | 12 (40) | 14 (54) | 6 (60) |
    
     </div>

     - Note that Magic Detection is <Mage Specific> and does not apply if the unit has been class changed. 

=== "Thaumaturgy"

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
    |:------------------|-----|---------|---------|---------|---------|---------|---------|
    | Damage Reduction % &emsp; &emsp; &emsp;&emsp; &emsp;  | 10% | 2% (12%)| 4% (16%)| 2% (18%)| 5% (23%)| 2% (25%)| 5% (30%)|

    </div>

    - Damage reduction %s are the same across all Types (elements). 
    - Largest gains are at Level 5 and Level 7. 
    - Only applies to Type skill and spells, not normal attacks. The only exceptions are the Black Dragon, Fire Dragon, and Black Dragon of the Depths whose normal attacks also do Type damage.   

=== " Way of the Mage" 

    === "Skill Levels" 
    
        <div class="nofilter-table nosort-table" markdown>
        
        | MP Reduction % &emsp; &emsp; &emsp;            | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
        |:--------------------------|-----|- ---|-----|-- --|-----|-----|-----|
        | Per Level                 | 10% | 4%  | 4%  | 4%  | 4%  | 4%  | 5%  |    
        | Total                     | 10% | 14% | 18% | 22% | 26% | 30% | 35% |    
    
        </div>
    
        - 10% reduction at Level 1. 
        - All subsequent levels are an additional 4% and 5% at Level 1. 
        - To calculate the exact value of a spell at different levels of the passive see the next tab. 
    
    === "Formula"
    
        - Formula 
            - MP Cost (Base MP, WL) = `⌊Base MP x (0.094 - (0.04*WL))⌋`
        - Terms
            - Base MP = The cost of the spell at any level. 
            - WL = The level of Way of the Mage on a unit.    
        - Floor Function (⌊ ⌋)  
            - The formula uses a floor function. The calculated value is rounded -down- to the nearest whole number independent of its decimal value. 
            - For example, if the calculated MP Cost = 3.84, then the MP cost would be rounded down to 3.  
            - MP cost can never go below 1. 
        - Data 
            - Base MP data from 63 spells from Lv1-7 against Lv1-7 Way of the Priest. Total of 441 data points. 
            - The formula fit 437/441 observations. There is likely a small correction or a conditional override on a handful of spells. 
            - The Way of the Priest uses the exact same formula. 

### Ninja

=== "Stats"

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:----------------|:---------|----|----|----|----|----|----|----|
    | Evasion Up      |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | SP Up           |          | 4  | 6 (10) | 8 (18) | 10 (28) | 12 (40) | 14 (54) | 6 (60) |
    | Surety Up       |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25) |
    | Vitality Jutsu  |          | 10%  | 11%  | 13%    | 14%     | 16%     | 17%     | 20%    |
    
     </div>

=== "Art of Assasination" 

    <div class="nofilter-table nosort-table" markdown>

    | Critical Chance % &emsp; &emsp; &emsp; | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:----------------|----|----|----|----|----|-----|-----|
    | Weapon          | 2% | 3% | 4% | 5% | 6% | 7%  | 8%  |
    | Bare-Handed     | 2% | 3% | 4% | 5% | 9% | 10% | 12% |

    </div>

    - Only activates on normal attacks. It is rolled per hit, so multi-hit gacha weapons like the Citrus-Blossom Hairpin (Yuzu) and Raven Daggers (Aldric) increase your chances.    
    - Scales off Dexterity, not Luck. 
    - Fixed cap of 50%. 
    - "Bare-handed" means not having a weapon equipped in either hand. 
    - In addition to the flat % rates listed there is an additional modifier that is added, which scales off DEX. The actual % Critical Chance would be Fixed % + Modifer %. The modifier is likely % = DEX/# (Fixed Constant).   

=== "Empty Husk" 

=== "Ninja Dual Wield" 

### Samurai 

=== "Back-Against-the-Water-Formation" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7     |
    |:------------------|-----|--------|--------|--------|--------|--------|---------|
    | Attack Power      |  4  | 1 (5)  | 1 (6)  | 1 (7)  | 1 (8)  | 1 (9)  | 1 (10)  |
    | Magic Power       |  4  | 1 (5)  | 1 (6)  | 1 (7)  | 1 (8)  | 1 (9)  | 1 (10)  |
    | Total             |  8  | 2 (10) | 2 (12) | 2 (14) | 2 (16) | 2 (18) | 2 (20)  |
    | Effective ATK &emsp; &emsp; &emsp; &emsp; &emsp;     |  5  | 7      | 8      | 9      | 10     | 12     | 13      |

    </div>

    - Must be under 50% HP to activate. HP% is evaluated at the start of each turn and can trigger multiple times in a fight. 
    - The passive gives flat stat gains. It does not produce the damage values that would be consistent with a % modifier at higher skill levels. The listed values assume a +1 gain for both Attack and Magic Power. 
    - The Effective Attack row is `Total (Attack Power + Magic Power) x 0.65` for Level 1 of Divine Path. 

=== "Concentration" 

    <div class="nofilter-table nosort-table" markdown>

    |                          | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:-------------------------|-----|--------|--------|--------|--------|--------|--------|
    | ATK gained per turn &emsp; &emsp; &emsp; &emsp; &emsp;     |  15 | 1 (16) | 1 (17) | 1 (18) | 1 (19) | 1 (20) | 1 (21) |
    | MAG gained per turn      |  15 | 1 (16) | 1 (17) | 1 (18) | 1 (19) | 1 (20) | 1 (21) |
    | Estimated cap            |  30 |     30 |     30 |     30 |     30 |     30 |     30 |

    - Attack and Magic power increase each turn. The effect is negated if you change weapons. 
    - Based on testing there seems to be a fixed cap of 30 per stat across all levels. At Level 1 it takes 2 turns to reach. 
    - The Level 1 stat values are confirmed. Level 2-7 are estimates at +1 per level as Level 7 does not reach the stat cap on its own after one turn. 

    </div>
    
=== "Divine Path" 

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
    |:------------------|-----|-----|-----|-----|-----|-----|-----|
    | Modifier &emsp; &emsp; &emsp; &emsp; &emsp;         | 65% | 66% | 67% | 68% | 69% | 70% | 71% |

    </div>

    - Samurai damage scales off both ATK Power and MAG Power. 
    - Effective Damage = `(ATK Power x Modifier) + (MAG Power x Modifier)` 
    - At Level 1, Effective Damage = `(ATK Power x 0.65) + (MAG Power x 0.65)`
    - Higher levels increase the modifier % being used. Each level is a 1% increase. 
    
=== "Thousandfold Grip"

    <div class="nofilter-table nosort-table" markdown>
    
    |                   | Lv1 | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
    |:------------------|-----|---------|---------|---------|---------|---------|---------|
    | Surety % &emsp; &emsp; &emsp; &emsp; &emsp; |  10% | 1% (11%) | 1% (12%) | 1% (13%) | 1% (14%) | 1% (15%) | 1% (17%) |
    
    </div>

    - Unique passive that operates as a Surety % modifier. It does not give flat Surety. 
    - Formula: `Base SUR + (1 + Surety %)`
    - Tested through Level 5. Each level gives exactly 1%. It is possible Level 7 gives a larger bonus. 
    - Note that this passive has several restrictions before it will activate.

=== "Mysta Energy Manipulation"

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    |
    |:------------------|-----|--------|--------|--------|--------|--------|--------|
    | Magic Power &emsp; &emsp; &emsp; &emsp; &emsp;       |  30 | 3 (33) | 5 (38) | 3 (41) | 5 (46) | 3 (49) | 5 (54) |

    </div>

### Ranger

=== "Stats" 

    <div class="nofilter-table nosort-table" markdown>
    
    | Passive Name &emsp; &emsp; &emsp;     | Inherit  &emsp; &emsp; &emsp; &emsp;  | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 | 
    |:----------------|:---------|----|----|----|----|----|----|----|
    | Accuracy Up     |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Detection Up    |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Evade Trap Up   |          | 2  | 2 (4)  | 4 (8)  | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    
     </div>

=== "Second Arrow" 

=== "Sniper" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                   | Lv1   | Lv2   | Lv3   | Lv4   | Lv5   | Lv6   | Lv7   |
    |:------------------|-------|-------|-------|-------|-------|-------|-------|
    | Attack Power &emsp; &emsp; &emsp; &emsp; &emsp;      | 0.50x | 0.50x | 0.50x | 0.50x | 0.50x | 0.50x | 0.50x |
    | Accuracy          | 1.50x | 1.52x | 1.54x | 1.56x | 1.58x | 1.60x | 1.62x |
    
    </div> 

    - Ranger uses a completely different damage formula that other classes. 
    - Formula: Effective Attack = `(Attack Power x 0.50) + (Accuracy x 1.50)`
    - The Attack power modifier is held constant at 0.50 for all levels. Only the Accuracy modifier increases. 
    - Based on testing it is roughly 2% per level. Level 7 might see a 2-5% jump. 

## Inherited Skills 

### Legendary

### Adam - Wisdom of Truth

- Wisdom of Truth provides two benefits:
    - Nullifies the damage penalty of attacking an enemy with an element it is resistant to.
    - Fixed damage reduction (DR) % that procs off the Luck stat.
- The DR % is fixed at all levels. It is 50% for Adam and 30% as an inherit. This DR applies to any source of damage.
- Stacks with Way of the Knight, Sanctuary's Blessing, and the Knight Cloak accessory.
- We do not currently know the exact proc rate formula. But, what we -do- know is that it roughly doubles at Level 4. This is one of the single most powerful things you can do to improve a unit's survivability. 

=== "Self"

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
    |:------------------|-----|-----|-----|-----|-----|-----|-----|
    | Damage Reduction &emsp; &emsp; &emsp;  | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
    | MP Up             | -   | -   | -   | -   | -   | -   | 20  |

    </div>
    
=== "Inherited"

    <div class="nofilter-table nosort-table" markdown>

    |                   | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | 
    |:------------------|-----|-----|-----|-----|-----|-----|
    | Damage Reduction &emsp; &emsp; &emsp; | 30% | 30% | 30% | 30% | 30% | 30% | 

    </div>

=== "Proc Chance Formula" 

    - The community-derived formulas for Level 1 are: 
        - Adam: `10 + 0.30 x Luck`
        - Inherited: `5 + 0.30 x Luck`
    - Deriving a more accurate formula that scales with higher levels is being worked on. 
    - We suspect that higher levels increase the flat (base) portion of the formula with 1-2% increases to the 30% Luck modifier. Many passives follow this split structure. 

### Aldric - Wisdom of the Crafty Dwarf 

=== "Self"

    <div class="nofilter-table nosort-table" markdown>
 
    |                   | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
    |:------------------|-----|---------|---------|---------|---------|---------|---------|
    | Detect            | 2   | 2 (4)   | 4 (8)   | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Disarm Trap       | 4   | 2 (6)   | 4 (10)  | 2 (12)  | 2 (14)  | 6 (20)  | 4 (24)  |
    | Evade Trap        | 2   | 2 (4)   | 4 (8)   | 4 (12)  | 4 (16)  | 4 (20)  | 5 (25)  |
    | Traphobia Resist &emsp; &emsp; &emsp;  | 15  | 5 (20)  | 5 (25)  | 5 (30)  | 5 (35)  | 5 (40)  | 5 (45)  |

    </div>  
 
=== "Inherited"

    <div class="nofilter-table nosort-table" markdown>

    |                    | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | 
    |:------------------|-----|---------|---------|---------|---------|---------|
    | Detect            | 1   | 1 (2)   | 2 (4)   | 2 (6)   | 2 (8)   | 2 (10)  | 
    | Disarm Trap       | 2   | 2 (4)   | 2 (6)   | 2 (8)   | 2 (10)  | 2 (12)  | 
    | Evade Trap        | 1   | 1 (2)   | 2 (4)   | 2 (6)   | 2 (8)   | 2 (10)  | 
    | Traphobia Resist &emsp; &emsp; &emsp;   | 10  | 3 (13)  | 2 (15)  | 3 (18)  | 2 (20)  | 5 (25)  | 

    </div>  

### Alice - Blessings of Agora

=== "Self" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                     | Lv1  | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     | Lv7     |
    |---------------------|------|---------|---------|---------|---------|---------|---------|
    | Turn Count          | 1    | -       | 1       | -       | 1       | -       | 1       |
    | Total turns &emsp;  &emsp;  &emsp;        |      | 1       | 2       | 3       | 3       | 4       |         |
    | MP Up               | 10   | 4 (14)  | 4 (18)  | 4 (22)  | 4 (26)  | 4 (30)  | 4 (34)  |
    
    </div>

=== "Inherited"

    <div class="nofilter-table nosort-table" markdown>
    
    |                     | Lv1  | Lv2     | Lv3     | Lv4     | Lv5     | Lv6     |
    |---------------------|------|---------|---------|---------|---------|---------|
    | Turn Count          | 1    | -       | -       | -       | 1       | -       |
    | Total turns &emsp;  &emsp;  &emsp;         |      | 1       | 1       | 1       | 2       | 2       |
    | MP Up               | -    | 4       | 4 (8)   | 4 (12)  | 4 (16)  | 4 (20)  |
    
    </div>

### Debra - Blessings of the Beastfolk Goddess 

=== "Self"

    <div class="nofilter-table nosort-table" markdown>
 
    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5     | Lv6     | Lv7     |
    |:------------------|-----|--------|--------|--------|---------|---------|---------|
    | SP Recovery       | 4   | 1 (5)  | 2 (7)  | 1 (8)  | 2 (10)  | 1 (11)  | 2 (13)  |
    | Attack Power &emsp; &emsp; &emsp;      | -   | -      | 6      | 2 (8)  | 4 (12)  | 2 (14)  | 4 (18)  |

    </div>
 
=== "Inherited"

    <div class="nofilter-table nosort-table" markdown>
 
    |                   | Lv1 | Lv2    | Lv3    | Lv4    | Lv5     | Lv6     | 
    |:------------------|-----|--------|--------|--------|---------|---------|
    | SP Recovery       | 2   | 1 (3)  | 1 (4)  | 1 (5)  | 1 (6)   | 1 (7)   | 
    | Attack Power &emsp; &emsp; &emsp;      | -   | -      | 5      | 2 (7)  | 3 (10)  | 2 (12)  | 

    </div>

### Lanaville - Queen of Love and War 

=== "Self" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                                | Lv1  | Lv2      | Lv3      | Lv4      | Lv5      | Lv6      | Lv7      | 
    |:-------------------------------|-----|---------|---------|---------|---------|---------|---------|
    | HP Recovery &emsp;  &emsp; &emsp; &emsp;  | 12  | 10 (22) | 12 (34) | 10 (44) | 14 (58) | 10 (68) | 17 (85) |

    </div> 

=== "Inherited" 

    <div class="nofilter-table nosort-table" markdown>

    |                                | Lv1 | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    |
    |:-------------------------------|-----|--------|--------|--------|--------|--------|
    | HP Recovery                    | 6   | 5 (11) | 6 (17) | 6 (23) | 7 (30) | 8 (38) | 
    
    </div> 

### Yekaterina - Eye of Kalshum

=== "Self" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                       | Lv1 | Lv2  | Lv3   | Lv4    | Lv5    | Lv6    | Lv7    |
    |:----------------------|-----|------|-------|--------|--------|--------|--------|
    | Detect Up             | 2   | 2 (4)| 4 (8) | 4 (12) | 4 (16) | 4 (20) | 4 (25) |
    | Ambush Nullification &emsp; &emsp; &emsp; | 33% | 36%  | 41%   | 45%    | 50%    | 54%    | 60%    |
    
    </div>
    
=== "Inherited" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                       | Lv1 | Lv2   | Lv3   | Lv4    | Lv5   | Lv6    | 
    |:----------------------|-----|-------|-------|--------|-------|--------|
    | Detect Up             | 1   | 1 (2) | 2 (4) | 2 (6)  | 2 (8) | 2 (10) | 
    | Ambush Nullification &emsp; &emsp; &emsp;  | 16% | 19%   | 23%   | 26%    | 31%   | 35%    | 
    
    </div>

### Anonymous 

=== "Per Level" 

    <div class="nofilter-table nosort-table narrow-table" markdown>
    
    | Name &emsp; &emsp; &emsp; &emsp;           | Stat     | Lv1| Lv2| Lv3| Lv4 | Lv5 | Lv6 | Lv7 | L8 | L9 | Lv10| Lv11| Lv12| Lv13| Lv14|
    | :------------ | :------- | --| --| --| ---| ---| ---| ---| ---| ---| ---| ---| ---| ---| -- |
    | Beast-Thi     | Accuracy            | 2 | 1 | 1 | 1  | 2  | 1  | 1  | 1  | 1  | 3  | 1  | 1  | 2  | 2  | 
    | Dwarf-Kni     | HP                  | 4 | 2 | 2 | 2  | 4  | 2  | 2  | 2  | 2  | 6  | 2  | 2  | 4  | 4  |
    | Elf-Mag       | Magic Power         | 2 | 1 | 1 | 1  | 2  | 1  | 1  | 1  | 1  | 3  | 1  | 1  | 2  | 2  |
    | Elf-Pri       | Divine Power        | 2 | 1 | 1 | 1  | 2  | 1  | 1  | 1  | 1  | 3  | 1  | 1  | 2  | 2  |
    | Human-Fig     | Attack Power        | 2 | 1 | 1 | 1  | 2  | 1  | 1  | 1  | 1  | 3  | 1  | 1  | 2  | 2  |
    | Human-Nin     | Action Speed        | 1 | 1 | 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  |
    | Human-Pri     | MP                  | 2 | 1 | 1 | 1  | 2  | 1  | 1  | 1  | 1  | 3  | 1  | 1  | 2  | 2  |
    | Human-Sam     | Attack + Magic Power &emsp; &emsp; &emsp; | 1 | 1 | 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  |
        
    </div>

=== "Totals" 

    <div class="nofilter-table nosort-table narrow-table" markdown>
    
    | Name &emsp; &emsp; &emsp; &emsp;         | Stat     | Lv1| Lv2| Lv3| Lv4 | Lv5 | Lv6 | Lv7 | L8 | L9 | Lv10| Lv11| Lv12| Lv13| Lv14|
    | :------------ | :------- | --| --| --| ---| ---| ---| ---| ---| ---| ---| ---| ---| ---| -- |
    | Beast-Thi     | Accuracy           | 2 | 3 | 4 | 5  | 7  | 9  | 9  | 10 | 11 | 14 | 15 | 16 | 18 | 20 |
    | Dwarf-Kni     | HP                 | 4 | 6 | 8 | 10 | 14 | 16 | 18 | 20 | 22 | 28 | 30 | 32 | 36 | 40 |
    | Elf-Mag       | Magic Power        | 2 | 3 | 4 | 5  | 7  | 8  | 9  | 10 | 11 | 14 | 15 | 16 | 18 | 20 |
    | Elf-Pri       | Divine Power       | 2 | 3 | 4 | 5  | 7  | 8  | 9  | 10 | 11 | 14 | 15 | 16 | 18 | 20 |
    | Human-Fig     | Attack Power      | 2 | 3 | 4 | 5  | 7  | 8  | 9  | 10 | 11 | 14 | 15 | 16 | 18 | 20 |
    | Human-Nin     | Action Speed       | 1 | 2 | 3 | 4  | 5  | 6  | 7  | 8  | 9  | 10 | 11 | 12 | 13 | 14 |
    | Human-Pri     | MP                 | 2 | 3 | 4 | 5  | 7  | 8  | 9  | 10 | 11 | 14 | 15 | 16 | 18 | 20 |
    | Human-Sam     | Attack + Magic Power &emsp; &emsp; &emsp; | 1 | 2 | 3 | 4  | 5  | 6  | 7  | 8  | 9  | 10 | 11 | 12 | 13 | 14 |
    
    </div>

## Unique Skills 

### Synergy 

- Unique Skills cannot be inherited. They can be attack skills, spells, or passives. This page only covers passives. Permanently at Level 1.
- Synergy skills provide a positive benefit to surrounding units. Most have alignment, race, or Type (element) restrictions. 
- This section is organized into broad categories based on the type of Synergy effect. 
- Adjacent means that allies must be to the left, right, in front of, or behind the named unit. The maximum number of units that can be covered is 4, arranged in a "T" shape with the named unit in the center (front or back). 

#### Damage % Increase

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name     | Rarity    | Passive Name           | Condition          | Formation | DMG % | Notes                                              | 
|----------|-----------|------------------------|--------------------|-----------|-------|----------------------------------------------------|
| <span style="color: cyan">Adam A</span>       | General   | Light Shaft's Radiance | Light              | Column    | 10%   | Additional 15% damage against Dark enemies.        |
| Alice    | Legendary | Agent  of Heresy       | Evil, Neutral      | Row       | 10%   |                                                    |
| Anemone  | Legendary | Helping Uphold Justice | Good, Neutral      | Row       | 13%   | Does not apply to Anemone. Only skills and spells. |
| Elise    | General   | Impartial Collaborator | Neutral            | Column    | 10%   |                                                    |
| Lanavaille     | Legendary | Valiant Righteousness  | Good, Neutral      | Row       | 10%   |                                                    |
| <span style="color: cyan">Lanavaille A</span>   | Legendary | Stirring Righteousness | Good, Neutral      | Row       | 10%   |                                                    |
| Milana   | General   | Mutual Interests       | Evil               | Column    | 10%   |                                                    |

</div>

#### Flat Stats

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name     | Rarity    | Passive Name                          | Condition     | Formation | Stat 1  | Amt | Stat 2       | Amt |
|----------|-----------|---------------------------------------|---------------|-----------|---------|-----|--------------|-----|
| Arboris  | Legendary | Lord of the Deep Forest's Leadership  | Evil, Neutral | Adjacent  | Evasion | +6  | Action Speed | +4  |
| Rinne    | Legendary | Enlightenment of the Brink of Death   | Evil          | Adjacent  | Surety  | +10 |              |     |

</div>

#### Damage Reduction 

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name          | Rarity    | Passive Name       | Condition      | Formation | DR % | DMG Type | Notes             |
|---------------|-----------|--------------------|----------------|-----------|------|----------|-------------------|
| <span style="color: cyan">Alice A</span>       | Legendary | Heretical Blessing | Neutral, Evil  | Row       | 5%   | All      |                   |
| <span style="color: cyan">Milana A</span>      | General   | Calculated Charity | Evil           | Row       | 10%  | Physical |                   | 
| <span style="color: cyan">Yekaterina A</span> A  | Legendary | Skull's Tutelage   | Self Only      | Back Row  | 30%  | Physical | Also gives 10% HP |

</div>

#### Status Ailment Tolerance

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name      | Rarity    | Passive Name                      | Condition | Formation | Status Ailments                          | Amount |
|-----------|-----------|-----------------------------------|-----------|-----------|------------------------------------------|--------|
| Asha      | General   | Compassionate Apothecary          | Good      | Adjacent  | Paralysis, Petrification, Poison         | +50    |
| Clarissa  | General   | Oath of Fortitude                 | Neutral   | Adjacent  | Charm, Confusion, Fear                   | +50    |
| Eldorado  | General   | Nameless Loyalty                  | Good      | Adjacent  | Sleep, Stun                              | +50    |
| Galina    | General   | Faith of the Wicked               | Evil      | Adjacent  | Critical, Insta-Kill                     | +50    |
| Olive     | General   | Honest Living                     | Good      | Adjacent  | Curse, Fear, Skill-Binding               | +50    |
| Red Beard | Legendary | Apostle of Breaking Commandments  | Dark      | Adjacent  | Insta-Kill, Skill-Binding, Spell-Binding | +70    |

- Note that units with status ailment tolerances as part of their Discipline Skill start at +25 at D1 

</div>

#### Type Formations 

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name   | Rarity  | Passive Name      | Condition       | Formation | DMG To     | DMG % |
|--------|---------|-------------------|-----------------|-----------|------------|-------|
| Alex   | General | Fire Formation    | Self + 2 Fire   | Row       | Air Type   | 15%   |
| Flut   | General | Water Formation   | Self + 2 Water  | Row       | Fire Type  | 15%   |
| Jarmil | General | Air Formation     | Self + 2 Air    | Row       | Earth Type | 15%   |
| Jean   | General | Earth Formation   | Self + 2 Earth  | Row       | Water Type | 15%   |

</div>

#### Type-Kin Blessing

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name    | Rarity  | Passive Name          | Condition | Formation | DR From    | DR % |
|---------|---------|-----------------------|-----------|-----------|------------|------|
| Amelia  | General | Air-Kin Blessing      | Beastfolk | Row       | Air Type   | 15%  |
| Bakesh  | General | Earth-Kin Blessing    | Dwarf     | Row       | Earth Type | 15%  |
| Daniel  | General | Water-Kin Blessing    | Human     | Row       | Water Type | 15%  |
| Elda    | General | Dark-Kin Blessing     | Elf       | Row       | Dark Type  | 15%  |
| Emil    | General | Light-Kin Blessing    | Elf       | Row       | Light Type | 15%  |
| Eulalia | General | Fire-Kin Blessing     | Elf       | Row       | Fire Type  | 15%  |

</div> 

### Slayer

- Slayer passives increase damage to and decrease damage from a specific enemy race.
- It is a 20% boost for both General and Legendary units. It can stack with Slayer passives from both weapons and equipment.
- The damage reduction (DR) % covers all damage types. 

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name        | Rarity    | Passive Name                        | Race          | DMG % | DR % |
|-------------|-----------|-------------------------------------|---------------|-------|------|
| Abenius     | Legendary | Flickering Fang                     | Magical Beast | 20%   | 20%  |
| Benjamin    | General   | Planned Hunting                     | Magical Beast | 20%   | 20%  |
| Chloe       | General   | Anti-Adventurer Combat Technique    | Adventurer    | 20%   | 20%  |
| <span style="color: cyan">Chloe A</span>     | General   | Interpersonal Combat Technique      | Humanoid      | 20%   | 20%  |
| Dino        | General   | Magical Being Knowledge             | Magical Being | 20%   | 20%  |
| Gaston      | General   | Gnawing Doubt                       | Demi-Human    | 20%   | 20%  |
| Yekaterina  | Legendary | Advice of the Skull                 | Undead        | 20%   | 20%  |
| Yrsa        | Legendary | Slayer of the White Calamity        | Magical Beast | 20%   | 20%  |

</div>

### Equipment Bonuses 

- Several units get flat stat bonuses from equipping specific gear. The gains are quite small, unfortunately.
- For units that have both weapon and equipment conditions, they effects are separate. You do not need to equip both pieces of gear. 

<div class="nofilter-table nosort-table narrow-table" markdown>

| Name     | Rarity    | Passive Name              | Condition              | Stat 1         | Amt  | Stat 2         | Amt | Notes                     |
|----------|-----------|---------------------------|------------------------|----------------|------|----------------|-----|---------------------------|
| Eckart   | General   | Eyes of a Hero            | 1H Sword               | Accuracy       | +10  |                |     |                           |
| <span style="color: cyan">Flut A</span>   | General   | Grace of the Great Tree   | 2H Staff               | Magic Power    | +7   | Magic Defense  | +7  |                           |
| Gerulf   | Legendary | Branded Hands             | Any 2H                 | Accuracy       | +10  | Chill Limit    | +3  |                           |
| Gerard   | Legendary | Lightning Celerity        | 1H Sword               | Evasion        | +10  |                |     |                           |
| <span style="color: cyan">Gerard A</span> | Legendary | Stormy Onslaught          | 1H Sword, Axe, Blunt   | ASPD           | +20  |                |     |                           |
| Kiriha   | General   | Shadowy Alignment         | Kunai, Dagger          | Evasion        | +8   |                |     | Per weapon. Total is +16. |
| Livana   | Legendary | The One Who Enforces      | 2H Axe                 | Surety         | +7   | Accuracy       | +7  |                           |
| Savia    | General   | Soaring Beast Knight      | 2H Spear, Light Armor  | Evasion        | +8   |                |     | Per piece. Total is +16.  |
| Valdor   | General   | Miracle of Faith          | Light Armor            | Magic Defense  | +10  |                |     |                           |
| Viviana  | General   | Sidestep                  | Cloth Armor            | Evasion        | +10  |                |     |                           |

</div> 

### MP/SP 

- Forthcoming. 

### Special

- This section covers Unique Skills that have complex mechanics, benefit multiple stats, and/or require additional information to fully understand. 
- Forthcoming. 

## Other

### Chest Opening

- The two primary passives related to chest opening are Treasure Trap Detection Skill (Bakesh inherit) and Treasure Trap Disarm Skill (Jean inherit). They are both learned by the Thief class. 
- The passives increase the two stats - Find and Disarm - that you see when opening a chest.
- It takes 32 copies of Jean and Bakesh to max out the passive. It is a significant investment. We suggest you think carefully about who you want to use as your long-term chest opener.
- The exact in-game terms are used. 

#### Treasure Trap Detection Skill

=== "Skill Levels"

    <div class="nofilter-table nosort-table" markdown>
    
    |                 | Lv1   | Lv2   | Lv3   | Lv4   | Lv5   | Lv6   | Lv7   | 
    |:----------------|-------|-------|-------|-------|-------|-------|-------|
    | Flat Bonus      | 30    | 34    | 38    | 42    | 46    | 50    | 55    |
    | Multiplier &emsp; &emsp; &emsp; &emsp;       | 1.10x | 1.10x | 1.12x | 1.12x | 1.14x | 1.14x | 1.16x |
    
     </div>

=== "Basics"

    - Find Trap: A derived stat (from Detect) used to identify whether a chest contains a trap. If a trap is present and detected, then it will trigger the trap disarm mini-game. If not, then the trap will go off, causing damage or inflicting status effects.  
    - Detect: Listed on a unit's Stat page. It is the primary input in the Find Trap formula. The Treasure Trap Detect passive modifies the Detect value, which results in the Find Trap number that you see when you open a chest.    
    - The Treasure Trap Detection Skill at Lv1 provides a significant boost and should be inherited immediately if the unit is not a Thief. 
    - Only the Thief class is able to reach Lv7. The maximum for other classes is Lv6. 

=== "Formulas"

    - Detect 
        - `Detect = (IQ x 0.70) + (Luck x 0.30)`
        - Each class has a different set of [modifiers](./traits-and-stats.md#class-multipliers) for all of the primary Traits, including IQ and Luck. 
        - The Detect value will change when a unit change's classes even if they are both at the same level. 
    - Find Trap 
        - `Find Trap = (Detect x Multiplier) + Flat Bonus`
        - If the unit does not have the Treasure Trap Detect passive (Lv0), then the multiplier is 1.0 and Detect = Find Trap. 

=== "Example: Lv0"

    - Assumptions
        - Detect: 50
        - Treasure Trap Detection Skill Level: 0 (no passive) 
    - Formula: `Find Trap = (Detect x Multiplier) + Flat Bonus`
    - `Find Trap = (50 x 1.0) + 0 = 50`
    - Result: Detect = Find Trap with no passive levels in the skill.

=== "Example: Lv5" 

    - Assumptions
        - Detect: 50 
        - Treasure Trap Detection Skill Level: 5
    - Formula: `Find Trap = (Detect x Multiplier) + Flat Bonus`
    - `Find Trap = (50 x 1.14) + 46 = 103`
    - Result: with Lv5 in the passives the MC's Find Trap is twice as large as his base Detect value.

#### Treasure Trap Disarm Skill

=== "Skill Levels" 

    <div class="nofilter-table nosort-table" markdown>
    
    |                 | Lv1    | Lv2    | Lv3    | Lv4    | Lv5    | Lv6    | Lv7    | 
    |:----------------|-------|-------|-------|-------|-------|-------|-------|
    | Flat Bonus      | 10    | 12    | 16    | 18    | 24    | 26    | 30    |
    | Multiplier &emsp; &emsp; &emsp; &emsp; | 1.10x | 1.10x | 1.12x | 1.12x | 1.14x | 1.14x | 1.16x |
    
     </div>

=== "Basics"

    - Disarm Trap: Located on the Stats page. Only comes into effect if a trap has been successfully identified. It governs the size of the yellow bars during the chest opening mini-game. 
    - Treasure Trap Disarm Skill at Lv1 provides a moderate boost and should be inherited to your chest opener if the unit is not a Thief. 
    - Only the Thief class is able to reach Lv7. The maximum for other classes is Lv6. 

=== "Formula"

    - `Disarm = (Disarm Trap x Multiplier) + Flat Bonus`
    - The multiplier and flat bonus is based on the level of the passive. 
    - If the unit does not have the Treasure Trap Disarm passive (Lv0), then the multiple is 1.0 and the flat bonus = 0. 

=== "Example: Lv0"

    - Assumptions
        - Treasure Trap Disarm Skill Level: 0 (no passive)
        - Disarm Trap: 50 (from Stats page)
    - Formula: `Disarm = (Disarm Trap x Multiplier) + Flat Bonus`
    - `Disarm = (50 x 1.0) + 0 = 50`

=== "Example: Lv5" 

    - Assumptions
        - Treasure Trap Disarm Skill Level: 5
        - Disarm Trap: 50 (from Stats page)
    - `Formula: Disarm = (Disarm Trap x Multiplier) + Flat Bonus`
    - `Disarm = (50 x 1.14) + 24 = 81`


