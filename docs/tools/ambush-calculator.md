<script>
  function v1_calcAmbushPreventRate() {
    //Version 1 - party base calculator
    const yeka_rate_table = {0: 0, 1: 0.33, 2: 0.36, 3: 0.41, 4: 0.45, 5: 0.50, 6: 0.54, 7: 0.60};
    const i_rate_table = {0: 0, 1: 0.16, 2: 0.19, 3: 0.23, 4: 0.26, 5: 0.31, 6: 0.35};

    const v1_pos1_isyeka = document.getElementById("v1_pos1_isyeka").checked;
    const v1_skilllevel1 = Number(document.getElementById("v1_skilllevel1").value) || 0;

    const v1_pos2_isyeka = document.getElementById("v1_pos2_isyeka").checked;
    const v1_skilllevel2 = Number(document.getElementById("v1_skilllevel2").value) || 0;

    const v1_pos3_isyeka = document.getElementById("v1_pos3_isyeka").checked;
    const v1_skilllevel3 = Number(document.getElementById("v1_skilllevel3").value) || 0;

    const v1_pos4_isyeka = document.getElementById("v1_pos4_isyeka").checked;
    const v1_skilllevel4 = Number(document.getElementById("v1_skilllevel4").value) || 0;

    const v1_pos5_isyeka = document.getElementById("v1_pos5_isyeka").checked;
    const v1_skilllevel5 = Number(document.getElementById("v1_skilllevel5").value) || 0;

    const v1_pos6_isyeka = document.getElementById("v1_pos6_isyeka").checked;
    const v1_skilllevel6 = Number(document.getElementById("v1_skilllevel6").value) || 0;
 
    // check for error - more than 1 yeka or level too high
    const v1_yekacount = Number(v1_pos1_isyeka) + Number(v1_pos2_isyeka) + Number(v1_pos3_isyeka)
                      + Number(v1_pos4_isyeka) + Number(v1_pos5_isyeka) + Number(v1_pos6_isyeka);

    const v1_errflag_lvls = 
                 (!v1_pos1_isyeka && v1_skilllevel1>6) 
                 || (!v1_pos2_isyeka && v1_skilllevel2>6)
                 || (!v1_pos3_isyeka && v1_skilllevel3>6)
                 || (!v1_pos4_isyeka && v1_skilllevel4>6)
                 || (!v1_pos5_isyeka && v1_skilllevel5>6)
                 || (!v1_pos6_isyeka && v1_skilllevel6>6);

     if (v1_yekacount > 1) {
      document.getElementById("v1_result").value = "Err: Only 1 Yeka in party!";
    } else if (v1_errflag_lvls) {
      document.getElementById("v1_result").value = "Err: Only Yeka can be lvl 7!";
    } else {
      const rate1 = v1_pos1_isyeka ? yeka_rate_table[v1_skilllevel1] : i_rate_table[v1_skilllevel1];
      const rate2 = v1_pos2_isyeka ? yeka_rate_table[v1_skilllevel2] : i_rate_table[v1_skilllevel2];
      const rate3 = v1_pos3_isyeka ? yeka_rate_table[v1_skilllevel3] : i_rate_table[v1_skilllevel3];
      const rate4 = v1_pos4_isyeka ? yeka_rate_table[v1_skilllevel4] : i_rate_table[v1_skilllevel4];
      const rate5 = v1_pos5_isyeka ? yeka_rate_table[v1_skilllevel5] : i_rate_table[v1_skilllevel5];
      const rate6 = v1_pos6_isyeka ? yeka_rate_table[v1_skilllevel6] : i_rate_table[v1_skilllevel6];
      const v1_result = 100*(1-((1-rate1)*(1-rate2)*(1-rate3)*(1-rate4)*(1-rate5)*(1-rate6)));
      document.getElementById("v1_result").value = v1_result.toFixed(2);
    } 
  }
</script>

<script>
  function v2_calcAmbushPreventRate() {
    //Version 2 - level based calculator
    const v2_yeka_rate_table = {0: 0, 1: 0.33, 2: 0.36, 3: 0.41, 4: 0.45, 5: 0.50, 6: 0.54, 7: 0.60};
    const v2_i_rate_table = {0: 0, 1: 0.16, 2: 0.19, 3: 0.23, 4: 0.26, 5: 0.31, 6: 0.35};

    // Get the values from both inputs, defaulting to 0 if empty
    const v2_yeka_yn = document.getElementById("v2_yeka_yn").checked;
    const v2_yeka_lev = document.getElementById("v2_yeka_lev").value || 0;
    const v2_ynum = v2_yeka_yn ? 1.0 : 0.0;
    const v2_yeka_rate = v2_ynum * (v2_yeka_rate_table[v2_yeka_lev]);

    const v2_inherit1num = Number(document.getElementById("v2_i1_num").value) || 0;
    const v2_inherit2num = Number(document.getElementById("v2_i2_num").value) || 0;
    const v2_inherit3num = Number(document.getElementById("v2_i3_num").value) || 0;
    const v2_inherit4num = Number(document.getElementById("v2_i4_num").value) || 0;
    const v2_inherit5num = Number(document.getElementById("v2_i5_num").value) || 0;
    const v2_inherit6num = Number(document.getElementById("v2_i6_num").value) || 0;

    // check for error - 6 or fewer total members incl. yeka
    const v2_partysize = v2_ynum + v2_inherit1num + v2_inherit2num 
                         + v2_inherit3num + v2_inherit4num 
                         + v2_inherit5num + v2_inherit6num;
    const v2_toobig = v2_partysize > 6;

    // calculate the chance of at least one success
    const v2_result = 100.0 * (1 - (
                                     (1 - v2_yeka_rate)
                                     * ((1 - v2_i_rate_table[1])**v2_inherit1num)
                                     * ((1 - v2_i_rate_table[2])**v2_inherit2num)
                                     * ((1 - v2_i_rate_table[3])**v2_inherit3num)
                                     * ((1 - v2_i_rate_table[4])**v2_inherit4num)
                                     * ((1 - v2_i_rate_table[5])**v2_inherit5num)
                                     * ((1 - v2_i_rate_table[6])**v2_inherit6num)
                                    ));
  
    const v2_errmsg = "Party too big";

    document.getElementById("v2_result").value = v2_toobig ? v2_errmsg : v2_result.toFixed(2);
  }
