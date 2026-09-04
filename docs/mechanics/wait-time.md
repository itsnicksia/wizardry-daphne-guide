# Wait Time System 

## Guide Organization 

- Maybe turn into a Read Me box?
- y
- z

## Fundamentals

## Core Concept

- Daphne uses a variant of a "wait-time" timeline where faster units get more frequent turns. It is the turn-based cousin of a real-time ATB gauge. 
- The whole system runs on two numbers:
    - Action Speed (ASPD): From the unit's stat sheet. Higher is faster. This is what you build toward with your gear, passives, relics, bondmates, and so on.
    - Wait Time (WT): A hidden countdown timer that is derived from ASPD. This tells you "how long until this unit's next turn?" Lower is better. A low WT means the unit's turn comes back around faster.
- Add clock metaphor

## Base Wait Time

### Formula 

=== "Player Base WT" 

    A unit's Base Wait Time (WT) is a simple calculation: 
    
    Base WT = 500 - Action Speed 
    
    | ASPD | 500 - ASPD | Base WT |
    |------|------------|---------|
    | 0    | 500 - 0    | 500     |
    | 100  | 500 - 100  | 400     |
    | 200  | 500 - 200  | 300     |
    | 250  | 500 - 250  | 250     |
    
    - Think of `500` as the starting distance every unit has to cover before its turn. Action Speed is how much of that distance it skips.
    - A unit with 0 ASPD waits the full 500; a unit with 200 ASPD starts 200 closer at 300.
    - Lower Base WT means that your turn arrives sooner.
    - This clean 1:1 trade holds all the way up to **250 ASPD** at which point a soft cap sets in, which was added with the 9/3 update.
    - Values above 250 ASPD will be covered in the next section.

=== "Enemy Base WT"

    Enemies use the exact same formula from the previous, but with one small difference. 
    
    - Enemy Base WT is not a fixed 500 − ASPD. That value is multiplied by a small random roll, called fluctuation, decided once at the start of the battle.
    - Enemy Base WT = (500 − ASPD) × Fluctuation Rate 

    Fluctuation Rate 

    - The roll is small. Each enemy has its own range, and it always sits close to 1.0x. 
    - Roughly 97% of enemies have a roll that lands between 0.98x (min) to 1.02x (max). This is only a swing of a few points. 
    - About 16% of enemies do not fluctuate at all and always roll 1.0x. A few rare enemies have wider ranges, but they are the exception, not the rule.
    - The roll is fixed once per battle. It is _not_ re-rolled each turn.

    Example

    - Enemy with 150 ASPD. 
    - Enemy Base WT = 500 - 150 = 350. 
    - A 0.98x roll gives 350 x 0.98 = 343. A 1.02x roll gives 350 x 1.02 = 357. 
    - Its Base WT lands somewhere between 343 and 357. 

    !!! warning "Your own units never fluctuate. Their Base WT is exact." 

### ASPD Soft Cap 

- The new soft cap only goes into effect with when ASPD > 250. It is structured just like an income-tax bracket. You do not apply one rate to your whole ASPD stat. Instead, you fill each bracket in turn, and each pays out its own rate.
- The 3 tabs 

=== "Soft Cap Penalty Table" 

    | Bracket | ASPD Range | Penalty | ASPD per point  |
    |---------|:-----------|:--------|-----------------|
    | 1       | 0-250      | None    | 1.0             |
    | 2       | 250-300    | 0.50    | 0.50            | 
    | 3       | 300-400    | 0.75    | 0.25            |
    | 4       | 400+       | 0.90    | 0.10            |
    
    Explanation:
    
    - Bracket 1: The first 250 points of ASPD always count in full.
    - Bracket 2: The next 50 (250-300) receive a 50% penalty. 
    - Bracket 3: The next 100 (300-400) receives a 75% penalty.
    - Bracket 4: Anything over 400+ ASPD receives a 90% penalty.
    - Add up what each bracket contributes to the total to calculate a unit's Effective ASPD, which is the number the Wait Time formula actually uses. 

    How this impacts the Base WT formula:
    
    - Base WT = 500 - Effective ASPD (not the ASPD number from your stat sheet)
    - Rounding note: ASPD is rounded up to the nearest whole number. But, there is one small quirk. If you land exactly on 0.50 the game's formula will round that value down. 
    - Example: 262.50 ASPD rounds down to 262, not up to 263.  

