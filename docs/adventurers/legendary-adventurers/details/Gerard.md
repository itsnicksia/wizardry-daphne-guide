---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.

   title: Gerard
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

    Poor Gerard has not aged that well. He's not a bad legendary by any means, but many of his initial advantages have been relegated to less impactful now that we have new adventurers and skills available to us. I wouldn't go as far as saying he's been powercrept, but he's definitely lost a bit of his luster in comparison to when he was initially released.

    His Thunderstrike skill is very potent when hitting weaknesses, and having the chance to paralyze your foes can be a nice added bonus. Unfortunately, with the addition of Full Power Strike to the Fighter arsenal, even if class changing Gerard to Fighter, his signature skill becomes a conditional attack at best. Full Power Strike will be both more efficient and overall higher consistent damage than Thunderstrike. Another key thing to note is that he is a Dark type adventurer with a Air type skill, which means he misses out on a same-type damage multiplier when hitting weaknesses, which is unfortunate.

    Lightning Celerity is fine - it's a passive personal evasion increase, however it's a static increase and not a percentage, so it will lose value as stats increase.

    Gerard's biggest disadvantage is that he is designed to do damage, but his signature skills don't contribute much in the way towards dealing most of his damage. He has a small niche in that as of his first rerun, he's still our highest damaging Knight adventurer, but his access to a Fighter class change largely renders his Thunderstrike skill obsolete in a large majority of current content.

??? info "Frobro's Analysis"

    This game’s poster boy for “Mid. A good aligned, front-row knight with a Heavy Attack but green skill that doesn’t even match his element. What is there to say? At least his 2nd class is fighter, so he isn’t truly bottom tier. His passive and discipline aren’t bad, but they’re not impressive enough to salvage this guy.

    This guy’s job is to be the resident low-value buzzkill, when pulling for some other legendary once limited legends get added to the pool. Outclassed by general adventurers, what a life.

??? info "Shiro's Analysis"

    Starting with inheritance… It was made for Helmut alone in mind for early game… but for whatever reason Gerard himself is dark. So it never was a good synergy or good damage option. One of the most niche at best inherits.

    Moving on passive. It’s good, especially in the earlier part of the game. Having more EVA is not a bad choice and helps especially in the early part of the game. Sadly it falls off heavily later on.

    His discipline further pushed the idea of him being a dark evasion tank… which wasn't a bad idea I guess? But hey… Savia exists… So I’m unsure how to feel about it.

    His class change is fighter which is his saving point. His passive and discipline come more at play there making him easier to build. Nothing amazing honestly but it’s still a really solid option if you like his design.

    To sum it up. Gerard is a solid pick that’s mostly mediocre when it comes to everything. His inheritance wants Reaven Dagger to proc more paralysis and synergy good with wind damage… but we don’t have earth enemies to play on it too much. On top of that he's a dark element so he’s out of synergy with his own skill… but it’s something that saves him later on making him a solid fighter option for abyss 3 where dark damage is quite present… The issue is that he’s not unique in it and Gandolfo or Elda fit the same role. While I do think that Gerard got way more hate from the playerbase than he should, he's still… just solid. Maybe in future when we’ll get access to farmable 3 hit weapons his inheritance will shine with more common paralysis procs but as for now… there are other options.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Gerard was a solid pass for me. Nothing about his kit was interesting enough for me to pull for.

??? note "Lynd's Pull Plan"
    Gerard is my boy. So I maxed his discipline because every adventurer needs a fully obedient dog. Side note: he was my mvp for killing the dragon during the collab.
    
## Duplicate Usage

* Inherit on his own skill will increase the damage and cost of his Thunderstrike. This will result in more damage than increasing his Discipline will.
* If you've maxed out his Thunderstrike, increase his Discipline to increase his speed and evasion, which are both great skills to boost.