</script>  

## Overview  

- The Eye of Kalshum skill is possessed by the Legendary Adventurer Yekaterina and is available for interitance to others, albeit at diminished effectiveness.  On most combats where the party is Ambushed, anyone with the Eye of Kalshum skill makes an independent skill check to nullify the ambush. (Certain scripted ambushes cannot be prevented.)
- The skill effectiveness for Yekaterina and others has been estimated after extensive testing. From this, the likelihood of preventing an ambush can be calculated from your party configuration.
- Legendary Adventurers are rare, so players have decide how to use duplicate copies of Yekaterina to increase her own skill or give her skill to others, and it's not immediately clear what choice would provide the most benefit.
- Input your party's configuration and Eye of Kalshum skill levels below to determine your chance of preventing an ambush.

### "Ambush Prevention Calculator"

!!! note "Eye of Kalshum Calculator"
    === "Version 1"

        - For each party position enter the character's Eye of Kalshum skill level. (default 0, only Yeka can reach level 7)
        - Indicate if one of the positions is Yekaterina. (Error if more than one checked.)
        - The result at the bottom is the overall liklihood that an ambush will be prevented.  

        <table>
            <tr><td colspan="3" style="text-align: center;"><b>Party Eye of Kalshum details:</b></td></tr>
            <tr>
              <td style="text-align: center;">
                1.<br>
                <label for:"v1_pos1_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos1_isyeka" name="v1_pos1_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"v1_skilllevel1">Level: </label>
                <input type="number" id="v1_skilllevel1" name="v1_skilllevel1" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td>
              <td style="text-align: center;">
                2.<br>
                <label for:"v1_pos2_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos2_isyeka" name="v1_pos2_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"v1_skilllevel2">Level: </label>
                <input type="number" id="v1_skilllevel2" name="v1_skilllevel2" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td> 
              <td style="text-align: center;">
                3.<br>
                <label for:"v1_pos3_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos3_isyeka" name="v1_pos3_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"sv1_killlevel3">Level: </label>
                <input type="number" id="v1_skilllevel3" name="v1_skilllevel3" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">
                4.<br>
                <label for:"v1_pos4_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos4_isyeka" name="v1_pos4_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"v1_skilllevel4">Level: </label>
                <input type="number" id="v1_skilllevel4" name="v1_skilllevel4" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td>
              <td style="text-align: center;">
                5.<br>
                <label for:"v1_pos5_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos5_isyeka" name="v1_pos5_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"v1_skilllevel5">Level: </label>
                <input type="number" id="v1_skilllevel5" name="v1_skilllevel5" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td>
              <td style="text-align: center;">
                6.<br>
                <label for:"v1_pos6_isyeka">Yeka?: </label>
                <input type = "checkbox" id="v1_pos6_isyeka" name="v1_pos6_isyeka" oninput="v1_calcAmbushPreventRate()"><br>
                <label for:"v1_skilllevel6">Level: </label>
                <input type="number" id="v1_skilllevel6" name="v1_skilllevel6" min="0" max="7" step="1" value="0" size="1" oninput="v1_calcAmbushPreventRate()">
              </td>
            </tr>
        </table>

        <table>
            <tr>
              <td><b>Chance of preventing ambush:</b></td>
              <td><input size="5" id="v1_result" style="field-sizing: content; min-width: 50px;">%</td>
            </tr>
        </table>

    === "Version 2"
        
        - Check the box if you have Yekaterina in your party and select her Eye of Kalshum skill level.  
        - Enter the number of other characters at each skill level in your party. Max party size 6)  
        - The result at the bottom is the overall likelihood that an ambush will be prevented.  

        <table >
            <tr><td colspan="2"><b>Yekaterina details:</b></td></tr>
            <tr><td>
              <label for:"v2_yeka_yn">Yekaterina in party?: </label>
              <input type = "checkbox" id="v2_yeka_yn" name="v2_yeka_yn" oninput="v2_calcAmbushPreventRate()">
              <td>
              <label for:"v2_yeka_num">Skill level: </label>
              <input type="number" id="v2_yeka_lev" name="v2_yeka_lev" min="1" max="7" step="1" value="1" size="1" oninput="v2_calcAmbushPreventRate()">
            </td></tr>
        </table>  

        <table>
            <tr><td colspan="7"><b>Other party members with inherited skill:</b></td></tr>
            <tr><td>Inherit level:</td><td>Lvl 1</td><td>Lvl 2</td><td>Lvl 3</td><td>Lvl 4</td><td>Lvl 5</td><td>Lvl 6</td></tr>
            <tr>
                <td>Members with level:</td>
                <td><input type="number" id="v2_i1_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
                <td><input type="number" id="v2_i2_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
                <td><input type="number" id="v2_i3_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
                <td><input type="number" id="v2_i4_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
                <td><input type="number" id="v2_i5_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
                <td><input type="number" id="v2_i6_num" min="0" max="6" step="1" value="0" size="1" oninput="v2_calcAmbushPreventRate()"></td>
            </tr>
        </table>  

        <table>
            <tr><td><b>Chance of preventing ambush:</b></td><td><input size="5" id="v2_result" style="field-sizing: content; min-width: 50px;">%</td></tr>
        </table>