=== "Soft Cap Example: 400 ASPD" 

    | Bracket | ASPD Range | Value | Rate  | Effective ASPD |
    |---------|------------|-------|-------|----------------|
    | 1       | 0-250      | 250   | x1.0  | 250            |
    | 2       | 250-300    | 50    | x0.5  | 25             |
    | 3       | 300-400    | 100   | x0.25 | 25             |
    | Total   | -          | 400   | -     | 300            |


    - 400 ASPD is now only worth 300 Effective ASPD, which is the adjusted value used by the Base WT formula. 
    - Base WT = (500 - 300) = 200.
    - Prior to the 9/3 update the same 400 ASPD would have a Base WT = 500 - 400 = 100. 
    - The new soft cap has now doubled the Base WT from 100 to 200! That is the entire purpose of the change.

=== "Pre- and Post-Update Comparison" 

    | ASPD | Effective ASPD | New WT | Old WT |
    |------|----------------|--------|--------|
    | 200  | 200            | 300    | 300    |
    | 250  | 250            | 250    | 250    |
    | 300  | 275            | 225    | 200    |
    | 350  | 287            | 213    | 150    |
    | 400  | 300            | 200    | 100    |
    | 500  | 310            | 190    | 0      |

    - The purpose of this table is to compare the old system against the new soft cap. 
    - At or below 250 ASPD the two columns are identical — nothing changed for those units. 
    - The further past 250 ASPD you push, the worse the exchange rate, as each additional points removes less Base WT than it did before. 
    - You can no longer drive Base WT toward 0 as you could under the old system.
 
## Turn Order 

### Mechanics 

With those building blocks in place, we can walk through how the game builds the turn order list. Remember that there is no "player" or "enemy" phase. Every single unit in the battle, your whole party and every enemy, shares one queue. 

Two numbers drive the entire system:

- Base WT: The value we just calculated. This is what a unit resets to after it acts. It does not change during the fight unless a buff or debuff is active. Those details are covered [later](xxx). We strongly recommend that you do not skip ahead. 
- Current WT: How much WT a unit has left before its next turn. It counts down as the battle advances. When it hits zero (0), that unit acts.

Here is what happens under the hood. First, before the battle starts, the game calculates every participant's Base WT. This includes the soft cap for anyone over 250 ASPD. Then it runs a simple loop until the battle ends:  

1. Find the lowest Current WT.
2. Subtract that number from every unit's Current WT. Everyone drops by the same amount, so the gaps between units stay the same and the queue keeps its order.
3. The unit whose Current WT = 0 now takes its action.
4. Reset that unit's Current WT back to its Base WT, and send it to the end of queue. 

That is the whole engine. A fast unit resets to a small Base WT, so it hits 0 again quickly and acts often. A slow unit resets to a larger Base WT and acts less often. Nothing counts "rounds" or how many turns you have taken. Turn order is just the result of this shared countdown loop.

### Turn Order Example

#### Set-up

It can be easier to understand the turn order system with real numbers. The example below simulates a fight. We have four combatants. Three are player units (A, B, and C) and one is an enemy (E). First, let's calculate their Base WT.

| Unit | Role         | ASPD | Eff. ASPD | Base WT |
|------|--------------|------|-----------|---------|
| A    | Glass Cannon | 400  | 300       | 200     |
| B    | Support      | 250  | 250       | 250     |
| C    | DPS          | 120  | 120       | 380     |
| E    | Enemy        | 150  | 150       | 350     |

