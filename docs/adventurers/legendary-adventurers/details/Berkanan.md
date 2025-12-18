---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Berkanan
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

    Like Iarumas, Berkanan is a bit of an interesting adventure. She is also a hybrid between a Fighter and a Mage, and compared to Iarumas, she actually has a better all around passive set. Having both Way of the Warrior and Way of the Mage means she has both a solid scaling damage multiplier, as well as a solid MP passive MP reduction for some of her spells. While Iarumas primarily focuses on being a versatile damage dealer, Berkanan's ideal role is, in my opinion, as a weaker fighter with debuff versatility.

    Coin of Power allows her to equip one-handed and two-handed swords, which pretty much cements her as a front line adventurer. In addition, it increases physical-oriented stats.

    True Words of Fire is a very unique spell. At a glance, it's HALITO that can apply two debuffs. Both of these debuffs will stack with other sources of the same debuff, but you'll want to keep in mind the debuff limit. This spell is going to take two of the three spots. One big unknown at this time is how exactly the level-based damage of this spell works. It will presumably hit harder than HALITO, but it's too soon to say how much harder, and will be something to keep an eye on. The formula for it appears to consider both Magic Power and Class Level when calculating its damage, but it's unclear if that class level component will continue to grow as levels increase past 60, or if that portion is based on a percentage of the current maximum level. One important thing to note is that True Words of Fire, like TZALIK, has an increased sure hit rate, but we also do not know if that is intentional.

    Comparing her to Iarumas, I personally think her kit is a bit more cohesive and specialized. Iarumas has a better single target nuke, but Berkanan won't suffer from the same longevity issues and the fact that she gets access to Immortal Strike gives her a self-healing ability that deals damage, which is something mages lack. Unfortunately, Way of the Warrior will not boost Berkanan's True Words of Fire spell (or any spells for that matter) - it only applies to her physical damage, and she's lacking access to Full Power Strike. As such, she'll need to rely on Wild Strike and Heavy Attack as her main sources of physical damage.
    
    An important thing to note is that while Berkanan has an arguably simpler to use kit and easier to understand role than Iarumas, she does not get any skills or spells outside of True Words of Fire until level 20. This means that she's beginner-friendly in her simplicity, but she is not beginner friendly to use for brand new players, as they will be left with just basic attacks and True Words until after the first Grade Exam.

    Like Iarumas, gearing her might be a bit funky as she might want Magic Power if you want to keep True Words of Fire as a potential damage source (assuming it considers class level and Magic Power, not just the former), but she'll also want Attack Power for other skills and basic attacks in her physical kit. Unlike Iarumas, there's no question of how to fit her in on your team. Stick her in front and give her a sword.

??? info "Frobro's Analysis"

    At present, I’m not a fan of these phys/mag hybrid units. In practice, they are middling fighters who lack Full Power Strike, have gear restrictions and effectively learn their mage spell tree without needing to class change. I think it’s pretty telling that the unit that’d be the best at this kind of setup, MC, doesn’t get built like this because there are better ways to build him. I do not expect this unit to ever get a 2nd class.

    Onto the specifics. Coin of Power solidifies her as a front liner, which is for the best since she is incompatible with all the evil back liners who want to spread their alignment buffs. Her discipline skill is proof that there is no justice in this world. Drecom knows what it takes to make a good focus and chooses not to for many units. True Words of Fire is Halito but cooler; gets much stronger when cast at higher levels. Not a bad use for Codexes.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I like the Iarumas/Berkanan banner, so I pulled a decent amount on this one. I ultimately wanted to get multiple levels to TZALIK to the MC and I wanted to build Berk as an adventurer for occasional use.

??? note "Lynd's Pull Plan"
    Massive. Deserving of massive pulls. Massive inheriting. Massive usage. Quote me on that.

## Duplicate Usage:

* Inherit her spell to herself for increased damage
* Discipline for small gains to important stats
* Inherit her spell to the MC or other spellcasters. Having an attack spell that applies two debuffs might situationally be beneficial, especially if you don't want to run multiple mages
