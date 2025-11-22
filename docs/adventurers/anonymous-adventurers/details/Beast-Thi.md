---
# Just change title to character name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 
# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-requestform-class.jpg

   title: Beast-Thi
---

{% set chardata = pd_read_csv('../data/adventurers.csv', index_col='Name').fillna("").loc[title] %}

# {{title}}  
{{ chardata['Rarity'] }} Adventurer  

## Basic Info:  
**Race**: {{ chardata['Race'] }}  
**Gender**: {{ chardata['Gender'] }}  
**Type**: {{ chardata['Type'] }}  
**Personality**: {{ chardata['Personality'] }}  
**Starting Class**: {{ chardata['Primary Class'] }}  
**Class Change**: {{ chardata['Secondary Class'] }}  

## Base Traits  
<div class="nofilter-table nosort-table char-traits-table" markdown>
{{ populate_quicklist(file='adventurers.csv', return_columns=['Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck'], filter_column="Name",filter_values=[title]) | convert_to_md_table }}  
</div>

{% set primaryclass = populate_quicklist(file='adventurers.csv', return_columns=['Primary Class'], filter_column="Name",filter_values=[title]).iat[0,0]  %}
{% set secondaryclass = populate_quicklist(file='adventurers.csv', return_columns=['Secondary Class'], filter_column="Name",filter_values=[title]).iat[0,0]  %}

??? info "Portraits"
    === "{{chardata['Primary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Primary Class'] | lower}}.jpg)
{% if chardata['Secondary Class'] %}
    === "{{chardata['Secondary Class']}}"
        ![](../img/{{title | lower }}-{{chardata['Secondary Class'] | lower}}.jpg)
{% endif %}

## Skills

!!! info "Inheritable Skill"
    === "{{chardata['Inheritable Skill']}}"
        {{ get_skill_description(chardata['Inheritable Skill']) }}

    {% if chardata['Alternate Inheritable Skill'] %}
    === "{{chardata['Alternate Inheritable Skill']}} (Alternate)"
        {{ get_skill_description(chardata['Alternate Inheritable Skill']) }}
    {% endif %}

{% if chardata['Potential Inherit'] %}
!!! info "Potential Inherit"
    === "{{chardata['Potential Inherit']}}"
        {{ get_skill_description(chardata['Potential Inherit']) }}
{% endif %}

!!! info "Unique Skill (Not Inheritable)"
    === "{{chardata['Unique Skill (Not Inheritable)']}}"
        {{ get_skill_description(chardata['Unique Skill (Not Inheritable)']) }}  

    {% if chardata['Alternate Unique Skill (Not Inheritable)'] %}
    === "{{chardata['Alternate Unique Skill (Not Inheritable)']}} (Alternate)"
        {{ get_skill_description(chardata['Alternate Unique Skill (Not Inheritable)']) }}
    {% endif %}

!!! info "Discipline Skill"
    === "{{chardata['Discipline']}}"
        {{ get_skill_description(chardata['Discipline']) }}

    {% if chardata['Alternate Discipline'] %}
    === "{{chardata['Alternate Discipline']}} (Alternate)"
        {{ get_skill_description(chardata['Alternate Discipline']) }}
    {% endif %}

<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->
<!--
## Adventurer Reviews

??? info "ABC's Analysis"
    -text-

??? info "DEF's Analysis"
    -text-
-->

<!--
## Adventurer Pull Plans

??? note "ABC's Pull Plan"
    -text-
-->
  
<!--  
## Duplicate Usage

*  option 1
*  option 2
-->