- Unit A shows the soft cap in action. Its 400 ASPD drops to 300 Effective ASPD, giving a Base WT of 200. Before the patch it would have been 100.
- Unit B sits right on the 250 ASPD line, so it takes no penalty.
- Units C and E are both well below 250 ASPD. These values are more typical of real late-game units and bosses.

#### Turn Order Table

Now the queue runs. Here is how to read the table:

- Each row is one step. The Min WT column is the amount subtracted from everyone's Current WT that step.
- A cell reading 0 > 200 means that unit hit zero (0), acted, and reset to its Base WT.
- The Acts column names who moved. This is the same turn order list you see in the upper-left of the screen during a battle.

| Step  | Min WT | A       | B       | C       | E       | Acts |
|-------|--------|---------|---------|---------|---------|------|
| Start | -      | 200     | 250     | 380     | 350     | -    |
| 1     | -200   | 0 > 200 | 50      | 180     | 150     | A    |
| 2     | -50    | 150     | 0 > 250 | 130     | 100     | B    |
| 3     | -100   | 50      | 150     | 30      | 0 > 350 | E    |
| 4     | -30    | 20      | 120     | 0 > 380 | 320     | C    |
| 5     | -20    | 0 > 200 | 100     | 360     | 300     | A    |
| 6     | -100   | 100     | 0 > 250 | 260     | 200     | B    |
| 7     | -100   | 0 > 200 | 150     | 160     | 100     | A    |
| 8     | -100   | 100     | 50      | 60      | 0 > 350 | E    |
| 9     | -50    | 50      | 0 > 250 | 10      | 300     | B    |
| 10    | -10    | 40      | 240     | 0 > 380 | 290     | C    |
| 11    | -40    | 0 > 200 | 200     | 340     | 250     | A    |

#### Analysis

Now tally who acted over those 11 steps:

| Unit | Base WT | Turns taken |
|------|---------|-------------|
| A    | 200     | 4           |
| B    | 250     | 3           |
| C    | 380     | 2           |
| E    | 350     | 2           |

- Unit A took 4 actions to the enemy's 2 in this window. You can see the gap building by Step 5. Unit A has already acted twice (Steps 1 and 5) while the enemy has acted once (Step 3).
- Unit C, the slowest participant, keeps pace with the enemy at 2 actions each. Their Base WTs are close, 380 and 350. The gap between Unit A and everyone else comes entirely from Base WT. There is no special "extra turn" rule.

!!! warning "Math Shortcut" 

    - There is a helpful shortcut for comparing two units. First, let's be clear about what we are comparing. We want to know how often one unit acts compared to another. Put simply: for each action the slower unit takes, how many actions does the faster unit take?
    - Here is the shortcut. Divide the slower unit's Base WT by the faster unit's Base WT. For Unit A (200) and Unit E (enemy, 350), that is 350 ÷ 200 = 1.75x. 
    - Unit A acts roughly 1.75x times as often as the enemy. Just divide the bigger Base WT by the smaller one, and you get how many times more often the faster unit acts.
    - Note that in this worked example, the tally shows 4 to 2, which is a little above 1.75x. That is only because 11 Steps is a short sample. We stopped just as the enemy was starting its third turn. Over a longer fight, the count settles to 1.75x.
    - For the mathematically inclined, the shortcut derviation is located [here](xx). 



-----------------

### Base WT vs Action Rate (Advanced Topic)

There are two ways to describe the exact same underlying mechanic and it is worth being clear they are not competing ideas. One is just a translation of the other. 

Framing 1: How long do I wait?

- Base WT = 500 - ASPD.
- This is the length of a unit's countdown, or "raw" waiting time. The smaller the number, the shorter the wait.

Framing 2: How often do I act?

