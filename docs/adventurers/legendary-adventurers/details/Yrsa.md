---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Yrsa
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

    Before I jump into Yrsa kit, for those that don't know, Rangers have an effective attack power of `(AttackPower * 0.5) + (Accuracy * 1.5)`. This means that if you're trying to load your Yrsa up with a bunch of Attack Power gear, her performance will be pretty bad. She needs all those ACC/ACC% gear pieces that you've been extracting in order to be able to put out solid numbers. Don't make the mistake assuming she's a bad adventurer because you didn't gear here properly.

    That being said, let's jump into her kit! While I won't touch on the Ranger kit in general, I will call out a few synergistic things with respect to what she's bringing.

    First, regarding her passive, Slayer of the White Calamaty, we've seen how good this can be on Abenius and Benjamin. We face a lot of magical beasts, so having a damage bonus there is great. This passive has an added additional bonus, that's mostly a bit gimmicky but can be situationally useful. If you happen to enter battle with a trapped enemy, the additional magical beast damage extends to another adventurer.

    First Arrow to Draw Blood is...interesting. Remember how Savia got released and was broken in a bad way until the devs released an update that fixed a bunch of things? Yeah, here's a bit of deja-vu.

    Conceptually, I like this skill a lot - based on how it reads, it provides a single target BATILGREF-like debuff to an enemy, which is neat. Furthermore, this debuff is treated like an ailment and is not subject to the 3 debuff limit, which is excellent! In addition to that, it provides some supplemental damage once it expires. For folks who look at this skill and try to compare it to an active damage skill, you'll likely be disappointed. The best way to think about this skill is as a debuff that provides damage and not as a damage skill that provides a debuff.

    The mechanics of this skill are interesting - it essentially has different "tiers" that provide gradually increasing amounts of damage upon expiration based on the number of hits an enemy receives while the debuff is up. The tiers are represented by different colors, and the color changes after a specific number of hits is received.

    1. White (16 hits)
    2. Pink (8 hits)
    3. Red (16 hits)
    4. Dark Red (8 hits)
    5. Glowing Red (16 hits)
    6. Gold (8 hits)
    7. Green (? hits)

    From here, it can proceed to blues and purples, but I'm not entirely sure how many total tiers there are or the sequence after Green. This skill has some nice synergy with Ninja parties. Ninjas getting access to Shedding allow them to take actions very frequently, and while dual wielding, basic attack and skills like Covert Strike and Yuzu's Hue can provide a large volume of hits to ramp First Arrow up.

    Here are the big downsides. First, it takes a lot of hits to increase the level. If you're looking to get to Green, for example, it'll take a total of 73 hits. That's a lot in two enemy turns, which means you also need to be using Delay Attack or Chronostasis to delay the enemy on top of likely stacking BATILGREF, as well. Why do we also need BATILGREF, you might ask? Well, remember how I alluded to there being a bug? Unfortunately, it appears as though the Attack Speed reduction portion of First Arrow does not work at all. This has been tested repeatedly and right now, it seems like applying First Arrow does not slow the enemy down the way it should. Hopefully this gets fixed, as it's a crucial element of this skill even being viable.

    In addition, folks have reported (although I haven't tested it myself) that Blessing of Agora does not extend the duration of First Arrow at all.

    Lastly, First Arrow really isn't a skill that you'd want to inherit to someone else. The inheritance damage loss will lead to a lower payoff for the large amount of work it takes to increase that damage tier.

    Her Discipline skill, Forest-Reading Huntcraft, boosts SP if you like that kind of thing.

    So, with these things in mind, I'm going to be an optimist and assume that First Arrow will be getting fixed soon. In that case, Yrsa makes a pretty solid teammate for Ninja-heavy teams. She wants parties that take multiple actions quickly, and she wants each of those actions to provide multiple hits. That being said, you don't really want to built a team around her, as the effort it takes to get First Arrow to high tiers is quite high in itself - you're likely better off using it and getting to whatever multiplier you get while taking reasonable actions, as that will give you some respectable bonus damage.

    Over all, Yrsa has a unique kit, an annoying bug, and will not be a fit for many teams. She's nothing game-breaking and is an easy skip if you're not a fan. You won't really want to run her on a party full of 2h Fighters since the number of hits you'll be able to deal in a 2 turn window is pretty limited. That being said, she has the potential to be a solid addition to faster, Ninja and Shedding-based teams. When fixed, First Arrow will hopefully have a nice spot in her skill rotation as a debuff with supplemental damage associated with it.

??? info "Shiro's Analysis"

    So we got the first legendary ranger. Class seems to be made around exploring and map traveling/qol with farming ability thanks to AoE more than boss killer type class unlike everything we had so far. 

    Going to her inheritance and passive. Her inheritance is good vs enemies with high eva/aspd, so mostly A4 enemies and probably some bosses? Might be a good debuff on sealed demon but I’m not sure about it myself. Damage seems to be good and it stacks with the number of hits the enemy gets during it. 

    Her passive is great for farming, similar to Abenius having beast slayer is the best choice for a farmer and if you use traps it also lets another ally to benefit from beast slayer! So great choice for farming with traps! Outside of it she can be of some help against the wolf boss in A4.

    Overall? Nothing you need to spend on it. But thanks to great passive/disc and inheritance for A4 she’s worth considering to be your choice for a pull. If you need AoE that’s it. A really great option but nothing amazing as for now. Unless I miss something. Also takes more xp than base class and less than advanced ones.
    
## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I pulled a couple copies, one of which went to the OCD Discipline. I'm holding off on using the other copies, as I'm hoping we'll see some bug fixes for First Arrow in the near future. For now, she's sitting nicely in my 3-ninja team.

## Duplicate Usage

* Inherit on her own skill will increase its damage.
* Increasing her Discipline will give her more SP.