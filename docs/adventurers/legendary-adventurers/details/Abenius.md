---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Abenius
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
**Class Change**: {%if chardata['Secondary Class'] %}{{ chardata['Secondary Class'] }}{% else %}None{% endif %}  
{%if False %}**Alternate Style**: {{ chardata['Secondary Class'] }}{% endif %}  


## Base Traits  
<div class="nofilter-table nosort-table char-traits-table" markdown>
{{ populate_quicklist(file='adventurers.csv', return_columns=['Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck'], filter_column="Name",filter_values=[title]) | convert_to_md_table }}  
</div>


??? info "Portraits"
    === "{{chardata['Primary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}.jpg)
{% endif %}
 
{% if chardata['Personal Request'] %}
    === "{{chardata['Primary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}-personal-request.jpg)
  {% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}} after Personal Request"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}-personal-request.jpg)
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

    Abenius is a strong damage dealer with the potential to provide some buff support, which is very welcome. Being a Fighter, she gains access to the highest Strength -> Attack Power conversion, on top of some solid damage multipliers and Full-Power Strike. Furthermore, she gains Attack Power with her Discipline levels, which is great.

    The passive damage boost from her Flickering Fang skill appears to be roughly in the 20% ballpark, although we're still testing out slayer sill damage. This has the potential to be a solid damage increase for her given how frequently we run into magical beasts. The big difference between this and something like a damage boost to Entites or Undead is that the latter start out with innate resistance to physical weapons, while the former doesn't. In many cases, this could end up as a "kill harder" bonus where the damage boost is effectively wasted because you already would have done enough damage to the enemy. It'll definitely be more valuable against magical beast bosses, though. Unfortunately, this skill only boosts her own damage and does not extend to party members.
    
    Her Flutterdream Flash skill is extremely unique and fun. It's a "Minor physical attack" that has enough potency to outright kill a weaker enemy at the start of battle or to take out a nice chunk of health. In addition, the accuracy debuff can be very handy, especially when stacked with something like DILTO. It's unfortunate that this skill is only one use per fight. Abenius will always trigger this skill at the start of the battle unless the battle starts with an ambush, however when inherited to another adventurer, the activation rate and damage drops significantly (roughly 20% on the activation and damage is reduced to roughly 60% of a basic attack). Note that skill inheritance increases the damage of the skill, as well as the amount of accuracy reduced, but it does not increase activation rate or the chance to trigger the accuracy reduction.

    Abenius' class change of a Priest may seem like an odd one at first glance, but it's worth dipping into for some added buff support on top of gaining Priest Weapon Mastery for a minor passive Attack Power increase. Given that we now have seen katanas with Attack Power and Magic Power on them, it's not outside of the realm of possibility that we'll get future weapons with Attack Power and Divine Power, which would be a perfect fit for Abenius to use.

    One of the things I really like about Abenius is that her signature skill does not lose value as additional skills get released in the future due to its nature of being an automatic trigger at the start of battle and not an active skill that could become easily powercrept by future active skills (I'm looking at you, Gerard).

??? info "Frobro's Analysis"
    
    Certainly more interesting than most other figures. For starters, Like Yekaterina, Abenius has been extremely lucky with the kinds of enemies and events that have been common in the game from Abyss 2 to 3. Abenius does extra damage and receives reduced damage from solid chunk of common enemies thanks to her, Magical Beast-slayer passive. This feels even stronger with the ease of farming and crafting the perfect Horned Eagle Sword from Fordraig.

    Flutterdream Flash may seem low impact in a vacuum, but if you stop and realize that it is a guaranteed turn 0 hit in every single non-ambush battle, you notice that Abenius likely has done more lifetime damage of most units in the game. I understand the hesitation, but this is a solid use for Codexes assuming you use Abenius often. You’ll get your money’s worth from it so to speak.

    The discipline is cool, it seems like with the release of abyss 3, going forward we can expect to see more enemies use status ailments against us. Being resistant to 2 of the more debilitating statuses for physical attackers (Charm/Confuse) while getting more attack comes off as better than most. 

    Simple but effective. Not exactly flashy, but still one of the best fighters in the game.

??? info "Shiro's Analysis"

    Starting from her inheritance we have basically free attack on the enemy. While in case of harder enemies/bosses the impact is quite small and rarely will make a difference (assuming it’s not leveled) the case is different if we got for all around dungeon clear or for farming purposes. In those cases it's a good push towards faster fights. Whenever it kills one of the enemies in the group or slightly weakens a stronger one doing not only damage but also giving him ACC debuff. In the end it's a really good skill for self inheritance but not so good on others because of lowered activation rate.

    Moving on to her passive, it's a really amazing one especially for second abyss/middle floors of third abyss or both Le Bicken and Hundredfold Blossom caves. Not only does her passive buff her damage vs Magical Beast but also reduces damage received from them. Lucky for her those are really common enemy types so she’ll have a good bunch of time to shine.

    Moving to her discipline. While in the earlier phase of the game I was really skeptical of her and Lana's, it turned out to be a really good one as we arrive in abyss 3 and we have quite a few enemies that tend to proc charm/confusion. And those are one of the most annoying statuses. It’s one of rare cases where I’d say that it’s worth going for a disc. 

    Her class change is priest, which is one of my favorite options for fighter class. Having it saved me really many times against annoying statuses from enemies like vampire/succubus/gorgon. Not only is it good for cleanse and sometimes emergency healing (assuming you carry staff and you’re not too lazy to swap weapons). But it’s also a good potential for faster fight setup on bosses giving you more buffers in a team and speeding up for example porto on everyone. Overall very solid class change for supportive reasons. On top of it Priest Weapon Mastery helps a bit with attack.

    To sum it up I believe that Abenius is one of best options when it comes for a fighter (and the best one for general content) thanks to having overall really solid class options, unique passive, inheritance and discipline. I would personally invest in inheritance firstly because it’ll be useful in more situations than more charm/conf resistance but in the end it's a matter of personal opinion on what you find best. Her only downgrade is that her unique doesn’t active on ambush. But at least that way you don’t lose the Assault Guard turn.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I like Abenius' kit so I pulled three copies - one for the base, one for the OCD Discipline, and one to inherit to MC.

??? note "Lynd's Pull Plan"
    She's hot so I pulled immediately. At some point I blanked out and she had some discipline levels and Inherit leveled. I'll max her when she rolls around again.
    
## Duplicate Usage

* Increasing her Discipline to increase her Attack Power.
* Inherit on her own skill will increase the damage and accuracy reduction amount of her Flutterdream Flash.
