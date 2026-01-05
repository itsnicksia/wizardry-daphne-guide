---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Erwin
---

{% set chardata = pd_read_csv('../data/adventurers.csv', 
   index_col='Name').fillna("").loc[title] %}

# {{title}}  
## Basic Info:  
**Rarity**: {{ chardata['Rarity'] }}  
**Race**: {{ chardata['Race'] }}  
**Gender**: {{ chardata['Gender'] }}  
**Type**: {{ chardata['Type'] }}  
**Personality**: {{ chardata['Personality'] }}  
**Starting Class**: {{ chardata['Primary Class'] }}  
{%if chardata['Secondary Class'] %}**Class Change**: {{ chardata['Secondary Class'] }}{% endif %}  
{%if chardata['Alternate Style'] %}**Alternate Style**: {{ chardata['Alternate Style'] }}{% endif %}  


## Base Traits  
<div class="nofilter-table nosort-table char-traits-table" markdown>
{{ populate_quicklist(file='adventurers.csv', return_columns=['Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck'], filter_column="Name",filter_values=[title]) | convert_to_md_table }}  
</div>


??? info "Portraits"
    === "{{chardata['Primary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'].replace(" ","-") | lower}}-personal-request.jpg)
  {% endif %}
{% endif %}

{% if chardata['Alternate Style'] %}
    === "{{chardata['Alternate Style']}}"
        ![](../img/{{title | lower }}-{{chardata['Alternate Style'].replace(" ","-") | lower}}.jpg)
{% endif %}

## Skills
<!-- 
skills will automatically fill
extra text can be added between skills
-->