- Action Rate = (500 / Base WT) = (500 / (500 - ASPD)).
- This is how many actions a unit can take over a full 500 countdown. The larger the number, the more actions you take.

Derivation 

- All we are doing is taking the inverse of the Base WT formula and multiplying it by 500.
- Start with Base WT = 500 - ASPD.
- Inverse both sides: (1 / Base WT) = ( 1 / (500 - ASPD)).
- Multiply both sides by 500: (500 / Base Wait) = (500 / (500 - ASPD)). 

In plain English, waiting and acting are opposites, so the action rate is the inverse of the wait time. Multiplying by 500 just sets the window size (determined by the game), so we count actions per full 500 countdown instead of a single point in time. 

Worked Example 

Take a unit with 250 ASPD. It sits right at the soft cap, so it's effective ASPD is also 250. 

- Base WT = 500 - 250 = 250. Its countdown is 250 long.
- Action Rate = 500 / 250 = 2.0. It acts twice per a full 500 countdown. 

Now compare it to a slower unit with 100 ASPD. 

- Base WT = 500 - 100 = 400. Its countdown is 400 long.
- Action Rate = 500 / 400 = 1.25. It acts twice per countdown.

Comparing 2 Units

Often you want to know how much faster one unit is than another. Do they act the same amount? Twice as often? To find out, you compare their rates.

The direct way is to divide one rate by the other. Our fast unit had a rate of 2.0, and the slow unit had a rate of 1.25. So:

2 ÷ 1.25 = 1.6x

The fast unit acts 1.6x times as often as the slow one.

There is a shortcut that skips the rates entirely. Remember that each rate is 500 ÷ Base WT. When you divide one rate by another, the two 500s cancel out. All that is left is the Base WTs:

(500 ÷ 250) ÷ (500 ÷ 400) = 400 ÷ 250 = 1.6

So you can compare any two units straight from their Base WT. The rule is short:

- To find how many times more often the faster unit acts, divide the slower unit's Base WT by the faster unit's Base WT.
- Here that is 400 ÷ 250 = 1.6x, the same answer as before. 

This shortcut matters because Base WT is the number we keep calculating. The soft cap, the floor, and buffs all change a unit's Base WT. Once you have the final Base WT for any two units, one division tells you their action gap. We use this in the worked examples later.






------------------OLD DRAFT-----------------------



### Base WT Formulas

=== "Player Base WT" 

    The Base WT formula is straight forward:
    `Base WT = 500 - ASPD`
    
    - Higher ASPD results in a lower Base WT.
    - The ASPD value plugged into the formua is not the number from your stat sheet. It includes any active WT buffs or debuffs and is re-calculated each turn.  
    - Changing weapons will also adjust the ASPD value used. 

=== "Enemy Base WT"

    Enemies use the same formula, but have one small modification:
    `Enemy Base WT = (500 - ASPD) x Variance %`

    - Each enemy rolls a random variance % before the fight starts. This does not re-roll per turn, ASPD and Base WT are locked in for the entire encounter.  
    - Each enemy has its own variance %, but the vast majority range from 0-2%. There is no global constant and a handful of enemies have a broader range. 
    
### ASPD Soft Cap 

- The 9/3 update added an ASPD soft cap to the WT system. Under the previous system, ASPD had an effectively unlimited pay-off. Each point of ASPD shaved off one point from a unit's Base WT.
- A heavily-geared unit could stack ASPD high enough to act many times ("lapping") before an enemy. In extreme cases it was possible to act 5-7x before an enemy could take an action, which trivialized many of the more difficult fights. 
- The update added a penalty system that only triggers when a unit is above 250 ASPD. For the vast majority of players the new WT system operates just like the old one.  




## Core Mechanics

|         | Type        | ASPD | Base WT         |
|---------|-------------|------|-----------------|
| Unit A  | Fast        | 320  | 500 - 320 = 180 |
| Unit B  | Medium      | 200  | 500 - 200 = 300 |
| Unit C  | Slow        | 80   | 500 - 80  = 420 |
| Enemy 1 | Med-Slow    | 150  | 500 - 150 = 350 |
| Enemy 2 | Med-Fast    | 250  | 500 - 250 = 250 |

