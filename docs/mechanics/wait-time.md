





| Unit    | Type        | ASPD | Base Wait       |
|---------|-------------|------|-----------------|
| Unit A  | Fast        | 320  | 500 - 320 = 180 |
| Unit B  | Medium      | 200  | 500 - 200 = 300 |
| Unit C  | Slow        | 80   | 500 - 80  = 420 |
| Enemy 1 | Medium-Slow | 150  | 500 - 150 = 350 |
| Enemy 2 | Medium-Fast | 250  | 500 - 250 = 250 |



| Tick  | Lowest WT | A       | B       | C       | E1      | E2      | Acts | 
|-------|-----------|---------|---------|---------|---------|---------|------|
| Start |           | 180     | 300     | 420     | 350     | 225     |      |
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

## Buffs and Debuffs 

Formula


| Tick  | Lowest WT | A       | B       | C       | E1      | E2      | Acts | 
|-------|-----------|---------|---------|---------|---------|---------|------|
| Start |           | 180     | 300     | 420     | 350     | 225     |      |
| 1     | -180      | 0 > 180 | 120     | 240     | 170     | 45      | A    |
| 2     | -45       | 135     | 75      | 195     | 125     | 0 > 225 | E2   |
| 3     | -75       | 60      | 0 > 300 | 120     | 50      | 150     | B    |
| 4     | -50       | 10      | 250     | 70      | 0 > 350 | 100     | E1   |
| 5     | -10       | 0 > 180 | 240     | 60      | 340     | 90      | A    |
| 6     | -60       | 120     | 180     | 0 > 420 | 280     | 30      | C    |
| 7     | -30       | 90      | 150     | 390     | 250     | 0 > 225 | E2   |
| 8     | -90       | 0 > 180 | 60      | 300     | 160     | 135     | A    |



## WT Buffs and Debuffs 

- There are several skills and spells in the game that can reduce (buff) or extend (debuff) a unit's Base Wait value.
- Porto and Batilgref are the spells you are likely most familiar with and we will be using those throughout this section to demonstrate how the formulas work. 
- Note that none of the WT buff or debuffs ever touch the ASPD stat directly. That is most likely due to a poor translation in the skill's description.    


- Both WT reductions and extensions use the same formula 
- No separate player or enemy formula 
- We will walk through the basic formula with only one effect active and then layer in the additional rules for extreme cases
- Easiest to understand with the worked examples to follow the math 


=== "Formula" 

Adjusted WT = Base Wait x Multiplier x 0.01 
Multiplier = clamp(100 + Sum(Value - 100), 40, 160)


=== "Clamp Explanation" 



What does clamp mean?
- Do not let the "clamp" part of the formula intimidate you if you are not mathematically inclined. 
- It just means that the multiplier value can never go below 40 (min) or above 160 (max). 
- If the value is outside this range (40 - 160), then it "clamps" it to either 40 or 160.

Worked Example

Assumptions
- Unit ASPD = 100 
- Unit Base Wait Time = 500 - 100 (ASPD) = 400 


____

Porto Lv1 

Multiplier = 100 + Sum(Value - 100)
           = 100 + Sum(70 - 100)
           = 100 + -30 
           = 70 

Adjusted WT = Base Wait x Multiplier x 0.01 
            = 400 x 70 x 0.01 
            = 280

____

Batilgref Lv1 

Multiplier = 100 + Sum(Value - 100)
           = 100 + Sum(125 - 100)
           = 100 + 25 
           = 125 

Adjusted WT = Base Wait x Multiplier x 0.01 
            = 400 x 125 x 0.01 
            = 500
____


clamp(100 + Sum(value - 100), 40, 160)%












Adjusted WT = Multiplier x Base Wait 

Multiplier = 




Multiplier = clamp (100 + Sum (Effect 1 + Effect 2 - 100), 40, 160)
Adjusted Wait Time = round (Multiplier x 0.01 x Base Wait)

The 0.01 term is what takes the raw integer and transforms it into the actual multiplier

Examples

Porto Lv1

- ASPD = 100
- Base Wait = 500 - 100 = 400 

Final Wait = round (0.68 x Base Wait) — a 32% speedup.
Final Wait = round (0.68 x 400) = 272

Batilgref Lv1

- ASPD = 100
- Base Wait = 500 - 100 = 400 

Final Wait = round (1.25 x Base Wait) — a 25% slow down.
Final Wait = round (1.25 x 400) = 500

Clamps

Porto = (40 x 0.01 x 400) = 160 < can never go lower than this
Batilgref = (160 x 0.01 x 400) = 640 < can never go higher than this



Effects stack additively 
Takes effect on the next turn when Wait Time is recalculated


Stacking Multiple Effects 

2 WT up 


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




