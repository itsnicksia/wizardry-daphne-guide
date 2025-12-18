---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
#
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg
#
# Free text can still be added to any section, reviews at end, etc.


   title: Flut
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

    === "Mage of the Silent Night"

        Mage of the Silent Night Flut is our first alternate style for a General adventurer, and it is relatively lackluster. The change to her unique skill from `Water Formation` to `Grace of the Great Tree` is arguably a downgrade. `Grace of the Great Tree` will give Flut a minor boost to her Magic Power and Defense, however losing the `Water Formation` buff could have implications later in the game if single element parties become more widespread.

        As of her release, `Water Formation` can already be utilized by having a back row of Flut, Alice, and either Philip or Viviana. If Alice was made into a mage, the `Water Formation` damage boost for her would already surpass the personal damage boost that Flut would gain from `Grace of the Great Tree`. This is arguably a negligible gain currently due to the lack of any difficult Fire-type content, however the moment that content gets released, `Water Formation` has the potential to be much more valuable than `Grace of the Great Tree`. Furthermore, `Grace of the Great Tree` is a boost when she has a two-handed staff equipped, which completely contrasts with one of her two possible classes. You'd currently never have one equipped if you changed her class to run her as a Warrior.

        As far as `Gift of Spell Genius` goes, this is another arguably downgrade to `Young Spell Prodigy` due to Gift no longer providing an increased Magic Power boost at higher Discipline levels.

        In terms of role competition, Flut is already surpassed by Mage Alice in terms of utility, so unless you're already running Flut in your party, there's nothing overly enticing about her Mage of the Silent Night kit that would make me consider adding her.

        Lastly, if you're interested in her strictly for her appearance, everyone will be getting a free `Remains of the Mage Praying on the Silent Night` bone on Day 6 of the Sacred Feast Special Supplies.

        Ultimately, this is the first banner the game has introduced that I recommend completely ignoring, as there is essentially zero incentive to use her over standard Flut.

        ??? note "TheAxolotl's Pull Plan"
            I got a free copy and that was it. I wouldn't touch this banner.

## Duplicate Usage:

* If you use her Mage of the Silent Night style
    * Inherit her standard style dupes to her own skill to increase its damage.
    * Mage of the Silent Night dupes can either go towards Discipline or inherit. While Discipline boosts are minimal, you'll likely reach inheritance cap eventually from standard Flut pulls over time.
* If you use her standard style and not her Mage of the Silent Night style, Discipline and skill inherit are both okay options.
* Inherit her skill to your favorite mage to give them MIGAL or increase its damage.
* Save for future use or dismiss for Grade tags.
