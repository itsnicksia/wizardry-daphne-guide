# Wait Time System 

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
    
    Step 4: Interpret 
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