### Background

!!! info "Eye of Kalshum ambush prevention rates"
    
    <div class="nofilter-table nosort-table narrow-table" markdown>
    
    | Skil<br>Level | Yekaterina<br>Rate | Other<br>rate|
    |:--:|:-----:|:----:|
    | 0  |  0%   |  0%  |
    | 1  |  33%  |  16% |
    | 2  |  36%  |  19% |
    | 3  |  41%  |  23% |
    | 4  |  45%  |  26% |
    | 5  |  50%  |  31% |
    | 6  |  54%  |  35% |
    | 7  |  60%  |  --  |
    
    </div> 

??? example "Formula"
  
    For one character with the success rate R, the probability of not blocking an ambush is:  
    P<sub>fail</sub> = 1 - R  
  
    For multiple characters with independent rolls, the probability of no one blocking the ambush is:  
    P<sub>allfail</sub> = P<sub>fail,1</sub> * P<sub>fail,2</sub> * P<sub>fail,3</sub> * ...  
  
    So the probability of success is:    
    P<sub>success</sub> = 1 - P<sub>allfail</sub>  
  
    For N characters with the same rate R, the success rate is then:  
    P<sub>success</sub>(R,N) = 1-(1-R)^N  
  
    For a mix of success rates, for N<sub>1</sub> characters with rate R<sub>1</sub>, N<sub>2</sub> characters with rate R<sub>2</sub>, etc.:  
    P<sub>success</sub>(R<sub>1</sub>,R<sub>2</sub>,...N<sub>1</sub>,N<sub>2</sub>...) = 1-[((1-R<sub>1</sub>)<sup>N<sub>1</sub></sup>)\*((1-R<sub>2</sub>)<sup>N<sub>2</sub></sup>)*...]  

??? example "Example results"   
    1 Yekaterina:

    - Use Yeka in your party:  `P = 33%`  
    - Inherit Yeka to the MC: `P = 16%`  
    
    2 Yekaterinas:
    
    - Increase Yeka's skill to level 2:  `P = 36%%`  
    - Use Yeka at level 1 and inherit one to the MC: `P = (1 - (1-33%)(1-16%)) = 43.72%`  
    - Inherit one Yeka to the MC and the other to another character: `P = (1 - (1-16%)^2) = 29.44%`  
    - Inherit both Yeka's to the MC:  `P = 19%`  
        
    4 Yekaterinas:

    - Yekaterina to level 3: `P = 41%`  
    - Yeka at level 2 + MC at level 2: `P = (1 - (1-36%)(1-19%)) = 48.16%`  
    - Yeka at level 2, MC at level 1, another adventurer at level 1: `P = (1 - (1-33%)(1-16%)^2) = 54.842%`  
    - Yeka at level 1, MC at level 1, two other adventurers at level 1: `P = (1 - (1-33%)(1-16%)^3) = 60.29%`  
    - Level 1 on 4 other adventureres (no Yekaterina):  `P = (1-16%)^4 = 50.21`   
    
    ...
    
    6 Yekaterinas:
    
    - Yekaterina to level 4: `P = 45%`  
    - Yeka at lev 1 and lev 1 on whole party:  `P = (1 - (1-33%)(1-16%)^5) = 71.98%`  
    - Level 1 on whole party (no Yekaterina):  `P = (1 - (1-16%)^6) = 64.87%`  
    
### Comments

- Because the rolls are independent and Yekaterina's own incremental skill increases are small: Spread her skill inherits among your party. A single Yekaterina inherit can give a significant boost to your party's ambush prevention chances, whereas continuing to increase her own skill has significantly diminishing returns per duplicate copy.
- The MC is always in the party, and should always be the first one you spread the skill to.
- Increasing anyone's level vs giving someone else the level 1 skill should be considered very carefully, as you will almost inevitably be changing party configuration over the course of the game. 