Table Name X

| Tick  | Min WT    | A       | B       | C       | E1      | E2      | Acts | 
|-------|-----------|---------|---------|---------|---------|---------|------|
| Start | -         | 180     | 300     | 420     | 350     | 225     | -    |
| 1     | -180      | 0 > 180 | 120     | 240     | 170     | 45      | A    |
| 2     | -45       | 135     | 75      | 195     | 125     | 0 > 225 | E2   |
| 3     | -75       | 60      | 0 > 300 | 120     | 50      | 150     | B    |
| 4     | -50       | 10      | 250     | 70      | 0 > 350 | 100     | E1   |
| 5     | -10       | 0 > 180 | 240     | 60      | 340     | 90      | A    |
| 6     | -60       | 120     | 180     | 0 > 420 | 280     | 30      | C    |
| 7     | -30       | 90      | 150     | 390     | 250     | 0 > 225 | E2   |
| 8     | -90       | 0 > 180 | 60      | 300     | 160     | 135     | A    |
| 9     | -60       | 120     | 0 > 300 | 240     | 100     | 75      | B    |
| 10    | -75       | 45      | 225     | 165     | 25      | 0 > 225 | E2   |
| 11    | -25       | 20      | 200     | 140     | 0 > 350 | 200     | E1   |
| 12    | -20       | 0 > 180 | 180     | 120     | 330     | 180     | A    |


A = 4
B = 2
C = 1
E1 = 2
E2 = 3

## WT Buffs and Debuffs 


- There are several skills and spells in the game that can reduce (buff) or extend (debuff) a unit's Base Wait value.
- Porto and Batilgref are the spells you are likely most familiar with and we will be using those throughout this section to demonstrate how the formulas work. 
- Note that none of the WT buff or debuffs ever touch the ASPD stat directly. That is most likely due to a poor translation in the skill's description.    


- Both WT reductions and extensions use the same formula 
- No separate player or enemy formula 
- We will walk through the basic formula with only one effect active and then layer in the additional rules for extreme cases
- Easiest to understand with the worked examples to follow the math 

### Formula

Adjusted WT = Base Wait x Multiplier x 0.01 
Multiplier = clamp(100 + Sum(Value - 100), 40, 160)