{% if chardata['Alternate Style'] %}
!!! note "If standard {{title}} and {{chardata['Alternate Style']}} {{title}} are merged, inheritable skills are shared by both styles, but changing styles will swap any style-specific uninheritable passive and discipline skills."
{% endif %}

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}} {% if chardata['Alternate Inheritable Skill'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

 {% if chardata['Alternate Inheritable Skill'] %}
    === "{{chardata['Alternate Inheritable Skill']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Inheritable Skill']) }}
 {% endif %}

{% if chardata['Potential Inherit'] %}
!!! info "Potential Inherit"
    === "{{chardata['Potential Inherit']}}"
        {{ get_skill_description(chardata['Potential Inherit']) }}
{% endif %}
       
!!! info "Unique Skill (Not Inheritable)"

    === "{{chardata['Unique Skill (Not Inheritable)']}} {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Unique Skill (Not Inheritable)']) }}

 {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}
    === "{{chardata['Alternate Unique Skill (Not Inheritable)']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Unique Skill (Not Inheritable)']) }}
 {% endif %}

!!! info "Discipline Skill"
    === "{{chardata['Discipline']}} {% if chardata['Alternate Discipline'] %}(Standard){% endif %}"
        {{ get_skill_description(chardata['Discipline']) }}

{% if chardata['Alternate Discipline'] %}
    === "{{chardata['Alternate Discipline']}} ({{chardata['Alternate Style']}})"
        {{ get_skill_description(chardata['Alternate Discipline']) }}
{% endif %}


## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    Every now and then, an adventurer comes along that makes you really question what the devs are doing. Welcome, Erwin!

    Looking at his skills, Flames of Gluttony is...weird, both conceptually and mechanically. Conceptually, we have a single target spell that gets stronger the more enemies you're facing. What's problematic about this is generally when you're facing multiple enemies, you're not going to want to be using single target spells - you'll want to either use MA/LA spells or use crowd control such as KATINO or KANTIOS. From early testing, the damage boost per enemy does not seem to be a linear percentage increase. The variability of damage in general makes it hard to determine, but first glance looks something like a smaller damage increase per enemy when facing 1-3 enemies, then larger increase per enemy at 4+ enemies. Since this is from inherited testing, you can assume an additional ~33% or so more damage if you're using him directly, which is...fine.

    Unlike TZALIK and True Words of Fire, this spell does not seem to have a lowered Surety threshold, which is unfortunate but expected.

    His passive, Spellcraft Bookmark, is roughly a non-compounding 2 MP reduction starting on turn 2 of using the same spell in a row, regardless of the spell. It's damage increase is also a non-compounding 10% or so.

    His Discipline is what you'd expect for a mage - Magic Power and MP. Nothing massive, but all around fine.

    So what does this amount to? An overall lackluster legendary that gives us great incentive to save for the new class near the end of the year. Of all the great things they could have done with a new legendary mage, this is confusing and not really one of them.

??? info "Frobro's Analysis"

    I held off writing this one just to see if something was coming in Abyss 4 that Erwin was going to be really good for that we just couldn’t see at the time. Nope; he’s just not good! Mostly because Mage as a class is pretty bad; or rather, magic damage is worthless.

    Neutral Elf with MP + Mag pwr discipline, not bad. The passive that increases damage and reduces the cost of repeat spells is a start, but it is nowhere near enough! The damage softcaps for spells are atrociously low. Even casting higher levels of damaging spells hardly justifies the increased mp cost, and even with this discount, Erwin cannot afford to spend his resources for pathetic damage every battle.

    Then there is Flame of Gluttony…There isn’t a single fight in the game that this spell is good for. The damage is low even under the best conditions to say nothing of the fact that aoe damage/debuffs is the only thing mages are good for in battle and you need to ignore that to even have a reason to click this. This guy seriously has no redeeming qualities. Unironically weaker than Halloween Asha, a fire mage, with a 2nd class (priest) that came out weeks before him. What more can be said?

??? info "Karkarov's Analysis"

    Drecom has delivered on their promise, the Trap Master is here and their name is Erwin!  But trust me, they aren't a Trap Master because it is a dude that looks like a girl.

    So lets start by discussing what is good about this character.  Well they are an elf mage, so that's pretty solid for trait synergy on like IQ and Speed.  They have Neutral alignment so will work well with a wide variety of formation buffs and unlike that other fire mage that is a woman they don't conflict with the Alice buff.  Also their discipline is ok, bigger boosts to magic attack and MP are solid for a mage and could have been considerably worse.

    Well that does it for the good.  Glad we got that out of the way.

    Their unique non inheritable skill is "Spellcraft Bookmark".  This skill, if you cast the same attack spell back to back, (note attack spell, not buff, not heal, not debuff), you will do 10% more damage and the spell will cost -2 mp.  On paper this may apply to SP attack skills as well based on the way the skill is written but I will be honest, he is a mage, he will hit like a wet noodle and has very little SP so this is not worth testing.  What if you somehow cast the same attack spell three times?  Well .... it does 10% more damage and costs 2 less mp.  That's right, this skill doesn't stack, it doesn't get better the longer you keep this one skill chain going, it is just 10% and -2 mp. 

    Meanwhile I drop Alice in my back row and as long as no one is Good alignment suddenly all of them have always on +10% damage, not just one of them, and certainly not only if they cast the same attack spell twice in a row.  And who is that over there?  Adam?  Oh yeah doesn't he reduce MP cost for any spell that is 3-10 mp... like basically all level 1 attack spells, even leveled debuffs etc?  Whose that on the broom over there .... Sheli with actual MP Regen?!?!?!

    I think you get it, this skill is a combo of things other casters do.  Which while it's nice to combo, the way it's designed means it isn't always "on", and the other casters all do the uni task action better than Erwin does.  In other words, this skill is mid at absolute best and cannot be relied on to make any real difference in a fight or help staying power over a long dungeon run.  I would rather have the unitask ability of any of the casters mentioned above, and considering two of them are from the general pool that is not a good thing for this banner.

    How about his inherit skill, lets let little Conan Bro shine here!  Imagine, you are facing down a large group of enemies, like 8 guys.  This is it, the one scenario where mages are still king!  Their aoe's while lower damage hit all targets making a big impact that with even just two mages can mean a whole common mob army is toast!  I look at "Flame of Gluttony"  AHAHAHAHA YES! Mage Supremacy BABY, it does increasingly more damage the more enemies there are!  Prepare to see this whole group die in burning ash akin to the flames of hell it.... wait what.... what's that say, it's .... single target.

    ...

    That's right.  Leave it to Drecom to make a spell that gains power the more enemies there are, give it to the class whose only real damage role is aoe'ing large groups, and then make it single target.  With low enemy count this spell is basically just Halito 3 at level 1, and if that excites you well I guess it isn't a terrible personality trait to be easily impressed.  At least you will go through your day a little more uplifted.
    
    For me though this spell is literally landing like a wet fart that smells of cabbage and failed dreams.  If you bump it to like level 3, the enemy is wind element, and you got like 6 enemies at least it will probably do really respectable damage to be honest.  But you still probably would have killed the whole group if you had just cast Lahalito 1 or 2 instead as opposed to just one of them for a spell that costs as much MP.

    Like this is not the worst legendary attack skill I have ever seen, but it is not anywhere near what I would call good.  It is effectively just slightly better Halito.  A good analogy would be going to Mc Donalds and ordering a double quarter pounder with cheese, except wait.... you have them add BACON!  It is still a DQ with cheese man, those two stringy as hell microwaved pieces of bacon don't really elevate it to anything special but your burger does cost more "MP" now.

    This character is just not good.  Any other legendary mage is better, as horrific as this is to say, if you REALLY want a fire mage, Alt Asha skin is probably better.  So yeah, this character is the Trap Master.  Because he is a pure bait banner meant to con you into wasting resources.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"

    This one is easy. Hard pass.

??? note "Karkarov's Pull Plan"

    Do you play Daphne in Japanese VA and want to trick yourself into believing Detective Conan has joined your adventuring party?  Well then, pull, cause Erwin is voiced by the Japanese VA of Detective Conan, no joke Drecom confirmed it.  Are you anyone else?  For the love of christ do not spend one single gem on this terrible character.  Edwin is literally in the running for being the worst legendary in the game.  Even if he isn't he is 100% in the bottom 3.