Input Definitions
- Base Wait = 500 - ASPD. 
- Value is read directly from the skill table(#xx).  
- The clamp (40, 160) prevents the Multiplier value from going below 40 or above 160. 

### Simple Examples

=== "Assumptions" 

    - If you are not mathematically inclined this may seem confusing or overwhelming, but the math is relatively straight forward.
    - This section will give step-by-step calculations for Porto and Batilgref Lv1. 
    - We will use the same set of assumptions for both examples:
        - Unit ASPD = 100
        - Base WT = 500 - 100 (ASPD) = 400
        - The clamp logic is removed so you can see the core calculation more easily  

=== "Porto Lv1"  

    Step 1: Organize your inputs
    
    - Value = 68 (from the skill table)
    - Base WT = 400 
     
    Step 2: Calculate the Multiplier 
    
    - Multiplier = 100 + Sum(Value - 100)
                 = 100 + Sum(68 - 100)
                 = 100 + -32
                 = 68
    
    Step 3: Calculate the Adjust WT 
    
    - Adjusted WT = Base Wait x Multiplier x 0.01 
                  = 400 x 68 x 0.01 
                  = 272
    
    Step 4: Interpret 
    
    - The unit's Base WT has decreased from 400 to 272. This is a 32% decrease.
    - This Adjusted WT will not go into effect until the unit's next turn.
    - The Adjusted WT (272) would replace the Base WT (400) in the count-down queue (Table Name X) 

=== "Batilgref Lv1"  

    Step 1: Organize your inputs
    
    - Value = 125 (from the skill table)
    - Base WT = 400 
     
    Step 2: Calculate the Multiplier 
    
    - Multiplier = 100 + Sum(Value - 100)
                 = 100 + Sum(125 - 100)
                 = 100 + 25
                 = 125
    
    Step 3: Calculate the Adjust WT 
    
    - Adjusted WT = Base Wait x Multiplier x 0.01 
                  = 400 x 125 x 0.01 
                  = 500
    
    Step 4: Interpretion 
    
    - The unit's Base WT has increased from 400 to 500. This is a 25% increase. 
    - This Adjusted WT will not go into effect until the unit's next turn.
    - The Adjusted WT (500) would replace the Base WT (400) in the count-down queue (Table Name X) 

=== "Clamps"  

    - We are going to plug in the clamp values (40, 160) directly into the Adjusted WT formula so you can see the min-max range of values.
    - Base WT = 400 like in the previous examples.
    
    Calculations
    
    - Minimum WT = 40 (min clamp) x 400 (Base WT) x 0.01 = 160
    - Maximum WT = 160 (max clamp) x 400 (Base WT) x 0.01 = 640
    
    Interpretation
    
    - A unit with 400 WT can never go lower than 160 WT or higher than 640 WT.
    - This represents a 60% swing in either direction.
    - Hitting the clamps is only possible by stacking multiple effects on the same unit, which will covered in the next section.  

### Stacking Multiple Effects 

Multiplier = clamp (100 + Sum (Effect 1 + Effect 2 - 100), 40, 160)
Adjusted Wait Time = round (Multiplier x 0.01 x Base Wait)

Effect 1 = 68
Effect 2 = 70

clamp(100 + Sum(value - 100), 40, 160)%

68 - 100 = -32
70 - 100 = -30
Sum = -62

100 + -62 = 38


WT Up
- Astral Break
- Ephemeral Illusion Stance
- Porto Spell
- Porto Scroll (name)
- Shedding Armor, Flashing Blade 

WT Down 
- Batilgref Spell
- Batilgref Scroll (name)
- Hamstring
- Milwa
- Running Inferno
- Wild Strike 

- Likely due to a poor translation, these buffs and debuffs do not effect the ASPD stat all, but the Base Wait time value directly

WT Reduction

|                                 | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
|:--------------------------------|-----|-----|-----|-----|-----|-----|-----|
| Astral Break - Legendary        | 70  | 65  | 58  | 53  | 49  | 45  | 40  |
| Astral Break - Inherit          | 85  | 80  | 75  | 71  | 65  | 57  |     |
| Ephmeral Illusion Stance        | 30  | 50  | 50  | 50  | 50  | 50  | 50  |
| Porto                           | 68  | 63  | 56  | 51  | 48  | 45  | 42  |
| Scroll of Switness              | 70  | -   | -   | -   | -   | -   | -   |
| Shedding Armor, Flashing Blade  | 80  | 78  | 75  | 72  | 67  | 64  | 60  |


WT Extension

|                                 | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | Lv6 | Lv7 |
|:--------------------------------|-----|-----|-----|-----|-----|-----|-----|
| Batilgref - Spell               | 125 | 129 | 134 | 138 | 143 | 147 | 152 |
| Batilgref - Scroll              | 120 | -   | -   | -   | -   | -   | -   |
| First Arrow to Draw Blood       |     |     |     |     |     |     |     |
| Hamstring                       | 125 | 129 | 134 | 138 | 143 | 147 | 152 |
| Milwa                           | 130 |     |     |     |     |     |     |
| Running Inferno                 | 130 |     |     |     |     |     |     |
| Wild Strike                     | 200 |     |     |     |     |     |     |

Milwa, Running Inferno, and Wild Strike apply the WT extension to the user, not the enemy. 




